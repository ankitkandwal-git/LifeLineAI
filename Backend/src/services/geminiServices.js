import "dotenv/config";

const SEVERITY_LEVELS = new Set(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

const normalizeSeverity = (severity, sourceText = "") => {
  const value = String(severity || "").trim().toUpperCase();

  if (SEVERITY_LEVELS.has(value)) {
    return value;
  }

  const text = String(sourceText || "").toLowerCase();

  if (/(critical|life[- ]threatening|unconscious|cardiac arrest|severe bleeding)/.test(text)) {
    return "CRITICAL";
  }

  if (/(high|severe|urgent|immediate|difficulty breathing|chest pain|stroke|seizure|fracture|major)/.test(text)) {
    return "HIGH";
  }

  if (/(low|mild|minor|small|slight|stable)/.test(text)) {
    return "LOW";
  }

  return "MEDIUM";
};

export const analyzeEmergency = async (message) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  process.env.GOOGLE_API_KEY = apiKey;

  const { GoogleGenAI } = await import("@google/genai");

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are an emergency medical assistant.

Return ONLY valid JSON.

Severity must be exactly one of: LOW, MEDIUM, HIGH, CRITICAL.
If the situation is unclear, use MEDIUM.

{
  "severity":"",
  "summary":"",
  "firstAid":[],
  "dontDo":[],
  "department":""
}

User:
${message}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const text = response.text;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {
      ...parsed,
      severity: normalizeSeverity(parsed.severity, `${parsed.summary || ""} ${message}`),
    };
  } catch (err) {
    console.error("Gemini generateContent error:", err?.message || err);
    throw err;
  }
};