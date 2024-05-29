import { db } from '@/lib/db';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // detsrtucture todoTitle from the incoming request
    const { firstName, lastName, instrumentalOrder, terminalOrder } =
      await req.json();

    if (!firstName || !lastName) {
      return new NextResponse('Имя и фамилия не могут быть пустыми', {
        status: 400,
      });
    }

    if (!instrumentalOrder?.length || !terminalOrder?.length) {
      return new NextResponse('Empty arrays', {
        status: 400,
      });
    }

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
      },
    });

    // Create and save todo on the database
    const submission = await db.surveySubmission.create({
      data: {
        userId: user.id,
        instrumentalOrder,
        terminalOrder,
      },
    });

    return NextResponse.json(submission, { status: 200 }); // Respond with the created todo
  } catch (error) {
    console.log('[SUBMISSION]', error);
    return new NextResponse('Internal Server Error', { status: 500 }); // Handle errors
  }
}

export async function GET() {
  try {
    //fetch todos from the db
    const values = await db.surveySubmission.findMany({
      include: {
        user: true,
      },
    });

    // respond with the todos
    return NextResponse.json(values, { status: 200 });
  } catch (error) {
    console.log('[GET SUBMISSIONS]', error);

    // Handle errors
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE() {
  try {
    //fetch todos from the db
    const values = await db.surveySubmission.deleteMany({});
    const users = await db.user.deleteMany({});
    // respond with the todos
    return NextResponse.json(values, { status: 200 });
  } catch (error) {
    console.log('[GET SUBMISSIONS]', error);

    // Handle errors
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
