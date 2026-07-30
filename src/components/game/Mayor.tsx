const MAYOR_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Mayor() {
    return (
        <div
            className="player"
            style={{
                left: 1200,
                top: 420,
                backgroundImage: 'url("/sprites/aspiring_mayor/idle.png")',
                backgroundSize: `${MAYOR_SIZE * IDLE_SPRITE_COLUMNS}px ${MAYOR_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * MAYOR_SIZE}px ${-SOUTH_IDLE_ROW * MAYOR_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
