// Real technology data from official JONIX documentation

export const technologyData = {
  mainTechnology: {
    name: 'Non-Thermal Plasma (NTP)',
    subtitle: 'Cold Plasma Technology',
    description: 'Dielectric Barrier Discharge (DBD) Process',
    keyPoints: [
      {
        title: 'How It Works',
        description: 'Controlled electrical discharge transforms oxygen and nitrogen molecules into plasma, generating Reactive Oxygen Species (ROS), ions, and energized electrons that oxidize and deactivate harmful pathogens.',
      },
      {
        title: 'What It Eliminates',
        items: [
          'Airborne viruses (including SARS-CoV-2)',
          'Bacteria and bacterial spores',
          'Mould and fungal spores',
          'Volatile Organic Compounds (VOCs)',
          'Odour-causing molecules',
        ],
      },
      {
        title: 'Continuous Sanitization',
        description: 'Unlike traditional filtration, Jonix NTP continues sanitizing air in surrounding environments and on exposed surfaces.',
      },
      {
        title: 'Chemical-Free Operation',
        description: 'No chemical disinfectants required. Safe for continuous operation in occupied spaces. Ozone levels remain below 0.01 ppm (safe threshold).',
      },
    ],
  },
  performanceMetrics: {
    bacterial_reduction: '99%',
    viral_reduction: '99.9%',
    voc_reduction: '99%',
    mould_reduction: '99%',
    ozone_level: '<0.01 ppm (safe)',
    certification: 'CE Marked - European Compliance',
  },
};
