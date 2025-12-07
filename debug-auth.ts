import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const email = 'test@test.com'
        const password = '@1112'

        console.log(`Checking for user: ${email}`)
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            console.log('User already exists:', existingUser)
            // Check password match (plain text as per current logic)
            if (existingUser.password === password) {
                console.log('Password matches!')
            } else {
                console.log('Password does NOT match.')
                console.log('Updating password...')
                const updated = await prisma.user.update({
                    where: { email },
                    data: { password }
                })
                console.log('User password updated:', updated)
            }
        } else {
            console.log("Creating new user...")
            const user = await prisma.user.create({
                data: {
                    name: 'Test User',
                    email,
                    password,
                    planType: 'FREE',
                    resumesGeneratedCount: 0
                },
            })
            console.log('User created successfully:', user)
        }

    } catch (e) {
        console.error('Error operation failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
