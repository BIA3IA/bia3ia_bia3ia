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

const PLAYER_SIZE = 248;
const PLAYER_SPEED = 160;
const WALKING_FRAME_COUNT = 8;

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

const IDLE_SPRITE_PATH = "/sprites/player/idle.png";
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
    north: "/sprites/player/walk_north.png",
    south: "/sprites/player/walk_south.png",
    east: "/sprites/player/walk_east.png",
    west: "/sprites/player/walk_west.png",
    north_west: "/sprites/player/walk_north_west.png",
    north_east: "/sprites/player/walk_north_east.png",
    south_west: "/sprites/player/walk_south_west.png",
    south_east: "/sprites/player/walk_south_east.png",
};

const runningSpriteByDirection: Record<Direction, string> = {
    north: "/sprites/player/running_north.png",
    south: "/sprites/player/running_south.png",
    east: "/sprites/player/running_east.png",
    west: "/sprites/player/running_west.png",
    north_west: "/sprites/player/running_north_west.png",
    north_east: "/sprites/player/running_north_east.png",
    south_west: "/sprites/player/running_south_west.png",
    south_east: "/sprites/player/running_south_east.png",
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
                        ? { ...currentPlayer, walking: false, running: false }
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

    useEffect(() => {
        if (!player.walking) return;

        const interval = window.setInterval(() => {
            setWalkingFrame((currentFrame) =>
                (currentFrame + 1) % WALKING_FRAME_COUNT,
            );
        }, player.running ? 50 : 100);

        return () => window.clearInterval(interval);
    }, [player.running, player.walking]);

    const [idleColumn, idleRow] = idleFrameByDirection[player.direction];
    const spritePath = !player.walking
        ? IDLE_SPRITE_PATH
        : player.running
            ? runningSpriteByDirection[player.direction]
            : walkingSpriteByDirection[player.direction];

    return (
        <div
            className="player"
            style={{
                left: player.x,
                top: player.y,
                backgroundImage: `url("${spritePath}")`,
                backgroundSize: player.walking
                    ? `${PLAYER_SIZE * WALKING_FRAME_COUNT}px ${PLAYER_SIZE}px`
                    : `${PLAYER_SIZE * IDLE_SPRITE_COLUMNS}px ${PLAYER_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: player.walking
                    ? `${-walkingFrame * PLAYER_SIZE}px 0`
                    : `${-idleColumn * PLAYER_SIZE}px ${-idleRow * PLAYER_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
