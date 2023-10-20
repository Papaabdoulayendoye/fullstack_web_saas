import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = () => {
    const {getUser, isAuthenticated} = getKindeServerSession()
    const userIsConnected = isAuthenticated()
    const user = getUser()
    
    if (!userIsConnected) {
        return redirect('/auth-callback?next=dashboard')
    }
    
    return (
        <MaxWidthWrapper>
            <div>
                <h1>Welcome to the dashboard Page @{user.email}</h1>
            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard
