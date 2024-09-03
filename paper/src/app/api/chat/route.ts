import { vectorStore } from '@/lib/vector-store/qdrant';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LangChainAdapter, Message } from 'ai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: Message[];
  } = await req.json();

  const retriever = (await vectorStore()).asRetriever();

  const llm = new ChatOpenAI({
    model: 'gpt-3.5-turbo-0125',
    temperature: 0,
  });

  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    new SystemMessage(
      'You are an expert in state of the union topics. You are provided multiple context items that are related to the prompt you have to answer. Use the following pieces of context to answer the question at the end.\n\n{context}'
    ),
    ...messages.map((message) =>
      message.role == 'user'
        ? new HumanMessage(message.content)
        : new AIMessage(message.content)
    ),
  ]);

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: questionAnsweringPrompt,
    outputParser: new StringOutputParser(),
  });

  const retrievedDocs = await retriever.invoke(
    messages[messages.length - 1].content
  );

  const stream = await combineDocsChain.stream({
    context: retrievedDocs,
  });

  return LangChainAdapter.toDataStreamResponse(stream);
}
