"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid"; // UUID import
import { db } from "@/lib/firebase"; // Firebase import
import { collection, doc, setDoc, serverTimestamp, getDocs } from "firebase/firestore"; // Firestore methods
import { useRouter } from "next/navigation"; // For navigation
import { withAuth } from "@/lib/authWrapper";


// SkillCard component to display individual directory
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // SkillCard components

// SkillCard definition
function SkillCard({ directory, onClick }) {
    return (
        <Card className="shadow-md rounded-lg cursor-pointer" onClick={() => onClick(directory.id)}>
            <CardHeader>
                <CardTitle>{directory.name}</CardTitle>
            </CardHeader>
            <CardDescription>
                <p>UUID: {directory.id}</p>
            </CardDescription>
        </Card>
    );
}

function Page() {
    const [directoryName, setDirectoryName] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [directories, setDirectories] = useState([]); // State to hold all directories
    const router = useRouter(); // Initialize useRouter

    // Fetch all directories from Firebase
    const fetchDirectories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "directories"));
            const fetchedDirectories = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDirectories(fetchedDirectories);
        } catch (error) {
            console.error("Error fetching directories:", error);
            alert("Failed to fetch directories.");
        }
    };

    const createDirectory = async () => {
        if (!directoryName.trim()) {
            alert("Directory name cannot be empty!");
            return;
        }

        setLoading(true);

        try {
            const id = uuidv4(); // Generate a new UUID

            // Create reference to a new directory document
            const newDirectoryRef = doc(collection(db, "directories"), id);

            // Set the document with the directory name and createdAt timestamp
            await setDoc(newDirectoryRef, {
                name: directoryName.trim(),
                createdAt: serverTimestamp(),
            });

            console.log("Directory created successfully!");

            // Clear input and close dialog
            setDirectoryName("");
            setOpen(false);

            // Fetch updated directories list
            fetchDirectories();

        } catch (error) {
            console.error("Error creating directory:", error);
            alert("Failed to create directory. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch directories when the component mounts
    useEffect(() => {
        fetchDirectories();
    }, []);

    // Redirect to dashboard page of clicked directory
    const handleDirectoryClick = (id) => {
        console.log(`Redirecting to directory with ID: ${id}`);
        router.push(`/dashboard/${id}`); // Redirect to /dashboard/[uuid]
    };

    return (
        <div className="inset-0 top-0 right-0">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Directory</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Directory</DialogTitle>
                        <DialogDescription>
                            Add a new directory to organize your code snippets.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={directoryName}
                                onChange={(e) => setDirectoryName(e.target.value)}
                                placeholder="Enter directory name"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={createDirectory}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Display fetched directories */}
            <div className="grid grid-cols-3 gap-4 mt-4">
                {directories.map((directory) => (
                    <SkillCard key={directory.id} directory={directory} onClick={handleDirectoryClick} />
                ))}
            </div>
        </div>
    );
}
export default withAuth(Page);