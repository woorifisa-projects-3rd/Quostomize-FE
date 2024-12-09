import { NextResponse } from "next/server";
import { auth } from "../../../../auth"

export async function POST(request) {
  const session = await auth();
  const accessToken = session.accessToken;
  const refreshToken = session.refreshToken;
  const traceId = session.traceId;

  const response = await fetch(`${process.env.SERVER_URL}/v1/api/auth/logout`,
      {
          method: "POST",
          headers: {
              "Content-type": "application/json",
              Cookie: `refreshToken=${refreshToken}`,
              "traceId": `${traceId}`
          },
          credentials: "include",
          cache: "no-store",
          body: JSON.stringify({
            accessToken: accessToken
          })
      }
  );

  return NextResponse.redirect(new URL("/login", `${process.env.AUTH_URL}`));
};