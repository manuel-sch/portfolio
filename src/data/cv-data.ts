export interface Experience {
  period: string;
  role: string;
  employmentType?: string; // z. B. "Teilzeit", "Praktikum", "Werkstudent"
  company: string;
  description: string[];
  techStack: string[];
  logo: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  note?: string;
}

export const experience: Experience[] = [
  {
    period: '06/2024 – 09/2024',
    role: 'Fullstack Engineer',
    employmentType: 'Teilzeit',
    company: 'Babiel GmbH',
    description: [
      'Barrierefreie Frontend-Entwicklung nach Figma-Designs in Scrumban',
      'CMS-Logik in Coremedia per Themes, SASS, JSX & Alpine.js',
    ],
    techStack: ['JavaScript', 'SASS', 'Alpine.js', 'CMS'],
    logo: '/images/logos/babiel.png',
  },
  {
    period: '07/2023 – 11/2023',
    role: 'Android-Entwickler',
    employmentType: 'Teilzeit',
    company: 'Fronius Deutschland GmbH',
    description: [
      'Entwicklung & Testing von Solar-Energy-Android-Apps im Scrum',
      'Asynchrone Programmierung mit Kotlin, Jetpack, Coroutines, MockK',
    ],
    techStack: ['Kotlin', 'Android SDK', 'Jetpack', 'Coroutines'],
    logo: '/images/logos/fronius.png',
  },
  {
    period: '08/2020 – 03/2023',
    role: 'Android-Entwicklung',
    employmentType: 'Werkstudent',
    company: 'PROMOS consult GmbH',
    description: [
      'Entwicklung, Analyse & UI-Testing für Android-Apps im Scrum',
      'View-Layer mit Java und XML-Views',
      'Build-Tool Gradle, UI-Bibliothek Material Design',
    ],
    techStack: ['Java', 'Android SDK', 'Gradle', 'Material Design'],
    logo: '/images/logos/promos.gif',
  },
  {
    period: '08/2021 – 11/2021',
    role: 'Barrierefreiheit Android',
    employmentType: 'Praktikum',
    company: 'PROMOS consult GmbH',
    description: [
      'Migration CI/CD von Jenkins zu Azure Pipelines',
      'Analyse & Einpflegung von Barrierefreiheit in Android-Apps',
    ],
    techStack: ['Azure', 'CI/CD', 'Android', 'Barrierefreiheit'],
    logo: '/images/logos/promos.gif',
  },
];

export const skills: Skill[] = [
  { name: 'Java / Kotlin', level: 90, category: 'Sprachen' },
  { name: 'TypeScript / JavaScript', level: 75, category: 'Sprachen' },
  { name: 'Python / Bash', level: 50, category: 'Sprachen' },
  { name: 'HTML / CSS / SASS', level: 75, category: 'Sprachen' },
  { name: 'Android SDK', level: 85, category: 'Frameworks' },
  { name: 'Angular / React', level: 65, category: 'Frameworks' },
  { name: 'Express', level: 55, category: 'Frameworks' },
  { name: 'Azure DevOps', level: 60, category: 'DevOps' },
  { name: 'Git', level: 80, category: 'Tools' },
];

export const education: Education[] = [
  { degree: 'Master Medieninformatik', school: 'Berliner Hochschule für Technik', period: 'seit 04/2025' },
  { degree: 'B.Sc. Medieninformatik', school: 'Berliner Hochschule für Technik', period: '04/2019 – 03/2023', note: 'Note: 1,5' },
  { degree: 'Abitur', school: 'Lise-Meitner-Gymnasium, Falkensee', period: '08/2011 – 03/2017' },
];
