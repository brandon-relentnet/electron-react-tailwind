import React from "react";
import { useGridLayout } from "./GridLayoutContext";
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { WrenchIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid"
import ColumnSelector from "./ColumnSelector";

const ANIMATION_DURATION = 0.25;
const ANIMATION_DELAY = 0.1;

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
            <div className="z-50 rounded-xl">
                <AnimatePresence initial={false}>
                    {isVisible && (
                        <motion.div
                            key="settings"
                            className="flex flex-col bg-surface-0 rounded-xl shadow-md overflow-hidden"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: {
                                    opacity: 1, height: "auto",
                                    transition: {
                                        type: "spring",
                                        bounce: 0.5,
                                        stiffness: 180,
                                        duration: .4,
                                    }
                                },
                                collapsed: {
                                    opacity: 1, height: 0,
                                    transition: {
                                        ease: "easeOut",
                                        duration: .25,
                                        when: "afterChildren",
                                    }
                                },
                            }}
                        >
                            <motion.div
                                key="popup-content"
                                variants={{
                                    open: {
                                        opacity: [0, 1], y: [-50, 0],
                                        transition: {
                                            duration: 0.4,
                                            delay: 0.1,
                                            y: {
                                                type: "spring",
                                                bounce: 0.5,
                                                stiffness: 180,
                                            },
                                            opacity: {
                                                ease: "easeIn",
                                            }
                                        },
                                        collapsed: {
                                            opacity: [1, 0], y: [0, -20],
                                            transition: {
                                                ease: "easeOut",
                                                duration: .15,
                                            }
                                        },
                                    }
                                }}
                                
                                className="flex flex-col"
                            >


                                <div className="p-4 flex flex-col">
                                    {/* Layout options */}
                                    <div className="pb-2">
                                        <h3 className="text-lg font-medium">Layout</h3>
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
                                    </div>


                                    {/* Responsive toggle */}
                                    <div className="pb-2">
                                        <button
                                            className="toggle-container bg-surface-1/30 rounded-full shadow-md p-2 w-24 h-12 flex cursor-pointer"
                                            style={{ justifyContent: "flex-" + (useResponsive ? "start" : "end") }}
                                            onClick={toggleResponsive}
                                        >
                                            <motion.div
                                                className="toggle-handle aspect-square bg-pink rounded-full h-full"
                                                layout
                                                layoutId="toggle-handle"
                                                transition={{
                                                    type: "spring",
                                                    visualDuration: 0.1,
                                                    bounce: 0.5,
                                                }}
                                            />
                                        </button>
                                    </div>

                                    {/* Column selector with animation */}
                                    <ColumnSelector userColumns={userColumns} handleColumnChange={handleColumnChange} useResponsive={useResponsive} />
                                </div>
                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div >
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