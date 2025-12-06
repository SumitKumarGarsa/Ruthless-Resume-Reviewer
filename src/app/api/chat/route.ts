import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    const { messages, context } = await req.json()

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a ruthless career coach.
          Context:
          Resume: ${context?.resumeText || "Not provided"}
          JD: ${context?.jdText || "Not provided"}
          Feedback: ${JSON.stringify(context?.feedback || {})}
          
          Answer the user's question directly, brutally, and honestly.
          Do not be polite. Be helpful but harsh.`
                },
                ...messages
            ]
        })

        return NextResponse.json({ message: completion.choices[0].message.content })
    } catch (error) {
        return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
    }
}
