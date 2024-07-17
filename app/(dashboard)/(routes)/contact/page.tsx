import { format } from 'date-fns';
import prismadb from "@/lib/prismadb";

import { ContactClient } from "./components/client";
import { ContactColumns } from "./components/columns";

const ContactPage = async () => {

    const contact = await prismadb.contact.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedContact: ContactColumns[] = contact.map((item) => ({
        id: item.id,
        phone: item.phone,
        email: item.email,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ContactClient data={formattedContact} />
            </div>
        </div>
    )
}
export default ContactPage