import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.userId as number },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });
  
  return NextResponse.json({ user });
}
