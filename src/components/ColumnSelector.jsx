import React from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ColumnSelector({ userColumns, handleColumnChange, useResponsive }) {
    return (
        <AnimatePresence initial={false}>
            {console.log("column selector")}
            {useResponsive && (
                <motion.div
                    key="columns"
                    className="overflow-hidden"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.3,
                        when: "beforeChildren",
                        delayChildren: 0.1,
                        staggerChildren: 0.1
                    }}
                >
                    <div className="p-4 flex flex-col items-center gap-2">
                        <motion.h3
                            className="text-lg font-medium"
                            variants={{
                                open: { opacity: 1, y: 0 },
                                collapsed: { opacity: 0, y: -10 }
                            }}
                        >
                            Number of Columns: {userColumns}
                        </motion.h3>

                        <motion.div
                            className="flex items-center gap-2"
                            variants={{
                                open: { opacity: 1, y: 0 },
                                collapsed: { opacity: 0, y: -10 }
                            }}
                        >
                            {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
                                <motion.label
                                    key={n}
                                    htmlFor={`columns-${n}`}
                                    className="cursor-pointer"
                                    variants={{
                                        open: { opacity: 1, y: 0 },
                                        collapsed: { opacity: 0, y: -10 }
                                    }}
                                    transition={{
                                        ease: ["easeIn", "easeOut"]
                                    }}
                                >
                                    <input
                                        id={`columns-${n}`}
                                        type="checkbox"
                                        value={n}
                                        onChange={handleColumnChange}
                                        className="hidden"
                                    />
                                    <div className="h-[1.75rem] w-[1.75rem] relative">
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 rounded-xl bg-surface-1 ${userColumns >= n
                                                    ? "opacity-100 !bg-mantle"
                                                    : "opacity-30"
                                                }`}
                                            style={{ height: `${n * 0.25}rem` }}
                                        />
                                    </div>
                                </motion.label>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}