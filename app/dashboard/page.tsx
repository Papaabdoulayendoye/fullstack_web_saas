import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from '@/lib/utils';


const Dashboard = async () => {
    const {getUser, isAuthenticated} = getKindeServerSession()
    const userIsConnected = isAuthenticated()
    const user = getUser()
    if (!userIsConnected) {
        return redirect('/auth-callback?origin=dashboard')
    }
    
    const currentUser = await db.user.findFirstOrThrow({
        where : 
        {
            userId : user?.id
        }
    })
    
    return (
        <MaxWidthWrapper>
            <div>
                <h1>Welcome to the dashboard Page @{user?.email}</h1>
                <p>mongo id {currentUser?.id}</p>
                <p>kinde id {currentUser?.userId}</p>
            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard
