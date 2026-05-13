import "@/styles/game.css";

import { IoSparkles } from "react-icons/io5";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function GameRoom() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-bg p-6">
      <div className="flex w-(--room-w) max-w-[calc(100vw-2rem)] flex-col items-center gap-3">
        <Card className="flex min-h-12 w-full flex-row items-center justify-between border-surface-panel-border bg-surface-panel px-6 py-0 text-fg shadow-panel backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <IoSparkles className="text-accent-soft" />
            <span className="font-mono text-xs tracking-[0.18em] text-fg">
              bia3ia.room
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-border text-fg-muted">
              WASD
            </Badge>
            <span className="font-mono text-xs text-fg-faint">·</span>
            <Badge variant="outline" className="border-border text-fg-muted">
              E interact
            </Badge>
          </div>
        </Card>

        {/* Room Container */}
        <div className="flex w-full flex-col rounded-xl shadow-room">
          <div className="room-shell z-2 h-(--room-h) w-full overflow-hidden rounded-xl border-4 border-b-0 border-room-frame p-(--wall-w) [image-rendering:pixelated]">
            <div className="room-floor relative size-full rounded-lg border-4 border-b-0 border-room-frame">
              <div className="wall-texture absolute inset-x-0 top-0 z-1 h-(--wall-w) border-b-[3px] border-room-frame" />
            </div>
          </div>
          <div className="room-base wall-texture w-full rounded-b-xl border-4 border-t-0 border-room-frame -translate-y-5 z-0" />
        </div>

        <p className="text-center text-md text-fg-muted">
          Built somewhere between purple glow, caffeine and too many open tabs. — 2026
        </p>
      </div>
    </main>
  );
}
