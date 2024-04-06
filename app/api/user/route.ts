import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z
    .object({
        name: z.string().min(3, 'Name is required, at least 3 characters').max(30, 'Name is too long'),
        email: z.string().min(1, 'Email is required').email('Invalid email format'),
        password: z.
        string()
        .min(6, 'Password is required, at least 6 characters')
        .max(30, 'Password is too long'),
    }); 


export async function POST(req: Request) {
    try{
        const body = await req.json();
        const { name, email, password } = userSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
        }

        const existingUserByName = await prisma.user.findUnique({
            where: {
                name
            }
        });

        if (existingUserByName) {
            return NextResponse.json({ message: "User with this username already exists" }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        const{ password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({
            message: "User created successfully",
            user: rest
        }, {
            status: 201
        });
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong", error: error }, { status: 500 });
    }
}