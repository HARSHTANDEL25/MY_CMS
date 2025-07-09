import { Anvil } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthsession } from "@/lib/auth";
import Image from "next/image";
import Signout from "./Signout";
export default async function Navbar() {
  const session = await getAuthsession();

  console.log("Session in Navbar: ", session);

  return (
    <div className="w-full  ">
      <div className="flex justify-between items-center px-8 my-6 ">
        <div className="flex justify-center gap-3 items-center">
          <Anvil />
          <p>My CMS</p>
        </div>
        {session ? (
          <UserModalComponent user={session.user} />
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
    </div>
  );
}

const UserModalComponent = ({ user }) => {
  return (
    <div>
      {
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={user.image}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> Hello , {user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/profile/${user.name}`}>Go to Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Signout />
              </DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    </div>
  );
};
