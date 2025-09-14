Resume Insight — ATS-Enabled Resume Matcher

Resume Insight is a modern web application that helps candidates and recruiters evaluate how well a resume matches a job description.  
It computes an ATS (Applicant Tracking System) Score, highlights matched/missing skills, and provides suggestions for improving resumes to better align with job postings.  

Features
  Upload Resume → Upload resumes in supported formats (PDF/DOCX/TXT).  
  Job Description Input → Paste text or upload JD file.  
  ATS Scoring → Calculates score (0–100) based on keyword match, semantic similarity, and formatting.  
  Skill Match Highlights → Shows matched, missing, and suggested keywords.  
  Improvement Suggestions → Recommends changes for better ATS compatibility.  
  Modern UI → Built with React, TypeScript, TailwindCSS, and shadcn UI.  

 Tech Stack
Frontend
-  React + TypeScript  
-  TailwindCSS + shadcn/ui components  
-  Vite (build tool)  

Backend (optional integration)  
This frontend can connect to a Python backend (FastAPI/Flask) for:  
- Resume parsing (pdfminer, python-docx, Tesseract OCR)  
- NLP-powered scoring (spaCy, sentence-transformers, BM25)  
- PDF export for reports/resume suggestions  

Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/hemanth2812resume-job-matcher
2️⃣ Install Dependencies
Copy code
npm install
3️⃣ Run Development Server
Copy code
npm run dev
The app will be available at: http://localhost:5173

4️⃣ Build for Production
npm run build
npm run preview

📌 Usage
Open the app in your browser.
Upload a resume (PDF/DOCX/TXT).
Paste or upload a job description.
Get an ATS Score with:
Matched skills
Missing skills
Suggestions for improvement
(Optional) Export improved resume or ATS report (if backend is connected).

📄 License
This project is licensed under the MIT License.
