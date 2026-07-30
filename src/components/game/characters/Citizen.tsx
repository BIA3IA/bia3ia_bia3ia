const CITIZEN_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Citizen() {
    return (
        <div
            className="player"
            style={{
                left: 170,
                top: 620,
                backgroundImage: 'url("/sprites/citizen/idle.png")',
                backgroundSize: `${CITIZEN_SIZE * IDLE_SPRITE_COLUMNS}px ${CITIZEN_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * CITIZEN_SIZE}px ${-SOUTH_IDLE_ROW * CITIZEN_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
