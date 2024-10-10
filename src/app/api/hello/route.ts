import { NextResponse } from 'next/server';
import { AppError, asyncErrorHandler } from '@/utils/errorHandling';

export const GET = asyncErrorHandler(async (req: Request) => {
  // Simulate an error condition
  const shouldError = Math.random() < 0.5;

  if (shouldError) {
    throw new AppError('Random error occurred', 400);
  }

  return NextResponse.json({ message: 'Hello from the API!' });
});
