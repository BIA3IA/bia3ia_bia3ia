"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";

type PlayerState = {
    x: number;
    y: number;
    direction: Direction;
    walking: boolean;
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
    up: "/sprites/idle/north.png",
    down: "/sprites/idle/south.png",
    left: "/sprites/idle/west.png",
    right: "/sprites/idle/east.png",
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

const walkingFramesByDirection: Partial<Record<Direction, string[]>> = {
    down: southWalkingFrames,
    right: eastWalkingFrames,
    left: westWalkingFrames,
    up: northWalkingFrames,
};

export function Player() {

    // Itial player state
    const [player, setPlayer] = useState<PlayerState>({
        x: 300,
        y: 220,
        direction: "down",
        walking: false,
    });

    const [walkingFrame, setWalkingFrame] = useState(0);
    const pressedKeys = useRef(new Set<string>());
    const lastFrameTime = useRef<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!(event.code in directionByKey)) return;

            event.preventDefault();
            pressedKeys.current.add(event.code);
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (!(event.code in directionByKey)) return;

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
                const vectorLength = Math.hypot(horizontal, vertical);
                const movement = (PLAYER_SPEED * deltaTime) / vectorLength;
                const direction: Direction =
                    horizontal < 0
                        ? "left"
                        : horizontal > 0
                            ? "right"
                            : vertical < 0
                                ? "up"
                                : "down";

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

    // walking south
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
