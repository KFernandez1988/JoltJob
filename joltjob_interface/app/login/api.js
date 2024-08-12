import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
    const { token } = await request.json();

        const response = NextResponse.json({ message: 'Login successful' });
        response.headers.set(
            'Set-Cookie',
            serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: 'strict',
                path: '/',
            })
        );

        return response;
}