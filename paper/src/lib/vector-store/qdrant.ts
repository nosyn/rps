import { QdrantVectorStore } from '@langchain/qdrant';
import { OpenAIEmbeddings } from '@langchain/openai';

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

export const vectorStore = async () =>
  await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: 'http://qdrant:6333',
    collectionName: 'rps-collection',
    apiKey: 'qdrant_secret_api_key',
  });
