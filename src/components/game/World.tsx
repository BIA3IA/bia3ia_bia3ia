import { Cat } from "@/components/game/characters/Cat";
import { Player } from "@/components/game/characters/Player";
import { Cartomancer } from "@/components/game/characters/Cartomancer";
import "@/styles/game.css";
import { Apprentice } from "@/components/game/characters/Apprentice";
import { Mayor } from "@/components/game/characters/Mayor";
import { Calculator } from "@/components/game/characters/Calculator";
import { Lakewatcher } from "@/components/game/characters/Lakewatcher";
import { Barista } from "@/components/game/characters/Barista";
import { Technomancer } from "@/components/game/characters/Technomancer";
import { Witch } from "@/components/game/characters/Witch";
import { Ghost } from "@/components/game/characters/Ghost";
import { Citizen } from "@/components/game/characters/Citizen";
import { Death } from "@/components/game/characters/Death";

export function World() {
  return (
    <main className="world">
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
