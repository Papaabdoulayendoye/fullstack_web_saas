import { db } from '@/lib/utils';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

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
      await db.file.create({
        data : {
          name, 
          url,
          key,
          userId,
          uploadStatus : "PROCESSING"
        }
      })
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
