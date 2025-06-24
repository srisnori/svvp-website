import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    const range = 'Form Responses 1!A2:E'; 

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = res.data.values || [];

    function convertDriveLinkToImageURL(link: string): string | null {
      const idMatch = link.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
      if (!idMatch) return null;
      const fileId = idMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    const events = rows.map((row) => {
      const flyerUrl = convertDriveLinkToImageURL(row[4] ?? '');
      console.log('Drive link:', row[4], '→', flyerUrl);

      return {
        title: row[1],
        date: row[2],
        donateLink: row[3],
        flyerUrl,
      };
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}