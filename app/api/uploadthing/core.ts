import { db } from '@/lib/utils';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import { pc } from '@/lib/pinecone';
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

const f = createUploadthing();
const { getUser } = getKindeServerSession();

export const ourFileRouter = {
  pdfUploader: f({ pdf : { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = getUser();
      if (!user || !user.id) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata : {userId}, file : {name,url,key,size} }) => {
      const createdFile = await db.file.create({
        data : {
          name, 
          url,
          key,
          userId,
          uploadStatus : "PROCESSING"
        }
      });

      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const loader = new PDFLoader(blob)
        const pageLevelDocs  = await loader.load()
        const pagesAmt = pageLevelDocs.length 
        console.log("CREATING PINECONE");
        const pineconeIndex = pc.index('quill')
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey : process.env.OPENAI_KEY
        });
        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          namespace : createdFile.id,
          pineconeIndex : pineconeIndex
        })

        await db.file.update({
          data : {
            uploadStatus : "SUCCESS"
          },
          where : {
            id : createdFile.id
          }
        });
      } catch (error) {
        await db.file.update({
          where : {
            id : createdFile.id
          },
          data : {
            uploadStatus : "FAILED"
          }
        });
        console.log("ERROR HERE...");
        console.log(error);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
