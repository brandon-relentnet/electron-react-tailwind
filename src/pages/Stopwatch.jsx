import React from 'react';
import { useState, useEffect } from 'react';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const toggleTimer = () => {
        isRunning ? setIsRunning(false) : setIsRunning(true);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
    };

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    return (
        <div>
            <h1 className="text-2xl font-bold">Timer</h1>
            {/* Your timer implementation will go here */}
            <div className="text-4xl font-mono">{time}s</div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={toggleTimer}
            >
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
                className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={resetTimer}
            >
                Reset
            </button>
            <div className="mt-4">
                <h2 className="text-xl font-bold">Instructions</h2>
                <p>Click "Start" to begin the timer.</p>
                <p>Click "Pause" to stop the timer.</p>
                <p>Click "Reset" to set the timer back to 0.</p>
                <p>The timer will count up in seconds.</p>
                <p>Enjoy your time tracking!</p>
            </div>
        </div>
    );
}