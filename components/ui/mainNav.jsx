"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { signOut, onAuthStateChanged } from "firebase/auth"; // Import Firebase methods
import { auth } from "@/lib/firebase"; // Import your Firebase auth instance
import { useRouter } from "next/navigation"; // For navigation

const mainNavItems = ["Home", "About us"];

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

    const handleNavigation = (path) => {
        if (path === "Home") {
            router.push("/"); // Redirect to the landing page ("/")
        } else if (path === "About us") {
            router.push("/about"); // Redirect to About Us page
        } else {
            router.push(`/${path.toLowerCase()}`); // Redirect to other pages based on the item name
        }
    };

    return (
        <div className="mr-4 hidden gap-2 md:flex">
            {mainNavItems.map((item, index) => (
                <Button
                    key={index}
                    variant="link"
                    onClick={() => handleNavigation(item)} // Navigate based on the item
                >
                    {item}
                </Button>
            ))}

            {/* Conditionally render "Projects" and "Dashboard" if logged in */}
            {isLoggedIn && (
                <>
                    <Button variant="link" onClick={() => handleNavigation("Projects")}>
                        Projects
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("Dashboard")}>
                        Dashboard
                    </Button>
                </>
            )}

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
