import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const email = 'test@test.com'
        const password = '@1112'

        console.log(`Seeding user: ${email}`)

        // Cleanup if exists (though we just deleted db)
        await prisma.user.deleteMany({ where: { email } }).catch(() => { })

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

    } catch (e) {
        console.error('Seeding failed:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
