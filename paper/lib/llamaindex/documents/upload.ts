import { VectorStoreIndex } from 'llamaindex';
import { storeAndParseFile } from './helper';
import { runPipeline } from './pipeline';

export async function uploadDocument(index: VectorStoreIndex, filename: string, buffer: Buffer): Promise<string[]> {
  const fileBuffer = Buffer.from(content, 'base64');

  // run the pipeline for other vector store indexes
  const documents = await storeAndParseFile(filename, fileBuffer, mimeType);
  return runPipeline(index, documents);
}
