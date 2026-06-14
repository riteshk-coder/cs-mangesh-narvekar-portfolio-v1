/**
 * Lightweight client for the portfolio backend API.
 *
 * The backend base URL is read from VITE_API_BASE_URL (set in a
 * `.env` file at the project root — see `.env.example`). This file
 * contains no UI; it is only used by the existing form submit
 * handlers in App.tsx and BookingModal.tsx.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

// 15 second timeout — fast failure instead of hanging indefinitely
const REQUEST_TIMEOUT_MS = 15000;

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

async function postJSON(path: string, payload: object): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Request timed out. The server is waking up — please try again in a moment.');
    }
    throw new Error('Unable to reach the server. Please check your connection and try again.');
  } finally {
    clearTimeout(timeoutId);
  }

  let data: ApiResponse | null = null;
  try {
    data = (await response.json()) as ApiResponse;
  } catch {
    // Response had no/invalid JSON body — fall through to status check below.
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong. Please try again later.');
  }

  return data ?? { success: true, message: 'Success' };
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface BookingFormPayload {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  serviceType: string;
  description: string;
}

/** Submits the "Direct Advisory Requisition" contact form. */
export function submitContactForm(payload: ContactFormPayload): Promise<ApiResponse> {
  return postJSON('/api/contact', payload);
}

/** Submits the "Schedule Corporate Advisory" booking form. */
export function submitBookingForm(payload: BookingFormPayload): Promise<ApiResponse> {
  return postJSON('/api/booking', payload);
}
