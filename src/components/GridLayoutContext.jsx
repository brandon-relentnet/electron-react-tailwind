import React, { createContext, useState, useContext, useEffect } from "react";

// Define layout options
const layoutOptions = {
    comfort: {
        name: "Comfort",
        columns: 2,
        responsive: "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    },
    classic: {
        name: "Classic",
        columns: 4,
        responsive: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
    },
    compact: {
        name: "Compact",
        columns: 6,
        responsive: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    }
};

// Create context
const GridLayoutContext = createContext();

export function GridLayoutProvider({ children }) {
    // User preferences state
    const [layoutType, setLayoutType] = useState("classic");
    const [userColumns, setUserColumns] = useState(layoutOptions.classic.columns);
    const [useResponsive, setUseResponsive] = useState(true);

    // Load user preferences from localStorage on mount
    useEffect(() => {
        const savedLayout = localStorage.getItem("layoutType");
        const savedResponsive = localStorage.getItem("useResponsive");
        const savedColumns = localStorage.getItem("userColumns");

        if (savedLayout && layoutOptions[savedLayout]) {
            setLayoutType(savedLayout);
        }

        if (savedColumns) {
            setUserColumns(parseInt(savedColumns, 10));
        } else if (savedLayout && layoutOptions[savedLayout]) {
            setUserColumns(layoutOptions[savedLayout].columns);
        }

        if (savedResponsive !== null) {
            setUseResponsive(savedResponsive === "true");
        }
    }, []);

    // Save preferences to localStorage when they change
    useEffect(() => {
        localStorage.setItem("layoutType", layoutType);
        localStorage.setItem("useResponsive", useResponsive.toString());
        localStorage.setItem("userColumns", userColumns.toString());
    }, [layoutType, useResponsive, userColumns]);

    // Handle changing the layout type
    const handleLayoutChange = (type) => {
        setLayoutType(type);
        setUserColumns(layoutOptions[type].columns);
    };

    // Handle manual column adjustment
    const handleColumnChange = (e) => {
        setUserColumns(parseInt(e.target.value, 10));
    };

    // Toggle responsive mode
    const toggleResponsive = () => {
        setUseResponsive(!useResponsive);
    };

    // Value object to be provided to consumers
    const value = {
        layoutOptions,
        layoutType,
        userColumns,
        useResponsive,
        handleLayoutChange,
        handleColumnChange,
        toggleResponsive,
        getGridClasses: () => useResponsive ? layoutOptions[layoutType].responsive : "",
        getGridStyle: () => !useResponsive ? { gridTemplateColumns: `repeat(${userColumns}, minmax(0, 1fr))` } : {}
    };

    return (
        <GridLayoutContext.Provider value={value}>
            {children}
        </GridLayoutContext.Provider>
    );
}

// Custom hook to use the grid layout context
export function useGridLayout() {
    const context = useContext(GridLayoutContext);
    if (context === undefined) {
        throw new Error("useGridLayout must be used within a GridLayoutProvider");
    }
    return context;
}