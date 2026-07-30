const CALCULATOR_SIZE = 248;
const IDLE_SPRITE_COLUMNS = 4;
const IDLE_SPRITE_ROWS = 2;

const SOUTH_IDLE_COLUMN = 2;
const SOUTH_IDLE_ROW = 1;

export function Calculator() {
    return (
        <div
            className="player"
            style={{
                left: 800,
                top: 120,
                backgroundImage: 'url("/sprites/calculator/idle.png")',
                backgroundSize: `${CALCULATOR_SIZE * IDLE_SPRITE_COLUMNS}px ${CALCULATOR_SIZE * IDLE_SPRITE_ROWS
                    }px`,
                backgroundPosition: `${-SOUTH_IDLE_COLUMN * CALCULATOR_SIZE}px ${-SOUTH_IDLE_ROW * CALCULATOR_SIZE
                    }px`,
            }}
            aria-hidden="true"
        />
    );
}
