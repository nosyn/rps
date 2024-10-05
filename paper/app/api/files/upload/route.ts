import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { db } from '@/lib/drizzle';
import { referenceSourceTable } from '@/lib/drizzle/schema';
import { uploadDocument } from '@/lib/llamaindex/documents/upload';
import { getDataSource } from '@/lib/engine';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const params = formData.get('params');

    if (!file) {
      return NextResponse.json({ error: 'file is required in the request body' }, { status: 400 });
    }

    const { type, name } = file;

    if (type !== 'application/pdf') {
      return NextResponse.json(
        {
          error: `Invalid file type: ${type}. Only PDF files are allowed.`,
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          error: 'File name is required',
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = file.name;
    const filePath = path.join('./data', filename);

    await writeFile(filePath, buffer);

    await db.insert(referenceSourceTable).values({
      name: filename,
    });

    const index = await getDataSource(params);
    if (!index) {
      throw new Error(`StorageContext is empty - call 'npm run generate' to generate the storage first`);
    }

    return NextResponse.json(await uploadDocument(index, filename, buffer, type));
  } catch (error) {
    console.error('[Upload API]', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
