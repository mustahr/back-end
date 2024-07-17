import { format } from 'date-fns';
import prismadb from "@/lib/prismadb";

import { ReservationsClient } from "./components/client";
import { ReservationsColumns } from "./components/columns";

const ReservationsPage = async () => {

    const reservation = await prismadb.reservation.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedReservations: ReservationsColumns[] = reservation.map((item) => ({
        id: item.id,
        phone: item.phone,
        email: item.email,
        tripTitle: item.tripTitle,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ReservationsClient data={formattedReservations} />
            </div>
        </div>
    )
}
export default ReservationsPage