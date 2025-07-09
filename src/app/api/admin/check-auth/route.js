// /api/admin/check-auth.js 
import { authenticate } from "@/lib/auth"; 

export async function GET(req) {
  const isAuthenticated = authenticate(req);

  if (!isAuthenticated) {
    return new Response(JSON.stringify({ authorized: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ authorized: true }), { status: 200 });
}
