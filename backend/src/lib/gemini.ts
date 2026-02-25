import { GoogleAuth } from 'google-auth-library';

// Google AI API — gemini-2.0-flash-exp-image-generation supports native image output
// Requires OAuth2 (not API keys); uses service account from GOOGLE_CLOUD_KEY_JSON
export const TRYON_MODEL = 'gemini-3-pro-image-preview';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${TRYON_MODEL}:generateContent`;

async function getAccessToken(): Promise<string> {
  const keyJson = process.env.GOOGLE_CLOUD_KEY_JSON;
  if (!keyJson) throw new Error('GOOGLE_CLOUD_KEY_JSON is required');

  const credentials = JSON.parse(keyJson);
  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/generative-language'],
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
    throw new Error(`Gemini API ${response.status}: ${text}`);
  }

  return response.json();
}

export const TRYON_PROMPT = `You are a professional virtual try-on system. Perform a precise garment transfer.

SOURCE OF TRUTH — TWO SEPARATE JOBS:

JOB 1 — FROM IMAGE 2 (Garment Photo), extract ONLY:
- The clothing item itself (colour, fabric, cut, collar style, buttons, embroidery, texture)
- IGNORE the model/mannequin wearing it in Image 2 completely. That person does not exist.

JOB 2 — FROM IMAGE 1 (Customer Photo), keep EVERYTHING exactly as-is:
- The customer's face, eyes, beard, skin tone, hair — pixel-perfect, no beautification
- The exact body pose, camera angle, tilt, and framing
- The exact background, room, lighting, shadows

OUTPUT:
- Start with IMAGE 1 as your canvas (exact copy)
- Remove only the clothing layer from the customer
- Dress the customer in the garment extracted from IMAGE 2
- The garment must drape, fold, and fit realistically on the customer's actual body shape and pose
- Output dimensions and framing must match IMAGE 1 exactly

DO NOT change anything except the clothing. The customer must look identical to IMAGE 1 in every way except they are now wearing the garment from IMAGE 2.`;

