import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from '@/components/Dashboard';

const Page = async () => {
    const {isAuthenticated} = getKindeServerSession()
    const userIsConnected = isAuthenticated()
    if (!userIsConnected) {
        return redirect('/auth-callback?origin=dashboard')
    }
    return (
        <MaxWidthWrapper>
            <Dashboard />
        </MaxWidthWrapper>
    )
}

export default Page
