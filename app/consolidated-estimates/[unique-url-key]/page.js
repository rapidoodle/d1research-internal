import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CompanyOverview from "@/app/ui/company/CompanyOverview";
import { getServerSession } from "next-auth";
import ConsolidatedEstimatesOverview from "../../ui/consolidated-estimates/ConsolidatedEstimatesOverview";

export default async function Page() { 
    const session = await getServerSession(authOptions);

    return (
        <div className="d-flex justify-content-center">
            <ConsolidatedEstimatesOverview session={session} />
        </div>
    )
}