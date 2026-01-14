import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const n8nUrl = siteConfig.n8nWebhookUrl;

        const response = await fetch(n8nUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chatInput: message }),
        });

        if (!response.ok) {
            throw new Error(`n8n responded with ${response.status}`);
        }

        const data = await response.json();

        // n8n usually returns an array or an object with 'output' or text
        // Adjust this based on your n8n workflow's response structure
        // Common format is { output: "answer" } or similar
        return NextResponse.json(data);
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch response from assistant' }, { status: 500 });
    }
}
