import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.TELEHEALTH_PASSWORD;
const COOKIE = "th_auth";

function gatePage(error: boolean) {
  return `<!doctype html>
<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Confidential — Bilikis Sabitu</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;background:#0A0A0A;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;box-sizing:border-box}
  form{background:#141414;padding:32px;border-radius:20px;width:min(360px,100%);border:1px solid #2a2a2a}
  h1{font-size:18px;margin:0 0 8px}
  p{color:#999;font-size:14px;margin:0 0 20px;line-height:1.5}
  input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid #333;background:#000;color:#fff;font-size:15px;margin-bottom:12px}
  button{width:100%;padding:12px;border-radius:10px;border:none;background:#FF5E00;color:#fff;font-weight:700;font-size:14px;cursor:pointer}
  .err{color:#ff6b6b;font-size:13px;margin:-4px 0 12px}
</style></head>
<body>
  <form method="POST">
    <h1>This case study is confidential</h1>
    <p>It's under NDA. Enter the password to view it.</p>
    ${error ? '<div class="err">Wrong password, try again.</div>' : ""}
    <input type="password" name="password" placeholder="Password" autofocus required />
    <button type="submit">View case study</button>
  </form>
</body></html>`;
}

export async function middleware(req: NextRequest) {
  if (req.cookies.get(COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  if (req.method === "POST") {
    const form = await req.formData();
    if (form.get("password") === PASSWORD) {
      const res = NextResponse.redirect(req.nextUrl);
      res.cookies.set(COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        path: "/work/telehealth",
        maxAge: 60 * 60 * 24 * 30,
      });
      return res;
    }
    return new NextResponse(gatePage(true), { status: 401, headers: { "content-type": "text/html" } });
  }

  return new NextResponse(gatePage(false), { headers: { "content-type": "text/html" } });
}

export const config = {
  matcher: ["/work/telehealth"],
};
