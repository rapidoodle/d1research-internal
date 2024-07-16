import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConsolidatedEstimatesOverview from "@/app/ui/consolidated-estimates/ConsolidatedEstimatesOverview";
import { getServerSession } from "next-auth";

export default async function Page() { 
    const session = await getServerSession(authOptions);

    return (
        <ConsolidatedEstimatesOverview session={session} />
    )
}