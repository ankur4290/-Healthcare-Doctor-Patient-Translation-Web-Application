# HealthTranslate: AI Doctor–Patient Translation Bridge

A full-stack web application designed to break language barriers in healthcare. This application enables seamless, real-time communication between doctors and patients through AI-powered translation and automated medical summarization.

---

## 🚀 Core Functionalities (100% Completed)

### 1. Real-Time Translation Bridge
- **Dual-Role Support**: Switch between **Doctor** and **Patient** roles instantly.
- **AI Translation**: High-accuracy translations using Google **Gemini 1.5 Flash**.
- **Context Awareness**: Optimized prompts ensure medical terminology is translated accurately.

### 2. Professional Chat Interface
- **Role Distinction**: Blue theme for doctors, Emerald theme for patients.
- **Modern UI**: Built with a clean, distraction-free aesthetic using Tailwind CSS and Framer Motion.
- **Mobile First**: Fully responsive layout for hospital tablets and mobile devices.

### 3. Voice Messaging & Storage
- **Direct Recording**: Record audio messages directly in the browser (MediaRecorder API).
- **Embedded Playback**: Listen to audio clips immediately within the conversation flow.
- **Server-Side Persistence**: Audio files are safely stored and served via the backend.

### 4. Persistence & History
- **PostgreSQL Integration**: Conversations and messages persist beyond active sessions.
- **Timestamps**: Every interaction is logged with precise timing.

### 5. Multi-Lingual Search
- **Instant Keyword Search**: Global search across all previous conversations.
- **Bilingual Results**: Matches search terms in both the original and translated text.

### 6. AI Medical Summary
- **Smart Synthesis**: Generates a concise medical report at any time.
- **Key Highlights**: Automatically extracts **Symptoms**, **Medications**, and **Follow-up Actions**.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Java 17, Spring Boot 3.2, Spring Data JPA, RestTemplate.
- **Database**: PostgreSQL.
- **AI Engine**: Google Gemini 1.5 Flash (via Generative Language API).

---

## 🚦 Getting Started

### Prerequisites
- Java 17 installed
- Node.js 18+ installed
- PostgreSQL running locally

### 1. Backend Setup
1. Open `backend/src/main/resources/application.properties`.
2. Configure your PostgreSQL credentials.
3. Add your Gemini API Key to `ai.api.key`.
4. Run:
   ```cmd
   mvn spring-boot:run
   ```
   *The backend will start on port **8081**.*

### 2. Frontend Setup
1. Navigate to the `frontend` folder.
2. Run:
   ```cmd
   npm install
   npm run dev
   ```
   *The frontend will start on port **3005**.*

---

## 🧠 AI Strategy & Resiliency
- **Pure AI Architecture**: The system prioritizes Google **Gemini 1.5 Flash** for high-accuracy clinical translations.
- **Healthcare Continuity Mode**: I've implemented a robust "Offline Resiliency" feature. If the local network is restricted or disconnected (e.g., in hospital basements or secure zones), the system automatically detects the connection failure and switches to an internal Medical Dictionary. This ensures the communication bridge between doctor and patient **never breaks**, even during outages.
- **History Retrieval**: Used a "Lazy Filtering" approach on the backend to ensure fast search even as the database grows.

---

## 📝 Submission Details
- **Developer**: ANKUR YADAV
- **Repository**: [GitHub Link Placeholder]
- **Status**: All mandatory features implemented, audited, and cleaned for production.
