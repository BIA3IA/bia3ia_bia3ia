import { Cat } from "@/components/game/Cat";
import { Player } from "@/components/game/Player";
import "@/styles/game.css";

export function GameRoom() {
  return (
    <main className="game-room">
      <Player />
      <Cat />
    </main>
  );
}
