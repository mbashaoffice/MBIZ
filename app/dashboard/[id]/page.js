"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import languages from "@/app/utils/languages.json";
import hljs from "highlight.js"; // highlight.js for viewing
import "highlight.js/styles/github.css"; // highlight.js theme
import MonacoEditor from "@monaco-editor/react"; // Monaco Editor for editing
import { withAuth } from "@/lib/authWrapper"; // Auth wrapper for protected routes

function Dashboard() {
    const { id: uuid } = useParams();
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [language, setLanguage] = useState(""); // Language
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchArticles = async () => {
        if (!uuid) {
            console.error("UUID is null or undefined.");
            return;
        }

        setFetching(true);
        try {
            const articlesSnapshot = await getDocs(collection(db, "directories", uuid, "articles"));
            const articlesList = articlesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articlesList);
        } catch (error) {
            console.error("Error fetching articles:", error);
            alert("Failed to fetch articles.");
        } finally {
            setFetching(false);
        }
    };

    const addArticle = async () => {
        if (!uuid) {
            alert("Invalid category ID. Cannot add article.");
            return;
        }

        if (!language || !title.trim() || !description.trim()) {
            alert("Language, title, and description cannot be empty!");
            return;
        }

        setLoading(true);

        try {
            const articleRef = doc(collection(db, "directories", uuid, "articles"));
            await setDoc(articleRef, {
                language,
                title: title.trim(),
                description: description.trim(),
                createdAt: serverTimestamp(),
            });

            setTitle("");
            setDescription("");
            setLanguage("");
            alert("Article added successfully!");
            fetchArticles();
        } catch (error) {
            console.error("Error adding article:", error);
            alert("Failed to add article.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (uuid) {
            fetchArticles();
        } else {
            console.error("UUID is missing. Cannot fetch articles.");
        }
    }, [uuid]);

    // Apply syntax highlighting whenever articles are updated
    useEffect(() => {
        articles.forEach(article => {
            const codeBlock = document.getElementById(`code-${article.id}`);
            if (codeBlock && !codeBlock.classList.contains('hljs')) {
                hljs.highlightElement(codeBlock);
            }
        });
    }, [articles]);

    // Handle when an Accordion item expands
    const handleAccordionExpand = (articleId) => {
        const codeBlock = document.getElementById(`code-${articleId}`);
        if (codeBlock && !codeBlock.classList.contains('hljs')) {
            hljs.highlightElement(codeBlock);
        }
    };

    return (
        <div>
            {/* Header with Add Article Button */}
            <div className="flex justify-between items-center mb-4">
                <h2>Articles for Category {uuid || "Unknown"}</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add Article</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Article</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {/* Language Dropdown */}
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Language</option>
                                {languages.map((lang) => (
                                    <option key={lang.id} value={lang.language}>
                                        {lang.language}
                                    </option>
                                ))}
                            </select>

                            {/* Title Input */}
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter article title"
                            />

                            {/* Monaco Editor for Description */}
                            <div className="h-[200px] border rounded overflow-hidden">
                                <MonacoEditor
                                    height="200px"
                                    defaultLanguage={language || "javascript"}
                                    language={language || "javascript"}
                                    value={description}
                                    onChange={(value) => setDescription(value || "")}
                                    theme="vs-dark"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={addArticle} disabled={loading}>
                                {loading ? "Adding..." : "Submit"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Articles Accordion */}
            <h3>Articles</h3>
            {fetching ? (
                <p>Loading articles...</p>
            ) : (
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    onValueChange={(expandedId) => {
                        if (expandedId) {
                            handleAccordionExpand(expandedId);
                        }
                    }}
                >
                    {articles.length === 0 ? (
                        <p>No articles yet.</p>
                    ) : (
                        articles.map((article) => (
                            <AccordionItem key={article.id} value={article.id} className="w-full">
                                <AccordionTrigger>{article.title}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="mb-2">Language: {article.language}</p>
                                    <pre className="rounded bg-gray-100 p-2 overflow-auto">
                                        <code id={`code-${article.id}`} className={`language-${article.language}`}>
                                            {article.description}
                                        </code>
                                    </pre>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    )}
                </Accordion>
            )}
        </div>
    );
}
export default withAuth(Dashboard);