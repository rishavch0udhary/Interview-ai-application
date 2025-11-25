import { NextResponse } from "next/server";
import { auth } from "@/firebase/admin";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idToken } = body;
    console.log("Received idToken:", idToken);
    if (!idToken) {
      return NextResponse.json({ success: false, message: "Missing idToken" }, { status: 400 });
    }

    // Create a session cookie using Firebase Admin
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000,
    });

    const res = NextResponse.json({ success: true });

    // Set cookie on the response so the browser stores it
    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      maxAge: SESSION_DURATION,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    console.error("/api/session error:", error);
    return NextResponse.json({ success: false, message: "Failed to create session" }, { status: 500 });
  }
}
