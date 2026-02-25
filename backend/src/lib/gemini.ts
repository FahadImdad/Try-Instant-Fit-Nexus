import { GoogleAuth } from 'google-auth-library';

// Vertex AI — gemini-3-pro-image-preview supports native image generation output
export const TRYON_MODEL = 'gemini-3-pro-image-preview';

const PROJECT = process.env.GOOGLE_CLOUD_PROJECT_ID ?? 'tryinstantfit-api';
const LOCATION = 'us-central1';
const API_URL = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/${LOCATION}/publishers/google/models/${TRYON_MODEL}:generateContent`;

async function getAccessToken(): Promise<string> {
  const keyJson = process.env.GOOGLE_CLOUD_KEY_JSON;
  if (!keyJson) throw new Error('GOOGLE_CLOUD_KEY_JSON is required');

  const credentials = JSON.parse(keyJson);
  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error('Failed to get OAuth2 access token from service account');
  return token;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateContent(requestBody: object): Promise<any> {
  const token = await getAccessToken();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vertex AI ${response.status}: ${text}`);
  }

  return response.json();
}

export const TRYON_PROMPT = `You are a virtual try-on AI. Generate a realistic photo showing the person wearing the garment.

Rules:
- Keep the person's face, skin tone, pose, and background EXACTLY as in their photo
- Replace ONLY the clothing with the provided garment
- Make the garment look natural — adjust for body shape, lighting, and shadows
- The result must look like a real photo, not an illustration

Generate the virtual try-on image now.`;
