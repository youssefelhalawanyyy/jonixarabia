// Certifications data from official JONIX documentation

export interface Certification {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  issuer: string;
  issuerAr: string;
  year: number;
  category: 'safety' | 'quality' | 'medical' | 'environmental' | 'local';
}

export const certifications: Certification[] = [
  {
    id: 'ce-marking',
    nameEn: 'CE Marking',
    nameAr: 'علامة CE الأوروبية',
    descriptionEn: 'Full European regulatory compliance. Meets all EU directives for air treatment and sanitization devices.',
    descriptionAr: 'الامتثال التنظيمي الكامل للاتحاد الأوروبي. تلبي جميع المراسيم الأوروبية لأجهزة معالجة الهواء والتعقيم.',
    issuer: 'European Union',
    issuerAr: 'الاتحاد الأوروبي',
    year: 2024,
    category: 'safety',
  },
  {
    id: 'tuv-proficert',
    nameEn: 'TÜV ProfiCert',
    nameAr: 'شهادة TÜV ProfiCert',
    descriptionEn: 'Independent certification of safety and performance standards by German technical authority.',
    descriptionAr: 'شهادة مستقلة لمعايير السلامة والأداء من قبل السلطة التقنية الألمانية.',
    issuer: 'TÜV Germany',
    issuerAr: 'TÜV ألمانيا',
    year: 2023,
    category: 'quality',
  },
  {
    id: 'biosafe',
    nameEn: 'BiOsafe Certification',
    nameAr: 'شهادة BiOsafe',
    descriptionEn: 'Biological safety certification. Validated effectiveness against microorganisms including viruses and bacteria.',
    descriptionAr: 'شهادة السلامة البيولوجية. فعالية معتمدة ضد الكائنات الحية الدقيقة بما فيها الفيروسات والبكتيريا.',
    issuer: 'International Standards',
    issuerAr: 'المعايير الدولية',
    year: 2023,
    category: 'medical',
  },
  {
    id: 'angreening',
    nameEn: 'Angreening',
    nameAr: 'شهادة Angreening',
    descriptionEn: 'Environmental responsibility certification. Sustainable manufacturing and operation standards.',
    descriptionAr: 'شهادة المسؤولية البيئية. معايير التصنيع والتشغيل المستدام.',
    issuer: 'Environmental Standards',
    issuerAr: 'معايير البيئة',
    year: 2023,
    category: 'environmental',
  },
  {
    id: 'egypt-ain-shams',
    nameEn: 'Ain Shams University - Egypt',
    nameAr: 'جامعة عين شمس - مصر',
    descriptionEn: 'Validated by leading Egyptian research institution. Laboratory testing and performance verification for Egyptian market. Field tests conducted on JONIX devices in Egyptian environmental conditions.',
    descriptionAr: 'اختبار ومصادقة من قبل المؤسسة البحثية المصرية الرائدة. اختبارات معملية وتحقق من الأداء في الأسواق المصرية. تم إجراء اختبارات ميدانية على أجهزة JONIX في الظروف البيئية المصرية.',
    issuer: 'Faculty of Engineering, Ain Shams University',
    issuerAr: 'كلية الهندسة، جامعة عين شمس',
    year: 2024,
    category: 'local',
  },
  {
    id: 'industria-sostenibile',
    nameEn: 'Industria Prodotti Sostenibili',
    nameAr: 'شهادة الصناعة المستدامة الإيطالية',
    descriptionEn: 'Italian certified sustainable production practices. Environmentally responsible manufacturing.',
    descriptionAr: 'ممارسات الإنتاج المستدام المعتمدة الإيطالية. التصنيع المسؤول بيئياً.',
    issuer: 'Italian Ministry of Industry',
    issuerAr: 'وزارة الصناعة الإيطالية',
    year: 2022,
    category: 'environmental',
  },
];
