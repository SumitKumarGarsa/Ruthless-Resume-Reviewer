# ⚔️ Ruthless Resume Reviewer  
Brutally honest, AI-powered resume analysis built with Next.js 16, React 19, Prisma, OpenAI, Tailwind v4, and Server Actions.

---

## 🎖️ Badges

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-3982CE?style=for-the-badge&logo=prisma)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1-black?style=for-the-badge&logo=openai)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## 🧠 Project Overview

**Ruthless Resume Reviewer** is a full-stack AI-powered resume analysis tool that:

- Extracts text from PDF/DOCX resumes  
- Analyzes structure, clarity, and impact  
- Provides brutally honest, actionable feedback  
- Scores resumes and suggests improvements  
- Saves user history with authentication  

The system uses modern features from **Next.js 16 + React 19**, Server Actions, and the latest AI integration via OpenAI.

---

## 🖼️ Demo Preview (Add your GIF here)

```
📌 Place GIF or screen recording here  
(e.g., /public/demo.gif)
```

---

## 🚀 Features

### 🎯 AI-Powered Resume Analysis
- PDF & DOCX text extraction  
- Honest, harsh, actionable feedback  
- Bullet point rewrites  
- ATS optimization suggestions  

### 🧩 Modern UI/UX
- Tailwind v4 (alpha)  
- Lucide Icons  
- Framer Motion animations  
- Clean, responsive layout  

### 🔐 Authentication
- Google OAuth  
- Session management via Prisma Adapter  

### 🗂️ Resume History
- Saves resumes & AI feedback  
- Dashboard view  

---

## 📂 Project Structure

```
/app
  /api
    /auth/[...nextauth]
    /upload
  /dashboard
  layout.tsx
  page.tsx

/components
  ResumeUpload.tsx
  ResumeAnalysisResult.tsx
  Navbar.tsx

/lib
  auth.ts
  prisma.ts
  openai.ts
  fileParser.ts

/prisma
  schema.prisma

/public
/styles
  globals.css

.env.example
package.json
README.md
```

---

## 🧩 Environment Variables

Create `.env`:

```
OPENAI_API_KEY=
DATABASE_URL="file:./prisma/dev.db"

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

---

## 🗄️ Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

(Optional) View DB:

```bash
npx prisma studio
```

---

## 🧱 Architecture Diagram

```
User → Upload Resume → File Parser (PDF/DOCX)
      → Extracted Text → OpenAI Analysis Engine
      → Prisma DB → Save Result → Dashboard
```

---

## 📡 API Endpoints

### **POST /api/upload**
Uploads resume and triggers AI analysis.

**FormData Input:**
- `file`: PDF or DOCX

**Response:**
```json
{
  "text": "... extracted text ...",
  "feedback": "... ruthless AI review ..."
}
```

### **NextAuth Routes**
- `/api/auth/signin`
- `/api/auth/signout`
- `/api/auth/callback/google`

---

## 🔧 Installation

```bash
git clone https://github.com/<your-username>/ruthless-resume-reviewer.git
cd ruthless-resume-reviewer
npm install
```

---

## 🚀 Run Locally

```bash
npm run dev
```

---

## 🧪 Recommended Enhancements

- Resume score model  
- Export improved resume as DOCX  
- Job description matcher  
- AI-generated bullet point optimizer  
- PDF rendering preview  

---

## 🤝 Contributing
Pull requests welcome.  
Open issues for bugs/features.

---

## 📄 License
MIT License © 2025
