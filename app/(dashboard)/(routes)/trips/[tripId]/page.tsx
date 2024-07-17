import prismadb from "@/lib/prismadb";
import { TripForm } from "./components/trip-form";

const TripPage = async ({
    params
}: {
    params: { tripId: string }
}) => {
    const trip = await prismadb.trip.findUnique({
        where: {
            id: params.tripId
        },
        include: {
            Images: true,
        },
    });

    return (
        <div className="flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <TripForm
                    initialData={trip}
                />
            </div>
        </div>
    );
}

export default TripPage;