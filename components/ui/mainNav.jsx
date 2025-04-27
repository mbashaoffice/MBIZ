"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { signOut, onAuthStateChanged } from "firebase/auth"; // Import Firebase methods
import { auth } from "@/lib/firebase"; // Import your Firebase auth instance
import { useRouter } from "next/navigation"; // For navigation

const mainNavItems = ["Home", "About us", "Projects", "Dashboard"];

export default function MainNav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Set logged-in state based on user presence
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleLogin = () => {
        router.push("/login"); // Redirect to login page
    };

    return (
        <div className="mr-4 hidden gap-2 md:flex">
            {mainNavItems.map((item, index) => (
                <Button key={index} variant="link">
                    {item}
                </Button>
            ))}
            {/* Login/Logout Button */}
            {isLoggedIn ? (
                <Button
                    variant="link"
                    className="text-red-500" // Optional: Add styling for the logout button
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    variant="link"
                    className="text-green-500" // Optional: Add styling for the login button
                    onClick={handleLogin}
                >
                    Login
                </Button>
            )}
        </div>
    );
}