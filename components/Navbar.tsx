import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ThemeSelect from "./theme-select";
import { createClient } from "@/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex justify-between border-b dark:border-gray-600 p-2 bg-opacity-95">
      <DropdownMenu>
        <NavigationMenu>
          <NavigationMenuList className="container max-w-xl">
            <NavigationMenuItem className="flex">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Leads</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem href="/leads" title="Leads">
                    Table of customers. All potential and past leads.
                  </ListItem>
                  <ListItem href="/leads/new" title="Add lead">
                    Add a new sales lead to the table. Modify at any time from
                    table.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList className="flex container">
            <NavigationMenuItem>
              <ThemeSelect />
            </NavigationMenuItem>
            {user ? (
              <div>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={"/account"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <form action="/auth/signout" method="post">
                        <button className="w-full text-left">Sign out</button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </div>
            ) : (
              <NavigationMenuItem>
                <Button asChild type="submit" variant="ghost">
                  <Link href="/login">Sign in</Link>
                </Button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </DropdownMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
