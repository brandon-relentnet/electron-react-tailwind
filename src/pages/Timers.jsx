import React from "react";
import ResponsiveGrid from "../components/ResponsiveGrid";

export default function Timers() {
    return (
        <ResponsiveGrid className="bg-gray-200">
            {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-blue-500 w-full aspect-square"></div>
            ))}
        </ResponsiveGrid>
    );
}