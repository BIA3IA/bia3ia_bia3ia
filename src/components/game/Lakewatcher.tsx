const LAKEWATCHER_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Lakewatcher() {
    return (
        <div
            className="player"
            style={{
                left: 1400,
                top: 220,
                backgroundImage: 'url("/sprites/lakewatcher/idle.png")',
                backgroundSize: `${LAKEWATCHER_SIZE * IDLE_SPRITE_COLUMNS}px ${LAKEWATCHER_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * LAKEWATCHER_SIZE}px ${-SOUTH_IDLE_ROW * LAKEWATCHER_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
