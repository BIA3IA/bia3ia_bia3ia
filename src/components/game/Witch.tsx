const WITCH_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Witch() {
    return (
        <div
            className="player"
            style={{
                left: 1300,
                top: 20,
                backgroundImage: 'url("/sprites/storm_witch/idle.png")',
                backgroundSize: `${WITCH_SIZE * IDLE_SPRITE_COLUMNS}px ${WITCH_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * WITCH_SIZE}px ${-SOUTH_IDLE_ROW * WITCH_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
