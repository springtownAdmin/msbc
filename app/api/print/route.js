import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST (request) {

  const { htmlContent } = await request.json();

  if (!htmlContent) {
    return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
  }

  try {

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Error handling to log any resource loading issues
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
 
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

    const options = { format: 'A4', printBackground: true };

    const pdfBuffer = await page.pdf(options);

    await browser.close();

    const response = new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=sample.pdf',
      },
    });

    return response;

  } catch (error) {

    console.error('Error generating PDF:', error);
    console.log(error)
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
    
  }

}