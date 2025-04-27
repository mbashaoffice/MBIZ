import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Adjust the import path if necessary

export default function SkillCard({ directory }) {
    return (
        <Card className="shadow-md rounded-lg">
            <CardHeader>
                <CardTitle>{directory.name}</CardTitle>
            </CardHeader>
            <CardDescription>
                {/* You can add additional information or styling here */}
                <p>UUID: {directory.id}</p>
            </CardDescription>
        </Card>
    );
}
