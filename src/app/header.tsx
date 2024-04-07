"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
    const session = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}>
                    <Avatar className="mr-2">
                        <AvatarImage src={session.data?.user?.image ?? ""} />
                        {/* <AvatarFallback>CN</AvatarFallback> */}
                    </Avatar>
                    {session.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}><LogOutIcon className="mr-2" />Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export function Header() {
    const session = useSession();
    return (
        <header className="bg-gray-100 py-2 dark:bg-gray-900 container mx-auto">
            <div className="flex justify-between items-center">
            <Link href={"/"} className="flex gap-1 items-center text-xl hover:underline">
                <Image src="/logo.png" width="60" height="60" alt="the application icon" /> 
                ScreenShare
            </Link>
            <div className="flex items-center gap-4">
                {session.data && <AccountDropdown /> }
                {!session.data && (
                    <Button onClick={() => signIn()} variant="link"></Button>
                )}
                <ModeToggle />
            </div>
            </div>
        </header>
    )
}