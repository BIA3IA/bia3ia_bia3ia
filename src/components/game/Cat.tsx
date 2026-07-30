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

type CatState = {
    x: number;
    y: number;
    direction: Direction;
    walking: boolean;
};

const CAT_SIZE = 128;
const CAT_SPEED = 160;
const WALKING_FRAME_COUNT = 6;

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

const IDLE_SPRITE_PATH = "/sprites/cat/idle.png";
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const idleFrameByDirection: Record<Direction, readonly [number, number]> = {
    east: [0, 0],
    north_east: [1, 0],
    north_west: [2, 0],
    north: [3, 0],
    south_east: [0, 1],
    south_west: [1, 1],
    south: [2, 1],
    west: [3, 1],
};

const walkingSpriteByDirection: Record<Direction, string> = {
    north: "/sprites/cat/walk_north.png",
    south: "/sprites/cat/walk_south.png",
    east: "/sprites/cat/walk_east.png",
    west: "/sprites/cat/walk_west.png",
    north_east: "/sprites/cat/walk_north.png",
    north_west: "/sprites/cat/walk_north.png",
    south_east: "/sprites/cat/walk_east.png",
    south_west: "/sprites/cat/walk_west.png"
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

export function Cat() {

    // Itial cat state
    const [cat, setCat] = useState<CatState>({
        x: 450,
        y: 320,
        direction: "south",
        walking: false,
    });

    const [walkingFrame, setWalkingFrame] = useState(0);
    const pressedKeys = useRef(new Set<string>());
    const lastFrameTime = useRef<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isDirectionKey = event.code in directionByKey;

            if (!isDirectionKey) return;

            event.preventDefault();
            pressedKeys.current.add(event.code);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const isDirectionKey = event.code in directionByKey;

            if (!isDirectionKey) return;

            pressedKeys.current.delete(event.code);
        };

        // Animation loop to move the cat
        const moveCat = (currentTime: number) => {
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
                setCat((currentCat) =>
                    currentCat.walking
                        ? { ...currentCat, walking: false }
                        : currentCat,
                );
            } else {

                const vectorLength = Math.hypot(horizontal, vertical);
                const movement = (CAT_SPEED * deltaTime) / vectorLength;
                const direction: Direction = getDirection(horizontal, vertical);

                setCat((currentCat) => ({
                    x: Math.max(
                        0,
                        Math.min(
                            currentCat.x + horizontal * movement,
                            window.innerWidth - CAT_SIZE,
                        ),
                    ),
                    y: Math.max(
                        0,
                        Math.min(
                            currentCat.y + vertical * movement,
                            window.innerHeight - CAT_SIZE,
                        ),
                    ),
                    direction,
                    walking: true,
                }));
            }

            animationFrame = window.requestAnimationFrame(moveCat);
        };

        let animationFrame = window.requestAnimationFrame(moveCat);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (!cat.walking) return;

        const interval = window.setInterval(() => {
            setWalkingFrame((currentFrame) =>
                (currentFrame + 1) % WALKING_FRAME_COUNT,
            );
        }, 100);

        return () => window.clearInterval(interval);
    }, [cat.walking]);

    const [idleColumn, idleRow] = idleFrameByDirection[cat.direction];
    const spritePath = cat.walking
        ? walkingSpriteByDirection[cat.direction]
        : IDLE_SPRITE_PATH;

    return (
        <div
            className="cat"
            style={{
                left: cat.x,
                top: cat.y,
                backgroundImage: `url("${spritePath}")`,
                backgroundSize: cat.walking
                    ? `${CAT_SIZE * WALKING_FRAME_COUNT}px ${CAT_SIZE}px`
                    : `${CAT_SIZE * IDLE_SPRITE_COLUMNS}px ${CAT_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: cat.walking
                    ? `${-walkingFrame * CAT_SIZE}px 0`
                    : `${-idleColumn * CAT_SIZE}px ${-idleRow * CAT_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
