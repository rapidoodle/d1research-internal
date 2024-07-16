import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AnnualiazedDiscountsOverview from "@/app/ui/annualized-discounts/AnnualizedDiscountsOverview";
import { getServerSession } from "next-auth";

export default async function Page() { 
    const session = await getServerSession(authOptions);

    return (
        <AnnualiazedDiscountsOverview session={session} />
    )
}   