const DEATH_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Death() {
    return (
        <div
            className="player"
            style={{
                left: 90,
                top: 420,
                backgroundImage: 'url("/sprites/death/idle.png")',
                backgroundSize: `${DEATH_SIZE * IDLE_SPRITE_COLUMNS}px ${DEATH_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * DEATH_SIZE}px ${-SOUTH_IDLE_ROW * DEATH_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
