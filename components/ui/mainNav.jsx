"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const mainNavItems = ["Home", "About us"];

export default function MainNav() {
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
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleLogin = () => {
        router.push("/login");
    };

    const handleNavigation = (path) => {
        if (path === "Home") {
            router.push("/");
        } else if (path === "About us") {
            router.push("/about");
        } else {
            router.push(`/${path.toLowerCase().replace(/\s+/g, "")}`);
        }
    };

    return (
        <div className="mr-4 hidden gap-2 md:flex">
            {mainNavItems.map((item, index) => (
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
                    <Button variant="link" onClick={() => handleNavigation("Projects")}>
                        Projects
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("Dashboard")}>
                        Dashboard
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("Spring Test")}>
                        Spring Test
                    </Button>
                </>
            )}

            {isLoggedIn ? (
                <Button
                    variant="link"
                    className="text-red-500"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    variant="link"
                    className="text-green-500"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            )}
        </div>
    );
}
