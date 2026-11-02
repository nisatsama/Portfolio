import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `You are the terminal AI assistant on Nisat Sama's personal developer workstation portfolio.
Respond as a knowledgeable, concise technical assistant representing Nisat Sama's verified qualifications and engineering work.
STRICT CONTENT ACCURACY RULES:
1. Nisat Sama is a Computer Science undergraduate at Adamas University, Kolkata (B.Tech CSE, 2024–2028, CGPA 8.77/10).
2. Professional identity: Java Backend Engineer | Software Developer | Full-Stack Engineer.
3. Core backend stack: Java 21, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, MySQL, MongoDB, Redis, Apache Kafka, Docker, REST APIs, JWT, OAuth 2.0.
4. Key Engineering Projects:
   - HookForge: Multi-tenant webhook delivery infrastructure built with Java 21, Spring Boot, PostgreSQL, Apache Kafka, Redis, Docker, JUnit, Mockito. Implements Transactional Outbox pattern, Kafka async event routing, concurrent delivery claiming with row locks, delivery state tracking (PENDING, IN_FLIGHT, DELIVERED, FAILED), exponential retry/recovery, tenant-scoped authentication, HMAC-SHA256 payload signing, Redis deduplication. GitHub: https://github.com/nisatsama/HookForge
   - ShelfSense: Event-driven retail inventory platform built with Java 21, Spring Boot, PostgreSQL, Kafka, Redis, Docker, AWS. SKU-level stockout prevention, transactional inventory reservation, PostgreSQL constraints preventing overselling, Kafka event processing, Redis caching. GitHub: https://github.com/nisatsama/ShelfSense
   - SupportFlow SLA: Full-stack helpdesk platform with Java, Spring Boot, Spring Security, React, PostgreSQL, JWT. RBAC (User/Admin), ticket lifecycle, conversation threads, secure REST APIs. GitHub: https://github.com/nisatsama/SupportFlow-SLA-Driven-Customer-Support-Platform
   - CodeCollab: Real-time collaborative coding platform with React, Node.js, Express, Socket.IO, WebSockets, Docker, Monaco Editor. Room collaboration, live synchronization, in-memory active session state, multi-language execution via Docker. GitHub: https://github.com/nisatsama/CodeCollab
   - Travelogia: Full-stack travel booking platform with React, Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.js. Auth, destination browsing, booking management, user dashboard. GitHub: https://github.com/nisatsama/Travelogia
5. Open Source: Pugdom v2 (TypeScript, React Native) - Merged PR #65 (refactored Login, Thread, Search screens with shared theme tokens and reusable UI primitives, verified 21 test suites comprising 223 tests).
6. Experience: AI Web Development Intern at InAmigos Foundation (Remote, June 2026 – July 2026).
7. Achievements: Flipkart GRiD 8.0 Round 3 qualifier (Software Development Track); Smart India Hackathon 2026 internal round winner; HCL GUVI AI Impact Buildathon (real-time fraud call detector with FastAPI/ML); Coding Ninjas × Google Vibe2Ship Hackathon (MERN + Gemini on Cloud Run).
8. Certifications: AWS Cloud Practitioner Essentials (May 2026), Azure Fundamentals (July 2026), Spring Framework Overview (July 2026), HackerRank Software Engineer Intern (July 2026).
9. Contact: nisatsama7547@gmail.com, +91 7439730487, LinkedIn: https://www.linkedin.com/in/nisat-sama/, GitHub: https://github.com/nisatsama, Location: Kolkata, India.
10. NEVER fabricate or guess any unverified information.
11. Do NOT mention LeetCode, GeeksforGeeks, or competitive programming ratings/stats.
12. Keep answers direct, professional, and concise (under 150 words), formatted with clean terminal-friendly text.`;

// API route for Ask Nisat assistant
app.post('/api/gemini/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    if (!ai) {
      // Graceful local deterministic answer when GEMINI_API_KEY is not configured
      const q = question.toLowerCase();
      let answer = "";
      if (q.includes("hookforge") || q.includes("webhook")) {
        answer = "HookForge is Nisat's multi-tenant webhook delivery platform built with Java 21, Spring Boot, PostgreSQL, Kafka, and Redis. It solves reliable event delivery using the Transactional Outbox pattern, Kafka asynchronous routing, HMAC-SHA256 signing, and Redis deduplication.";
      } else if (q.includes("shelfsense") || q.includes("inventory")) {
        answer = "ShelfSense is an event-driven retail inventory platform built with Java 21, Spring Boot, PostgreSQL, Kafka, and Redis. It focuses on stockout prevention, transactional inventory reservation with DB constraints, and Kafka event processing.";
      } else if (q.includes("supportflow") || q.includes("ticket") || q.includes("sla")) {
        answer = "SupportFlow SLA is a full-stack helpdesk platform built with Spring Boot and React. It features role-based access control (User/Admin), stateless JWT authentication, and ticket lifecycle workflows.";
      } else if (q.includes("codecollab") || q.includes("collaborat")) {
        answer = "CodeCollab is a real-time collaborative coding environment built with React, Node.js, Express, Socket.IO, Monaco Editor, and Docker for containerized code execution.";
      } else if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("java")) {
        answer = "Nisat specializes in Java Backend Engineering (Java 21, Spring Boot, Spring Security, Spring Data JPA, REST APIs), relational and NoSQL databases (PostgreSQL, MySQL, MongoDB, Redis), message streaming (Apache Kafka), Docker, and full-stack development with React.";
      } else if (q.includes("experience") || q.includes("intern") || q.includes("work")) {
        answer = "Nisat served as an AI Web Development Intern at InAmigos Foundation (June–July 2026), building responsive UI components, improving UX consistency, and designing prototypes in Figma.";
      } else if (q.includes("education") || q.includes("college") || q.includes("university")) {
        answer = "Nisat is pursuing a B.Tech in Computer Science & Engineering at Adamas University, Kolkata (2024–2028) with a CGPA of 8.77/10.";
      } else if (q.includes("opensource") || q.includes("pr") || q.includes("pugdom")) {
        answer = "Nisat contributed to Pugdom v2 (React Native & TypeScript) via merged PR #65, refactoring Login, Thread, and Search screens using shared theme tokens and verifying 21 test suites comprising 223 tests.";
      } else if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
        answer = "You can contact Nisat via email at nisatsama7547@gmail.com, phone at +91 7439730487, or connect on LinkedIn (linkedin.com/in/nisat-sama) and GitHub (github.com/nisatsama).";
      } else {
        answer = `Nisat Sama is a Java Backend Engineer and Computer Science undergraduate at Adamas University, Kolkata. He designs distributed systems, event-driven platforms, and REST APIs using Java 21, Spring Boot, PostgreSQL, Kafka, and Redis. Try asking specifically about his projects (HookForge, ShelfSense, SupportFlow, CodeCollab) or technical skills!`;
      }
      res.json({ answer, source: 'local-knowledge-engine' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const text = response.text || "No response generated.";
    res.json({ answer: text, source: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error("Gemini API error:", error?.message || error);
    res.status(500).json({
      error: "Unable to process question via Gemini API",
      fallback: "Nisat Sama is a Java Backend Engineer specializing in Spring Boot, Kafka, PostgreSQL, and distributed event architectures.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Portfolio server running on port ${port}`);
  });
}

startServer();
