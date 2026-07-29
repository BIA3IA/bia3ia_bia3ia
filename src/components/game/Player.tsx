"use client";

import { useEffect, useRef, useState } from "react";

type Direction =
    | "north"
    | "south"
    | "east"
    | "west"
    | "north_east"
    | "north_west"
    | "south_east"
    | "south_west";

type PlayerState = {
    x: number;
    y: number;
    direction: Direction;
    walking: boolean;
    running: boolean; // non lo sto usando ma magari poi mi serve 
};

const PLAYER_SIZE = 148;
const PLAYER_SPEED = 160;

const directionByKey = {
    KeyW: "up",
    KeyA: "left",
    KeyS: "down",
    KeyD: "right",

    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowDown: "down",
    ArrowRight: "right",
} as const;

// Idle sprite paths for each direction
const idleSpriteByDirection: Record<Direction, string> = {
    north: "/sprites/idle/north.png",
    south: "/sprites/idle/south.png",
    west: "/sprites/idle/west.png",
    east: "/sprites/idle/east.png",
    north_west: "/sprites/idle/north_west.png",
    north_east: "/sprites/idle/north_east.png",
    south_west: "/sprites/idle/south_west.png",
    south_east: "/sprites/idle/south_east.png",
};

const southWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/south/frame_${String(index)}.png`,
);

const eastWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/east/frame_${String(index)}.png`,
);

const westWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/west/frame_${String(index)}.png`,
);

const northWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/north/frame_${String(index)}.png`,
);

const northEastWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/north-east/frame_${String(index)}.png`,
);

const northWestWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/north-west/frame_${String(index)}.png`,
);

const southEastWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/south-east/frame_${String(index)}.png`,
);

const southWestWalkingFrames = Array.from(
    { length: 8 },
    (_, index) =>
        `/sprites/walking/south-west/frame_${String(index)}.png`,
);

const walkingFramesByDirection: Partial<Record<Direction, string[]>> = {
    south: southWalkingFrames,
    east: eastWalkingFrames,
    west: westWalkingFrames,
    north: northWalkingFrames,
    north_west: northWestWalkingFrames,
    north_east: northEastWalkingFrames,
    south_west: southWestWalkingFrames,
    south_east: southEastWalkingFrames,
};

function getDirection(horizontal: number, vertical: number): Direction {
    if (horizontal === 0 && vertical < 0) return "north";
    if (horizontal > 0 && vertical < 0) return "north_east";
    if (horizontal > 0 && vertical === 0) return "east";
    if (horizontal > 0 && vertical > 0) return "south_east";
    if (horizontal === 0 && vertical > 0) return "south";
    if (horizontal < 0 && vertical > 0) return "south_west";
    if (horizontal < 0 && vertical === 0) return "west";
    if (horizontal < 0 && vertical < 0) return "north_west";

    // Default to south
    return "south";
}

export function Player() {

    // Itial player state
    const [player, setPlayer] = useState<PlayerState>({
        x: 300,
        y: 220,
        direction: "south",
        walking: false,
        running: false,
    });

    const [walkingFrame, setWalkingFrame] = useState(0);
    const pressedKeys = useRef(new Set<string>());
    const lastFrameTime = useRef<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isDirectionKey = event.code in directionByKey;
            const isRunKey =
                event.code === "ShiftLeft" || event.code === "ShiftRight";

            if (!isDirectionKey && !isRunKey) return;

            event.preventDefault();
            pressedKeys.current.add(event.code);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const isDirectionKey = event.code in directionByKey;

            const isRunKey =
                event.code === "ShiftLeft" || event.code === "ShiftRight";

            if (!isDirectionKey && !isRunKey) return;

            pressedKeys.current.delete(event.code);
        };

        // Animation loop to move the player
        const movePlayer = (currentTime: number) => {
            const previousTime = lastFrameTime.current ?? currentTime;
            // Seconds from last frame, capped to avoid jumps
            const deltaTime = Math.min((currentTime - previousTime) / 1000, 0.05);
            lastFrameTime.current = currentTime;

            const horizontal =
                (pressedKeys.current.has("KeyD") || pressedKeys.current.has("ArrowRight") ? 1 : 0) -
                (pressedKeys.current.has("KeyA") || pressedKeys.current.has("ArrowLeft") ? 1 : 0);
            const vertical =
                (pressedKeys.current.has("KeyS") || pressedKeys.current.has("ArrowDown") ? 1 : 0) -
                (pressedKeys.current.has("KeyW") || pressedKeys.current.has("ArrowUp") ? 1 : 0);

            if (horizontal === 0 && vertical === 0) {
                setPlayer((currentPlayer) =>
                    currentPlayer.walking
                        ? { ...currentPlayer, walking: false }
                        : currentPlayer,
                );
            } else {

                const isRunning =
                    pressedKeys.current.has("ShiftLeft") ||
                    pressedKeys.current.has("ShiftRight");

                const speed = isRunning ? PLAYER_SPEED * 2 : PLAYER_SPEED;
                const vectorLength = Math.hypot(horizontal, vertical);
                const movement = (speed * deltaTime) / vectorLength;
                const direction: Direction = getDirection(horizontal, vertical);

                setPlayer((currentPlayer) => ({
                    x: Math.max(
                        0,
                        Math.min(
                            currentPlayer.x + horizontal * movement,
                            window.innerWidth - PLAYER_SIZE,
                        ),
                    ),
                    y: Math.max(
                        0,
                        Math.min(
                            currentPlayer.y + vertical * movement,
                            window.innerHeight - PLAYER_SIZE,
                        ),
                    ),
                    direction,
                    walking: true,
                    running: isRunning,
                }));
            }

            animationFrame = window.requestAnimationFrame(movePlayer);
        };

        let animationFrame = window.requestAnimationFrame(movePlayer);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const walkingFrames = walkingFramesByDirection[player.direction];

    // walking
    useEffect(() => {
        if (!player.walking || !walkingFrames) return;

        const interval = window.setInterval(() => {
            setWalkingFrame((currentFrame) =>
                (currentFrame + 1) % walkingFrames.length,
            );
        }, 100);

        return () => window.clearInterval(interval);
    }, [player.direction, player.walking, walkingFrames]);

    const spritePath =
        player.walking && walkingFrames
            ? walkingFrames[walkingFrame]
            : idleSpriteByDirection[player.direction];

    return (
        <div
            className="player"
            style={{
                left: player.x,
                top: player.y,
                backgroundImage: `url("${spritePath}")`,
            }}
            aria-hidden="true"
        />
    );
}
