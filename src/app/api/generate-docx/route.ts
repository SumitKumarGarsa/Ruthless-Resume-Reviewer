import { NextRequest, NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun } from 'docx'

export async function POST(req: NextRequest) {
    const { text } = await req.json()

    if (!text) {
        return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    const lines = text.split('\n')
    const doc = new Document({
        sections: [{
            properties: {},
            children: lines.map((line: string) =>
                new Paragraph({
                    children: [new TextRun(line)],
                    spacing: { after: 200 }
                })
            )
        }]
    })

    const buffer = await Packer.toBuffer(doc)

    return new NextResponse(new Blob([new Uint8Array(buffer)]), {
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename="optimized_resume.docx"'
        }
    })
}
