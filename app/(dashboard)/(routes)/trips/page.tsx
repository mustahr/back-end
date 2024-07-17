import { format } from 'date-fns';
import prismadb from "@/lib/prismadb";

import { TripClient } from "./components/client";
import { TripColumns } from "./components/columns";

const TripsPage = async () => {

    const trips = await prismadb.trip.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedTrips: TripColumns[] = trips.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        moreInfos: item.moreInfos,
        keywords: item.keywords,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TripClient data={formattedTrips} />
            </div>
        </div>
    )
}
export default TripsPage