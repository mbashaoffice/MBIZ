"use client"

import { useState, useEffect } from "react"

export default function CategoryPage() {
    const [showModal, setShowModal] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    // Fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/categories")
            if (response.ok) {
                const data = await response.json()
                setCategories(data)
            } else {
                throw new Error("Failed to fetch categories")
            }
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }

    // Call fetchCategories on page load
    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("New Category:", categoryName)

        setLoading(true)  // Set loading to true while the request is being processed

        try {
            // Sending the POST request to the API endpoint
            const response = await fetch("https://mbizgig.onrender.com/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: categoryName }),
            })

            // Handle response
            if (response.ok) {
                console.log("Category created successfully")
                setCategoryName("")  // Clear the input field
                setShowModal(false)  // Close the modal

                // Fetch updated categories
                fetchCategories()
            } else {
                throw new Error("Failed to create category")
            }
        } catch (error) {
            console.error("Error:", error)
            alert("An error occurred while creating the category.")
        } finally {
            setLoading(false)  // Set loading back to false after the request is done
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Create Category
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">New Category</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Category Name
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                    className="mt-1 w-full border px-3 py-2 rounded"
                                />
                            </label>
                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    disabled={loading}  // Disable button when loading
                                >
                                    {loading ? "Creating..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-3 gap-4 mt-6">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white p-4 rounded shadow-md flex justify-center items-center">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
