import React from "react";
import { useGridLayout } from "./GridLayoutContext";
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export default function QuickSettings() {
    const {
        layoutOptions,
        layoutType,
        userColumns,
        useResponsive,
        handleLayoutChange,
        handleColumnChange,
        toggleResponsive
    } = useGridLayout();
    const [isVisible, setIsVisible] = useState(true)

    const PopupMenu = () => {
        return (
            <div className="flex flex-col gap-4 bg-white border-2 border-yellow-500 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-medium">Layout Style</h3>
                <div className="flex gap-4">
                    {Object.keys(layoutOptions).map((option) => (
                        <button
                            key={option}
                            onClick={() => handleLayoutChange(option)}
                            className={`px-4 py-2 rounded-md ${layoutType === option
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {layoutOptions[option].name}
                        </button>
                    ))}
                </div>

                {/* Responsive toggle */}
                <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={useResponsive}
                            onChange={toggleResponsive}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">Responsive Layout</span>
                    </label>
                </div>

                {/* Custom column slider (only shown when responsive is off) */}
                {!useResponsive && (
                    <div className="relative mt-4">
                        <label htmlFor="columns-range" className="block mb-2 text-sm font-medium">
                            Number of Columns: {userColumns}
                        </label>
                        <input
                            id="columns-range"
                            type="range"
                            min="1"
                            max="8"
                            value={userColumns}
                            onChange={handleColumnChange}
                            step="1"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <div className="relative inline-block">
                <motion.button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 w-auto"
                    onClick={() => setIsVisible(!isVisible)}
                    whileTap={{ y: 1 }}
                >
                    {isVisible ? "Hide" : "Show"}
                </motion.button>
                <AnimatePresence initial={false}>
                    {isVisible ? (
                        <motion.div
                            className="absolute mt-2 right-0 bg-overlay rounded-xl shadow-md z-50"
                            initial={{ opacity: 0, scale: 0, x: -25 }}
                            transition={{ duration: 0.2 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0, x: -25 }}
                            key="box"
                            style={{ transformOrigin: 'top right' }}
                        >
                            <PopupMenu />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </>
    );
}