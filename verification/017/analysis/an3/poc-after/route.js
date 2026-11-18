import { after } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  after(() => { console.log('POC app-route after() callback RAN'); });
  return Response.json({ outcome: 'after() accepted' });
}
