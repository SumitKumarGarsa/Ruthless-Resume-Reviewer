// import 'server-only'
// @ts-expect-error
import pdf from 'pdf-parse';
import mammoth from 'mammoth'

export async function parseFile(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer())

    if (file.type === 'application/pdf') {
        const data = await pdf(buffer)
        return data.text
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer })
        return result.value
    } else {
        // Fallback for text files or unknown types, try to read as text
        return await file.text()
    }
}
