export type LocalizedText = {
  en: string;
  ar: string;
};

export type DownloadAsset = {
  label: LocalizedText;
  url: string;
};

export type ProductModel = {
  slug: string;
  lineSlug: string;
  lineName: LocalizedText;
  modelName: string;
  image: string;
  imagePosition?: string;
  gallery?: string[];
  officialPage: string;
  installationType: LocalizedText;
  coverageAreaM2?: string;
  coverageVolumeM3?: string;
  airflowM3h?: string;
  powerConsumptionW?: string;
  dimensionsMm?: string;
  weightKg?: string;
  voltage?: string;
  certifications: string[];
  downloads: DownloadAsset[];
  notes?: LocalizedText;
};

export type ProductLine = {
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  image: string;
  imagePosition?: string;
  officialPage: string;
  downloads: DownloadAsset[];
};

export type CertificationItem = {
  id: string;
  name: LocalizedText;
  summary: LocalizedText;
  logo: string;
  officialPage: string;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};

export type InstallationGroup = {
  id: string;
  title: LocalizedText;
  items: LocalizedText[];
};

export type PathogenGroup = {
  id: string;
  title: LocalizedText;
  items: LocalizedText[];
  note?: LocalizedText;
};

export const jonixOfficialLogo =
  'https://jonixair.com/images/custom/logo_internal.png';

export const partnerLogo =
  'https://www.jonixair.ie/cdn/shop/files/ZXCXZC_1200x1200.png?v=1631510041';

export const technologyHighlights: LocalizedText[] = [
  {
    en: 'Jonix devices continuously decontaminate air and exposed surfaces through patented Non-Thermal Plasma technology.',
    ar: 'تُزيل أجهزة Jonix التلوث من الهواء والأسطح المكشوفة بشكل مستمر عبر تقنية البلازما غير الحرارية المسجلة ببراءة اختراع.',
  },
  {
    en: 'Activated air contains reactive species that attack pollutants and microorganisms with biocidal and virucidal action.',
    ar: 'الهواء المُنشّط يحتوي على أنواع تفاعلية تهاجم الملوثات والكائنات الدقيقة بفعالية مبيدة للبكتيريا والفيروسات.',
  },
  {
    en: 'Cold plasma is generated at room temperature and can operate safely in occupied indoor spaces.',
    ar: 'تتولد البلازما الباردة عند درجة حرارة الغرفة ويمكن تشغيلها بأمان داخل المساحات المأهولة.',
  },
  {
    en: 'The process does not rely on residual chemical disinfectants and is designed for continuous operation.',
    ar: 'لا تعتمد العملية على مطهرات كيميائية متبقية وهي مصممة للتشغيل المستمر.',
  },
];

export const certifiedPerformance: LocalizedText[] = [
  {
    en: 'Up to 99.99% pollutant reduction is published for Cube line tests depending on environment and usage.',
    ar: 'تُظهر اختبارات خط Cube خفضًا للملوثات حتى 99.99% حسب ظروف البيئة وطريقة الاستخدام.',
  },
  {
    en: 'Padua University Molecular Medicine test reports 99.9999% SARS-CoV-2 viral load reduction on tested device.',
    ar: 'اختبار قسم الطب الجزيئي بجامعة بادوفا يوضح خفض الحمل الفيروسي لـ SARS-CoV-2 بنسبة 99.9999% للجهاز المختبَر.',
  },
  {
    en: 'Bio-Safe protocol validation reports pollutant reduction and indoor environmental comfort certification.',
    ar: 'اعتماد بروتوكول Bio-Safe يثبت تقليل الملوثات ويمنح شهادة جودة صحية للبيئة الداخلية.',
  },
  {
    en: 'CEAM Valencia testing reported no harmful by-products generated from VOCs in tested conditions.',
    ar: 'اختبارات مركز CEAM في فالنسيا أشارت إلى عدم توليد نواتج ضارة من المركبات العضوية المتطايرة ضمن ظروف الاختبار.',
  },
  {
    en: 'Egypt field report (City Star) provided by local partner cites verified particle reduction and no microbial growth in sampled surfaces.',
    ar: 'التقرير الميداني في مصر (City Star) المقدم من الشريك المحلي يشير إلى خفض مؤكد للجسيمات وعدم وجود نمو ميكروبي في عينات الأسطح.',
  },
];

export const productLines: ProductLine[] = [
  {
    slug: 'cube-line',
    name: { en: 'Cube Line', ar: 'خط Cube' },
    shortDescription: {
      en: 'Portable and professional compact units for homes, offices and hospitality spaces.',
      ar: 'وحدات مدمجة متنقلة ومهنية للمنازل والمكاتب وقطاعات الضيافة.',
    },
    image: 'https://jonixair.com/images/cube/cube-pro.jpg',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/cubeline',
    downloads: [
      {
        label: { en: 'Brochure Cube Professional', ar: 'بروشور Cube Professional' },
        url: 'https://cms.bconsole.com/documents/1636983774-pagesJX65GR0007_JONIX_CUBE_professional_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'EU Declaration - Jonix Cube', ar: 'إقرار المطابقة الأوروبي - Jonix Cube' },
        url: 'https://cms.bconsole.com/documents/1708601341-pagesConformit%C3%A0%20CUBE_ENG.pdf/jonix-air/',
      },
      {
        label: { en: 'EU Declaration - Cube Professional', ar: 'إقرار المطابقة الأوروبي - Cube Professional' },
        url: 'https://cms.bconsole.com/documents/1708601349-pagesConformit%C3%A0%20CUBE_Professional_ENG.pdf/jonix-air/',
      },
    ],
  },
  {
    slug: 'mate-line',
    name: { en: 'Mate Line', ar: 'خط Mate' },
    shortDescription: {
      en: 'Professional mobile filtration and sanitization systems with multi-stage operation.',
      ar: 'أنظمة ترشيح وتعقيم متنقلة احترافية تعمل بمراحل متعددة.',
    },
    image: 'https://jonixair.com/images/minimate/joinx-mate-minimate-plus.jpg',
    imagePosition: '50% 30%',
    officialPage: 'https://jonixair.com/en/products/mate-minimate',
    downloads: [
      {
        label: { en: 'Minimate Brochure', ar: 'بروشور Minimate' },
        url: 'https://cms.bconsole.com/documents/1647429866-pagesJONIX_MINIMATE_basic_plus_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'Mate Brochure', ar: 'بروشور Mate' },
        url: 'https://cms.bconsole.com/documents/1647429866-pagesJONIX_MATE_basic_plus_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'Micromate Brochure', ar: 'بروشور Micromate' },
        url: 'https://cms.bconsole.com/documents/1648732778-pagesJX65GR0030_JONIX_MICROMATE_basic_plus_EN_web.pdf/jonix-air/',
      },
    ],
  },
  {
    slug: 'steel-line',
    name: { en: 'Steel Line', ar: 'خط Steel' },
    shortDescription: {
      en: 'Stainless steel wall and ceiling units for professional and commercial environments.',
      ar: 'وحدات ستانلس ستيل للتركيب الجداري أو السقفي في البيئات المهنية والتجارية.',
    },
    image: 'https://jonixair.com/images/steel/steel-ltl-2.jpg',
    imagePosition: '50% 42%',
    officialPage: 'https://jonixair.com/en/products/steel',
    downloads: [
      {
        label: { en: 'EU Declaration - Jonix Steel', ar: 'إقرار المطابقة الأوروبي - Jonix Steel' },
        url: 'https://cms.bconsole.com/documents/1677683413-pagesConformit%C3%A0%20STEEL_ENG.pdf/jonix-air/',
      },
      {
        label: { en: 'Steel Brochure', ar: 'بروشور Steel' },
        url: 'https://cms.bconsole.com/documents/1677687198-pagesJX65GR0009_JONIX_STEEL_food_EN_web.pdf/jonix-air/',
      },
    ],
  },
  {
    slug: 'inside-line',
    name: { en: 'Inside (DUCT/FANCOIL/UC/AHU)', ar: 'Inside (DUCT/FANCOIL/UC/AHU)' },
    shortDescription: {
      en: 'In-duct and AHU sanitization modules to protect internal air distribution surfaces.',
      ar: 'وحدات تعقيم داخلية لمجاري الهواء ووحدات المعالجة لحماية الأسطح الداخلية لشبكات التوزيع.',
    },
    image: 'https://jonixair.com/images/inside/inside-big-1.jpg',
    imagePosition: '50% 48%',
    officialPage: 'https://jonixair.com/en/products/inside',
    downloads: [
      {
        label: { en: 'Inside DUCT Brochure', ar: 'بروشور Inside DUCT' },
        url: 'https://cms.bconsole.com/documents/1653919304-pagesJX65GR0008_JONIX_inside_DUCT_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'EU Declaration - Inside Line', ar: 'إقرار المطابقة الأوروبي - Inside Line' },
        url: 'https://cms.bconsole.com/documents/1677682550-pagesConformit%C3%A0%20DUCT_ENG%20.pdf/jonix-air/',
      },
      {
        label: { en: 'JONIX VMC Brochure', ar: 'بروشور JONIX VMC' },
        url: 'https://cms.bconsole.com/documents/1619340242-pagesJONIX%20VMC_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'VMC User Manual', ar: 'دليل المستخدم VMC' },
        url: 'https://cms.bconsole.com/documents/1622185907-pagesJX61GR0006_Manuale_JONIX_VMC_EN_web.pdf/jonix-air/',
      },
    ],
  },
  {
    slug: 'jonix-up-in',
    name: { en: 'Jonix Up IN', ar: 'Jonix Up IN' },
    shortDescription: {
      en: 'Compact continuous sanitization unit for lifts, cubicles and small high-traffic spaces.',
      ar: 'وحدة تعقيم مستمر مدمجة للمصاعد والكبائن والمساحات الصغيرة عالية الحركة.',
    },
    image: 'https://jonixair.com/images/up-in/jonix-up-in.png',
    imagePosition: '50% 40%',
    officialPage: 'https://jonixair.com/en/products/jonix-up-in',
    downloads: [
      {
        label: { en: 'Up IN Brochure', ar: 'بروشور Up IN' },
        url: 'https://cms.bconsole.com/documents/1653919704-pagesJX65GR0019_JONIX_upIN_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'EU Declaration - Jonix Up IN', ar: 'إقرار المطابقة الأوروبي - Jonix Up IN' },
        url: 'https://cms.bconsole.com/documents/1677682879-pagesConformit%C3%A0%20JONIX%20UP%20IN_ENG.pdf/jonix-air/',
      },
    ],
  },
  {
    slug: 'vmc-4people',
    name: { en: 'VMC 4people', ar: 'VMC 4people' },
    shortDescription: {
      en: 'Double-flow mechanical ventilation with heat recovery, filtration and plasma sanitization.',
      ar: 'تهوية ميكانيكية مزدوجة التدفق مع استرجاع حرارة وترشيح وتعقيم بالبلازما.',
    },
    image: 'https://cms.bconsole.com/image/960/825/1652358124-pagesjonix-vmc.png/jonix-air',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/vmc4people',
    downloads: [
      {
        label: { en: 'VMC 4people Brochure', ar: 'بروشور VMC 4people' },
        url: 'https://cms.bconsole.com/documents/1652260271-pagesJONIX_vmc4people_basic_plus_EN_web.pdf/jonix-air/',
      },
      {
        label: { en: 'VDI Certification 6022', ar: 'شهادة VDI 6022' },
        url: 'https://cms.bconsole.com/documents/1666190127-pages2022-09-27%20-%20JONIX%20VMC%20-%20VDI%206022.pdf/jonix-air/',
      },
    ],
  },
  {
    slug: 'climate-line',
    name: { en: 'Full Control - Climate Line', ar: 'Full Control - Climate Line' },
    shortDescription: {
      en: 'Air-to-air heat pump systems integrating cooling, heating, deodorization and NTP sanitization.',
      ar: 'أنظمة مضخات حرارية هواء-هواء تجمع بين التبريد والتدفئة وإزالة الروائح وتعقيم NTP.',
    },
    image: 'https://jonixair.com/images/climate/climate-big-1.png',
    imagePosition: '50% 50%',
    officialPage: 'https://jonixair.com/en/products/full-control-climate-line',
    downloads: [
      {
        label: { en: 'JONIX Climate Brochure', ar: 'بروشور JONIX Climate' },
        url: 'https://cms.bconsole.com/documents/Brochure%20JONIX%20CLIMATE%20EN.pdf/jonix-air/',
      },
      {
        label: { en: 'Use & Maintenance Manual', ar: 'دليل الاستخدام والصيانة' },
        url: 'https://cms.bconsole.com/documents/Manuale.pdf/jonix-air/',
      },
    ],
  },
];

export const productModels: ProductModel[] = [
  {
    slug: 'cube-iot',
    lineSlug: 'cube-line',
    lineName: { en: 'Cube Line', ar: 'خط Cube' },
    modelName: 'Cube IOT',
    image: 'https://jonixair.com/images/cube/cube-little-b.jpg',
    imagePosition: '50% 38%',
    officialPage: 'https://jonixair.com/en/products/cubeline',
    installationType: {
      en: 'Portable / stand-alone',
      ar: 'محمول / مستقل',
    },
    coverageAreaM2: '85 m²',
    airflowM3h: '40',
    powerConsumptionW: '10 W',
    dimensionsMm: '238 L x 238 P x 260 H',
    weightKg: '4',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [
      productLines[0].downloads[1],
      productLines[0].downloads[2],
    ],
  },
  {
    slug: 'cube',
    lineSlug: 'cube-line',
    lineName: { en: 'Cube Line', ar: 'خط Cube' },
    modelName: 'Cube',
    image: 'https://jonixair.com/images/cube/cube-little-w.jpg',
    imagePosition: '50% 38%',
    officialPage: 'https://jonixair.com/en/products/cubeline',
    installationType: {
      en: 'Portable / stand-alone',
      ar: 'محمول / مستقل',
    },
    coverageAreaM2: '85 m²',
    airflowM3h: '40',
    powerConsumptionW: '10 W',
    dimensionsMm: '238 L x 238 P x 260 H',
    weightKg: '4',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [
      productLines[0].downloads[1],
      productLines[0].downloads[2],
    ],
  },
  {
    slug: 'cube-professional',
    lineSlug: 'cube-line',
    lineName: { en: 'Cube Line', ar: 'خط Cube' },
    modelName: 'Cube Professional',
    image: 'https://jonixair.com/images/cube/cube-pro.jpg',
    imagePosition: '50% 36%',
    officialPage: 'https://jonixair.com/en/products/cubeline',
    installationType: {
      en: 'Portable / wall-fix option',
      ar: 'محمول / مع خيار تثبيت جداري',
    },
    coverageAreaM2: '85 m²',
    airflowM3h: '40',
    powerConsumptionW: '10 W',
    dimensionsMm: '215 L x 215 P x 260 H',
    weightKg: '2.8',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [
      productLines[0].downloads[0],
      productLines[0].downloads[2],
    ],
  },
  {
    slug: 'micromate-basic-plus',
    lineSlug: 'mate-line',
    lineName: { en: 'Mate Line', ar: 'خط Mate' },
    modelName: 'MICROMATE BASIC E PLUS',
    image: 'https://jonixair.com/images/minimate/joinx-mate-micromate.jpg',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/mate-minimate',
    installationType: {
      en: 'Mobile floor unit',
      ar: 'وحدة أرضية متحركة',
    },
    airflowM3h: '200-400',
    powerConsumptionW: '345 (basic); 360 (plus)',
    dimensionsMm: '720 x 400 x 860',
    weightKg: '50',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[1].downloads[2]],
  },
  {
    slug: 'minimate-basic-plus',
    lineSlug: 'mate-line',
    lineName: { en: 'Mate Line', ar: 'خط Mate' },
    modelName: 'MINIMATE BASIC E PLUS',
    image: 'https://jonixair.com/images/minimate/joinx-mate-minimate-plus.jpg',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/mate-minimate',
    installationType: {
      en: 'Mobile floor unit',
      ar: 'وحدة أرضية متحركة',
    },
    airflowM3h: '400-1200',
    powerConsumptionW: '594',
    dimensionsMm: '560 L x 460 P x 1060 H',
    weightKg: '71',
    voltage: '230 V /~1/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[1].downloads[0]],
  },
  {
    slug: 'mate-basic-plus',
    lineSlug: 'mate-line',
    lineName: { en: 'Mate Line', ar: 'خط Mate' },
    modelName: 'MATE BASIC E PLUS',
    image: 'https://jonixair.com/images/minimate/joinx-mate-basic.jpg',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/mate-minimate',
    installationType: {
      en: 'Mobile floor unit',
      ar: 'وحدة أرضية متحركة',
    },
    airflowM3h: '500-3000',
    powerConsumptionW: '800',
    dimensionsMm: '678 L x 700 P x 1941 H',
    weightKg: '175',
    voltage: '230 V /~1/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[1].downloads[1]],
  },
  {
    slug: 'maximate',
    lineSlug: 'mate-line',
    lineName: { en: 'Mate Line', ar: 'خط Mate' },
    modelName: 'MAXIMATE',
    image: 'https://jonixair.com/images/minimate/joinx-mate-maxi-mate.jpg',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/mate-minimate',
    installationType: {
      en: 'Mobile floor unit',
      ar: 'وحدة أرضية متحركة',
    },
    airflowM3h: '1500-6000',
    powerConsumptionW: '2800',
    dimensionsMm: '1305 L x 715 P x 2165 H',
    weightKg: '220',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[1].downloads[1]],
  },
  {
    slug: 'steel-1c',
    lineSlug: 'steel-line',
    lineName: { en: 'Steel Line', ar: 'خط Steel' },
    modelName: 'STEEL 1C',
    image: 'https://jonixair.com/images/steel/steel-ltl-1.jpg',
    imagePosition: '50% 40%',
    officialPage: 'https://jonixair.com/en/products/steel',
    installationType: {
      en: 'Wall/Ceiling',
      ar: 'جداري/سقفي',
    },
    coverageVolumeM3: '105 m³',
    airflowM3h: '160',
    powerConsumptionW: '33',
    dimensionsMm: '190 L x 150 P x 375 H',
    weightKg: '5',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[2].downloads[0], productLines[2].downloads[1]],
    notes: {
      en: 'Official page publishes room volume (m³), not area in m² for Steel models.',
      ar: 'الصفحة الرسمية تنشر حجم الغرفة بالمتر المكعب (m³) وليس المساحة بالمتر المربع (m²) لموديلات Steel.',
    },
  },
  {
    slug: 'steel-2c',
    lineSlug: 'steel-line',
    lineName: { en: 'Steel Line', ar: 'خط Steel' },
    modelName: 'STEEL 2C',
    image: 'https://jonixair.com/images/steel/steel-ltl-2.jpg',
    imagePosition: '50% 40%',
    officialPage: 'https://jonixair.com/en/products/steel',
    installationType: {
      en: 'Wall/Ceiling',
      ar: 'جداري/سقفي',
    },
    coverageVolumeM3: '200 m³',
    airflowM3h: '160',
    powerConsumptionW: '36',
    dimensionsMm: '320 L x 260 P x 400 H',
    weightKg: '9',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[2].downloads[0], productLines[2].downloads[1]],
  },
  {
    slug: 'steel-4c',
    lineSlug: 'steel-line',
    lineName: { en: 'Steel Line', ar: 'خط Steel' },
    modelName: 'STEEL 4C',
    image: 'https://jonixair.com/images/steel/steel-ltl-2.jpg',
    imagePosition: '50% 40%',
    officialPage: 'https://jonixair.com/en/products/steel',
    installationType: {
      en: 'Wall/Ceiling',
      ar: 'جداري/سقفي',
    },
    coverageVolumeM3: '500 m³',
    airflowM3h: '160',
    powerConsumptionW: '37',
    dimensionsMm: '320 L x 260 P x 400 H',
    weightKg: '9',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[2].downloads[0], productLines[2].downloads[1]],
  },
  {
    slug: 'steel-2f',
    lineSlug: 'steel-line',
    lineName: { en: 'Steel Line', ar: 'خط Steel' },
    modelName: 'STEEL 2F',
    image: 'https://jonixair.com/images/steel/steel-ltl-3.jpg',
    imagePosition: '50% 40%',
    officialPage: 'https://jonixair.com/en/products/steel',
    installationType: {
      en: 'Wall/Ceiling',
      ar: 'جداري/سقفي',
    },
    coverageVolumeM3: '1000 m³',
    airflowM3h: '320',
    powerConsumptionW: '65',
    dimensionsMm: '310 L x 260 P x 750 H',
    weightKg: '14',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[2].downloads[0], productLines[2].downloads[1]],
  },
  {
    slug: 'steel-4f',
    lineSlug: 'steel-line',
    lineName: { en: 'Steel Line', ar: 'خط Steel' },
    modelName: 'STEEL 4F',
    image: 'https://jonixair.com/images/steel/steel-ltl-3.jpg',
    imagePosition: '50% 40%',
    officialPage: 'https://jonixair.com/en/products/steel',
    installationType: {
      en: 'Wall/Ceiling',
      ar: 'جداري/سقفي',
    },
    coverageVolumeM3: '2000 m³',
    airflowM3h: '320',
    powerConsumptionW: '67',
    dimensionsMm: '310 L x 260 P x 750 H',
    weightKg: '15',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[2].downloads[0], productLines[2].downloads[1]],
  },
  {
    slug: 'duct-70mic2c',
    lineSlug: 'inside-line',
    lineName: { en: 'Inside Line', ar: 'خط Inside' },
    modelName: 'DUCT 70MIC2C',
    image: 'https://jonixair.com/images/duct/duct-1.jpg',
    imagePosition: '50% 45%',
    officialPage: 'https://jonixair.com/en/products/inside',
    installationType: {
      en: 'HVAC Duct Integration',
      ar: 'تركيب داخل مجاري التكييف',
    },
    airflowM3h: '500',
    powerConsumptionW: '10',
    dimensionsMm: '290 L x 350 P x 200 H',
    weightKg: '4',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[3].downloads[0], productLines[3].downloads[1]],
  },
  {
    slug: 'duct-70mic4c',
    lineSlug: 'inside-line',
    lineName: { en: 'Inside Line', ar: 'خط Inside' },
    modelName: 'DUCT 70MIC4C',
    image: 'https://jonixair.com/images/duct/duct-3.jpg',
    imagePosition: '50% 45%',
    officialPage: 'https://jonixair.com/en/products/inside',
    installationType: {
      en: 'HVAC Duct Integration',
      ar: 'تركيب داخل مجاري التكييف',
    },
    airflowM3h: '1000',
    powerConsumptionW: '20',
    dimensionsMm: '290 L x 350 P x 200 H',
    weightKg: '5',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[3].downloads[0], productLines[3].downloads[1]],
  },
  {
    slug: 'duct-70mic2f',
    lineSlug: 'inside-line',
    lineName: { en: 'Inside Line', ar: 'خط Inside' },
    modelName: 'DUCT 70MIC2F',
    image: 'https://jonixair.com/images/duct/duct-2.jpg',
    imagePosition: '50% 45%',
    officialPage: 'https://jonixair.com/en/products/inside',
    installationType: {
      en: 'HVAC Duct Integration',
      ar: 'تركيب داخل مجاري التكييف',
    },
    airflowM3h: '2000',
    powerConsumptionW: '20',
    dimensionsMm: '290 L x 350 P x 700 H',
    weightKg: '5',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[3].downloads[0], productLines[3].downloads[1]],
  },
  {
    slug: 'duct-70mic4f',
    lineSlug: 'inside-line',
    lineName: { en: 'Inside Line', ar: 'خط Inside' },
    modelName: 'DUCT 70MIC4F',
    image: 'https://jonixair.com/images/duct/duct-4.jpg',
    imagePosition: '50% 45%',
    officialPage: 'https://jonixair.com/en/products/inside',
    installationType: {
      en: 'HVAC Duct Integration',
      ar: 'تركيب داخل مجاري التكييف',
    },
    airflowM3h: '4000',
    powerConsumptionW: '40',
    dimensionsMm: '290 L x 350 P x 700 H',
    weightKg: '6',
    voltage: '230 V /~/ 50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[3].downloads[0], productLines[3].downloads[1]],
  },
  {
    slug: 'jonix-up-in-model',
    lineSlug: 'jonix-up-in',
    lineName: { en: 'Jonix Up IN', ar: 'Jonix Up IN' },
    modelName: 'JONIX UP IN',
    image: 'https://jonixair.com/images/up-in/jonix-up-in.png',
    imagePosition: '50% 42%',
    officialPage: 'https://jonixair.com/en/products/jonix-up-in',
    installationType: {
      en: 'Wall or ceiling mounted',
      ar: 'تركيب جداري أو سقفي',
    },
    airflowM3h: '35 - 60 - 90',
    powerConsumptionW: '16 - 21 - 27',
    dimensionsMm: '300 x 300 x 90',
    weightKg: '4.5',
    voltage: '230 V / ~ 1/50 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[4].downloads[0], productLines[4].downloads[1]],
  },
  {
    slug: 'vmc-4people-basic-plus',
    lineSlug: 'vmc-4people',
    lineName: { en: 'VMC 4people', ar: 'VMC 4people' },
    modelName: 'VMC 4people basic e plus',
    image: 'https://cms.bconsole.com/image/960/825/1652358124-pagesjonix-vmc.png/jonix-air',
    imagePosition: '50% 34%',
    officialPage: 'https://jonixair.com/en/products/vmc4people',
    installationType: {
      en: 'Ceiling-mounted mechanical ventilation',
      ar: 'تهوية ميكانيكية مثبتة بالسقف',
    },
    airflowM3h: '500',
    powerConsumptionW: '299 (value published without label on official EN page)',
    dimensionsMm: '1370 x 650 x 450',
    weightKg: '71',
    voltage: '230V /1 ~/ 50-60 Hz',
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP', 'VDI 6022'],
    downloads: [productLines[5].downloads[0], productLines[5].downloads[1]],
    notes: {
      en: 'The official EN page prints the power row label as "??label_massima_assorbita??" with value 299.',
      ar: 'الصفحة الإنجليزية الرسمية تعرض خانة القدرة بعنوان غير مكتمل "??label_massima_assorbita??" والقيمة 299.',
    },
  },
  {
    slug: 'jonix-climate',
    lineSlug: 'climate-line',
    lineName: { en: 'Full Control - Climate Line', ar: 'Full Control - Climate Line' },
    modelName: 'JONIX CLIMATE',
    image: 'https://jonixair.com/images/climate/climate-big-1.png',
    imagePosition: '50% 50%',
    officialPage: 'https://jonixair.com/en/products/full-control-climate-line',
    installationType: {
      en: 'External + internal split system for industrial/commercial spaces',
      ar: 'نظام خارجي + داخلي للمنشآت الصناعية والتجارية',
    },
    certifications: ['CE Marking', 'Bio-Safe', 'Ongreening/ProductMAP'],
    downloads: [productLines[6].downloads[0], productLines[6].downloads[1]],
    notes: {
      en: 'Detailed model-level technical values are not listed on the public page and are provided via brochure/manual.',
      ar: 'القيم الفنية التفصيلية على مستوى الموديل غير منشورة في الصفحة العامة ويتم توفيرها عبر البروشور والدليل.',
    },
  },
];

export const certifications: CertificationItem[] = [
  {
    id: 'ce-marking',
    name: { en: 'CE Marking', ar: 'علامة CE' },
    summary: {
      en: 'Products compliant with EU regulations through declaration of conformity/performance.',
      ar: 'توافق المنتجات مع تشريعات الاتحاد الأوروبي عبر إقرار المطابقة/الأداء.',
    },
    logo: 'https://jonixair.com/images/certificazioni/jonix-certificazione-ce.png',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'tuv-proficert',
    name: { en: 'TUV PROFiCERT - Product', ar: 'شهادة TUV PROFiCERT - Product' },
    summary: {
      en: 'Independent audit of dossier reliability, maintenance traceability and declared product performance.',
      ar: 'تدقيق مستقل لموثوقية الملفات الفنية وتتبع الصيانة وصحة الأداء المعلن للمنتج.',
    },
    logo: 'https://cms.bconsole.com/image/0/0/1567174995-pages1.png/jonix-air',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'bio-safe',
    name: { en: 'Bio-Safe Validation', ar: 'اعتماد Bio-Safe' },
    summary: {
      en: 'Validated pollutant reduction through test chamber and environmental sampling protocols.',
      ar: 'اعتماد تقليل الملوثات عبر بروتوكولات اختبارات غرف القياس وأخذ عينات بيئية.',
    },
    logo: 'https://cms.bconsole.com/image/0/0/jonix-certificazione-biosafe.png/jonix-air',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'ongreening-productmap',
    name: { en: 'Ongreening & ProductMAP', ar: 'Ongreening و ProductMAP' },
    summary: {
      en: 'Inclusion in sustainability-focused ProductMAP material database and green building criteria mapping.',
      ar: 'إدراج في قاعدة ProductMAP الخاصة بالاستدامة وربط بمعايير المباني الخضراء.',
    },
    logo: 'https://cms.bconsole.com/image/0/0/Ongreening.png/jonix-air',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'horizon-2020',
    name: { en: 'Seal of Excellence - Horizon 2020', ar: 'Seal of Excellence - Horizon 2020' },
    summary: {
      en: 'European Commission recognition for the JONIXAirPlasma innovation project quality.',
      ar: 'اعتماد من المفوضية الأوروبية لجودة مشروع الابتكار JONIXAirPlasma.',
    },
    logo: 'https://jonixair.com/images/certificazioni/jonix-co-founded-horizon-2020.png',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'padua-sars-cov-2-test',
    name: {
      en: 'Padua University - SARS-CoV-2 Test',
      ar: 'جامعة بادوفا - اختبار SARS-CoV-2',
    },
    summary: {
      en: 'Reported antiviral activity on tested Jonix CUBE device with viral load reduction equal to 99.9999%.',
      ar: 'تقرير بفعالية مضادة للفيروسات على جهاز Jonix CUBE المختبَر مع خفض حمل فيروسي بنسبة 99.9999%.',
    },
    logo: 'https://cms.bconsole.com/image/0/0/1568017161-pages1.png/jonix-air',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'ceam-voc-byproducts',
    name: {
      en: 'CEAM Valencia - VOC By-product Test',
      ar: 'CEAM فالنسيا - اختبار نواتج VOC',
    },
    summary: {
      en: 'Lab report on tested Jonix CUBE conditions indicating no harmful chemical by-products from VOCs.',
      ar: 'تقرير مختبري لظروف اختبار Jonix CUBE يوضح عدم وجود نواتج كيميائية ضارة من VOCs.',
    },
    logo: 'https://cms.bconsole.com/image/0/0/1700844588-pageslogo-ceam.png/jonix-air',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'ain-shams-egypt',
    name: {
      en: 'Ain Shams University - Egypt (Regional Validation)',
      ar: 'جامعة عين شمس - مصر (تحقق إقليمي)',
    },
    summary: {
      en: 'Regional certification evidence for Egypt provided by local documentation and requested for MENA project context.',
      ar: 'مرجع تحقق إقليمي للسوق المصري وفق مستندات محلية مطلوبة ضمن سياق مشروع الشرق الأوسط.',
    },
    logo: 'https://jonixair.com/images/custom/logo_internal.png',
    officialPage: 'https://jonixair.com/en/certifications',
  },
];

export const standardsReferences: CertificationItem[] = [
  {
    id: 'iso-14644-reference',
    name: { en: 'ISO 14644 (Referenced Standard)', ar: 'ISO 14644 (معيار مرجعي)' },
    summary: {
      en: 'Referenced in the Egypt City Star field report for clean-air particle evaluation methodology.',
      ar: 'مذكور في تقرير City Star الميداني بمصر كمرجع لمنهجية تقييم الجسيمات وجودة الهواء.',
    },
    logo: 'https://jonixair.com/images/custom/logo_internal.png',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'who-reference',
    name: { en: 'WHO Guidance (Referenced)', ar: 'إرشادات WHO (مرجع)' },
    summary: {
      en: 'WHO references are cited in regional test documentation for benchmark comparison and indoor safety context.',
      ar: 'تمت الإشارة إلى مراجع WHO في وثائق الاختبارات الإقليمية للمقارنة المرجعية وسياق السلامة الداخلية.',
    },
    logo: 'https://jonixair.com/images/custom/logo_internal.png',
    officialPage: 'https://jonixair.com/en/certifications',
  },
  {
    id: 'cdc-reference',
    name: { en: 'CDC Guidance (Referenced)', ar: 'إرشادات CDC (مرجع)' },
    summary: {
      en: 'CDC references are cited in local field reporting context related to microbial control frameworks.',
      ar: 'تمت الإشارة إلى مراجع CDC في سياق التقارير الميدانية المحلية الخاصة بأطر التحكم الميكروبي.',
    },
    logo: 'https://jonixair.com/images/custom/logo_internal.png',
    officialPage: 'https://jonixair.com/en/certifications',
  },
];

export const installationsNow: LocalizedText[] = [
  {
    en: 'Cardiology institute installations in active healthcare environments.',
    ar: 'تركيبات فعالة داخل معاهد القلب وبيئات الرعاية الصحية المتخصصة.',
  },
  {
    en: 'Dental clinics and medical centers currently using Jonix sanitization systems.',
    ar: 'عيادات الأسنان والمراكز الطبية تستخدم حالياً أنظمة التعقيم من Jonix.',
  },
  {
    en: 'Retirement homes and nursing facilities, including UK nursing-home references.',
    ar: 'دور الرعاية ومرافق كبار السن، مع مراجع تشغيل في دور رعاية بالمملكة المتحدة.',
  },
  {
    en: 'Commercial and professional spaces operating with wall, mobile and HVAC-integrated models.',
    ar: 'مساحات تجارية ومهنية تعمل بموديلات جدارية ومتنقلة ومتكاملة مع التكييف.',
  },
];

export const egyptAuthorization: LocalizedText[] = [
  {
    en: 'Class-A International is presented as the exclusive commercial partner in Egypt for sales and support.',
    ar: 'يتم تقديم Class-A International كشريك تجاري حصري في مصر للمبيعات وخدمات الدعم.',
  },
  {
    en: 'Authorized channel deployment supports compliant installation, warranty alignment and technical service continuity.',
    ar: 'الاعتماد على القناة المعتمدة يدعم التركيب المطابق للمواصفات وتوافق الضمان واستمرارية الخدمة الفنية.',
  },
];

export const egyptFieldValidation: LocalizedText[] = [
  {
    en: 'Egypt City Star report: no microbial growth in sampled surfaces after operation period.',
    ar: 'تقرير City Star في مصر: عدم وجود نمو ميكروبي في عينات الأسطح بعد فترة التشغيل.',
  },
  {
    en: 'Verified reduction in airborne particle concentration with ISO 14644 reference noted in report context.',
    ar: 'تحقق من انخفاض تركيز الجسيمات المحمولة بالهواء مع الإشارة إلى ISO 14644 ضمن سياق التقرير.',
  },
  {
    en: 'Field report context references WHO and CDC frameworks for comparison and hygiene benchmarks.',
    ar: 'سياق التقرير الميداني يشير إلى أطر WHO وCDC للمقارنة المرجعية ومعايير النظافة.',
  },
];

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', url: 'https://it.linkedin.com/company/jonix-srl' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/jonixarabia' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/jonixarabia' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@jonixarabia' },
];

export const installationGroups: InstallationGroup[] = [
  {
    id: 'healthcare-dental-europe',
    title: {
      en: 'Healthcare / Dental Installations',
      ar: 'تركيبات الرعاية الصحية وعيادات الأسنان',
    },
    items: [
      { en: 'Italy: De Martino Cardiological Institute, Pagani (Salerno)', ar: 'إيطاليا: معهد De Martino لأمراض القلب، باغاني (ساليرنو)' },
      { en: 'Italy: Doctor Garofalo Dental Clinic, Catanzaro', ar: 'إيطاليا: عيادة د. Garofalo لطب الأسنان، كاتانزارو' },
      { en: 'Italy: Doctor Randon Dental Clinic, Dueville (Vicenza)', ar: 'إيطاليا: عيادة د. Randon لطب الأسنان، Dueville (فيتشنزا)' },
      { en: 'Italy: Medical Centre Doctor Maesani, Conscenti (Genova)', ar: 'إيطاليا: المركز الطبي د. Maesani، Conscenti (جنوة)' },
      { en: 'Italy: Dental Centre Doctor Castagna, Cornedo Vicentino', ar: 'إيطاليا: مركز د. Castagna لطب الأسنان، Cornedo Vicentino' },
      { en: 'Italy: Dental Centre Doctor Stori, Vicenza', ar: 'إيطاليا: مركز د. Stori لطب الأسنان، فيتشنزا' },
      { en: 'Italy: Eye Clinic Doctor Azzolina, Piazzola sul Brenta', ar: 'إيطاليا: عيادة العيون د. Azzolina، Piazzola sul Brenta' },
      { en: 'Italy: Liguria Servizi Medici, Chiavari (Genova)', ar: 'إيطاليا: Liguria Servizi Medici، كيافاري (جنوة)' },
      { en: 'Italy: MediCoop Group of Clinics, Genova', ar: 'إيطاليا: مجموعة عيادات MediCoop، جنوة' },
      { en: 'Italy: Doctor Zoccoli Surgery, Chiavari', ar: 'إيطاليا: عيادة د. Zoccoli، كيافاري' },
      { en: 'Italy: ODONTOTEAM Dental Clinic, Milano', ar: 'إيطاليا: عيادة ODONTOTEAM لطب الأسنان، ميلانو' },
      { en: 'Italy: CASA DI RIPOSO Noventa Padovana (Retirement Home)', ar: 'إيطاليا: CASA DI RIPOSO Noventa Padovana (دار رعاية)' },
      { en: 'Italy: Confidential Private Clinic (MATE units in operating theatres), Tuscany', ar: 'إيطاليا: عيادة خاصة (وحدات MATE بغرف العمليات)، توسكانا' },
      { en: 'Italy: Andrological Center Prof. Riccardo Vaccari, Milano', ar: 'إيطاليا: مركز أمراض الذكورة Prof. Riccardo Vaccari، ميلانو' },
      { en: 'Italy: AN.SE.MI SRL Retirement Home, Sestri Levante', ar: 'إيطاليا: دار رعاية AN.SE.MI SRL، Sestri Levante' },
      { en: 'Italy: Doctor Durando Andrea Surgery, Rapallo', ar: 'إيطاليا: عيادة د. Durando Andrea، راباللو' },
      { en: 'Italy: Milan Polyambulatory Medical Center, Milano', ar: 'إيطاليا: مركز Milan Polyambulatory الطبي، ميلانو' },
      { en: 'Italy: Dental Centre Doctor Salvarani, Genova', ar: 'إيطاليا: مركز د. Salvarani لطب الأسنان، جنوة' },
      { en: 'Italy: Dental Centre Dr. Claudio Lupo & Dr.ssa Tiziana Erica Randon, Trissino', ar: 'إيطاليا: مركز Dr. Claudio Lupo و Dr.ssa Tiziana Erica Randon، Trissino' },
      { en: 'Poland: Klinika Flordent Dental Clinic, Ozarow', ar: 'بولندا: عيادة Klinika Flordent لطب الأسنان، Ozarow' },
      { en: 'United Kingdom: Moorlands Nursing Home, Surrey', ar: 'المملكة المتحدة: Moorlands Nursing Home، Surrey' },
      { en: 'United Kingdom: Dormy House Nursing Home, Surrey', ar: 'المملكة المتحدة: Dormy House Nursing Home، Surrey' }
    ],
  },
  {
    id: 'hospitality',
    title: {
      en: 'Hospitality / Restaurants / Hotels',
      ar: 'الضيافة والمطاعم والفنادق',
    },
    items: [
      { en: 'UAE: BOLLA Wine Bistro, DIFC Dubai', ar: 'الإمارات: BOLLA Wine Bistro، DIFC دبي' },
      { en: 'UAE: Brass Monkey, Bluewaters Island Dubai', ar: 'الإمارات: Brass Monkey، Bluewaters Island دبي' },
      { en: 'UAE: In The Office, Dubai', ar: 'الإمارات: In The Office، دبي' },
      { en: 'Italy: Hotel Hilton Molino Stucky, Venice', ar: 'إيطاليا: فندق Hilton Molino Stucky، فينيسيا' },
      { en: 'Italy: Valle Gesso Camping', ar: 'إيطاليا: Valle Gesso Camping' },
      { en: 'Italy: RSA Residence I Tigli', ar: 'إيطاليا: RSA Residence I Tigli' },
      { en: 'Italy: La Pace Hotel', ar: 'إيطاليا: فندق La Pace' },
      { en: 'Italy: Borgo di Mare', ar: 'إيطاليا: Borgo di Mare' },
      { en: 'Italy: Hotel Tre Verghe', ar: 'إيطاليا: فندق Tre Verghe' },
      { en: 'United Kingdom: The George Hotel', ar: 'المملكة المتحدة: The George Hotel' }
    ],
  },
  {
    id: 'commercial-industrial',
    title: {
      en: 'Commercial & Industrial Installations',
      ar: 'التركيبات التجارية والصناعية',
    },
    items: [
      { en: 'Italy: Palazzo WIND, Milano Expo', ar: 'إيطاليا: Palazzo WIND، Milano Expo' },
      { en: 'Italy: HCS Italia', ar: 'إيطاليا: HCS Italia' },
      { en: 'Italy: MOMC Holding SRL', ar: 'إيطاليا: MOMC Holding SRL' },
      { en: 'Italy: MUGHI SRL', ar: 'إيطاليا: MUGHI SRL' },
      { en: 'Italy: CIEMMECI Fashion SRL', ar: 'إيطاليا: CIEMMECI Fashion SRL' },
      { en: 'Italy: DIVERSERIGHESTUDIO SRL', ar: 'إيطاليا: DIVERSERIGHESTUDIO SRL' },
      { en: 'Italy: Elisabeth SPA', ar: 'إيطاليا: Elisabeth SPA' },
      { en: 'Italy: Estetica Dali', ar: 'إيطاليا: Estetica Dali' },
      { en: 'Italy: I Casarotto Hairdressers', ar: 'إيطاليا: I Casarotto Hairdressers' },
      { en: 'France: Mediatherm', ar: 'فرنسا: Mediatherm' },
      { en: 'France: Floquet Roland Charles', ar: 'فرنسا: Floquet Roland Charles' },
      { en: 'Germany: Betsch Feinstes Licht', ar: 'ألمانيا: Betsch Feinstes Licht' },
      { en: 'Hong Kong: Asia Bright Industry', ar: 'هونغ كونغ: Asia Bright Industry' },
      { en: 'South Korea: Samhwa Ace Co. Ltd', ar: 'كوريا الجنوبية: Samhwa Ace Co. Ltd' },
      { en: 'New Zealand: YBR Fish Industry', ar: 'نيوزيلندا: YBR Fish Industry' },
      { en: 'Switzerland: Wolf AG', ar: 'سويسرا: Wolf AG' },
      { en: 'South Africa: Ambanc PTY LTD', ar: 'جنوب أفريقيا: Ambanc PTY LTD' }
    ],
  },
  {
    id: 'middle-east-healthcare',
    title: {
      en: 'Healthcare / Dental - Middle East',
      ar: 'الرعاية الصحية وطب الأسنان - الشرق الأوسط',
    },
    items: [
      { en: 'Saudi Arabia: Best Health KSA', ar: 'السعودية: Best Health KSA' },
      { en: 'Qatar: Hotel Spa (healthcare-related hospitality reference)', ar: 'قطر: Hotel Spa (مرجع ضيافة مرتبط بالرعاية الصحية)' },
      { en: 'UAE: Multiple commercial and hospitality references', ar: 'الإمارات: مراجع متعددة في القطاعات التجارية والضيافة' }
    ],
  },
  {
    id: 'egypt-city-stars',
    title: {
      en: 'Egypt Installation - City Stars Cinema, Cairo',
      ar: 'تركيب مصر - سينما سيتي ستارز، القاهرة',
    },
    items: [
      { en: 'Application areas: cinema halls, corridors, hallways and public circulation zones.', ar: 'مناطق التطبيق: قاعات السينما والممرات ومساحات الحركة العامة.' },
      { en: 'Application type: indoor air and surface sanitization in high-occupancy entertainment environments.', ar: 'نوع التطبيق: تعقيم الهواء والأسطح داخل بيئات ترفيهية عالية الإشغال.' },
      { en: 'Operational value: suitable for enclosed high-traffic spaces with continuous public occupancy.', ar: 'القيمة التشغيلية: مناسب للمساحات المغلقة عالية الحركة مع إشغال عام مستمر.' },
      { en: 'Reported effect: controlled indoor air quality improvement and particle/microbial load reduction.', ar: 'الأثر المعلن: تحسين جودة الهواء الداخلي وتقليل أحمال الجسيمات والميكروبات.' }
    ],
  },
];

export const regionSummary: LocalizedText[] = [
  {
    en: 'Italy: extensive installations in hospitals, dental clinics, retirement homes, hotels, industrial buildings and HVAC systems.',
    ar: 'إيطاليا: تركيبات واسعة في المستشفيات وعيادات الأسنان ودور الرعاية والفنادق والمباني الصناعية وأنظمة التكييف.',
  },
  {
    en: 'UAE: active references in DIFC restaurants, Bluewaters venues and office/hospitality spaces.',
    ar: 'الإمارات: مراجع تشغيلية في مطاعم DIFC ومواقع Bluewaters ومساحات المكاتب والضيافة.',
  },
  {
    en: 'UK: installations in nursing homes and hotels.',
    ar: 'المملكة المتحدة: تركيبات في دور الرعاية والفنادق.',
  },
  {
    en: 'Poland: dental clinic references.',
    ar: 'بولندا: مراجع في عيادات الأسنان.',
  },
  {
    en: 'France, Germany, Switzerland: commercial and HVAC references.',
    ar: 'فرنسا وألمانيا وسويسرا: مراجع تجارية وحلول مرتبطة بالتكييف.',
  },
  {
    en: 'South Africa, South Korea, Hong Kong, New Zealand: commercial and HVAC references.',
    ar: 'جنوب أفريقيا وكوريا الجنوبية وهونغ كونغ ونيوزيلندا: مراجع تجارية وحلول مرتبطة بالتكييف.',
  },
];

export const applications: LocalizedText[] = [
  {
    en: 'Healthcare (hospitals, clinics, dental and medical facilities)',
    ar: 'الرعاية الصحية (المستشفيات والعيادات والمنشآت الطبية وعيادات الأسنان)',
  },
  {
    en: 'Food and Ho.Re.Ca. environments (restaurants, cafes, hospitality kitchens)',
    ar: 'قطاعات الأغذية والضيافة Ho.Re.Ca. (المطاعم والكافيهات ومطابخ الضيافة)',
  },
  {
    en: 'Schools and educational environments',
    ar: 'المدارس والبيئات التعليمية',
  },
  {
    en: 'Commercial offices, shops and professional spaces',
    ar: 'المكاتب والمساحات التجارية والمتاجر',
  },
  {
    en: 'Industrial and HVAC-engineered facilities',
    ar: 'المنشآت الصناعية ومشروعات التكييف والهندسة الميكانيكية',
  },
  {
    en: 'Veterinary and specialized treatment spaces',
    ar: 'العيادات البيطرية والمساحات المتخصصة',
  },
];

export const menaAdaptationPoints: LocalizedText[] = [
  {
    en: 'MENA projects prioritize indoor air quality due to dense occupancy, long HVAC operating cycles and high dust exposure.',
    ar: 'مشروعات الشرق الأوسط وشمال أفريقيا تعطي أولوية لجودة الهواء الداخلي بسبب الكثافة التشغيلية وطول ساعات التكييف وارتفاع الأحمال الغبارية.',
  },
  {
    en: 'Integrated duct and centralized mechanical solutions align with regionally common enclosed AC environments.',
    ar: 'الحلول المدمجة داخل مجاري الهواء والأنظمة المركزية تتوافق مع البيئات المغلقة المعتمدة على التكييف المركزي في المنطقة.',
  },
  {
    en: 'Technical selection should be based on room volume, airflow demand and installation topology.',
    ar: 'يجب أن يستند الاختيار الفني إلى حجم الفراغ ومعدل تدفق الهواء وطبيعة التركيب.',
  },
  {
    en: 'Egypt distribution and project support can be centralized through the local authorized partner structure.',
    ar: 'يمكن توحيد المبيعات والدعم الفني للمشروعات داخل مصر عبر هيكل الوكيل المحلي المعتمد.',
  },
];

export const electrostaticOverview: LocalizedText[] = [
  {
    en: 'Electrostatic Crystal Filter is described as an advanced particle-capture system for air streams with high and lasting efficiency.',
    ar: 'يوصف مرشح Electrostatic Crystal Filter كنظام متقدم لالتقاط الجسيمات في تيار الهواء بكفاءة عالية ومستدامة.',
  },
  {
    en: 'Low pressure drop, washable components and long service life support reduced running and replacement costs.',
    ar: 'يساهم الانخفاض الكبير في فاقد الضغط وإمكانية الغسل وطول العمر التشغيلي في خفض تكاليف التشغيل والاستبدال.',
  },
  {
    en: 'Filters are washable using water and detergent, reducing dependence on frequent disposable replacement.',
    ar: 'يمكن تنظيف الفلاتر بالماء والمنظفات، مما يقلل الاعتماد على الاستبدال المتكرر للفلاتر الاستهلاكية.',
  },
];

export const electrostaticOperation: LocalizedText[] = [
  {
    en: 'A high potential difference is applied between discharge and collecting electrodes to generate a strong electric field.',
    ar: 'يتم تطبيق فرق جهد مرتفع بين أقطاب التفريغ وأقطاب التجميع لتوليد مجال كهربائي قوي.',
  },
  {
    en: 'Air ionization occurs near discharge electrodes and produces corona discharge behavior.',
    ar: 'يحدث تأين للهواء بالقرب من أقطاب التفريغ مع نشوء ظاهرة التفريغ الإكليلي (Corona Discharge).',
  },
  {
    en: 'Airborne particles gain positive charge, migrate to negative collecting plates, and are retained on collection surfaces.',
    ar: 'تكتسب الجسيمات المحمولة بالهواء شحنة موجبة ثم تنتقل إلى أقطاب التجميع السالبة وتُحتجز على أسطحها.',
  },
];

export const electrostaticGermicidalEffect: LocalizedText[] = [
  {
    en: 'Germicidal potential is linked to ionizing action, small ozone generation and interaction with UV radiation.',
    ar: 'يرتبط التأثير المبيد للجراثيم بفعل التأين وإنتاج كميات صغيرة من الأوزون والتفاعل مع الأشعة فوق البنفسجية.',
  },
  {
    en: 'The oxidation mechanism supports inactivation of biological contaminants instead of only physical accumulation.',
    ar: 'تدعم آلية الأكسدة تعطيل الملوثات البيولوجية بدلاً من تراكمها ميكانيكياً فقط.',
  },
  {
    en: 'Compared with mechanical-only filters, inactivation helps lower colony formation risk during maintenance procedures.',
    ar: 'مقارنة بالفلاتر الميكانيكية فقط، يساهم التعطيل في تقليل خطر تكوّن المستعمرات أثناء إجراءات الصيانة.',
  },
];

export const electrostaticPathogens: PathogenGroup[] = [
  {
    id: 'viruses',
    title: { en: 'Viruses', ar: 'الفيروسات' },
    items: [
      { en: 'Adenovirus (~0.08 µm)', ar: 'Adenovirus (~0.08 µm)' },
      { en: 'Arenavirus variants (~0.122 µm)', ar: 'Arenavirus variants (~0.122 µm)' },
      { en: 'Coronavirus (~0.1 µm)', ar: 'Coronavirus (~0.1 µm)' },
      { en: 'Coxsackievirus (~0.027 µm)', ar: 'Coxsackievirus (~0.027 µm)' },
      { en: 'Echovirus (~0.027 µm)', ar: 'Echovirus (~0.027 µm)' },
      { en: 'Hantavirus (~0.06 µm)', ar: 'Hantavirus (~0.06 µm)' },
      { en: 'Rhinovirus (~0.022 µm)', ar: 'Rhinovirus (~0.022 µm)' },
    ],
    note: {
      en: 'Although viruses are very small, they are often carried on larger particles that can be intercepted and inactivated.',
      ar: 'رغم صغر حجم الفيروسات، فإنها غالباً تُحمل على جسيمات أكبر يمكن اعتراضها وتعطيلها.',
    },
  },
  {
    id: 'pollens',
    title: { en: 'Pollens', ar: 'حبوب اللقاح' },
    items: [
      { en: 'Alder, Birch, Cypress, Hazel, Pine, Ragweed, Walnut', ar: 'Alder وBirch وCypress وHazel وPine وRagweed وWalnut' },
      { en: 'Typical dimensional range: ~13–90 µm', ar: 'نطاق أحجام تقريبي: ~13–90 µm' },
    ],
  },
  {
    id: 'mites',
    title: { en: 'Mites', ar: 'العث' },
    items: [
      { en: 'Dust mites: ~200–500 µm', ar: 'عث الغبار: ~200–500 µm' },
      { en: 'Mite fecal particles: ~10–40 µm', ar: 'جسيمات مخلفات العث: ~10–40 µm' },
    ],
  },
  {
    id: 'fungi',
    title: { en: 'Fungi', ar: 'الفطريات' },
    items: [
      { en: 'Aspergillus spp., Candida Albicans, Cladosporium', ar: 'Aspergillus spp. وCandida Albicans وCladosporium' },
      { en: 'Cryptococcus Neoformans, Histoplasma Capsulatum, Mucor spp.', ar: 'Cryptococcus Neoformans وHistoplasma Capsulatum وMucor spp.' },
      { en: 'Penicillium spp., Sporothrix Schenckii, Stachybotrys Atra', ar: 'Penicillium spp. وSporothrix Schenckii وStachybotrys Atra' },
      { en: 'Spore size range roughly 2.2–14 µm', ar: 'نطاق أحجام الأبواغ تقريباً 2.2–14 µm' },
    ],
  },
];

export const electrostaticAdvantages: LocalizedText[] = [
  { en: 'Germicidal inactivation, not only particle capture', ar: 'تعطيل جرثومي وليس مجرد احتجاز جسيمات' },
  { en: 'Lower pressure drop', ar: 'فاقد ضغط أقل' },
  { en: 'Washable and reusable filtering elements', ar: 'عناصر ترشيح قابلة للغسل وإعادة الاستخدام' },
  { en: 'Lower maintenance and replacement costs', ar: 'تكاليف صيانة واستبدال أقل' },
  { en: 'Reduced contamination risk during service', ar: 'انخفاض خطر التلوث أثناء أعمال الصيانة' },
  { en: 'Long operational lifespan', ar: 'عمر تشغيلي طويل' },
  { en: 'Bacterial removal efficiency reported at 85% (test context ON vs OFF)', ar: 'كفاءة إزالة بكتيرية مذكورة 85% (ضمن سياق اختبار تشغيل مقابل إيقاف)' },
];

export const officialSources = [
  'https://jonixair.com/en/technology',
  'https://jonixair.com/en/certifications',
  'https://jonixair.com/en/products/cubeline',
  'https://jonixair.com/en/products/mate-minimate',
  'https://jonixair.com/en/products/steel',
  'https://jonixair.com/en/products/inside',
  'https://jonixair.com/en/products/jonix-up-in',
  'https://jonixair.com/en/products/vmc4people',
  'https://jonixair.com/en/products/full-control-climate-line',
];

export function getProductBySlug(slug: string): ProductModel | undefined {
  return productModels.find((product) => product.slug === slug);
}

export function getProductsByLine(lineSlug: string): ProductModel[] {
  return productModels.filter((product) => product.lineSlug === lineSlug);
}
