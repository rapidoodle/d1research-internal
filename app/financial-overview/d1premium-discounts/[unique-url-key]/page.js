import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PremiumDiscountsOverview from "@/app/ui/premium-discounts/PremiumDiscountsOverview";
import { getServerSession } from "next-auth";

export default async function Page() { 
    const session = await getServerSession(authOptions);

    return (
        <PremiumDiscountsOverview session={session} />
    )
}   