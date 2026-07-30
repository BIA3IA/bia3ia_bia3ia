const CARTOMANCER_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

// La cartomante guarda verso sud: terza tile della seconda riga.
const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Cartomancer() {
    return (
        <div
            className="player"
            style={{
                left: 400,
                top: 420,
                backgroundImage: 'url("/sprites/cartomancer/idle.png")',
                backgroundSize: `${CARTOMANCER_SIZE * IDLE_SPRITE_COLUMNS}px ${CARTOMANCER_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * CARTOMANCER_SIZE}px ${-SOUTH_IDLE_ROW * CARTOMANCER_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
