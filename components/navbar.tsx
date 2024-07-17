import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

import Image from 'next/image'


const Navbar = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <Image
                    src="/logo.png"
                    width={80}
                    height={80}
                    alt="Explore Morocco Logo"
                />
                <MainNav className="mx-12" />
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;