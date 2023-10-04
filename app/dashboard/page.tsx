import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
const Dashboard = () => {
    const {getUser} = getKindeServerSession()
    const user = getUser()
    
    if (!user || !user.id) {
        return redirect('/auth-callback?origin=dashboard')
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
