import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { vectorStore } from '@/lib/vector-store/qdrant';

// export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Custom upload API to use datasource from request body
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const file = data.get('file') as File;

    const loader = new PDFLoader(file);
    const docs = await loader.load();

    await (await vectorStore()).addDocuments(docs);

    return NextResponse.json({
      message: 'Successfully uploaded file',
      docs,
    });
  } catch (error) {
    console.error('[Upload API]', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
