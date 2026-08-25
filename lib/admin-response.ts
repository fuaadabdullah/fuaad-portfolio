import { NextResponse } from "next/server";

export function unauthorizedAdminResponse(): NextResponse {
  return NextResponse.json(
    { error: "Unauthorized. Admin Bearer token required." },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Bearer realm="admin"',
      },
    }
  );
}
