const BARISTA_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Barista() {
    return (
        <div
            className="player"
            style={{
                left: 1000,
                top: 620,
                backgroundImage: 'url("/sprites/sleepless_barista/idle.png")',
                backgroundSize: `${BARISTA_SIZE * IDLE_SPRITE_COLUMNS}px ${BARISTA_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * BARISTA_SIZE}px ${-SOUTH_IDLE_ROW * BARISTA_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
