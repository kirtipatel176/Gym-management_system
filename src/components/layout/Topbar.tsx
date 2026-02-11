import { UserNav } from "@/components/dashboard/UserNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell } from "lucide-react"

export function Topbar() {
    return (
        <header className="h-14 border-b flex items-center px-4 gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full justify-between">
            <div className="md:hidden font-bold">
                {/* Mobile menu trigger would go here */}
                GMS Pro
            </div>
            <div className="hidden md:flex items-center gap-2">
                {/* Breadcrumbs could go here */}
            </div>
            <div className="ml-auto flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search members..." className="pl-8 h-9 w-[200px] lg:w-[300px] bg-background" />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
            </div>
        </header>
    )
}
