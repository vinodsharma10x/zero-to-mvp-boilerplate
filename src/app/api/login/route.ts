import { NextResponse } from 'next/server';
import { findUserByEmail } from '@/utils/users';
import { verifyPassword, createToken } from '@/utils/auth';
import { serialize } from 'cookie';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const token = createToken({ userId: user.id });
  const serialized = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600,
    path: '/',
  });

  return new NextResponse(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: { 'Set-Cookie': serialized },
  });
}
