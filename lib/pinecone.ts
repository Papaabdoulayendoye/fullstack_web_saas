import { Pinecone } from '@pinecone-database/pinecone';

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_QUILL,
    environment : "gcp-starter"
});
// const index = pinecone.index('quickstart');