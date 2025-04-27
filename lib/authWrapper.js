// lib/authWrapper.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import your Firebase auth instance

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push("/login"); // Redirect to login if not authenticated
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, [router]);

        if (loading) {
            return <p>Loading...</p>; // Show a loading state while checking auth
        }

        if (!isAuthenticated) {
            return null; // Prevent rendering if not authenticated
        }

        return <Component {...props} />;
    };
}