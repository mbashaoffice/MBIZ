"use client";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { Menu as MenuIcon } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth"; // Import Firebase methods
import { auth } from "@/lib/firebase"; // Import your Firebase auth instance
import { useRouter } from "next/navigation"; // For navigation

const mobileItems = ["Home", "About us", "Projects", "Dashboard"];

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Update logged-in state
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            setOpen(false); // Close the menu
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleLogin = () => {
        setOpen(false); // Close the menu
        router.push("/login"); // Redirect to login page
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* This button will trigger open the mobile sheet menu */}
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
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                    {/* Login/Logout Button */}
                    {isLoggedIn ? (
                        <Button
                            variant="link"
                            className="mt-4 text-red-500" // Optional: Add styling for the logout button
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            variant="link"
                            className="mt-4 text-green-500" // Optional: Add styling for the login button
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