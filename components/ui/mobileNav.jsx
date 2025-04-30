"use client";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { Menu as MenuIcon } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const mobileItems = ["Home", "About us"];

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setOpen(false);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleLogin = () => {
        setOpen(false);
        router.push("/login");
    };

    const handleNavigation = (path: string) => {
        if (path === "Home") {
            router.push("/");
        } else if (path === "About us") {
            router.push("/about");
        } else if (path === "Spring Test") {
            router.push("/springTest");
        } else {
            router.push(`/${path.toLowerCase()}`);
        }
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <div className="flex flex-col items-start">
                    {mobileItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="link"
                            onClick={() => handleNavigation(item)}
                        >
                            {item}
                        </Button>
                    ))}

                    {isLoggedIn && (
                        <>
                            <Button
                                variant="link"
                                onClick={() => handleNavigation("Projects")}
                            >
                                Projects
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => handleNavigation("Dashboard")}
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => handleNavigation("Spring Test")}
                            >
                                Spring Test
                            </Button>
                        </>
                    )}

                    {isLoggedIn ? (
                        <Button
                            variant="link"
                            className="mt-4 text-red-500"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            variant="link"
                            className="mt-4 text-green-500"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
