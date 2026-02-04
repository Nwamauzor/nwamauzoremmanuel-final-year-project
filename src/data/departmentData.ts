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
    { name: "Prof. B.O. Akinkunmi", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Physics (Ibadan), PhD Computer Science (Ibadan)", designation: "Professor", specialization: "Knowledge Representation and Formal Ontologies" },
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
        { code: "C-GST 111", title: "Communication in English", unit: 2, status: "Compulsory" },
        { code: "C-GST 112", title: "Nigerian Peoples and Culture", unit: 2, status: "Compulsory" },
        { code: "C-COS 101", title: "Introduction to Computing Science", unit: 3, status: "Compulsory" },
        { code: "C-COS 102", title: "Problem Solving", unit: 3, status: "Compulsory" },
        { code: "C-MTH 101", title: "Elementary Mathematics I (Algebra & Trigonometry)", unit: 2, status: "Compulsory" },
        { code: "C-MTH 102", title: "Elementary Mathematics II (Calculus)", unit: 2, status: "Compulsory" },
        { code: "C-STA 111", title: "Descriptive Statistics", unit: 3, status: "Compulsory" },
        { code: "C-PHY 101", title: "General Physics I (Mechanics)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 102", title: "General Physics II (Electricity & Magnetism)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 107", title: "General Practical Physics I", unit: 1, status: "Compulsory" },
        { code: "C-PHY 108", title: "General Practical Physics II", unit: 1, status: "Compulsory" },
      ],
      second: [
        { code: "C-MTH 103", title: "Elementary Mathematics III (Vectors, Geometry and Dynamics)", unit: 2, status: "Required" },
        { code: "C-STA 122", title: "Statistical Computing I", unit: 3, status: "Required" },
        { code: "UI-COS 103", title: "Practical Lab I", unit: 2, status: "Compulsory" },
        { code: "UI-GES 107", title: "Reproductive Health, Sexually Transmitted Infections (STIs) & HIV", unit: 1, status: "Required" },
        { code: "UI-GES 108", title: "Introduction to French", unit: 1, status: "Required" },
      ],
    },
    "200L": {
      first: [
        { code: "C-GST 212", title: "Philosophy, Logic and Human Existence", unit: 2, status: "Compulsory" },
        { code: "C-ENT 211", title: "Entrepreneurship and Innovation", unit: 2, status: "Compulsory" },
        { code: "C-COS 201", title: "Computer Programming I", unit: 3, status: "Compulsory" },
        { code: "C-COS 202", title: "Computer Programming II", unit: 3, status: "Compulsory" },
        { code: "C-MTH 201", title: "Mathematical Methods I", unit: 2, status: "Compulsory" },
        { code: "C-MTH 203", title: "Sets, Logic and Algebra I", unit: 2, status: "Compulsory" },
        { code: "C-CYB 201", title: "Introduction to Cybersecurity and Strategy", unit: 2, status: "Compulsory" },
        { code: "C-CSC 203", title: "Discrete Structures", unit: 2, status: "Compulsory" },
        { code: "C-IFT 211", title: "Digital Logic Design", unit: 2, status: "Compulsory" },
        { code: "C-DTS 201", title: "Introduction to Data Science", unit: 2, status: "Compulsory" },
        { code: "C-DTS 204", title: "Statistical Computing Inference and Modeling", unit: 3, status: "Compulsory" },
        { code: "C-DTS 299", title: "SIWES I", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-INS 202", title: "Human Computer Interface", unit: 2, status: "Elective" },
        { code: "C-STA 202", title: "Statistics for Physical Sciences and Engineering", unit: 3, status: "Required" },
        { code: "C-MTH 202", title: "Elementary Differential Equations", unit: 2, status: "Required" },
        { code: "UI-CSC 272", title: "Information Management Systems", unit: 2, status: "Required" },
        { code: "UI-CSC 236", title: "Introduction to Algorithms", unit: 2, status: "Required" },
        { code: "UI-COS 203", title: "Practical Lab II", unit: 2, status: "Compulsory" },
      ],
    },
    "300L": {
      first: [
        { code: "C-GST 312", title: "Peace and Conflict Resolution", unit: 2, status: "Compulsory" },
        { code: "C-ENT 312", title: "Venture Creation", unit: 2, status: "Compulsory" },
        { code: "C-MTH 209", title: "Introduction to Numerical Analysis", unit: 2, status: "Compulsory" },
        { code: "C-CSC 309", title: "Artificial Intelligence", unit: 2, status: "Compulsory" },
        { code: "C-DTS 211", title: "Introduction to R Programming", unit: 2, status: "Compulsory" },
        { code: "C-DTS 304", title: "Data Management I", unit: 2, status: "Compulsory" },
        { code: "C-DTS 316", title: "Probability for Data Science", unit: 3, status: "Compulsory" },
        { code: "C-DTS 399", title: "SIWES II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-CSC 308", title: "Operating Systems", unit: 2, status: "Required" },
        { code: "C-ICT 305", title: "Data Communication and Network", unit: 3, status: "Required" },
        { code: "C-IFT 212", title: "Computer Architecture and Organization", unit: 2, status: "Required" },
        { code: "UI-DTS 333", title: "Introduction to Business Intelligence and Data Visualisation", unit: 2, status: "Required" },
        { code: "UI-CSC 572", title: "Machine Learning", unit: 2, status: "Required" },
        { code: "UI-COS 301", title: "Practical Lab III", unit: 2, status: "Compulsory" },
        { code: "UI-CYB 204", title: "Cybersecurity in Business & Industry", unit: 2, status: "Elective" },
      ],
    },
    "400L": {
      first: [
        { code: "C-DTS 302", title: "Big Data Computing", unit: 2, status: "Compulsory" },
        { code: "C-DTS 322", title: "Data Science Innovation and Entrepreneurship", unit: 2, status: "Compulsory" },
      ],
      second: [
        { code: "UI-DTS 499", title: "Industrial Training III", unit: 6, status: "Compulsory" },
        { code: "C-STA 334", title: "Survey Methods and Sampling Theory", unit: 3, status: "Required" },
        { code: "UI-DTS 401", title: "Data Engineering", unit: 2, status: "Required" },
        { code: "UI-DTS 402", title: "Python for Data Science", unit: 2, status: "Required" },
        { code: "C-DTS 404", title: "Data Management II", unit: 2, status: "Required" },
        { code: "C-INS 304", title: "Web Development Using Content Management System", unit: 2, status: "Elective" },
        { code: "UI-CSC 477", title: "Computer Graphics", unit: 2, status: "Elective" },
      ],
    },
    "500L": {
      first: [
        { code: "C-COS 409", title: "Research Methodology and Report Writing", unit: 3, status: "Compulsory" },
        { code: "C-INS 401", title: "Project Management", unit: 2, status: "Compulsory" },
        { code: "C-DTS 308", title: "Ethics and Legal Issues in Data Science", unit: 2, status: "Compulsory" },
        { code: "C-DTS 403", title: "Data Visualisation for Data Driven Decision Making", unit: 2, status: "Compulsory" },
        { code: "C-DTS 597", title: "Final Year Project I", unit: 3, status: "Compulsory" },
        { code: "C-DTS 598", title: "Final Year Project II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-CSC 432", title: "Distributed Computer Systems", unit: 2, status: "Elective" },
        { code: "C-ICT 309", title: "Mobile Communication and Networking", unit: 3, status: "Elective" },
        { code: "UI-DTS 555", title: "Recommender System", unit: 2, status: "Elective" },
        { code: "UI-DTS 556", title: "Big Data in Social and Health Science", unit: 2, status: "Elective" },
        { code: "UI-CSC 583", title: "AI for Social Good", unit: 2, status: "Elective" },
        { code: "UI-CSC 584", title: "Internet of Things (IOT)", unit: 2, status: "Elective" },
        { code: "C-CSC 585", title: "Precision Agriculture", unit: 2, status: "Elective" },
      ],
    },
  },
  staff: [
    { name: "A.B. Adeyemo", qualification: "B.Sc. Engineering Physics (Ife), PGD, M.Tech., PhD Computer Science (Akure)", designation: "Professor", specialization: "Data Mining, Mobile and Internet Computing" },
    { name: "Adebola K. Ojo", qualification: "B.Sc. Computer Engineering (Ife), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Data/Web Mining, Computer Networks and Hardware" },
    { name: "Aderonke B. Sakpere", qualification: "B.Sc. Computer Science (Ado Ekiti), M.Sc. Computer Science (Ilorin), PhD Computer Science (UCT)", designation: "Senior Lecturer", specialization: "Data Privacy, ICT for Development, Human Computer Interaction" },
    { name: "B.I. Ayinla", qualification: "B.Sc. Computer Science (OOU), M.Sc., PhD Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Software Engineering, Machine Learning Algorithm, Cybersecurity" },
    { name: "Elizabeth O. Ogunseye", qualification: "B.Sc. Computer Science (Ekpoma), M.Sc. Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Health Informatics, Data Science" },
    { name: "O.F.W. Onifade", qualification: "B.Sc., M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Computer Vision, Machine Learning, Information Risk Management" },
    { name: "Angela U. Makolo", qualification: "B.Sc. Computer Science (Benin), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Bioinformatics, Software Engineering" },
  ],
  contact: {
    address: "Department of Data Science, Faculty of Computing, University of Ibadan",
    email: "data-science@computing.ui.edu.ng",
    phone: "+234 801 345 6789",
  },
  hodName: "Dr. Adebola K. Ojo",
  hodQualification: "B.Sc. Computer Engineering (Ife), M.Sc., PhD Computer Science (Ibadan)",
  hodBio: "Dr. Adebola K. Ojo is a distinguished academic with expertise in data/web mining and computer networks. He holds a B.Sc. in Computer Engineering from Obafemi Awolowo University, Ile-Ife, and obtained both his M.Sc. and PhD in Computer Science from the University of Ibadan. He has contributed significantly to research in data science and network systems.",
  welcomeMessage: "Welcome to the Department of Data Science. We are dedicated to transforming data into actionable insights and knowledge. Our curriculum combines rigorous statistical methods with modern computational techniques to prepare students for careers in the data-driven economy.",
  history: "The Department of Data Science was established as part of the Faculty of Computing in 2025. It offers the B.Sc. Data Science programme, designed to meet the growing demand for data professionals who can extract meaningful insights from complex datasets.",
};

// ICT Department Data
export const ictData: DepartmentData = {
  courses: {
    "100L": {
      first: [
        { code: "C-GST 111", title: "Communication in English", unit: 2, status: "Compulsory" },
        { code: "C-GST 112", title: "Nigerian Peoples and Culture", unit: 2, status: "Compulsory" },
        { code: "C-COS 101", title: "Introduction to Computing Science", unit: 3, status: "Compulsory" },
        { code: "C-COS 102", title: "Problem Solving", unit: 3, status: "Compulsory" },
        { code: "C-MTH 101", title: "Elementary Mathematics I (Algebra & Trigonometry)", unit: 2, status: "Compulsory" },
        { code: "C-MTH 102", title: "Elementary Mathematics II (Calculus)", unit: 2, status: "Compulsory" },
        { code: "C-STA 111", title: "Descriptive Statistics", unit: 3, status: "Compulsory" },
        { code: "C-PHY 101", title: "General Physics I (Mechanics)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 102", title: "General Physics II (Electricity & Magnetism)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 107", title: "General Practical Physics I", unit: 1, status: "Compulsory" },
        { code: "C-PHY 108", title: "General Practical Physics II", unit: 1, status: "Compulsory" },
      ],
      second: [
        { code: "C-MTH 103", title: "Elementary Mathematics III (Vectors, Geometry and Dynamics)", unit: 2, status: "Required" },
        { code: "C-STA 122", title: "Statistical Computing I", unit: 3, status: "Required" },
        { code: "UI-COS 103", title: "Practical Lab I", unit: 2, status: "Compulsory" },
        { code: "UI-GES 107", title: "Reproductive Health, Sexually Transmitted Infections (STIs) & HIV", unit: 1, status: "Required" },
        { code: "UI-GES 108", title: "Introduction to French", unit: 1, status: "Required" },
      ],
    },
    "200L": {
      first: [
        { code: "C-GST 212", title: "Philosophy, Logic and Human Existence", unit: 2, status: "Compulsory" },
        { code: "C-ENT 211", title: "Entrepreneurship and Innovation", unit: 2, status: "Compulsory" },
        { code: "C-IFT 211", title: "Digital Logic Design", unit: 2, status: "Compulsory" },
        { code: "C-COS 201", title: "Computer Programming I", unit: 3, status: "Compulsory" },
        { code: "C-COS 202", title: "Computer Programming II", unit: 3, status: "Compulsory" },
        { code: "C-MTH 201", title: "Mathematical Methods I", unit: 2, status: "Compulsory" },
        { code: "C-MTH 202", title: "Elementary Differential Equations", unit: 2, status: "Compulsory" },
        { code: "C-CSC 203", title: "Discrete Structures", unit: 2, status: "Compulsory" },
        { code: "C-ICT 201", title: "Introduction to Information and Communication Technology", unit: 2, status: "Compulsory" },
        { code: "C-INS 202", title: "Human Computer Interface", unit: 2, status: "Compulsory" },
        { code: "C-ICT 203", title: "Introduction to Web Technologies", unit: 2, status: "Compulsory" },
        { code: "C-ICT 299", title: "SIWES I", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-CYB 201", title: "Introduction to Cybersecurity and Strategy", unit: 2, status: "Required" },
        { code: "C-SEN 201", title: "Introduction to Software Engineering", unit: 2, status: "Required" },
        { code: "C-STA 202", title: "Statistics for Physical Sciences and Engineering", unit: 3, status: "Required" },
        { code: "UI-ICT 202", title: "Analogue and Digital Communications", unit: 2, status: "Required" },
        { code: "UI-CSC 272", title: "Information Management Systems", unit: 2, status: "Required" },
        { code: "UI-COS 203", title: "Practical Lab II", unit: 2, status: "Compulsory" },
      ],
    },
    "300L": {
      first: [
        { code: "C-GST 312", title: "Peace and Conflict Resolution", unit: 2, status: "Compulsory" },
        { code: "C-ENT 312", title: "Venture Creation", unit: 2, status: "Compulsory" },
        { code: "C-ICT 301", title: "Satellite Communication", unit: 2, status: "Compulsory" },
        { code: "C-ICT 305", title: "Data Communication System & Network", unit: 3, status: "Compulsory" },
        { code: "C-ICT 322", title: "ICT Innovation and Entrepreneurship", unit: 2, status: "Compulsory" },
        { code: "C-CYB 301", title: "Cryptography Techniques, Algorithms and Applications", unit: 2, status: "Compulsory" },
        { code: "C-CSC 308", title: "Operating Systems", unit: 3, status: "Compulsory" },
        { code: "C-CSC 309", title: "Artificial Intelligence", unit: 2, status: "Compulsory" },
        { code: "C-CSC 399", title: "SIWES II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-IFT 302", title: "Web Application Development", unit: 2, status: "Required" },
        { code: "C-DTS 304", title: "Data Management I", unit: 3, status: "Required" },
        { code: "C-IFT 212", title: "Computer Architecture and Organisation", unit: 2, status: "Required" },
        { code: "UI-COS 301", title: "Practical Lab III", unit: 2, status: "Compulsory" },
        { code: "C-MTH 209", title: "Introduction to Numerical Analysis", unit: 2, status: "Elective" },
        { code: "UI-CYB 204", title: "Cybersecurity in Business & Industry", unit: 2, status: "Elective" },
        { code: "UI-ICT 302", title: "Telecommunications Technology", unit: 2, status: "Required" },
        { code: "UI-CSC 572", title: "Machine Learning", unit: 2, status: "Required" },
      ],
    },
    "400L": {
      first: [
        { code: "C-ICT 309", title: "Mobile Communication and Network", unit: 2, status: "Compulsory" },
        { code: "C-ICT 418", title: "Design and Installation of Electrical and ICT Services", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "UI-ICT 401", title: "Radio Access Technologies", unit: 2, status: "Elective" },
        { code: "UI-ICT 402", title: "Fiber Optic Communications", unit: 2, status: "Elective" },
        { code: "UI-ICT 403", title: "Telecommunications Network Management", unit: 2, status: "Elective" },
        { code: "UI-ICT 499", title: "Industrial Training III", unit: 6, status: "Compulsory" },
        { code: "C-DTS 404", title: "Data Management II", unit: 2, status: "Required" },
        { code: "UI-CSC 477", title: "Computer Graphics", unit: 2, status: "Elective" },
        { code: "C-INS 304", title: "Web Development Using Content Management System", unit: 2, status: "Elective" },
      ],
    },
    "500L": {
      first: [
        { code: "C-COS 409", title: "Research Methodology and Technical Report Writing", unit: 3, status: "Compulsory" },
        { code: "C-INS 401", title: "Project Management", unit: 2, status: "Compulsory" },
        { code: "C-IFT 442", title: "Wireless Communication and Networking", unit: 3, status: "Compulsory" },
        { code: "C-CSC 597", title: "Final Year Project I", unit: 3, status: "Compulsory" },
        { code: "C-CSC 598", title: "Final Year Project II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-CSC 402", title: "Ethics and Legal Issues in Computer Science", unit: 2, status: "Required" },
        { code: "UI-ICT 303", title: "Digital Signal Processing", unit: 2, status: "Elective" },
        { code: "UI-ICT 502", title: "Radio Frequency and Microwave Engineering", unit: 2, status: "Elective" },
        { code: "UI-ICT 503", title: "Mobile Computing and Wireless Networks", unit: 2, status: "Elective" },
        { code: "UI-ICT 504", title: "Broadband and Advanced Communications", unit: 2, status: "Elective" },
        { code: "UI-ICT 505", title: "Telecommunications Switching and Transmission Systems", unit: 2, status: "Elective" },
        { code: "UI-ICT 506", title: "Sensor Networks and Intelligent Systems", unit: 2, status: "Elective" },
      ],
    },
  },
  staff: [
    { name: "O. Osunade", qualification: "B.Sc. Computer Engineering (Ife), M.Sc. Computer Science (Ibadan), MBA (Akure), PhD Computer Science (Ibadan)", designation: "Professor", specialization: "Computer Networks and Data Communications, Natural Language Processing" },
    { name: "T. Oguntunde", qualification: "B.Sc., M.Sc., PhD Computer Science (Ibadan)", designation: "Senior Lecturer", specialization: "Networking, Collaborative Learning Objects" },
    { name: "O.D. Adeniji", qualification: "B.Eng. Computer Engineering (Minna), M.Sc. Computer Engineering (Malaysia), PhD Computer Science (Ibadan)", designation: "Senior Lecturer", specialization: "Wireless Computing, Network Security and Hardware" },
    { name: "O. Adeleke", qualification: "B.Sc. Computer Science (LASU), M.Sc. Communications Physics (Akure), PhD Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Data Communications, Networking, Mobile Agents" },
    { name: "O.A. Abiola", qualification: "B.Sc. Computer Science (Ekpoma), M.Sc. Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Software Engineering, Autonomous Robotic Navigation" },
    { name: "A.B. Adeyemo", qualification: "B.Sc. Engineering Physics (Ife), PGD, M.Tech., PhD Computer Science (Akure)", designation: "Professor", specialization: "Data Mining, Mobile and Internet Computing" },
    { name: "Adebola K. Ojo", qualification: "B.Sc. Computer Engineering (Ife), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Data/Web Mining, Computer Networks and Hardware" },
    { name: "Nancy Woods", qualification: "B.Sc., M.Sc., PhD Computer Science (Ibadan)", designation: "Senior Lecturer", specialization: "Image Processing, Pattern Recognition" },
  ],
  contact: {
    address: "Department of Information & Communication Technology, Faculty of Computing, University of Ibadan",
    email: "ict@computing.ui.edu.ng",
    phone: "+234 801 456 7890",
  },
  hodName: "Prof. O. Osunade",
  hodQualification: "B.Sc. Computer Engineering (Ife), M.Sc. Computer Science (Ibadan), MBA (Akure), PhD Computer Science (Ibadan)",
  hodBio: "Prof. O. Osunade is a distinguished academic with expertise in computer networks, data communications, and natural language processing. He holds a B.Sc. in Computer Engineering from Obafemi Awolowo University, an M.Sc. in Computer Science from the University of Ibadan, an MBA from Federal University of Technology Akure, and a PhD in Computer Science from the University of Ibadan.",
  welcomeMessage: "Welcome to the Department of Information and Communication Technology. We are at the forefront of connecting the world through innovative technology solutions. Our department offers two programmes: B.Sc. Cybersecurity and B.Sc. Information and Communications Technology.",
  history: "The Department of Information and Communication Technology was established in 2025 as part of the new Faculty of Computing. It offers the B.Sc. Cybersecurity and B.Sc. Information and Communications Technology programmes, addressing the critical need for ICT professionals in Nigeria and beyond.",
};

// Software Engineering Department Data
export const softwareData: DepartmentData = {
  courses: {
    "100L": {
      first: [
        { code: "C-GST 111", title: "Communication in English", unit: 2, status: "Compulsory" },
        { code: "C-GST 112", title: "Nigerian Peoples and Culture", unit: 2, status: "Compulsory" },
        { code: "C-COS 101", title: "Introduction to Computing Sciences", unit: 3, status: "Compulsory" },
        { code: "C-COS 102", title: "Problem Solving", unit: 3, status: "Compulsory" },
        { code: "C-MTH 101", title: "Elementary Mathematics I (Algebra & Trigonometry)", unit: 2, status: "Compulsory" },
        { code: "C-MTH 102", title: "Elementary Mathematics II (Calculus)", unit: 2, status: "Compulsory" },
        { code: "C-STA 111", title: "Descriptive Statistics", unit: 3, status: "Compulsory" },
        { code: "C-PHY 101", title: "General Physics I (Mechanics)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 102", title: "General Physics II (Electricity & Magnetism)", unit: 2, status: "Compulsory" },
        { code: "C-PHY 107", title: "General Practical Physics I", unit: 1, status: "Compulsory" },
        { code: "C-PHY 108", title: "General Practical Physics II", unit: 1, status: "Compulsory" },
      ],
      second: [
        { code: "C-MTH 103", title: "Elementary Mathematics III (Vectors, Geometry and Dynamics)", unit: 2, status: "Required" },
        { code: "C-STA 122", title: "Statistical Computing I", unit: 3, status: "Required" },
        { code: "UI-COS 103", title: "Practical Lab I", unit: 2, status: "Compulsory" },
        { code: "UI-GES 107", title: "Reproductive Health, Sexually Transmitted Infections (STIs) & HIV", unit: 1, status: "Required" },
        { code: "UI-GES 108", title: "Introduction to French", unit: 1, status: "Required" },
      ],
    },
    "200L": {
      first: [
        { code: "C-GST 212", title: "Philosophy, Logic and Human Existence", unit: 2, status: "Compulsory" },
        { code: "C-ENT 211", title: "Entrepreneurship and Innovation", unit: 2, status: "Compulsory" },
        { code: "C-COS 201", title: "Computer Programming I", unit: 3, status: "Compulsory" },
        { code: "C-COS 202", title: "Computer Programming II", unit: 3, status: "Compulsory" },
        { code: "C-MTH 201", title: "Mathematical Methods I", unit: 2, status: "Compulsory" },
        { code: "C-MTH 202", title: "Elementary Differential Equations", unit: 2, status: "Compulsory" },
        { code: "C-CSC 203", title: "Discrete Structures", unit: 2, status: "Compulsory" },
        { code: "C-IFT 211", title: "Digital Logic Design", unit: 2, status: "Compulsory" },
        { code: "C-INS 204", title: "System Analysis and Design", unit: 3, status: "Compulsory" },
        { code: "C-SEN 201", title: "Introduction to Software Engineering", unit: 2, status: "Compulsory" },
        { code: "C-SEN 299", title: "SIWES I", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-INS 202", title: "Human-Computer Interface", unit: 2, status: "Required" },
        { code: "C-STA 202", title: "Statistics for Physical Sciences and Engineering", unit: 3, status: "Required" },
        { code: "C-IFT 302", title: "Web Application Development", unit: 2, status: "Required" },
        { code: "UI-CSC 236", title: "Introduction to Algorithms", unit: 2, status: "Required" },
        { code: "UI-CSC 272", title: "Information Management Systems", unit: 2, status: "Required" },
        { code: "UI-COS 203", title: "Practical Lab II", unit: 2, status: "Compulsory" },
      ],
    },
    "300L": {
      first: [
        { code: "C-GST 312", title: "Peace and Conflict Resolution", unit: 2, status: "Compulsory" },
        { code: "C-ENT 312", title: "Venture Creation", unit: 2, status: "Compulsory" },
        { code: "C-CSC 301", title: "Data Structures", unit: 3, status: "Compulsory" },
        { code: "C-CSC 308", title: "Operating Systems", unit: 3, status: "Compulsory" },
        { code: "C-CSC 309", title: "Artificial Intelligence", unit: 2, status: "Compulsory" },
        { code: "C-DTS 304", title: "Data Management I", unit: 3, status: "Compulsory" },
        { code: "C-IFT 212", title: "Computer Architecture and Organisation", unit: 2, status: "Compulsory" },
        { code: "C-SEN 301", title: "Object Oriented Analysis and Design", unit: 2, status: "Compulsory" },
        { code: "C-SEN 306", title: "Software Construction", unit: 2, status: "Compulsory" },
        { code: "C-SEN 399", title: "SIWES II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "UI-CSC 331", title: "Programming Principles and Paradigms", unit: 2, status: "Required" },
        { code: "UI-CSC 334", title: "Systems Programming", unit: 2, status: "Required" },
        { code: "UI-CSC 351", title: "Formal Languages and Automata Theory", unit: 2, status: "Required" },
        { code: "UI-CSC 572", title: "Machine Learning", unit: 2, status: "Required" },
        { code: "UI-COS 301", title: "Practical Lab III", unit: 2, status: "Required" },
        { code: "C-MTH 209", title: "Introduction to Numerical Analysis", unit: 2, status: "Elective" },
        { code: "UI-CYB 204", title: "Cybersecurity in Business & Industry", unit: 2, status: "Elective" },
      ],
    },
    "400L": {
      first: [
        { code: "C-SEN 304", title: "Software Testing and Quality Assurance", unit: 2, status: "Compulsory" },
        { code: "C-SEN 410", title: "Software Architecture and Design", unit: 2, status: "Compulsory" },
      ],
      second: [
        { code: "UI-SEN 499", title: "Industrial Training III", unit: 6, status: "Compulsory" },
        { code: "C-DTS 404", title: "Data Management II", unit: 2, status: "Required" },
        { code: "UI-SEN 402", title: "Software Engineering Economics", unit: 2, status: "Required" },
        { code: "UI-CSC 431", title: "Compiler Construction", unit: 2, status: "Required" },
        { code: "UI-CSC 477", title: "Computer Graphics", unit: 2, status: "Elective" },
        { code: "C-INS 304", title: "Web Development Using Content Management System", unit: 2, status: "Elective" },
        { code: "C-INS 311", title: "E-Business Systems Development", unit: 2, status: "Elective" },
      ],
    },
    "500L": {
      first: [
        { code: "C-SEN 322", title: "Software Engineering Innovation and New Technology", unit: 2, status: "Compulsory" },
        { code: "C-SEN 401", title: "Software Configuration Management and Maintenance", unit: 2, status: "Compulsory" },
        { code: "C-COS 409", title: "Research Methodology and Technical Report Writing", unit: 3, status: "Compulsory" },
        { code: "C-INS 401", title: "Project Management", unit: 2, status: "Compulsory" },
        { code: "C-SEN 597", title: "Final Year Project I", unit: 3, status: "Compulsory" },
        { code: "C-SEN 598", title: "Final Year Project II", unit: 3, status: "Compulsory" },
      ],
      second: [
        { code: "C-CSC 402", title: "Ethics and Legal Issues in Computer Science", unit: 2, status: "Required" },
        { code: "UI-CSC 401", title: "Concurrency Design & Implementation", unit: 2, status: "Required" },
        { code: "UI-CSC 420", title: "Formal Methods in Systems Design", unit: 2, status: "Elective" },
        { code: "UI-CSC 421", title: "Programming Language Semantics", unit: 2, status: "Elective" },
        { code: "UI-CSC 431", title: "Compiler Construction", unit: 2, status: "Required" },
        { code: "C-IFT 310", title: "Mobile Applications Development", unit: 2, status: "Elective" },
        { code: "UI-CSC 583", title: "AI for Social Good", unit: 2, status: "Elective" },
        { code: "UI-CSC 584", title: "Internet of Things (IOT)", unit: 2, status: "Elective" },
      ],
    },
  },
  staff: [
    { name: "S.O. Akinola", qualification: "B.Sc. Computer Science (Ibadan), M.Inf Science (Ibadan), PhD Computer Science (Ibadan)", designation: "Professor", specialization: "Software Engineering, Data Mining" },
    { name: "Ibiyinka T. Ayorinde", qualification: "B.Tech. Computer Science (Akure), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Knowledge Representation, Data Mining and Software Engineering" },
    { name: "Angela U. Makolo", qualification: "B.Sc. Computer Science (Benin), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Bioinformatics, Software Engineering" },
    { name: "I.O. Olaleye", qualification: "B.Sc. Computer Science (Iwo), M.Sc. Computer Science (Ibadan)", designation: "Assistant Lecturer", specialization: "Software Engineering, Artificial Intelligence" },
    { name: "S.O. Titiloye", qualification: "B.Sc. Computer Science (Iwo), M.Sc. Computer Science (Ibadan)", designation: "Assistant Lecturer", specialization: "Software Engineering, Artificial Intelligence" },
    { name: "B.O. Akinkunmi", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Physics (Ibadan), PhD Computer Science (Ibadan)", designation: "Professor", specialization: "Knowledge Representation and Formal Ontologies" },
    { name: "Fausat B. Oladejo", qualification: "B.Sc., M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Knowledge Management, Artificial Intelligence, Business Intelligence and Software Engineering, Natural Language Processing" },
    { name: "B.I. Ayinla", qualification: "B.Sc. Computer Science (Ago-Iwoye), M.Sc., PhD Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Software Engineering, Machine Learning Algorithms and Cybersecurity" },
    { name: "O.A. Abiola", qualification: "B.Sc. Computer Science (Ekpoma), M.Sc. Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Software Engineering, Autonomous Robotic Navigation" },
  ],
  contact: {
    address: "Department of Software Engineering, Faculty of Computing, University of Ibadan",
    email: "software@computing.ui.edu.ng",
    phone: "+234 801 567 8901",
  },
  hodName: "Dr. Ibiyinka T. Ayorinde",
  hodQualification: "B.Tech. Computer Science (Akure), M.Sc., PhD Computer Science (Ibadan)",
  hodBio: "Dr. Ibiyinka T. Ayorinde is a distinguished academic with expertise in knowledge representation, data mining, and software engineering. She holds a B.Tech. in Computer Science from Federal University of Technology Akure and obtained both her M.Sc. and PhD in Computer Science from the University of Ibadan. She has made significant contributions to research in software engineering methodologies.",
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
