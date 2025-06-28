var dataEng = [
  {
    id: 1,
    question: "What is the capital of France? ",
    questionImgSrc: "",
    mcqOptions: ["Berlin bhubon", "Madrid", "Paris", "Rome"],
    mcqAnswer: "3",
  },
  {
    id: 2,
    question: "Solve: 12 + 23 - 5 × 2 ÷ 2 = ?",
    questionImgSrc: "",
    mcqOptions: ["30", "28", "32", "31"],
    mcqAnswer: "2",
  },
  {
    id: 3,
    question: "Who wrote the epic poem 'Paradise Lost'?",
    questionImgSrc: "public/1.jpeg",
    mcqOptions: ["John Milton", "William Blake", "Samuel Taylor Coleridge", "William Wordsworth"],
    mcqAnswer: "1",
  },
  {
    id: 4,
    question: "Which chemical element has the atomic number 79 and is commonly associated with wealth and jewelry?",
    questionImgSrc: "",
    mcqOptions: ["Silver", "Gold", "Platinum", "Titanium"],
    mcqAnswer: "2",
  },
  {
    id: 5,
    question: "The process by which plants use sunlight to synthesize foods from carbon dioxide and water is called?",
    questionImgSrc: "public/2.jpeg",
    mcqOptions: ["Transpiration", "Respiration", "Photosynthesis", "Fertilization"],
    mcqAnswer: "3",
  },
  {
    id: 6,
    question: "A very long and descriptive question intended to test how the layout handles overflow when the question text extends beyond the typical width of a card or display component, potentially wrapping into multiple lines and even exceeding expected line limits in some responsive designs.",
    questionImgSrc: "",
    mcqOptions: ["Short", "Medium", "Very Long Option with a detailed explanation of possible content overflow", "Tiny"],
    mcqAnswer: "3",
  },
  {
    id: 7,
    question: "π (Pi) is approximately equal to?",
    questionImgSrc: "",
    mcqOptions: ["2.14", "3.14", "4.13", "3.41"],
    mcqAnswer: "2",
  },
  {
    id: 8,
    question: "Which planet in our solar system is known as the 'Red Planet'?",
    questionImgSrc: "",
    mcqOptions: ["Venus", "Mars", "Jupiter", "Mercury"],
    mcqAnswer: "2",
  },
  {
    id: 9,
    question: "Largest mammal on Earth?",
    questionImgSrc: "public/3.png",
    mcqOptions: ["Elephant", "Whale", "Blue Whale", "Hippopotamus"],
    mcqAnswer: "3",
  },
  {
    id: 10,
    question: "In programming, what does 'HTML' stand for?",
    questionImgSrc: "",
    mcqOptions: [
      "Hyper Text Markup Language",
      "High-Level Text Manipulation Logic",
      "How To Make Layout",
      "Hyper Tool Multi Language"
    ],
    mcqAnswer: "1",
  },
  {
    id: 11,
    question: "Small?",
    questionImgSrc: "",
    mcqOptions: ["Yes", "No", "Maybe", "Who knows"],
    mcqAnswer: "1",
  },
  {
    id: 12,
    question: "A small question with very large answer options",
    questionImgSrc: "",
    mcqOptions: [
      "This is a very long option designed to simulate UI stress when content is unexpectedly wide and doesn't wrap properly",
      "Short",
      "Another very long option which might break the layout depending on the padding and overflow CSS",
      "Short again"
    ],
    mcqAnswer: "1",
  },
  {
    id: 13,
    question: "The quick brown fox jumps over the lazy dog.",
    questionImgSrc: "public/4.png",
    mcqOptions: ["True", "False", "What?", "Maybe"],
    mcqAnswer: "1",
  },
  {
    id: 14,
    question: "What's the longest river in the world?",
    questionImgSrc: "",
    mcqOptions: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    mcqAnswer: "2",
  },
  {
    id: 15,
    question: "One more question for stress testing layout with long content inside the question itself and also in the answers, to make sure multiline behavior is consistent and responsive.",
    questionImgSrc: "",
    mcqOptions: [
      "A short one",
      "A very long and unnecessary answer option that extends past reasonable expectations",
      "Medium length option",
      "Another longish choice to ensure you see wrapping behavior"
    ],
    mcqAnswer: "2",
  },
  {
    id: 16,
    question: "In which year did the Titanic sink?",
    questionImgSrc: "",
    mcqOptions: ["1912", "1920", "1905", "1899"],
    mcqAnswer: "1",
  },
  {
    id: 17,
    question: "Which programming language is known for its snake logo?",
    questionImgSrc: "",
    mcqOptions: ["Java", "C++", "Python", "Ruby"],
    mcqAnswer: "3",
  },
  {
    id: 18,
    question: "Tiny Q?",
    questionImgSrc: "",
    mcqOptions: ["A", "B", "C", "D"],
    mcqAnswer: "2",
  },
  {
    id: 19,
    question: "What device do we use to measure temperature?",
    questionImgSrc: "public/5.png",
    mcqOptions: ["Barometer", "Thermometer", "Speedometer", "Altimeter"],
    mcqAnswer: "2",
  },
  {
    id: 20,
    question: "What's the main ingredient of guacamole?",
    questionImgSrc: "",
    mcqOptions: ["Avocado", "Tomato", "Lime", "Chili"],
    mcqAnswer: "1",
  },
  {
    id: 21,
    question: "Which of the following is NOT a primary color?",
    questionImgSrc: "",
    mcqOptions: ["Red", "Blue", "Green", "Yellow"],
    mcqAnswer: "3",
  },
  {
    id: 22,
    question: "Largest desert in the world?",
    questionImgSrc: "",
    mcqOptions: ["Sahara", "Gobi", "Antarctica", "Kalahari"],
    mcqAnswer: "3",
  },
  {
    id: 23,
    question: "Simple Q?",
    questionImgSrc: "",
    mcqOptions: ["X", "Y", "Z", "A"],
    mcqAnswer: "4",
  },
  {
    id: 24,
    question: "Which language is primarily used for web development?",
    questionImgSrc: "",
    mcqOptions: ["Python", "HTML", "C", "Swift"],
    mcqAnswer: "2",
  },
  {
    id: 25,
    question: "Very long question to see what happens when things get excessively verbose in a way that might test the patience of even the most resilient layout engine or developer who cares about visual hierarchy and structure.",
    questionImgSrc: "",
    mcqOptions: ["One", "Two", "Three", "Four"],
    mcqAnswer: "3",
  },
  {
    id: 26,
    question: "Shortest Q?",
    questionImgSrc: "",
    mcqOptions: ["1", "2", "3", "4"],
    mcqAnswer: "1",
  },
  {
    id: 27,
    question: "One very long option among shorts",
    questionImgSrc: "public/6.png",
    mcqOptions: [
      "Tiny",
      "Extremely long option that should span across multiple lines and demonstrate responsive behavior of your layout or cause a scrollbar",
      "Short again",
      "Tiny again"
    ],
    mcqAnswer: "2",
  },
  {
    id: 28,
    question: "Medium question, medium answers",
    questionImgSrc: "",
    mcqOptions: ["Option A", "Option B", "Option C", "Option D"],
    mcqAnswer: "3",
  },
  {
    id: 29,
    question: "Which ocean is the largest?",
    questionImgSrc: "",
    mcqOptions: ["Atlantic", "Arctic", "Indian", "Pacific"],
    mcqAnswer: "4",
  },
  {
    id: 30,
    question: "Final question to complete a test set designed for visual, structural, and performance stress testing of any rendering system involved in displaying a sequence of MCQs with optional images and long options.",
    questionImgSrc: "",
    mcqOptions: ["Alpha", "Beta", "Gamma", "Delta"],
    mcqAnswer: "1",
  },
];


var physicsQuestion = [
  {
    "id": 1,
    "question": "What is the SI unit of force?",
    "questionImgSrc": "",
    "mcqOptions": ["Joule", "Newton", "Watt", "Pascal"],
    "mcqAnswer": "2"
  },
  {
    "id": 2,
    "question": "Which law states that every action has an equal and opposite reaction?",
    "questionImgSrc": "",
    "mcqOptions": ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
    "mcqAnswer": "3"
  },
  {
    "id": 3,
    "question": "A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?",
    "questionImgSrc": "",
    "mcqOptions": ["1 m/s²", "2 m/s²", "4 m/s²", "5 m/s²"],
    "mcqAnswer": "3"
  },
  {
    "id": 4,
    "question": "Which of the following best describes the relationship between frequency (f) and wavelength (λ) of electromagnetic waves in a vacuum, where c is the speed of light?",
    "questionImgSrc": "",
    "mcqOptions": ["f = cλ", "f = c/λ", "λ = cf", "fλ = c²"],
    "mcqAnswer": "2"
  },
  {
    "id": 5,
    "question": "When considering the photoelectric effect, which of the following observations cannot be explained by classical wave theory but is perfectly explained by quantum theory? The phenomenon where...",
    "questionImgSrc": "",
    "mcqOptions": [
      "Light below a certain frequency cannot eject electrons regardless of intensity",
      "Brighter light causes more electrons to be ejected",
      "Electrons are ejected immediately when light shines on the metal",
      "The kinetic energy of ejected electrons depends on light frequency"
    ],
    "mcqAnswer": "1"
  },
  {
    "id": 6,
    "question": "A 0.5 kg ball is thrown vertically upward with an initial kinetic energy of 100 J. Neglecting air resistance, what will be its potential energy at the highest point of its trajectory?",
    "questionImgSrc": "",
    "mcqOptions": ["0 J", "50 J", "100 J", "200 J"],
    "mcqAnswer": "3"
  },
  {
    "id": 7,
    "question": "In the context of special relativity, which of the following statements about time dilation is correct?",
    "questionImgSrc": "",
    "mcqOptions": [
      "Moving clocks run faster than stationary ones",
      "Time dilation only occurs at speeds approaching 50% the speed of light",
      "A clock moving relative to an observer will appear to tick slower from the observer's frame of reference",
      "Time dilation violates the principle of causality"
    ],
    "mcqAnswer": "3"
  },
  {
    "id": 8,
    "question": "The principle that explains why the tip of a nail is made sharp is based on which physical concept?",
    "questionImgSrc": "",
    "mcqOptions": ["Pressure", "Density", "Surface tension", "Viscosity"],
    "mcqAnswer": "1"
  },
  {
    "id": 9,
    "question": "A simple pendulum has a period of 2 seconds on Earth. If taken to a planet where the acceleration due to gravity is one-fourth that on Earth, what would be its new period?",
    "questionImgSrc": "",
    "mcqOptions": ["1 s", "2 s", "4 s", "8 s"],
    "mcqAnswer": "3"
  },
  {
    "id": 10,
    "question": "Which thermodynamic process occurs at constant temperature?",
    "questionImgSrc": "",
    "mcqOptions": ["Adiabatic", "Isobaric", "Isothermal", "Isochoric"],
    "mcqAnswer": "3"
  },
  {
    "id": 11,
    "question": "Short?",
    "questionImgSrc": "",
    "mcqOptions": ["Yes", "No", "Maybe", "Depends"],
    "mcqAnswer": "1"
  },
  {
    "id": 12,
    "question": "A small question with very large answer options about quantum mechanics superposition principle and its implications for modern computing technologies",
    "questionImgSrc": "",
    "mcqOptions": [
      "Superposition allows quantum bits to exist in multiple states simultaneously unlike classical bits which are either 0 or 1",
      "Short",
      "Another very long option discussing how this principle enables quantum parallelism and potentially exponential speedup for certain algorithms",
      "Brief"
    ],
    "mcqAnswer": "1"
  },
  {
    "id": 13,
    "question": "The phenomenon where light changes direction when passing from one medium to another is called:",
    "questionImgSrc": "",
    "mcqOptions": ["Reflection", "Refraction", "Diffraction", "Dispersion"],
    "mcqAnswer": "2"
  },
  {
    "id": 14,
    "question": "What is the minimum number of forces acting on an object in equilibrium?",
    "questionImgSrc": "",
    "mcqOptions": ["1", "2", "3", "4"],
    "mcqAnswer": "2"
  },
  {
    "id": 15,
    "question": "When considering the complete energy transformation in a hydroelectric power station, which of the following sequences correctly describes the energy conversions from the water reservoir to electrical energy output?",
    "questionImgSrc": "",
    "mcqOptions": [
      "Gravitational potential → Kinetic → Mechanical → Electrical",
      "Kinetic → Thermal → Mechanical → Electrical",
      "Chemical → Thermal → Mechanical → Electrical",
      "Nuclear → Thermal → Kinetic → Electrical"
    ],
    "mcqAnswer": "1"
  },
  {
    "id": 16,
    "question": "In which year did Einstein publish his Special Theory of Relativity?",
    "questionImgSrc": "",
    "mcqOptions": ["1895", "1905", "1915", "1925"],
    "mcqAnswer": "2"
  },
  {
    "id": 17,
    "question": "Which physical quantity is measured in tesla units?",
    "questionImgSrc": "",
    "mcqOptions": ["Electric field", "Magnetic field", "Electric potential", "Magnetic flux"],
    "mcqAnswer": "2"
  },
  {
    "id": 18,
    "question": "Tiny physics Q?",
    "questionImgSrc": "",
    "mcqOptions": ["A", "B", "C", "D"],
    "mcqAnswer": "2"
  },
  {
    "id": 19,
    "question": "What device converts mechanical energy into electrical energy?",
    "questionImgSrc": "",
    "mcqOptions": ["Motor", "Generator", "Transformer", "Rectifier"],
    "mcqAnswer": "2"
  },
  {
    "id": 20,
    "question": "What's the main principle behind nuclear power generation?",
    "questionImgSrc": "",
    "mcqOptions": ["Chemical reactions", "Nuclear fission", "Nuclear fusion", "Radioactive decay"],
    "mcqAnswer": "2"
  },
  {
    "id": 21,
    "question": "Which of the following is NOT a fundamental force?",
    "questionImgSrc": "",
    "mcqOptions": ["Gravitational", "Electromagnetic", "Nuclear strong", "Centripetal"],
    "mcqAnswer": "4"
  },
  {
    "id": 22,
    "question": "What is the speed of light in vacuum?",
    "questionImgSrc": "",
    "mcqOptions": ["3 × 10⁵ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "It varies with frequency"],
    "mcqAnswer": "2"
  },
  {
    "id": 23,
    "question": "Simple Q about energy?",
    "questionImgSrc": "",
    "mcqOptions": ["Joule", "Watt", "Ohm", "Ampere"],
    "mcqAnswer": "1"
  },
  {
    "id": 24,
    "question": "Which principle explains why ships float?",
    "questionImgSrc": "",
    "mcqOptions": ["Pascal's Principle", "Bernoulli's Principle", "Archimedes' Principle", "Hooke's Law"],
    "mcqAnswer": "3"
  },
  {
    "id": 25,
    "question": "When examining the complete theoretical framework of quantum field theory and its application to the Standard Model of particle physics, which of the following statements most accurately describes the relationship between fundamental particles and force carriers?",
    "questionImgSrc": "",
    "mcqOptions": [
      "Fundamental particles interact by exchanging virtual particles that mediate the fundamental forces",
      "All forces are manifestations of a single unified field at all energy scales",
      "Gravitons have been experimentally confirmed as the quanta of gravitational waves",
      "The weak nuclear force is mediated by massless particles similar to photons"
    ],
    "mcqAnswer": "1"
  },
  {
    "id": 26,
    "question": "Shortest physics Q?",
    "questionImgSrc": "",
    "mcqOptions": ["E=mc²", "F=ma", "PV=nRT", "V=IR"],
    "mcqAnswer": "1"
  },
  {
    "id": 27,
    "question": "One very long option among shorts about the cosmological implications of dark matter and dark energy in the context of the accelerating expansion of the universe",
    "questionImgSrc": "",
    "mcqOptions": [
      "Current observations suggest dark energy constitutes about 68% of the total energy density of the universe while dark matter constitutes about 27%",
      "Short",
      "Another very long option discussing how these mysterious components affect the large-scale structure and ultimate fate of the cosmos",
      "Brief answer"
    ],
    "mcqAnswer": "1"
  },
  {
    "id": 28,
    "question": "Medium length question about thermodynamics",
    "questionImgSrc": "",
    "mcqOptions": ["Option A", "Option B", "Option C", "Option D"],
    "mcqAnswer": "3"
  },
  {
    "id": 29,
    "question": "Which phenomenon is responsible for the twinkling of stars?",
    "questionImgSrc": "",
    "mcqOptions": ["Reflection", "Atmospheric refraction", "Dispersion", "Scattering"],
    "mcqAnswer": "2"
  },
  {
    "id": 30,
    "question": "Final physics question covering multiple concepts including conservation laws, wave-particle duality, and the fundamental limits of measurement precision in quantum systems",
    "questionImgSrc": "",
    "mcqOptions": ["Alpha", "Beta", "Gamma", "Delta"],
    "mcqAnswer": "1"
  }
]


// var dataBan = [
//   {
//     id: 1,
//     question: ` thats good \\( \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad-bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)`,
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\log(ab) = \\log a + \\log b \\)", `\\( \\frac{d}{dx}x^n = nx^{n-1} \\)`, `\\( \\int x^2 dx = \\frac{x^3}{3} + C \\)`, "\\( z^n = 1 \\Rightarrow z = e^{2\\pi i k/n},\\ k=0,1,\\ldots,n-1 \\)"],
//     mcqAnswer: 3 // "রোম"
//   },
//   {
//     id: 2,
//     question: `\\( \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} \\)`,
//     questionImgSrc: "",
//     mcqOptions: [
//       "31", "28", "32", "\\( \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc \\)"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 3,
//     question: "'প্যারাডাইস লস্ট' মহাকাব্যটি কে লিখেছিলেন?",
//     questionImgSrc: "",
//     mcqOptions: ["জন মিল্টন", "উইলিয়াম ব্লেক", "স্যামুয়েল টেইলর কোলরিজ", "উইলিয়াম ওয়ার্ডসওয়ার্থ"],
//     mcqAnswer: "1",
//   },
//   {
//     id: 4,
//     question: "কোন রাসায়নিক উপাদানের পারমাণবিক সংখ্যা 79 এবং এটি সাধারণত সম্পদ ও গহনার সাথে যুক্ত?",
//     questionImgSrc: "",
//     mcqOptions: [`\\( \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\)`, "সোনা", "প্লাটিনাম", "টাইটানিয়াম"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 5,
//     question: "সূর্যালোক ব্যবহার করে উদ্ভিদ কীভাবে কার্বন ডাই অক্সাইড এবং জল থেকে খাদ্য সংশ্লেষণ করে সেই প্রক্রিয়াটিকে কী বলে?",
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}^T = \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} \\)", "\\( I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\)", "প্রকাশসংশ্লেষণ", "নিষেক"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 6,
//     question: "একটি খুব দীর্ঘ এবং বর্ণনামূলক প্রশ্ন যা লেআউট পরীক্ষা করার জন্য ডিজাইন করা হয়েছে যখন প্রশ্নের টেক্সট একটি কার্ড বা প্রদর্শন উপাদানের সাধারণ প্রস্থকে অতিক্রম করে, সম্ভাব্যভাবে একাধিক লাইনে মোড়ানো হয় এবং কিছু প্রতিক্রিয়াশীল ডিজাইনে প্রত্যাশিত লাইন সীমা অতিক্রম করে।",
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\times \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 2 & 1 \\\\ 4 & 3 \\end{bmatrix} \\)", "মাঝারি", "সম্ভাব্য বিষয়বস্তু ওভারফ্লো সম্পর্কে বিস্তারিত ব্যাখ্যা সহ খুব দীর্ঘ বিকল্প", "\\( \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}^{-1} = \\frac{1}{ad-bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\)"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 7,
//     question: "π (পাই) আনুমানিক সমান কত?",
//     questionImgSrc: "",
//     mcqOptions: ["\\( z^n = 1 \\Rightarrow z = e^{2\\pi i k/n},\\ k=0,1,\\ldots,n-1 \\)", "3.14", "\\( \\sum_{i=1}^n i = \\frac{n(n+1)}{2} \\)", "3.41"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 8,
//     question: "\\( \\sum_{i=1}^n i = \\frac{n(n+1)}{2} \\)",
//     questionImgSrc: "",
//     mcqOptions: ["শুক্র", "মঙ্গল", "বৃহস্পতি", "বুধ"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 9,
//     question: "\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)",
//     questionImgSrc: "public/3.png",
//     mcqOptions: ["হাতি", "তিমি", "নীল তিমি", "হিপ্পোপটামাস"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 10,
//     question: "প্রোগ্রামিংয়ে, 'HTML' এর পূর্ণরূপ কি?",
//     questionImgSrc: "",
//     mcqOptions: [
//       "হাইপার টেক্সট মার্কআপ ল্যাঙ্গুয়েজ",
//       "হাই-লেভেল টেক্সট ম্যানিপুলেশন লজিক",
//       "হাউ টু মেক লেআউট",
//       "হাইপার টুল মাল্টি ল্যাঙ্গুয়েজ"
//     ],
//     mcqAnswer: "1",
//   },
//   {
//     id: 11,
//     question: "ছোট?",
//     questionImgSrc: "",
//     mcqOptions: ["হ্যাঁ", "না", "হতে পারে", "কে জানে"],
//     mcqAnswer: "1",
//   },
//   {
//     id: 12,
//     question: "একটি ছোট প্রশ্ন খুব বড় উত্তর বিকল্প সহ",
//     questionImgSrc: "",
//     mcqOptions: [
//       "এটি একটি খুব দীর্ঘ বিকল্প যা UI স্ট্রেস সিমুলেট করার জন্য ডিজাইন করা হয়েছে যখন বিষয়বস্তু অপ্রত্যাশিতভাবে প্রশস্ত হয় এবং সঠিকভাবে মোড়ানো হয় না",
//       "\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)",
//       "আরেকটি খুব দীর্ঘ বিকল্প যা প্যাডিং এবং ওভারফ্লো CSS এর উপর নির্ভর করে লেআউট ভেঙে দিতে পারে",
//       "আবার সংক্ষিপ্ত"
//     ],
//     mcqAnswer: "1",
//   },
//   {
//     id: 13,
//     question: "দ্রুত বাদামী শিয়াল অলস কুকুরের উপর দিয়ে লাফ দেয়।",
//     questionImgSrc: "public/4.png",
//     mcqOptions: ["সত্য", "মিথ্যা", "কি?", "হতে পারে"],
//     mcqAnswer: "1",
//   },
//   {
//     id: 14,
//     question: "\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)",
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)", "নীল", "ইয়াংতেসি", "মিসিসিপি"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 15,
//     question: "লেআউট স্ট্রেস টেস্টিংয়ের জন্য আরও একটি প্রশ্ন যেখানে প্রশ্নের মধ্যে দীর্ঘ বিষয়বস্তু এবং উত্তরে রয়েছে, নিশ্চিত করার জন্য যে মাল্টিলাইন আচরণ সামঞ্জস্যপূর্ণ এবং প্রতিক্রিয়াশীল।",
//     questionImgSrc: "",
//     mcqOptions: [
//       "\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)",
//       "একটি খুব দীর্ঘ এবং অপ্রয়োজনীয় উত্তর বিকল্প যা যুক্তিসঙ্গত প্রত্যাশা অতিক্রম করে",
//       "মাঝারি দৈর্ঘ্যের বিকল্প",
//       "আরেকটি দীর্ঘায়িত পছন্দ নিশ্চিত করার জন্য যে আপনি মোড়ানো আচরণ দেখতে পাচ্ছেন"
//     ],
//     mcqAnswer: "2",
//   },
//   {
//     id: 16,
//     question: "টাইটানিক কোন বছর ডুবে গিয়েছিল?",
//     questionImgSrc: "",
//     mcqOptions: ["1912", "1920", "1905", "1899"],
//     mcqAnswer: "1",
//   },
//   {
//     id: 17,
//     question: "কোন প্রোগ্রামিং ভাষা তার সাপ লোগোর জন্য পরিচিত?",
//     questionImgSrc: "",
//     mcqOptions: ["জাভা", "সি++", "পাইথন", "রুবি"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 18,
//     question: "ছোট প্রশ্ন?",
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)", "B", "C", "D"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 19,
//     question: "তাপমাত্রা পরিমাপের জন্য আমরা কোন ডিভাইস ব্যবহার করি?",
//     questionImgSrc: "public/5.png",
//     mcqOptions: ["ব্যারোমিটার", "থার্মোমিটার", "স্পিডোমিটার", "অ্যালটিমিটার"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 20,
//     question: "গুয়াকামোলের প্রধান উপাদান কি?",
//     questionImgSrc: "",
//     mcqOptions: ["অ্যাভোকাডো", "টমেটো", "লেবু", "মরিচ"],
//     mcqAnswer: "1",
//   },
//   {
//     id: 21,
//     question: "নিচের কোনটি প্রাথমিক রঙ নয়?",
//     questionImgSrc: "",
//     mcqOptions: ["লাল", "নীল", "সবুজ", "হলুদ"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 22,
//     question: "বিশ্বের বৃহত্তম মরুভূমি কোনটি?",
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)", "গোবি", "অ্যান্টার্কটিকা", "কালাহারি"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 23,
//     question: "সাধারণ প্রশ্ন?",
//     questionImgSrc: "",
//     mcqOptions: ["X", "Y", "Z", "A"],
//     mcqAnswer: "4",
//   },
//   {
//     id: 24,
//     question: "ওয়েব ডেভেলপমেন্টের জন্য প্রাথমিকভাবে কোন ভাষা ব্যবহার করা হয়?",
//     questionImgSrc: "",
//     mcqOptions: ["পাইথন", "HTML", "সি", "সুইফ্ট"],
//     mcqAnswer: "2",
//   },
//   {
//     id: 25,
//     question: "একটি খুব দীর্ঘ প্রশ্ন যা দেখতে কী হয় যখন বিষয়বস্তু অত্যধিক বাগাড়ম্বরপূর্ণ হয় এমনভাবে যা এমনকি সবচেয়ে স্থিতিস্থাপক লেআউট ইঞ্জিন বা ডেভেলপারের ধৈর্য পরীক্ষা করতে পারে যারা ভিজ্যুয়াল শ্রেণিবিন্যাস এবং কাঠামো নিয়ে চিন্তিত।",
//     questionImgSrc: "",
//     mcqOptions: ["\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)", "দুই", "তিন", "চার"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 26,
//     question: "সবচেয়ে ছোট প্রশ্ন?",
//     questionImgSrc: "",
//     mcqOptions: ["1", "2", "3", "4"],
//     mcqAnswer: "1",
//   },
//   {
//     id: 27,
//     question: "সংক্ষিপ্তগুলির মধ্যে একটি খুব দীর্ঘ বিকল্প",
//     questionImgSrc: "public/6.png",
//     mcqOptions: [
//      "\\( \\det\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix} = aei + bfg + cdh - ceg - bdi - afh \\)",
//       "অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত",
//       "আবার সংক্ষিপ্ত",
//       "আবার ছোট"
//     ],
//     mcqAnswer: "2",
//   },
//   {
//     id: 28,
//     question: "মাঝারি প্রশ্ন, মাঝারি উত্তর",
//     questionImgSrc: "",
//     mcqOptions: ["বিকল্প A", "বিকল্প B", "বিকল্প C", "বিকল্প D"],
//     mcqAnswer: "3",
//   },
//   {
//     id: 29,
//     question: "কোন মহাসাগরটি বৃহত্তম?",
//     questionImgSrc: "",
//     mcqOptions: ["আটলান্টিক", "আর্কটিক", "ভারত", "প্রশান্ত"],
//     mcqAnswer: "4",
//   },
//   {
//     id: 30,
//     question: "একটি পরীক্ষা সেট সম্পূর্ণ করার জন্য চূড়ান্ত প্রশ্ন যা ঐচ্ছিক চিত্র এবং দীর্ঘ বিকল্প সহ MCQ-এর একটি ক্রম প্রদর্শনে জড়িত যে কোনও রেন্ডারিং সিস্টেমের ভিজ্যুয়াল, কাঠামোগত এবং কর্মক্ষমতা স্ট্রেস পরীক্ষার জন্য ডিজাইন করা হয়েছে।",
//     questionImgSrc: "",
//     mcqOptions: ["আলফা", "বিটা", "গামা", "ডেল্টা"],
//     mcqAnswer: "1",
//   },
// ];

var dataBan = [
  {
    mcqId: `1`,
    mcqHeader: `নিচের উদ্দীপকটি পড়ো এবং পরবর্তী ২টি প্রশ্নের উত্তর দাও। `,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: `public/2.jpeg`,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsdsdsgdfgsdgdsgsdgsdfgsdgdfgsd`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা এবং আপনার লেআউটের`, questionImgSrc: `public/4.png`, mcqOptions: [`a`, `ddd`, `fffs`, `sf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `2`,
    mcqHeader: `নিচের উদ্দীপকটি পড়ো এবং পরবর্তী ৩টি প্রশ্নের উত্তর দাও।  `,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিতঅত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `ইহা একটি ছোট প্রশ্ন `, questionImgSrc: ``, mcqOptions: [`অপশন ১ `, `অপশন ১ `, `অপশন ১ `, `অপশন ১ `], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `3`,
    mcqHeader: ``,
    passage: ``,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `4`,
    mcqHeader: ``,
    passage: ``,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `5`,
    mcqHeader: ``,
    passage: ``,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `6`,
    mcqHeader: `নিচের উদ্দীপকটি পড়ো এবং পরবর্তী ২টি প্রশ্নের উত্তর দাও। `,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: `public/2.jpeg`,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: `public/4.png`, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `7`,
    mcqHeader: `নিচের উদ্দীপকটি পড়ো এবং পরবর্তী ৩টি প্রশ্নের উত্তর দাও। `,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: `public/2.jpeg`,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: `public/4.png`, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `1`,
    mcqHeader: `Read the following passage and ans next 2 questions`,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: `public/2.jpeg`,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsdsdsgdfgsdgdsgsdgsdfgsdgdfgsd`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: `public/4.png`, mcqOptions: [`a`, `ddd`, `fffs`, `sf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `2`,
    mcqHeader: `read the following and ans next question `,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিতঅত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `3`,
    mcqHeader: ``,
    passage: ``,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `4`,
    mcqHeader: ``,
    passage: ``,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `5`,
    mcqHeader: ``,
    passage: ``,
    passageImgSrc: ``,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `6`,
    mcqHeader: `Read the following passage and ans next 2 questions`,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: `public/2.jpeg`,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: `public/4.png`, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
  {
    mcqId: `7`,
    mcqHeader: `Read the following passage and ans next 2 questions`,
    passage: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের প্রতিক্রিয়াশীল আচরণ প্রদর্শন করা উচিত বা একটি স্ক্রোলবার সৃষ্টি করা উচিত`,
    passageImgSrc: `public/2.jpeg`,
    questions: [
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: ``, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: `অত্যন্ত দীর্ঘ বিকল্প যা একাধিক লাইন জুড়ে থাকা উচিত এবং আপনার লেআউটের`, questionImgSrc: `public/4.png`, mcqOptions: [`a`, `ddd`, `ffffffsds`, `adfasdfasfafsf`], mcqAnswer: `` },
      { qId: ``, question: ``, questionImgSrc: ``, mcqOptions: [``, ``, ``, ``], mcqAnswer: `` }
    ]
  },
]


const institutionName = "Chittagong Government City College"
const examName = "mid term" //examName
const subject = "physics" //subject
const paper = "1st" //paper
const className = 10 //class
const totalMark = 30 // totalMark
const subjectCode = 101 //subjectCode
const totalTime = "30 minute" //totalTime
// const message = '"সততা ছাড়া জ্ঞান অর্জন হলো এমন এক নৌকা, যার তলায় ছিদ্র আছে। এটি কখনও তোমাকে সাফল্যের তীরে পৌঁছাবে না।"---কনফুসিয়াস'
const message = ''