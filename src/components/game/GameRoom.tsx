import { IoSparkles } from "react-icons/io5";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function GameRoom() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-bg p-6">
      <div className="min-w-6xl flex flex-col items-center gap-3">
        <Card className="min-h-12 w-full flex-row items-center justify-between border-surface-panel-border bg-surface-panel px-6 py-0 text-fg shadow-panel backdrop-blur-lg">
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

        <p className="mt-6 text-center text-md text-fg-muted">
          Built somewhere between purple glow, caffeine and too many open tabs. — 2026
        </p>
      </div>
    </main>
  );
}
