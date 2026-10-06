// Cloudflare Pages Function: GET /api/products
export async function onRequestGet() {
  return new Response(JSON.stringify({ success: true, data: [] }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
