import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { router, publicProcedure } from './trpc';
 import { TRPCError } from "@trpc/server";
import { db } from '@/lib/utils';

export const appRouter = router({
    authCallback : publicProcedure.query( async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()
        if (!user) {
            throw new TRPCError({code : 'UNAUTHORIZED'}) 
        }
        const UserExists = await db.user.findFirst({
            where : {
                uesrId : user.id
            }
        }) 
        if(!UserExists) {
            await db.user.create({
                data : {
                    uesrId : user.id,
                    email : user.email
                }
            })
        }
        return {success : true } 
    }),
    test : publicProcedure.query(() => {
        
    })
});
 
export type AppRouter = typeof appRouter;