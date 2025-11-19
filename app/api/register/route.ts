import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password, name } = body

        if (!email || !password) {
            return new NextResponse("Missing fields", { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse("Internal Error", { status: 500 })
    }
}
