import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WrenchIcon } from "@heroicons/react/24/solid";
import QuickSettings from "../components/QuickSettings";

export default function HomePage() {
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => setIsOn(!isOn);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    return (
        <>
            <QuickSettings />
            <motion.button
                whileTap={{ y: 1 }}
                layout
                key="settings"
                className={`px-4 py-2 w-auto cursor-pointer text-subtext-0 hover:text-subtext-0 active:text-text`}
                onClick={() => setIsPopupVisible(!isPopupVisible)}
            >
                <WrenchIcon className="h-6 w-6" />
                <span className="ml-2">Settings</span>
            </motion.button>

            <AnimatePresence initial={false} mode="wait">
                {isPopupVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: -25 }}
                        transition={{ duration: 0.15 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0, x: -25 }}
                        key="box"
                        style={{ transformOrigin: 'top right' }}
                    >
                        <div className="flex flex-col bg-surface-0 rounded-xl p-4 shadow-md">
                            <button
                                className="bg-surface-1/30 rounded-full shadow-md p-2 w-24 h-12 flex cursor-pointer"
                                style={{ justifyContent: isOn ? "flex-start" : "flex-end" }}
                                onClick={toggleSwitch}
                            >
                                <motion.div
                                    className="aspect-square bg-pink rounded-full h-full"
                                    layout
                                    transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                        duration: 0.2,
                                    }}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {isOn && (
                                    <motion.div
                                        layout
                                        key="content"
                                        className="overflow-hidden"
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{
                                            open: { opacity: 1, height: "auto" },
                                            collapsed: { opacity: 0, height: 0 },
                                        }}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.3,
                                            when: "beforeChildren",    // ← grow first
                                            delayChildren: 0.05,        // ← then delay kids
                                            staggerChildren: 0.1,      // ← optional: slightly stagger each child
                                        }}
                                    >
                                        <div className="p-4 flex flex-col gap-2">
                                            {["Option 1", "Option 2"].map((label) => (
                                                <motion.button
                                                    key={label}
                                                    className="bg-surface-1/30 rounded-xl p-2 shadow-md m-1"
                                                    variants={{
                                                        open: { opacity: 1, y: 0 },
                                                        collapsed: { opacity: 0, y: -10 },
                                                    }}
                                                    transition={{
                                                        ease: ["easeIn", "easeOut"],
                                                    }}
                                                >
                                                    {label}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );

}
