import { NextResponse, NextRequest } from 'next/server';
import { OpenAI } from 'openai';
import fs from "node:fs"
import path from "node:path"
const openai = new OpenAI();


let _systemPrompt: null | string = null;
function getSystemPrompt(): string {
    if (!_systemPrompt) {
        _systemPrompt = fs.readFileSync(path.join(process.cwd(), 'src/app/chatbot/ai-prompt.md'), 'utf8');
    }
    return _systemPrompt;
}

let _exampleOutput: null | string = null;
function getExampleOutput(): string {
    if (!_exampleOutput) {
        _exampleOutput = fs.readFileSync(path.join(process.cwd(), 'src/app/chatbot/ai-example-output.md'), 'utf8')
    }
    return _exampleOutput;
}

export async function POST(req: NextRequest) {
    try {
        // Extract the 'question' from the request body
        const { question } = await req.json();

        if (!question) {
            return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }

        // Call the OpenAI completion API
        const response = await openai.chat.completions.create({
            model: 'gpt-4o', // or another model of your choice
            messages: [
                { role: 'system', content: getSystemPrompt() },
                { role: 'user', content: "Make a button saying Hello World" },
                { role: 'system', content: getExampleOutput() },
                { role: 'user', content: question },
            ],
            max_tokens: 2048,
        });

        const mainContent = response.choices[0].message.content ?? "";
        const extractedCode = mainContent.replace(/import.*\n/g, "").match(/```typescript([\s\S]*?)```/)?.[1] ?? null;
        const extractedOutput = mainContent.replace(/```typescript([\s\S]*?)```/, "").trim();
        
        // Return the generated response
        return NextResponse.json({ response, extractedCode, extractedOutput });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
