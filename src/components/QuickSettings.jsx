import React from "react";
import { useGridLayout } from "./GridLayoutContext";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { WrenchIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import ColumnSelector from "./ColumnSelector";

const ANIMATION_DURATION = 0.4;
const ANIMATION_DELAY = 0.9;

export default function QuickSettings() {
  const {
    layoutOptions,
    layoutType,
    userColumns,
    useResponsive,
    handleLayoutChange,
    handleColumnChange,
    toggleResponsive,
  } = useGridLayout();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Modified handlers that respect animation state
  const handleToggleMenu = () => {
    if (!isAnimating) {
      setIsVisible(!isVisible);
    }
  };

  const handleLayoutChangeWithCheck = (option) => {
    if (!isAnimating) {
      handleLayoutChange(option);
    }
  };

  const handleResponsiveToggleWithCheck = () => {
    if (!isAnimating) {
      toggleResponsive();
    }
  };

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
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                  transition: {
                    type: "spring",
                    bounce: 0.5,
                    duration: ANIMATION_DURATION,
                  },
                },
                collapsed: {
                  opacity: 1,
                  height: 0,
                  transition: {
                    ease: "easeOut",
                    duration: ANIMATION_DURATION / 2,
                    when: "afterChildren",
                  },
                },
              }}
            >
              <motion.div
                key="popup-content"
                variants={{
                  open: {
                    opacity: [0, 1],
                    y: ["-50px", 0],
                    transition: {
                      y: {
                        type: "spring",
                        bounce: 0.3,
                        duration: ANIMATION_DURATION,
                      },
                      opacity: {
                        ease: "easeIn",
                        duration: ANIMATION_DURATION / 2,
                      },
                    },
                  },
                  collapsed: {
                    opacity: [1, 0],
                    y: [0, "-20px"],
                    transition: {
                      ease: "easeOut",
                      duration: 0.15,
                    },
                  },
                }}
                className="flex flex-col"
              >
                <div className="p-4 flex flex-col">
                  <div className="pb-2">
                    <h3 className="text-lg font-medium">Layout</h3>
                    <div className="grid place-content-center px-4 relative">
                      <div className="relative flex w-fit items-center rounded-full">
                        {Object.keys(layoutOptions).map((option) => {
                          const isSelected = layoutType === option;
                          const buttonClasses = `
                                                    flex z-10 flex-col w-26 justify-center items-center px-4 py-2 rounded-xl transition duration-300
                                                    ${
                                                      isAnimating
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : "cursor-pointer"
                                                    }
                                                    ${
                                                      isSelected
                                                        ? "text-text "
                                                        : "text-subtext-0 hover:text-text"
                                                    }
                                                `;
                          return (
                            <button
                              key={option}
                              onClick={() =>
                                handleLayoutChangeWithCheck(option)
                              }
                              disabled={isAnimating}
                              className={buttonClasses}
                            >
                              {React.createElement(
                                layoutOptions[option].component,
                                { className: "size-6" }
                              )}
                              <span>{layoutOptions[option].name}</span>
                            </button>
                          );
                        })}
                        <div
                          className={`absolute inset-0 z-0 flex ${
                            layoutType === "comfort"
                              ? "justify-start"
                              : layoutType === "compact"
                              ? "justify-end"
                              : "justify-center"
                          }`}
                        >
                          <motion.span
                            layout
                            transition={{
                              type: "spring",
                              damping: 15,
                              stiffness: 250,
                            }}
                            className="h-full w-1/3 rounded-xl bg-mantle"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Responsive toggle */}
                  <div className="pb-2">
                    <button
                      className={`toggle-container bg-surface-1 /30 rounded-full shadow-md p-2 w-24 h-12 flex ${
                        isAnimating
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      style={{
                        justifyContent:
                          "flex-" + (!useResponsive ? "end" : "start"),
                      }}
                      onClick={handleResponsiveToggleWithCheck}
                      disabled={isAnimating}
                    >
                      <motion.div
                        className="toggle-handle aspect-square bg-pink rounded-full h-full"
                        layout
                        layoutId="toggle-handle"
                        transition={{
                          type: "spring",
                          visualDuration: ANIMATION_DURATION / 4,
                          bounce: 0.5,
                        }}
                      />
                    </button>
                  </div>

                  {/* Column selector with animation */}
                  <ColumnSelector
                    userColumns={userColumns}
                    handleColumnChange={
                      isAnimating ? () => {} : handleColumnChange
                    }
                    useResponsive={useResponsive}
                    isAnimating={isAnimating}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.button
        className={`px-4 py-2 z-50 w-auto ${
          isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } text-subtext-0 hover:text-subtext-0 active:text-text ${
          isVisible ? "text-text hover:text-text" : ""
        }`}
        onClick={handleToggleMenu}
        whileTap={!isAnimating ? { y: 1 } : {}}
        disabled={isAnimating}
      >
        {!isVisible ? (
          <WrenchIcon className="size-6" />
        ) : (
          <WrenchScrewdriverIcon className="size-6" />
        )}
      </motion.button>
    </>
  );
}
