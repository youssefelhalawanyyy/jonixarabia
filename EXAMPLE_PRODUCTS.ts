// EXAMPLE PRODUCT DATA FOR JONIX AIR
// This file shows how to populate products.ts with real data from jonixair.com
// Copy and adapt these examples to update /src/data/products.ts

export const exampleProducts = [
  // EXAMPLE 1: Ceiling-mounted model
  {
    id: 'jonix-model-c200',
    nameEn: 'Jonix Air C200 - Ceiling Model',
    nameAr: 'جهاز جونكس إير سي 200 - موديل السقف',
    descriptionEn:
      'High-capacity ceiling-mounted air purification system for large commercial spaces, hospitals, and hospitality venues. Features non-thermal plasma technology for 99.9% pathogen elimination.',
    descriptionAr:
      'نظام تنقية هواء عالي الطاقة مثبت على السقف للمساحات التجارية الكبيرة والمستشفيات والفنادق. يتميز بتقنية البلازما غير الحرارية للقضاء على 99.9% من العوامل الممرضة.',
    specifications: {
      coverage: '200', // m²
      airflow: '1200', // m³/h
      power: '120', // watts
      dimensions: '85 x 55 x 35', // cm
      weight: '18', // kg
      voltage: '230', // V (or 110V)
      installationType: 'ceiling-mounted',
    },
    certifications: ['CE', 'ISO 13849-1', 'ISO 14644-1'],
    image: '/images/products/model-c200.jpg',
    datasheet: '/datasheets/jonix-c200-datasheet.pdf',
    applications: ['healthcare', 'hospitality', 'commercial'],
  },

  // EXAMPLE 2: Wall-mounted model
  {
    id: 'jonix-model-w150',
    nameEn: 'Jonix Air W150 - Wall Model',
    nameAr: 'جهاز جونكس إير ڤي 150 - موديل الحائط',
    descriptionEn:
      'Elegant wall-mounted air purification system perfect for offices, clinics, and hotel rooms. Compact design with powerful performance for medium-sized spaces.',
    descriptionAr:
      'نظام تنقية هواء أنيق مثبت على الحائط مثالي للمكاتب والعيادات وغرف الفنادق. تصميم مدمج مع أداء قوي للمساحات متوسطة الحجم.',
    specifications: {
      coverage: '150', // m²
      airflow: '800', // m³/h
      power: '85', // watts
      dimensions: '70 x 45 x 28', // cm
      weight: '14', // kg
      voltage: '230', // V
      installationType: 'wall-mounted',
    },
    certifications: ['CE', 'ISO 13849-1'],
    image: '/images/products/model-w150.jpg',
    datasheet: '/datasheets/jonix-w150-datasheet.pdf',
    applications: ['healthcare', 'commercial', 'residential'],
  },

  // EXAMPLE 3: Portable model
  {
    id: 'jonix-model-p100',
    nameEn: 'Jonix Air P100 - Portable Model',
    nameAr: 'جهاز جونكس إير بي 100 - موديل محمول',
    descriptionEn:
      'Mobile air purification system with wheels and handle. Perfect for temporary installations, events, and quick deployment in various environments.',
    descriptionAr:
      'نظام تنقية هواء محمول مع عجلات ومقبض. مثالي للتركيبات المؤقتة والفعاليات والنشر السريع في بيئات مختلفة.',
    specifications: {
      coverage: '100', // m²
      airflow: '600', // m³/h
      power: '65', // watts
      dimensions: '60 x 40 x 25', // cm
      weight: '12', // kg
      voltage: '230', // V
      installationType: 'portable',
    },
    certifications: ['CE', 'RoHS'],
    image: '/images/products/model-p100.jpg',
    datasheet: '/datasheets/jonix-p100-datasheet.pdf',
    applications: ['commercial', 'hospitality', 'industrial'],
  },

  // EXAMPLE 4: HVAC-integrated model
  {
    id: 'jonix-model-h300',
    nameEn: 'Jonix Air H300 - HVAC Integration Module',
    nameAr: 'جهاز جونكس إير اتش 300 - وحدة التكامل مع التكييف',
    descriptionEn:
      'Advanced system designed to integrate with existing HVAC systems. Ideal for retrofitting modern buildings and hospitals with plasma air purification.',
    descriptionAr:
      'نظام متقدم مصمم للتكامل مع أنظمة التكييف الموجودة. مثالي لتحديث المباني الحديثة والمستشفيات بتقنية تنقية الهواء بالبلازما.',
    specifications: {
      coverage: '300', // m²
      airflow: '1800', // m³/h
      power: '150', // watts
      dimensions: '120 x 70 x 40', // cm
      weight: '28', // kg
      voltage: '380', // V (3-phase)
      installationType: 'HVAC-integrated',
    },
    certifications: ['CE', 'ISO 13849-1', 'Medical Device Directive'],
    image: '/images/products/model-h300.jpg',
    datasheet: '/datasheets/jonix-h300-datasheet.pdf',
    applications: ['healthcare', 'industrial', 'hospitality'],
  },
];

// HOW TO USE THIS FILE:
// 1. Extract real product information from https://jonixair.com/en
// 2. Replace example data with actual product specifications
// 3. Copy the data structure to /src/data/products.ts
// 4. Ensure all required fields are populated (not left as placeholder)
// 5. Add product images to /public/images/products/
// 6. Add datasheets to /public/datasheets/

// IMPORTANT NOTES:
// - Do NOT estimate specifications. Only use actual published values.
// - Coverage area should be in m² (square meters)
// - Airflow should be in m³/h (cubic meters per hour)
// - Power should be in watts (W)
// - Dimensions should be in cm (length x width x height)
// - Weight should be in kg (kilograms)
// - Voltage should be in V (commonly 230V for single-phase, 380V for 3-phase)
// - Installation types: wall-mounted, ceiling-mounted, portable, HVAC-integrated, floor-standing
// - Applications: healthcare, hospitality, industrial, commercial, residential, education, laboratories
// - Certifications: Only include certifications actually listed on official website

// CERTIFICATIONS REFERENCE (only add if found on jonixair.com):
// - CE Marking (European Conformity)
// - ISO 13849-1 (Safety-related control systems)
// - ISO 14644-1 (Cleanroom classification)
// - ISO 9001 (Quality management)
// - Medical Device Directive (for healthcare use)
// - UL (Underwriters Laboratories)
// - FCC (Federal Communications Commission)
// - RoHS (Restriction of Hazardous Substances)
// - WEEE (Waste Electrical and Electronic Equipment)
