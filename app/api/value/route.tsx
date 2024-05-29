import { db } from '@/lib/db';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // detsrtucture todoTitle from the incoming request
    const { title, description, type } = await req.json();

    if (!title) {
      return new NextResponse('Title required', { status: 400 });
    }

    if (!type) {
      return new NextResponse('Type required', { status: 400 });
    }

    // Create and save todo on the database
    const value = await db.value.create({
      data: {
        name: title,
        description,
        type,
      },
    });

    return NextResponse.json(value, { status: 200 }); // Respond with the created todo
  } catch (error) {
    console.log('[VALUE]', error);
    return new NextResponse('Internal Server Error', { status: 500 }); // Handle errors
  }
}

export async function GET() {
  try {
    //fetch todos from the db
    const values = await db.value.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // respond with the todos
    return NextResponse.json(values, { status: 200 });
  } catch (error) {
    console.log('[GET VALUES]', error);

    // Handle errors
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
