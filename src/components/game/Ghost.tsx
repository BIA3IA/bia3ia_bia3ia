const GHOST_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Ghost() {
    return (
        <div
            className="player"
            style={{
                left: 100,
                top: 120,
                backgroundImage: 'url("/sprites/ghost/idle.png")',
                backgroundSize: `${GHOST_SIZE * IDLE_SPRITE_COLUMNS}px ${GHOST_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * GHOST_SIZE}px ${-SOUTH_IDLE_ROW * GHOST_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
