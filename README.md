# Mediscan

## Overview

MediScan is a web-based medical diagnostic platform designed to assist in the early detection of cancer using Artificial Intelligence and medical imaging. The application provides an intuitive interface where users can explore AI-powered diagnostic modules for multiple cancer types, including prostate, liver, and lung cancer.

The platform combines a responsive frontend with deep learning models to provide quick, accessible, and informative diagnostic support.

---

## Features

- AI-assisted cancer diagnosis
- Support for multiple cancer types
  - Prostate Cancer
  - Liver Cancer
  - Lung Cancer
- Interactive and responsive user interface
- User authentication (Login & Signup)
- Disease-specific result pages
- Medical image visualization
- About and License pages
- Contact modal for user support

---

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Remix Icons

### AI & Machine Learning

- YOLO-based detection models
- Deep Learning for medical image analysis

---

## Project Structure

```
Mediscan/
│
├── project.html          # Home page
├── about.html            # About MediScan
├── login.html            # User login
├── signup.html           # User registration
├── review.html           # Review page
├── license.html          # License information
│
├── liver.html            # Liver diagnosis
├── lung.html             # Lung diagnosis
├── prostate.html         # Prostate diagnosis
│
├── style.css
├── about.css
├── project.css
├── prostate.css
│
├── js/
│   ├── liver-chart.js
│   ├── lungs-chart.js
│   └── prostate-chart.js
│
├── img/
├── liver_img/
├── lungs_img/
└── prostate_img/
```

---

## Workflow

1. User logs into the platform.
2. Navigate to the desired diagnostic module.
3. View AI-assisted diagnostic information and visual results.
4. Explore disease-specific details and supporting visualizations.
5. Contact the MediScan team through the integrated contact section if required.

---

## Supported Diagnostic Modules

- Prostate Cancer Detection
- Liver Cancer Detection
- Lung Cancer Detection

Each module presents dedicated pages, supporting images, and visual representations to improve understanding of diagnostic outcomes.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Devil1867/Mediscan.git
```

Move into the project directory:

```bash
cd Mediscan
```

Open the project using your preferred IDE.

Run the application using a local web server such as:

- Live Server (VS Code)
- XAMPP
- Apache
- Tomcat (if deploying with `web.xml`)

---

## Future Improvements

- Integration with live AI inference models
- Medical image upload functionality
- Patient dashboard
- Doctor portal
- Diagnostic history
- Report generation in PDF format
- Appointment scheduling
- Cloud database integration
- Real-time prediction API

---

## Disclaimer

MediScan is developed for educational and research purposes. The diagnostic information provided by the application should not be considered a replacement for professional medical advice, diagnosis, or treatment. Users should always consult qualified healthcare professionals for medical decisions.

---

## Contributors

- Hrituraj Deb
- Project Team Members

---

## License

This project is intended for academic and educational purposes. Refer to the `license.html` page included in the repository for additional licensing information.
