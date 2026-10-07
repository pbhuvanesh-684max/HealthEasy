# Patient Management Web Application

A responsive, patient-centered healthcare web application featuring a warm yellowish-white theme, top navigation bar with a 3-bar (hamburger) menu drawer, multi-domain pages (Home, Patient, Doctor, Contact, About), and an automated background WhatsApp message dispatcher.

---

## 🌟 Key Features

- **Yellowish-White Visual Theme**: Soft cream (`#FFFDF0`), warm yellow (`#FEF9C3`), golden amber (`#D97706`), and slate navy (`#1E293B`) text for a soothing, readable healthcare interface.
- **Top Navigation Bar & 3-Bar (Hamburger) Drawer (`☰`)**: Responsive navigation drawer allowing seamless switching across domain pages.
- **Official Sender WhatsApp Hotline (`+91 8072246835`)**:
  - Automatically dispatches appointment confirmation details directly to the patient's mobile number (`+91`).
  - Contains Doctor Name, Specialty, Date, Time Slot, and Doctor Availability.
  - Zero browser popups, tab redirects, or permission prompts.
- **Multi-Page Domain Structure**:
  - `index.html`: Home page hero banner and domain overview.
  - `patient.html`: Patient care portal, appointment scheduling form, and lab records tracker.
  - `doctor.html`: Certified doctor directory with specialty filters.
  - `contact.html`: Contact form, emergency hotline, and clinic location.
  - `about.html`: Mission statement, core pillars, and patient feedback.
- **Automated Python Flask Server (`server.py`)**: Runs on port 5000 and handles WhatsApp Cloud API dispatches.

---

## 📁 Repository Directory Structure

```
patient-management/
├── index.html         # Home Page
├── patient.html       # Patient Portal & Booking Form
├── doctor.html        # Doctor Directory & Schedules
├── contact.html       # Contact & Emergency Support
├── about.html         # About Us & Mission
├── server.py          # Python Flask WhatsApp Server (Port 5000)
├── css/
│   └── styles.css     # CSS Variables & Theme Styling
└── js/
    └── main.js        # 3-Bar Menu & Silent WhatsApp Handler
```

---

## 🚀 Quick Start Guide

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Bhuvanesh84x/patient-management.git
   cd patient-management
   ```

2. **Run Python SMS / WhatsApp Backend**:
   ```bash
   pip install flask flask-cors requests twilio
   python server.py
   ```

3. **Open Front-End**:
   Open `index.html` or `patient.html` in any web browser.

---

## 👨‍💻 GitHub Account Details
- **Account / Owner**: `Bhuvanesh84x` / `pbhuvanesh684-max`
- **Repository**: `patient-management`
