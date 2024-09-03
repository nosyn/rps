import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Custom upload API to use datasource from request body
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const file = data.get('file');
    console.log('file uploaded: ', file);

    return NextResponse.json({
      message: 'Successfully uploaded file',
    });
  } catch (error) {
    console.error('[Upload API]', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
