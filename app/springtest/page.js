// pages/springTest.js
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SpringTest() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setGreeting("");

    try {
      const response = await fetch(
        `https://spring-boot-demo-l16k.onrender.com/greet?name=${encodeURIComponent(name)}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.text();
      setGreeting(data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Spring Boot API Test</h1>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Enter your name:
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Mahaboob"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>

          {greeting && (
            <div className="mt-6 p-4 rounded bg-green-100 text-green-800">
              <strong>Greeting:</strong> {greeting}
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 rounded bg-red-100 text-red-700">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
