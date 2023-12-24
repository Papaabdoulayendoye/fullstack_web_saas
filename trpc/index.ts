import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { router, publicProcedure, privateProcedure } from './trpc';
import { TRPCError } from "@trpc/server";
import { db } from '@/lib/utils';
import z from 'zod';


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
        if (!UserExists) {
            await db.user.create({
                data : {
                    userId : user.id,
                    email : user.email
                }
            })
        }
        
        return {success : true} 
    }),
    getUserFiles : privateProcedure.query( async ({ctx}) => {
        const {userId} = ctx
        return await db.file.findMany({
            where : {userId}
        })
    }),
    deleteFile : privateProcedure
        .input(z.object({id : z.string()}))
        .mutation( async ({ctx,input}) => {
        const {userId} = ctx

        const file = await db.file.findFirst(
            { where : {
                    id : input?.id,
                    userId
                }
            }
        )
        if (!file) throw new TRPCError({code : 'NOT_FOUND'})

        await db.file.delete({
            where : {id : input.id}
        })
        return file
    })
});
 
export type AppRouterType = typeof appRouter;