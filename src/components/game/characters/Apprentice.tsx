const APPRENTICE_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Apprentice() {
    return (
        <div
            className="player"
            style={{
                left: 900,
                top: 420,
                backgroundImage: 'url("/sprites/apprentice/idle.png")',
                backgroundSize: `${APPRENTICE_SIZE * IDLE_SPRITE_COLUMNS}px ${APPRENTICE_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * APPRENTICE_SIZE}px ${-SOUTH_IDLE_ROW * APPRENTICE_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
