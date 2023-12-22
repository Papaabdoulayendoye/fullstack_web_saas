import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from '@/lib/utils';
import Dashboard from '@/components/Dashboard';
const Page = async () => {
    const {getUser, isAuthenticated} = getKindeServerSession()
    const userIsConnected = isAuthenticated()
    const user = getUser()
    if (!userIsConnected) {
        return redirect('/auth-callback?origin=dashboard')
    }
    
    const currentUser = await db.user.findFirstOrThrow({
        where : 
        {
            userId : user?.id!
        }
    })
    
    return (
        <MaxWidthWrapper>
            <Dashboard />
        </MaxWidthWrapper>
    )
}

export default Page
