'use client';

import { useEffect, useRef } from 'react';

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  color0?: string;
  color1?: string;
  color2?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : [0.12, 0.35, 0.6];
}

// ─── GLSL Shaders ─────────────────────────────────────────────────────────────

const VERT = `
  precision highp float;
  attribute vec2 aPos;
  varying vec2 vUv;
  void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

const ADVECT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform sampler2D uSrc;
  uniform vec2 texel;
  uniform float dt;
  uniform float dissipation;
  void main() {
    vec2 pos = vUv - dt * texture2D(uVel, vUv).xy * texel;
    gl_FragColor = dissipation * texture2D(uSrc, pos);
  }
`;

const DIVERGENCE = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVel;
  uniform vec2 texel;
  void main() {
    float L = texture2D(uVel, vUv - vec2(texel.x, 0.0)).x;
    float R = texture2D(uVel, vUv + vec2(texel.x, 0.0)).x;
    float B = texture2D(uVel, vUv - vec2(0.0, texel.y)).y;
    float T = texture2D(uVel, vUv + vec2(0.0, texel.y)).y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const PRESSURE = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 texel;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(texel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texel.x, 0.0)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texel.y)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texel.y)).x;
    float D = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - D) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRAD_SUB = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPressure;
  uniform sampler2D uVel;
  uniform vec2 texel;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(texel.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texel.x, 0.0)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texel.y)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texel.y)).x;
    vec2 vel = texture2D(uVel, vUv).xy;
    vel -= vec2(R - L, T - B) * 0.5;
    gl_FragColor = vec4(vel, 0.0, 1.0);
  }
`;

const SPLAT = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform vec2 point;
  uniform vec3 color;
  uniform float radius;
  void main() {
    vec2 p = vUv - point;
    float splat = exp(-dot(p, p) / radius);
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat * color, 1.0);
  }
`;

const DISPLAY = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uDye;
  void main() {
    vec3 c = texture2D(uDye, vUv).rgb;
    gl_FragColor = vec4(c, 1.0);
  }
`;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

function createProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  return prog;
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fbo, tex };
}

function createDoubleFBO(gl: WebGLRenderingContext, w: number, h: number) {
  let a = createFBO(gl, w, h);
  let b = createFBO(gl, w, h);
  return {
    get read() { return a; },
    get write() { return b; },
    swap() { [a, b] = [b, a]; },
  };
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function LiquidEther({
  colors = ['#1e5a96', '#8eb2bb', '#00d4ff'],
  mouseForce = 20,
  cursorSize = 100,
  iterationsPoisson = 16,
  resolution = 0.5,
  autoDemo = false,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  autoResumeDelay = 3000,
  color0,
  color1,
  color2,
}: LiquidEtherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const glRaw = canvas.getContext('webgl', { alpha: false, antialias: false }) as WebGLRenderingContext | null;
    if (!glRaw) return;
    const gl: WebGLRenderingContext = glRaw;

    // ── Size ──────────────────────────────────────────────────────────────────
    function resize() {
      const w = Math.floor(canvas!.clientWidth * resolution);
      const h = Math.floor(canvas!.clientHeight * resolution);
      canvas!.width = w;
      canvas!.height = h;
    }
    resize();

    const W = canvas.width;
    const H = canvas.height;
    const texel: [number, number] = [1 / W, 1 / H];

    // ── Programs ──────────────────────────────────────────────────────────────
    const advectProg = createProgram(gl, VERT, ADVECT);
    const divProg    = createProgram(gl, VERT, DIVERGENCE);
    const pressProg  = createProgram(gl, VERT, PRESSURE);
    const gradProg   = createProgram(gl, VERT, GRAD_SUB);
    const splatProg  = createProgram(gl, VERT, SPLAT);
    const dispProg   = createProgram(gl, VERT, DISPLAY);

    // ── Cache all uniform & attrib locations (avoid per-frame string lookups) ─
    const advectLoc = {
      aPos:         gl.getAttribLocation(advectProg, 'aPos'),
      uVel:         gl.getUniformLocation(advectProg, 'uVel'),
      uSrc:         gl.getUniformLocation(advectProg, 'uSrc'),
      texel:        gl.getUniformLocation(advectProg, 'texel'),
      dt:           gl.getUniformLocation(advectProg, 'dt'),
      dissipation:  gl.getUniformLocation(advectProg, 'dissipation'),
    };
    const divLoc = {
      aPos:  gl.getAttribLocation(divProg, 'aPos'),
      uVel:  gl.getUniformLocation(divProg, 'uVel'),
      texel: gl.getUniformLocation(divProg, 'texel'),
    };
    const pressLoc = {
      aPos:        gl.getAttribLocation(pressProg, 'aPos'),
      texel:       gl.getUniformLocation(pressProg, 'texel'),
      uDivergence: gl.getUniformLocation(pressProg, 'uDivergence'),
      uPressure:   gl.getUniformLocation(pressProg, 'uPressure'),
    };
    const gradLoc = {
      aPos:      gl.getAttribLocation(gradProg, 'aPos'),
      uPressure: gl.getUniformLocation(gradProg, 'uPressure'),
      uVel:      gl.getUniformLocation(gradProg, 'uVel'),
      texel:     gl.getUniformLocation(gradProg, 'texel'),
    };
    const splatLoc = {
      aPos:    gl.getAttribLocation(splatProg, 'aPos'),
      uTarget: gl.getUniformLocation(splatProg, 'uTarget'),
      point:   gl.getUniformLocation(splatProg, 'point'),
      color:   gl.getUniformLocation(splatProg, 'color'),
      radius:  gl.getUniformLocation(splatProg, 'radius'),
    };
    const dispLoc = {
      aPos: gl.getAttribLocation(dispProg, 'aPos'),
      uDye: gl.getUniformLocation(dispProg, 'uDye'),
    };

    // ── Quad geometry ─────────────────────────────────────────────────────────
    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    function bindQuad(aPosLoc: number) {
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(aPosLoc);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);
    }

    // ── FBOs ──────────────────────────────────────────────────────────────────
    const vel      = createDoubleFBO(gl, W, H);
    const dye      = createDoubleFBO(gl, W, H);
    const pressure = createDoubleFBO(gl, W, H);
    const divFBO   = createFBO(gl, W, H);

    // ── Color palette ─────────────────────────────────────────────────────────
    const palette = [
      hexToRgb(color0 ?? colors[0] ?? '#1e5a96'),
      hexToRgb(color1 ?? colors[1] ?? '#8eb2bb'),
      hexToRgb(color2 ?? colors[2] ?? '#00d4ff'),
    ];

    // seed background with first color
    {
      gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
      gl.viewport(0, 0, W, H);
      gl.useProgram(dispProg);
      gl.clearColor(...palette[0], 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      dye.swap();
    }

    // ── Splat helper ──────────────────────────────────────────────────────────
    function splat(x: number, y: number, vx: number, vy: number, colorIdx: number) {
      const radius = (cursorSize / Math.max(W, H)) * 0.5;
      const rgb = palette[colorIdx % palette.length];
      const intensity = mouseForce * 0.0001 * autoIntensity;

      gl.useProgram(splatProg);
      bindQuad(splatLoc.aPos);

      // velocity splat
      gl.bindFramebuffer(gl.FRAMEBUFFER, vel.write.fbo);
      gl.viewport(0, 0, W, H);
      gl.uniform1i(splatLoc.uTarget, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform2f(splatLoc.point, x, y);
      gl.uniform3f(splatLoc.color, vx * intensity, vy * intensity, 0);
      gl.uniform1f(splatLoc.radius, radius * radius);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      vel.swap();

      // dye splat
      gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
      gl.viewport(0, 0, W, H);
      gl.uniform1i(splatLoc.uTarget, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform2f(splatLoc.point, x, y);
      gl.uniform3f(splatLoc.color, rgb[0] * 0.6, rgb[1] * 0.6, rgb[2] * 0.6);
      gl.uniform1f(splatLoc.radius, radius * radius * 1.5);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      dye.swap();
    }

    // ── Mouse tracking (throttled) ─────────────────────────────────────────────
    let lastMouse = { x: 0.5, y: 0.5, moved: false };
    let mouseActive = false;
    let mouseResumeTimer = 0;
    let lastMouseEvent = 0;

    function onMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastMouseEvent < 16) return; // throttle to ~60fps max
      lastMouseEvent = now;

      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      if (mouseActive) {
        const dx = nx - lastMouse.x;
        const dy = ny - lastMouse.y;
        splat(nx, ny, dx * 80, dy * 80, Math.floor(Math.random() * palette.length));
      }
      lastMouse = { x: nx, y: ny, moved: true };
      mouseActive = true;
      clearTimeout(mouseResumeTimer);
      mouseResumeTimer = window.setTimeout(() => { mouseActive = false; }, autoResumeDelay);
    }

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Auto demo ────────────────────────────────────────────────────────────
    let autoT = 0;
    let colorCycle = 0;
    let lastAutoSplat = 0;

    // ── Render loop with frame skip ────────────────────────────────────────────
    let raf = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let paused = false;

    function onVisibilityChange() {
      paused = document.hidden;
      if (!paused && raf === 0) {
        lastTime = performance.now();
        raf = requestAnimationFrame(step);
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    function step() {
      if (paused) {
        raf = 0;
        return;
      }

      raf = requestAnimationFrame(step);
      frameCount++;

      // Skip simulation every other frame — halves GPU load
      // Still renders to screen each frame for smooth display
      const simulate = (frameCount % 2 === 0);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016) * 60 * 0.016;
      lastTime = now;

      if (simulate) {
        // auto demo splats
        if (autoDemo && !mouseActive) {
          autoT += autoSpeed * dt * 0.5;
          if (now - lastAutoSplat > 500 / autoSpeed) {
            lastAutoSplat = now;
            const ax = 0.5 + Math.sin(autoT * 1.1) * 0.35;
            const ay = 0.5 + Math.cos(autoT * 0.7) * 0.35;
            const vx = Math.cos(autoT * 1.3) * autoIntensity;
            const vy = Math.sin(autoT * 0.9) * autoIntensity;
            splat(ax, ay, vx, vy, colorCycle);
            colorCycle = (colorCycle + 1) % palette.length;
          }
        }

        // advect velocity
        gl.useProgram(advectProg);
        gl.bindFramebuffer(gl.FRAMEBUFFER, vel.write.fbo);
        gl.viewport(0, 0, W, H);
        bindQuad(advectLoc.aPos);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
        gl.uniform1i(advectLoc.uVel, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
        gl.uniform1i(advectLoc.uSrc, 1);
        gl.uniform2f(advectLoc.texel, ...texel);
        gl.uniform1f(advectLoc.dt, dt);
        gl.uniform1f(advectLoc.dissipation, 0.98);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        vel.swap();

        // divergence
        gl.useProgram(divProg);
        gl.bindFramebuffer(gl.FRAMEBUFFER, divFBO.fbo);
        gl.viewport(0, 0, W, H);
        bindQuad(divLoc.aPos);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
        gl.uniform1i(divLoc.uVel, 0);
        gl.uniform2f(divLoc.texel, ...texel);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // pressure solve (Jacobi)
        gl.useProgram(pressProg);
        bindQuad(pressLoc.aPos);
        gl.uniform2f(pressLoc.texel, ...texel);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, divFBO.tex);
        gl.uniform1i(pressLoc.uDivergence, 1);
        for (let i = 0; i < iterationsPoisson; i++) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
          gl.viewport(0, 0, W, H);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
          gl.uniform1i(pressLoc.uPressure, 0);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          pressure.swap();
        }

        // gradient subtract
        gl.useProgram(gradProg);
        gl.bindFramebuffer(gl.FRAMEBUFFER, vel.write.fbo);
        gl.viewport(0, 0, W, H);
        bindQuad(gradLoc.aPos);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
        gl.uniform1i(gradLoc.uPressure, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
        gl.uniform1i(gradLoc.uVel, 1);
        gl.uniform2f(gradLoc.texel, ...texel);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        vel.swap();

        // advect dye
        gl.useProgram(advectProg);
        gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
        gl.viewport(0, 0, W, H);
        bindQuad(advectLoc.aPos);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
        gl.uniform1i(advectLoc.uVel, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
        gl.uniform1i(advectLoc.uSrc, 1);
        gl.uniform2f(advectLoc.texel, ...texel);
        gl.uniform1f(advectLoc.dt, dt);
        gl.uniform1f(advectLoc.dissipation, 0.985);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        dye.swap();
      }

      // display (every frame)
      gl.useProgram(dispProg);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      bindQuad(dispLoc.aPos);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform1i(dispLoc.uDye, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      canvas.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      clearTimeout(mouseResumeTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, display: 'block' }}
    />
  );
}
