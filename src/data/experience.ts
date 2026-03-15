export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  current?: boolean;
}

export const experience: Experience[] = [
  // {
  //   company: "Vrajh iTech LLP",
  //   role: "Flutter Developer Intern",
  //   period: "Dec 2024 – Feb 2025",
  //   description: [
  //     "Optimized application performance by refactoring state management, reducing API call overhead by 30%.",
  //     "Integrated Google Maps SDK and Razorpay payment gateway for secure transactions.",
  //     "Fixed Play Store privacy and permission issues to meet Android 13+ policies and pass app review."
  //   ].join(' '),
  //   current: false,
  // },
];
