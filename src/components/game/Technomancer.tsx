const TECHNOMANCER_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Technomancer() {
    return (
        <div
            className="player"
            style={{
                left: 1100,
                top: 150,
                backgroundImage: 'url("/sprites/technomancer/idle.png")',
                backgroundSize: `${TECHNOMANCER_SIZE * IDLE_SPRITE_COLUMNS}px ${TECHNOMANCER_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * TECHNOMANCER_SIZE}px ${-SOUTH_IDLE_ROW * TECHNOMANCER_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
