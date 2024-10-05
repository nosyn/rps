import { VectorStoreIndex } from 'llamaindex';
import { storeAndParseFile } from './helper';
import { runPipeline } from './pipeline';

export async function uploadDocument(
  index: VectorStoreIndex,
  filename: string,
  buffer: Buffer,
  mimeType: string
): Promise<string[]> {
  // run the pipeline for other vector store indexes
  const documents = await storeAndParseFile(filename, buffer, mimeType);
  return runPipeline(index, documents);
}
