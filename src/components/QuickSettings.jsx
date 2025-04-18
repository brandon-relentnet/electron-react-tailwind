import React from "react";
import { useGridLayout } from "./GridLayoutContext";
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { WrenchIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import ColumnSelector from "./ColumnSelector";

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
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            
            <AnimatePresence initial={false}>
                {isVisible && (
                    <motion.div
                        className="mt-2 right-0 bg-overlay rounded-xl shadow-md z-50"
                        initial={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.15 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        key="box"
                        style={{ transformOrigin: 'top right' }}
                    >
                        <div
                            className="flex flex-col p-4 bg-surface-0 rounded-xl shadow-md"
                        >
                            <h3 className="text-lg font-medium">Layout Style</h3>
                            <div className="flex gap-4">
                                {Object.keys(layoutOptions).map((option) => (
                                    <motion.button
                                        key={option}
                                        whileTap={{ y: 1 }}
                                        onClick={() => handleLayoutChange(option)}
                                        className={`flex flex-col justify-center items-center px-4 py-2 rounded-xl cursor-pointer transition duration-300 ${layoutType === option
                                            ? "bg-mantle text-text shadow-lg"
                                            : "bg-surface-0 text-subtext-1 hover:bg-surface-1"
                                            }`}
                                    >
                                        {React.createElement(layoutOptions[option].component, { className: "size-6" })}
                                        <span className="ml-2">{layoutOptions[option].name}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Responsive toggle */}
                            <button
                                className="toggle-container bg-surface-1/30 rounded-full shadow-md p-2 w-24 h-12 flex cursor-pointer"
                                style={{ justifyContent: "flex-" + (!useResponsive ? "start" : "end") }}
                                onClick={toggleResponsive}
                            >
                                <motion.div
                                    className="toggle-handle aspect-square bg-pink rounded-full h-full"
                                    layout
                                    layoutId="toggle-handle"
                                    transition={{
                                        type: "spring",
                                        visualDuration: 0.2,
                                        bounce: 0.2,
                                    }}
                                />
                            </button>

                            {/* Column selector with animation */}
                            <ColumnSelector userColumns={userColumns} handleColumnChange={handleColumnChange} useResponsive={useResponsive} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                className={`px-4 py-2 w-auto cursor-pointer text-subtext-0 hover:text-subtext-0 active:text-text ${isVisible ? "text-text hover:text-text" : ""}`}
                onClick={() => setIsVisible(!isVisible)}
                whileTap={{ y: 1 }}
            >
                {!isVisible ? <WrenchIcon className="size-6" /> : <WrenchScrewdriverIcon className="size-6" />}
            </motion.button>
        </>
    );
}