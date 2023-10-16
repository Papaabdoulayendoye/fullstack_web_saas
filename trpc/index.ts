import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/database';
import { redirect } from 'next/navigation';
export const appRouter = router({
    authCallback : publicProcedure.query( async () => {
        const {getUser,isAuthenticated} = getKindeServerSession()
        const userIsConnected = isAuthenticated()
        const user = getUser()
        
        if (!userIsConnected) {
            throw new TRPCError({code : 'UNAUTHORIZED'}) 
        }
        
        const dbUser = db.user.findFirst({
            where : { id : `${user.id ? user.id : ''}` }
        })
        
        if (!dbUser) {
            await db.user.create({
                data : {
                    id : `${user.id ? user.id : ''}`,
                    email : `${user.email ? user.email : ''}`,
                    stripeCurrentPeriodEnd : Date()
                },
            })
        }
        
        return {success : true}
    })
});
export type AppRouter = typeof appRouter;