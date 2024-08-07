import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CompanyOverview from "@/app/ui/company/CompanyOverview";
import { getServerSession } from "next-auth";

export default function Page() {
    const session = getServerSession(authOptions);

    return (
        <div className="company-page border mt-3">
            <CompanyOverview 
                session={session} 
            />
        </div>
    )
}