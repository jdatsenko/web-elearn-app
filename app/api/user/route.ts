import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z
    .object({
        name: z
            .string()
            .min(3, 'Meno je povinné, musí obsahovať aspoň 3 znaky')
            .max(30, 'Meno je príliš dlhé, maximálne 30 znakov'),
        email: z
            .string()
            .min(1, 'Email je povinný')
            .email('Neplatný formát emailu'),
        password: z
            .string()
            .min(6, 'Heslo je povinné, musí obsahovať aspoň 6 znakov')
            .max(30, 'Heslo je príliš dlhé, maximálne 30 znakov'),
    });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = userSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Používateľ s týmto emailom už existuje" },
                { status: 400 }
            );
        }

        const existingUserByName = await prisma.user.findUnique({
            where: {
                name
            }
        });

        if (existingUserByName) {
            return NextResponse.json(
                { message: "Používateľ s týmto používateľským menom už existuje" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json(
            {
                message: "Používateľ bol úspešne vytvorený",
                user: rest
            },
            {
                status: 201
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Niečo sa pokazilo", error: error },
            { status: 500 }
        );
    }
}
