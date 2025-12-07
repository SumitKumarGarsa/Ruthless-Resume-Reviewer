import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log("Attempting to create user...")
        const user = await prisma.user.create({
            data: {
                name: 'Debug User',
                email: 'debug' + Date.now() + '@example.com',
                password: 'password123',
                planType: 'FREE',
                resumesGeneratedCount: 0
            },
        })
        console.log('User created:', user)
    } catch (e) {
        console.error('Error creating user:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
