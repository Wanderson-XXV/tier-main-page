import { NextRequest, NextResponse } from "next/server";
import { invalidateTierSession, TIER_SESSION_COOKIE } from "../../../lib/tier-auth";

export async function POST(request: NextRequest) {
  await invalidateTierSession(request.cookies.get(TIER_SESSION_COOKIE)?.value);
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set({ name: TIER_SESSION_COOKIE, value: "", httpOnly: true, sameSite: "lax", path: "/", expires: new Date(0) });
  return response;
}
