// Response utilities and fallbacks
import { NextResponse } from 'next/server';

export function getFallbackResponse() {
  return NextResponse.json({
    reply: "Sorry, something went wrong with the AI assistant. Please try again."
  });
}