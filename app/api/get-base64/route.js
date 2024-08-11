import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) { 

    const { filepath } = await request.json();

    try {

        const fontPath = path.resolve(`./public/${filepath}`);
        const fontData = fs.readFileSync(fontPath);
        const base64Font = fontData.toString('base64');

        return NextResponse.json({ response: base64Font }, { status: 200 });

    } catch (e) {

        console.log(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });

    }

}