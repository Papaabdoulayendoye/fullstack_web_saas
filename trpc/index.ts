import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { router, publicProcedure } from './trpc';
 import { TRPCError } from "@trpc/server";
import { db } from '@/lib/utils';

export const appRouter = router({
    authCallback : publicProcedure.query( async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()
        if (!user?.email || !user?.id) {
            throw new TRPCError({code : 'UNAUTHORIZED'}) 
        }
        const UserExists = await db.user.findFirst({
            where : {
                userId : user.id
            }
        }) 
        if(!UserExists) {
            await db.user.create({
                data : {
                    userId : user.id,
                    email : user.email
                }
            })
        }
        return {success : true } 
    })
});
 
export type AppRouter = typeof appRouter;