import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { parseFile } from '@/lib/parser'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

// Simple logging helper
function log(message: string) {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ${message}\n`
    console.log(logMessage)
    try {
        fs.appendFileSync(path.join(process.cwd(), 'debug.log'), logMessage)
    } catch (e) {
        // Ignore logging errors
    }
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    log("Analyze Request Received")

    try {
        const session = await getServerSession(authOptions)
        log(`Session: ${JSON.stringify(session)}`)

        if (!session || !session.user?.email) {
            log("Unauthorized: No session")
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await req.formData()
        const resumeFile = formData.get('resumeFile') as File | null
        const jdFile = formData.get('jdFile') as File | null
        const resumeText = formData.get('resumeText') as string
        const jdText = formData.get('jdText') as string

        log(`Files received - Resume: ${resumeFile?.name}, JD: ${jdFile?.name}`)

        let resumeContent = resumeText
        let jdContent = jdText

        if (resumeFile) {
            log("Parsing resume file...")
            resumeContent = await parseFile(resumeFile)
            log("Resume parsed")
        }

        if (jdFile) {
            log("Parsing JD file...")
            jdContent = await parseFile(jdFile)
            log("JD parsed")
        }

        // ... rest of logic calling OpenAI ...
        // Wait, the previous view_file output ended at line 63 with the GET function closing brace.
        // It seems the POST function was NOT CLOSED properly in the original file before the GET function started?
        // Let's check the view_file output again.
        // Line 58: } (closes `if (jdFile)`)
        // Line 60: export async function GET...
        // The POST function body was never closed!
        // I need to close the POST function before defining GET.

        // However, I don't see the rest of the POST function logic (OpenAI call).
        // It seems the file was TRUNCATED or INCOMPLETE in the codebase?
        // Or maybe I just didn't see it?
        // The view_file output showed "Showing lines 1 to 64".
        // It seems the file ENDS there.
        // If so, the POST function logic is MISSING.
        // I need to implement the OpenAI call part or at least close the function and return something.

        // I'll add the missing logic to analyze the resume using OpenAI.

        const systemPrompt = `You are a ruthless resume critic. Your job is to destroy the user's ego and then build it back up with specific, actionable advice.
        Analyze the resume against the job description (if provided) or generally.
        Return a JSON object with:
        - matchScore (0-100)
        - red_flags (array of strings)
        - weak_areas (array of strings)
        - missing_keywords (array of strings)
        - verdict (short punchy sentence)
        - optimizedResume (the resume rewritten to be perfect, in markdown)`

        const userPrompt = `Resume: ${resumeContent}\n\nJob Description: ${jdContent || 'None provided'}`

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            model: 'gpt-4o',
            response_format: { type: 'json_object' }
        })

        const analysis = JSON.parse(completion.choices[0].message.content || '{}')

        return NextResponse.json({
            analysis,
            optimizedResume: analysis.optimizedResume || "Could not generate resume."
        })

    } catch (error: any) {
        log(`Error: ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    log("GET Request Received")
    return NextResponse.json({ status: 'OK' })
}

export const runtime = 'nodejs';
