'use client';

import { useEffect, useRef } from 'react';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : [0.12, 0.35, 0.6];
}

const VERT = `
  precision mediump float;
  attribute vec2 aPos;
  varying vec2 vUv;
  void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uColor;
  uniform float uScale;
  uniform vec2 uMouse;

  float plasma(vec2 p) {
    float v = 0.0;
    v += sin((p.x + uTime) * uScale);
    v += sin((p.y + uTime * 0.7) * uScale);
    v += sin((p.x + p.y + uTime * 0.5) * uScale * 0.7);
    float cx = p.x + 0.5 * sin(uTime * 0.3);
    float cy = p.y + 0.5 * cos(uTime * 0.25);
    v += sin(sqrt(cx * cx + cy * cy + 1.0) * uScale);
    // Mouse influence
    vec2 mp = uMouse - p;
    float md = sqrt(dot(mp, mp));
    v += 0.4 * sin(md * uScale * 2.0 - uTime * 1.5);
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= uRes.x / uRes.y;

    float v = plasma(uv) * 0.2 + 0.5;

    // Build color from base color with luminance variation
    vec3 a = uColor;
    vec3 b = uColor * 1.5 + vec3(0.08, 0.12, 0.18);
    vec3 col = mix(a, b, v);

    // Add subtle shimmer
    float shimmer = 0.06 * sin(uv.x * 8.0 + uTime * 2.0) * cos(uv.y * 8.0 + uTime * 1.5);
    col += shimmer;

    col = clamp(col, 0.0, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Plasma({
  color = '#1e5a96',
  speed = 0.6,
  direction = 'forward',
  scale = 1.1,
  opacity = 0.8,
  mouseInteractive = true,
}: PlasmaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false }) as WebGLRenderingContext | null;
    if (!gl) return;

    const rgb = hexToRgb(color);

    function resize() {
      const w = Math.floor(canvas!.clientWidth * 0.5);
      const h = Math.floor(canvas!.clientHeight * 0.5);
      canvas!.width = w;
      canvas!.height = h;
    }
    resize();

    // Compile shaders
    function mkShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Geometry
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime  = gl.getUniformLocation(prog, 'uTime');
    const uRes   = gl.getUniformLocation(prog, 'uRes');
    const uColor = gl.getUniformLocation(prog, 'uColor');
    const uScale = gl.getUniformLocation(prog, 'uScale');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    gl.uniform3f(uColor, rgb[0], rgb[1], rgb[2]);
    gl.uniform1f(uScale, scale);

    // Mouse
    let mx = 0, my = 0;
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      my = ((e.clientY - rect.top) / rect.height) * -2 + 1;
      my *= canvas!.clientHeight / canvas!.clientWidth;
    }
    if (mouseInteractive) canvas.addEventListener('mousemove', onMove);

    // Render
    const sign = direction === 'forward' ? 1 : -1;
    let raf = 0;
    let startT = performance.now();

    function frame() {
      const t = ((performance.now() - startT) / 1000) * speed * sign;
      resize();
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mouseInteractive ? mx : 0, mouseInteractive ? my : 0);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (mouseInteractive) canvas.removeEventListener('mousemove', onMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        display: 'block',
        opacity,
      }}
    />
  );
}
