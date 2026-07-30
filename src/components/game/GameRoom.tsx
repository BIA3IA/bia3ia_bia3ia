import { Cat } from "@/components/game/Cat";
import { Player } from "@/components/game/Player";
import { Cartomancer } from "@/components/game/Cartomancer";
import "@/styles/game.css";
import { Apprentice } from "@/components/game/Apprentice";
import { Mayor } from "@/components/game/Mayor";
import { Calculator } from "@/components/game/Calculator";
import { Lakewatcher } from "@/components/game/Lakewatcher";
import { Barista } from "@/components/game/Barista";
import { Technomancer } from "@/components/game/Technomancer";
import { Witch } from "@/components/game/Witch";
import { Ghost } from "@/components/game/Ghost";
import { Citizen } from "@/components/game/Citizen";
import { Death } from "@/components/game/Death";

export function GameRoom() {
  return (
    <main className="game-room">
      <Player />
      <Cat />
      <Cartomancer />
      <Apprentice />
      <Mayor />
      <Calculator />
      <Lakewatcher />
      <Barista />
      <Technomancer />
      <Witch />
      <Ghost />
      <Citizen />
      <Death />
    </main>
  );
}
