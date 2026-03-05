// Product data structure - To be populated with real data from jonixair.com
export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  specifications: {
    coverage: string; // m²
    airflow: string; // m³/h
    power: string; // watts
    dimensions: string; // cm
    weight: string; // kg
    voltage: string; // V
    installationType: string; // wall, ceiling, portable, HVAC, etc
  };
  certifications: string[];
  image: string; // Product image URL from official website
  datasheet?: string; // PDF URL if available
  applications: string[]; // Array of applicable sectors
}

// Sample product structure - REPLACE WITH REAL DATA FROM jonixair.com
export const products: Product[] = [
  {
    id: 'product-1',
    nameEn: 'Jonix Air Model [OFFICIAL NAME]',
    nameAr: '[الاسم الرسمي للمنتج]',
    descriptionEn: 'Description extracted from official website',
    descriptionAr: 'الوصف المستخرج من الموقع الرسمي',
    specifications: {
      coverage: '[TO BE FILLED]',
      airflow: '[TO BE FILLED]',
      power: '[TO BE FILLED]',
      dimensions: '[TO BE FILLED]',
      weight: '[TO BE FILLED]',
      voltage: '[TO BE FILLED]',
      installationType: '[TO BE FILLED]',
    },
    certifications: ['CE', 'ISO 13849-1'],
    image: '/images/products/product-1.jpg',
    datasheet: '/datasheets/product-1.pdf',
    applications: ['healthcare', 'hospitality'],
  },
  // Add more products here
];
