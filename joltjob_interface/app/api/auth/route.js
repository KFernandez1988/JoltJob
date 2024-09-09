import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const backend = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const backendResponse = await backend.json();
    
    //console.log('backend response', backendResponse);

    if (backend.ok) {
      const response = NextResponse.json({ success: true });

      response.cookies.set('token', backendResponse.token, {
        httpOnly: true,
        maxAge: 60 * 60, 
        path: '/',
      });

      console.log('response when login', response);
      return response;
    } else {
      return NextResponse.json({ success: false, error: backendResponse.message || 'Login failed' });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.error();
  }
}

export async function DELETE(req) {
  try {
    const response = NextResponse.redirect(new URL('/login', req.url));

    response.cookies.delete('token');

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
