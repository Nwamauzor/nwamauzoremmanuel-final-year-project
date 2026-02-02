// Types
export interface Course {
  code: string;
  title: string;
  unit: number;
  status: "Required" | "Compulsory" | "Elective";
}

export interface CourseSemester {
  first: Course[];
  second: Course[];
}

export interface DepartmentCourses {
  "100L": CourseSemester;
  "200L": CourseSemester;
  "300L": CourseSemester;
  "400L": CourseSemester;
  "500L": CourseSemester;
}

export interface Staff {
  name: string;
  qualification: string;
  designation: string;
  specialization: string;
}

export interface Contact {
  address: string;
  email: string;
  phone: string;
}

export interface DepartmentData {
  courses: DepartmentCourses;
  staff: Staff[];
  contact: Contact;
  hodName: string;
  hodQualification: string;
  hodBio: string;
  welcomeMessage: string;
  history: string;
}

// Helper to generate course placeholder
const generateCourses = (prefix: string, levelNum: number): CourseSemester => ({
  first: [
    { code: `${prefix} ${levelNum}01`, title: "Course Title 1", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}03`, title: "Course Title 2", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}05`, title: "Course Title 3", unit: 2, status: "Compulsory" },
    { code: `${prefix} ${levelNum}07`, title: "Course Title 4", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}09`, title: "Course Title 5", unit: 3, status: "Compulsory" },
    { code: `${prefix} ${levelNum}11`, title: "Course Title 6", unit: 2, status: "Elective" },
    { code: `${prefix} ${levelNum}13`, title: "Course Title 7", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}15`, title: "Course Title 8", unit: 2, status: "Compulsory" },
  ],
  second: [
    { code: `${prefix} ${levelNum}02`, title: "Course Title 1", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}04`, title: "Course Title 2", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}06`, title: "Course Title 3", unit: 2, status: "Compulsory" },
    { code: `${prefix} ${levelNum}08`, title: "Course Title 4", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}10`, title: "Course Title 5", unit: 3, status: "Compulsory" },
    { code: `${prefix} ${levelNum}12`, title: "Course Title 6", unit: 2, status: "Elective" },
    { code: `${prefix} ${levelNum}14`, title: "Course Title 7", unit: 3, status: "Required" },
    { code: `${prefix} ${levelNum}16`, title: "Course Title 8", unit: 2, status: "Compulsory" },
  ],
});

// CS & AI Department Data
export const csAiData: DepartmentData = {
  courses: {
    "100L": {
      first: [
        { code: "C-GST 111", title: "Communication in English", unit: 2, status: "Compulsory" },
        { code: "C-GST 112", title: "Nigerian People and Culture", unit: 2, status: "Compulsory" },
        { code: "C-COS 101", title: "Introduction to Computing Sciences", unit: 3, status: "Compulsory" },
        { code: "C-COS 102", title: "Problem Solving", unit: 3, status: "Compulsory" },
        { code: "C-MTH 101", title: "Elementary Mathematics I (Algebra & Trigonometry)", unit: 2, status: "Compulsory" },
        { code: "C-MTH 102", title: "Elementary Mathematics II (Calculus)", unit: 2, status: "Compulsory" },
        { code: "C-STA 111", title: "Descriptive Statistics", unit: 3, status: "Compulsory" },
        { code: "C-PHY 101", title: "General Physics (Mechanics)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 102", title: "General Physics II (Electricity & Magnetism)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 107", title: "General Practical Physics I", unit: 1, status: "Compulsory" },
        { code: "C-PHY 108", title: "General Practical Physics II", unit: 1, status: "Compulsory" },
      ],
      second: [
        { code: "C-MTH 103", title: "Elementary Mathematics III (Vectors, Geometry and Dynamics)", unit: 2, status: "Required" },
        { code: "C-STA 122", title: "Statistical Computing", unit: 3, status: "Required" },
        { code: "UI-COS 103", title: "Practical Lab I", unit: 2, status: "Compulsory" },
        { code: "UI-GES 107", title: "Reproductive Health, Sexually Transmitted Infections & HIV", unit: 1, status: "Required" },
        { code: "UI-GES 108", title: "Introduction to French", unit: 1, status: "Required" },
      ],
    },
    "200L": {
      first: [
        { code: "C-GST 212", title: "Philosophy, Logic, and Human Existence", unit: 2, status: "Compulsory" },
        { code: "C-ENT 211", title: "Entrepreneurship and Innovation", unit: 2, status: "Compulsory" },
        { code: "C-IFT 211", title: "Digital Logic Design", unit: 2, status: "Compulsory" },
        { code: "C-COS 201", title: "Computer Programming I", unit: 3, status: "Compulsory" },
        { code: "C-COS 202", title: "Computer Programming II", unit: 3, status: "Compulsory" },
        { code: "C-MTH 201", title: "Mathematical Methods I", unit: 2, status: "Compulsory" },
        { code: "C-MTH 202", title: "Elementary Differential Equations", unit: 2, status: "Compulsory" },
        { code: "C-CSC 203", title: "Discrete Structures", unit: 2, status: "Compulsory" },
        { code: "C-SEN 201", title: "Introduction to Software Engineering", unit: 2, status: "Compulsory" },
        { code: "C-CSC 299", title: "SIWES", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-INS 202", title: "Human Computer Interface", unit: 2, status: "Required" },
        { code: "C-INS 204", title: "Systems Analysis & Design", unit: 3, status: "Required" },
        { code: "C-CYB 201", title: "Introduction to Cybersecurity and Strategy", unit: 2, status: "Required" },
        { code: "C-IFT 302", title: "Web Application Development", unit: 2, status: "Required" },
        { code: "C-STA 202", title: "Statistics for Physical Sciences and Engineering", unit: 3, status: "Required" },
        { code: "UI-CSC 234", title: "Assembly Language Programming", unit: 2, status: "Required" },
        { code: "UI-CSC 236", title: "Introduction to Algorithms", unit: 2, status: "Required" },
        { code: "UI-CSC 272", title: "Information Management Systems", unit: 2, status: "Required" },
        { code: "UI-COS 203", title: "Practical Lab II", unit: 2, status: "Compulsory" },
      ],
    },
    "300L": {
      first: [
        { code: "C-GST 312", title: "Peace and Conflict Resolution", unit: 2, status: "Compulsory" },
        { code: "C-ENT 312", title: "Venture Creation", unit: 2, status: "Compulsory" },
        { code: "C-DTS 304", title: "Data Management I", unit: 3, status: "Compulsory" },
        { code: "C-IFT 212", title: "Computer Architecture and Organisation", unit: 2, status: "Compulsory" },
        { code: "C-ICT 305", title: "Data Communication System & Network", unit: 3, status: "Compulsory" },
        { code: "C-CSC 301", title: "Data Structures", unit: 3, status: "Compulsory" },
        { code: "C-CSC 308", title: "Operating Systems", unit: 3, status: "Compulsory" },
        { code: "C-CSC 309", title: "Artificial Intelligence", unit: 2, status: "Compulsory" },
        { code: "C-CSC 399", title: "SIWES II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "UI-CSC 331", title: "Programming Principles and Paradigms", unit: 2, status: "Required" },
        { code: "UI-CSC 334", title: "Systems Programming", unit: 2, status: "Required" },
        { code: "UI-CSC 351", title: "Formal Languages and Automata Theory", unit: 2, status: "Required" },
        { code: "UI-CSC 572", title: "Machine Learning", unit: 2, status: "Required" },
        { code: "UI-COS 301", title: "Practical Lab III", unit: 2, status: "Compulsory" },
        { code: "C-MTH 209", title: "Introduction to Numerical Analysis", unit: 2, status: "Elective" },
        { code: "UI-CYB 204", title: "Cybersecurity in Business & Industry", unit: 2, status: "Elective" },
      ],
    },
    "400L": {
      first: [
        { code: "C-CSC 322", title: "Computer Science and Entrepreneurship", unit: 2, status: "Compulsory" },
        { code: "C-CSC 401", title: "Algorithms and Complexity Analysis", unit: 2, status: "Compulsory" },
      ],
      second: [
        { code: "UI-CSC 499", title: "Industrial Training III", unit: 6, status: "Compulsory" },
        { code: "C-DTS 404", title: "Data Management II", unit: 2, status: "Required" },
        { code: "UI-CSC 412", title: "Microprocessor Interfacing", unit: 2, status: "Required" },
        { code: "UI-CSC 431", title: "Compiler Construction", unit: 2, status: "Required" },
        { code: "UI-CSC 477", title: "Computer Graphics", unit: 2, status: "Elective" },
        { code: "C-ICT 309", title: "Mobile Communication and Networking", unit: 3, status: "Elective" },
        { code: "C-INS 304", title: "Web Development Using Content Management System", unit: 2, status: "Elective" },
        { code: "C-CSC 432", title: "Distributed Computer Systems", unit: 2, status: "Elective" },
      ],
    },
    "500L": {
      first: [
        { code: "C-COS 409", title: "Research Methodology and Technical Report Writing", unit: 3, status: "Compulsory" },
        { code: "C-INS 401", title: "Project Management", unit: 2, status: "Compulsory" },
        { code: "C-CSC 402", title: "Ethics and Legal Issues in Computer Science", unit: 2, status: "Compulsory" },
        { code: "C-CSC 597", title: "Final Year Project I", unit: 3, status: "Compulsory" },
        { code: "C-CSC 598", title: "Final Year Project II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "UI-CSC 552", title: "Theory of Computation", unit: 2, status: "Required" },
        { code: "UI-CSC 582", title: "Bioinformatics", unit: 2, status: "Elective" },
        { code: "UI-CSC 583", title: "AI for Social Good", unit: 2, status: "Elective" },
        { code: "UI-CSC 584", title: "Internet of Things (IOT)", unit: 2, status: "Elective" },
        { code: "UI-CSC 585", title: "Precision Agriculture", unit: 2, status: "Elective" },
      ],
    },
  },
  staff: [
    { name: "Prof. O.F.W Onifade", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Computer Vision, Machine Learning, Information Risk Management" },
    { name: "Prof. B.O. Akinkumi", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Physics (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Knowledge Representation and Formal Ontologies" },
    { name: "Prof. Fausat B. Oladejo", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Knowledge Management, Artificial Intelligence, Business Intelligence, Software Engineering, Natural Language Processing" },
    { name: "Dr. Nancy C. Woods", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan)", designation: "Senior Lecturer", specialization: "Image Processing, Pattern Recognition" },
    { name: "Khadijat Ladoja", qualification: "B.Sc. Computer Science (Ilorin), M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Machine Learning, Computer Vision and Robotics" },
  ],
  contact: {
    address: "Department of Computer Science & Artificial Intelligence, Faculty of Computing, University of Ibadan",
    email: "cs-ai@computing.ui.edu.ng",
    phone: "+234 801 234 5678",
  },
  hodName: "Prof. B.F Oladejo",
  hodQualification: "Ph.D Computer Science",
  hodBio: "Prof. Bolanle F. Oladejo has the following qualifications; NCE Computer Science (Maths) 1994; B.Sc. Computer Science 1999, M.Sc Computer Science 2003, Ph.D. Computer Science 2010 (Ibadan), Ph.D Computer Science 2010, (Nancy). Member CPN, NCS",
  welcomeMessage: "Welcome to the Department of Computer Science and Artificial Intelligence. We are committed to providing excellent education and fostering innovation in computing and AI. Our programs are designed to equip students with the skills and knowledge needed to excel in their careers and contribute to the advancement of technology.",
  history: "The Senate of the University of Ibadan approved the proposal for a Faculty of Computing on March 24th 2025 with four new departments and four new programmes in addition to the existing programme in Computer Science. The Department of Computer Science and Artificial Intelligence offers the B.Sc. Computer Science programme, building on decades of excellence in computing education at the University of Ibadan.",
};

// Data Science Department Data
export const dataScienceData: DepartmentData = {
  courses: {
    "100L": {
      first: [
        { code: "DSC 101", title: "Introduction to Data Science", unit: 3, status: "Required" },
        { code: "DSC 103", title: "Fundamentals of Statistics", unit: 3, status: "Required" },
        { code: "MTH 101", title: "Elementary Mathematics I", unit: 3, status: "Compulsory" },
        { code: "CSC 101", title: "Introduction to Programming", unit: 3, status: "Required" },
        { code: "GES 101", title: "Use of English I", unit: 2, status: "Compulsory" },
        { code: "DSC 105", title: "Data Literacy", unit: 2, status: "Required" },
        { code: "DSC 107", title: "Mathematical Foundations", unit: 3, status: "Required" },
        { code: "GES 103", title: "Nigerian Peoples and Culture", unit: 2, status: "Compulsory" },
      ],
      second: [
        { code: "DSC 102", title: "Data Collection Methods", unit: 3, status: "Required" },
        { code: "DSC 104", title: "Programming for Data Science", unit: 3, status: "Required" },
        { code: "MTH 102", title: "Elementary Mathematics II", unit: 3, status: "Compulsory" },
        { code: "CSC 104", title: "Programming with Python", unit: 3, status: "Required" },
        { code: "GES 102", title: "Use of English II", unit: 2, status: "Compulsory" },
        { code: "DSC 106", title: "Introduction to Databases", unit: 3, status: "Required" },
        { code: "DSC 108", title: "Exploratory Data Analysis", unit: 2, status: "Required" },
        { code: "GES 104", title: "History of Scientific Ideas", unit: 2, status: "Compulsory" },
      ],
    },
    "200L": generateCourses("DSC", 2),
    "300L": generateCourses("DSC", 3),
    "400L": generateCourses("DSC", 4),
    "500L": generateCourses("DSC", 5),
  },
  staff: [
    { name: "Prof. Adaora Nwachukwu", qualification: "Ph.D Statistics (Cambridge)", designation: "Professor", specialization: "Statistical Learning" },
    { name: "Dr. Olumide Bakare", qualification: "Ph.D Data Science (Berkeley)", designation: "Senior Lecturer", specialization: "Big Data Analytics" },
    { name: "Dr. Fatima Hassan", qualification: "Ph.D Applied Mathematics (Imperial)", designation: "Lecturer I", specialization: "Predictive Modeling" },
    { name: "Mr. Tunde Afolabi", qualification: "M.Sc Data Science (UI)", designation: "Lecturer II", specialization: "Data Visualization" },
    { name: "Dr. Ngozi Obi", qualification: "Ph.D Computer Science (ETH)", designation: "Senior Lecturer", specialization: "Data Mining" },
    { name: "Mrs. Blessing Eze", qualification: "M.Sc Statistics (ABU)", designation: "Assistant Lecturer", specialization: "Business Analytics" },
  ],
  contact: {
    address: "Department of Data Science, Faculty of Computing, University of Ibadan",
    email: "data-science@computing.ui.edu.ng",
    phone: "+234 801 345 6789",
  },
  hodName: "Prof. Adaora Nwachukwu",
  hodQualification: "Ph.D Statistics (Cambridge)",
  hodBio: "Prof. Adaora Nwachukwu is a distinguished statistician with over 20 years of experience in data science and statistical learning. She has published extensively in top-tier journals and has led several data-driven research projects.",
  welcomeMessage: "Welcome to the Department of Data Science. We are dedicated to transforming data into actionable insights and knowledge. Our curriculum combines rigorous statistical methods with modern computational techniques to prepare students for careers in the data-driven economy.",
  history: "The Department of Data Science was established as part of the Faculty of Computing in 2025. It offers the B.Sc. Data Science programme, designed to meet the growing demand for data professionals who can extract meaningful insights from complex datasets.",
};

// ICT Department Data
export const ictData: DepartmentData = {
  courses: {
    "100L": {
      first: [
        { code: "ICT 101", title: "Introduction to ICT", unit: 3, status: "Required" },
        { code: "ICT 103", title: "Computer Networks Fundamentals", unit: 3, status: "Required" },
        { code: "MTH 101", title: "Elementary Mathematics I", unit: 3, status: "Compulsory" },
        { code: "CSC 101", title: "Introduction to Programming", unit: 3, status: "Required" },
        { code: "GES 101", title: "Use of English I", unit: 2, status: "Compulsory" },
        { code: "ICT 105", title: "Digital Communication Systems", unit: 2, status: "Required" },
        { code: "ICT 107", title: "Introduction to Cybersecurity", unit: 3, status: "Required" },
        { code: "GES 103", title: "Nigerian Peoples and Culture", unit: 2, status: "Compulsory" },
      ],
      second: [
        { code: "ICT 102", title: "Web Technologies", unit: 3, status: "Required" },
        { code: "ICT 104", title: "Operating Systems", unit: 3, status: "Required" },
        { code: "MTH 102", title: "Elementary Mathematics II", unit: 3, status: "Compulsory" },
        { code: "CSC 104", title: "Programming with Python", unit: 3, status: "Required" },
        { code: "GES 102", title: "Use of English II", unit: 2, status: "Compulsory" },
        { code: "ICT 106", title: "Network Administration", unit: 3, status: "Required" },
        { code: "ICT 108", title: "Database Management", unit: 2, status: "Required" },
        { code: "GES 104", title: "History of Scientific Ideas", unit: 2, status: "Compulsory" },
      ],
    },
    "200L": generateCourses("ICT", 2),
    "300L": generateCourses("ICT", 3),
    "400L": generateCourses("ICT", 4),
    "500L": generateCourses("ICT", 5),
  },
  staff: [
    { name: "Prof. Ibrahim Musa", qualification: "Ph.D Information Technology (MIT)", designation: "Professor", specialization: "Network Security" },
    { name: "Dr. Chioma Okoro", qualification: "Ph.D Cybersecurity (Georgia Tech)", designation: "Senior Lecturer", specialization: "Ethical Hacking" },
    { name: "Dr. Yusuf Abdullahi", qualification: "Ph.D Telecommunications (Manchester)", designation: "Lecturer I", specialization: "Wireless Communications" },
    { name: "Mr. Emeka Nwosu", qualification: "M.Sc ICT (UI)", designation: "Lecturer II", specialization: "Cloud Computing" },
    { name: "Dr. Aisha Bello", qualification: "Ph.D Information Systems (LSE)", designation: "Senior Lecturer", specialization: "IT Governance" },
    { name: "Mr. Kunle Adeyemo", qualification: "M.Sc Network Engineering (OAU)", designation: "Assistant Lecturer", specialization: "IoT Systems" },
  ],
  contact: {
    address: "Department of Information & Communication Technology, Faculty of Computing, University of Ibadan",
    email: "ict@computing.ui.edu.ng",
    phone: "+234 801 456 7890",
  },
  hodName: "Prof. Ibrahim Musa",
  hodQualification: "Ph.D Information Technology (MIT)",
  hodBio: "Prof. Ibrahim Musa is a leading expert in network security and information systems. He has extensive experience in both academia and industry, having worked with major telecommunications companies before joining the university.",
  welcomeMessage: "Welcome to the Department of Information and Communication Technology. We are at the forefront of connecting the world through innovative technology solutions. Our department offers two programmes: B.Sc. Cybersecurity and B.Sc. Information and Communications Technology.",
  history: "The Department of Information and Communication Technology was established in 2025 as part of the new Faculty of Computing. It offers the B.Sc. Cybersecurity and B.Sc. Information and Communications Technology programmes, addressing the critical need for ICT professionals in Nigeria and beyond.",
};

// Software Engineering Department Data
export const softwareData: DepartmentData = {
  courses: {
    "100L": {
      first: [
        { code: "SEN 101", title: "Introduction to Software Engineering", unit: 3, status: "Required" },
        { code: "SEN 103", title: "Programming Fundamentals", unit: 3, status: "Required" },
        { code: "MTH 101", title: "Elementary Mathematics I", unit: 3, status: "Compulsory" },
        { code: "CSC 101", title: "Introduction to Computing", unit: 3, status: "Required" },
        { code: "GES 101", title: "Use of English I", unit: 2, status: "Compulsory" },
        { code: "SEN 105", title: "Software Development Life Cycle", unit: 2, status: "Required" },
        { code: "SEN 107", title: "Discrete Structures", unit: 3, status: "Required" },
        { code: "GES 103", title: "Nigerian Peoples and Culture", unit: 2, status: "Compulsory" },
      ],
      second: [
        { code: "SEN 102", title: "Object-Oriented Programming", unit: 3, status: "Required" },
        { code: "SEN 104", title: "Data Structures", unit: 3, status: "Required" },
        { code: "MTH 102", title: "Elementary Mathematics II", unit: 3, status: "Compulsory" },
        { code: "CSC 104", title: "Programming with Python", unit: 3, status: "Required" },
        { code: "GES 102", title: "Use of English II", unit: 2, status: "Compulsory" },
        { code: "SEN 106", title: "Version Control Systems", unit: 2, status: "Required" },
        { code: "SEN 108", title: "Web Development Basics", unit: 3, status: "Required" },
        { code: "GES 104", title: "History of Scientific Ideas", unit: 2, status: "Compulsory" },
      ],
    },
    "200L": generateCourses("SEN", 2),
    "300L": generateCourses("SEN", 3),
    "400L": generateCourses("SEN", 4),
    "500L": generateCourses("SEN", 5),
  },
  staff: [
    { name: "Prof. Oluwafemi Taiwo", qualification: "Ph.D Software Engineering (CMU)", designation: "Professor", specialization: "Software Architecture" },
    { name: "Dr. Amina Mohammed", qualification: "Ph.D Computer Science (Toronto)", designation: "Senior Lecturer", specialization: "Agile Methodologies" },
    { name: "Dr. Victor Osagie", qualification: "Ph.D Software Engineering (TU Munich)", designation: "Lecturer I", specialization: "DevOps" },
    { name: "Mr. Chidi Okafor", qualification: "M.Sc Software Engineering (UI)", designation: "Lecturer II", specialization: "Mobile Development" },
    { name: "Dr. Funke Adeleke", qualification: "Ph.D Computer Science (Edinburgh)", designation: "Senior Lecturer", specialization: "Software Testing" },
    { name: "Mrs. Joy Nnamdi", qualification: "M.Sc Software Engineering (UNILAG)", designation: "Assistant Lecturer", specialization: "UI/UX Design" },
  ],
  contact: {
    address: "Department of Software Engineering, Faculty of Computing, University of Ibadan",
    email: "software@computing.ui.edu.ng",
    phone: "+234 801 567 8901",
  },
  hodName: "Prof. Oluwafemi Taiwo",
  hodQualification: "Ph.D Software Engineering (CMU)",
  hodBio: "Prof. Oluwafemi Taiwo is a renowned software engineering expert with extensive experience in software architecture and system design. He has contributed to numerous open-source projects and has industry experience with leading technology companies.",
  welcomeMessage: "Welcome to the Department of Software Engineering. We are dedicated to building the software systems that power modern society. Our programme emphasizes both theoretical foundations and practical skills, preparing students to become proficient software engineers.",
  history: "The Department of Software Engineering was established in 2025 as part of the Faculty of Computing. It offers the B.Sc. Software Engineering programme, designed to produce graduates who can design, develop, and maintain high-quality software systems.",
};

// Map department IDs to their data
export const departmentDataMap: Record<string, DepartmentData> = {
  "cs-ai": csAiData,
  "data-science": dataScienceData,
  "ict": ictData,
  "software": softwareData,
};
