export enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

type GridCoords = {
    x: number
    y: number
}

interface Boardtile {
    coords: GridCoords
    x: number
    y: number
    w: number
    h: number
    withSnake: boolean
    withFood: boolean
}

class Gameboard {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private step: number
    private snakePartSize: number
    private board: Boardtile[][]
    private boardWidth: number
    private boardHeight: number
    // public snake: Snake

    constructor(
        width: number,
        height: number,
        ctx: CanvasRenderingContext2D,
        snakePartSize: number = 30,
        pixelRatio: number = window.devicePixelRatio
    ) {
        this.width = width
        this.height = height
        this.ctx = ctx
        this.snakePartSize = snakePartSize
        this.step = this.calculateStep(snakePartSize, pixelRatio)
        this.createGrid()
    }

    public setSnakeOnBoardTile(coord: GridCoords) {
        this.board[coord.x][coord.y].withSnake = true
    }
    public removeSnakeFromBoardTile(coord: GridCoords) {
        this.board[coord.x][coord.y].withSnake = false
    }

    getBoard(): Boardtile[][] {
        return this.board
    }

    private calculateStep(snakePartSize: number, pixelRatio: number): number {
        return (this.width / snakePartSize) * pixelRatio <= 30 * pixelRatio
            ? (this.width / snakePartSize) * pixelRatio
            : 30 * pixelRatio
    }

    private createGrid() {
        this.board = []
        let x = 0
        let y = 0
        for (let i = 0; i < this.width; i += this.step, x++) {
            this.board[x] = []
            for (let j = 0; j < this.height; j += this.step, y++) {
                this.board[x][y] = {
                    coords: {
                        x: x,
                        y: y,
                    },
                    x: i,
                    y: j,
                    w: this.step,
                    h: this.step,
                    withSnake: false,
                    withFood: false,
                }
            }
        }
        this.boardHeight = y
        this.boardWidth = x
    }

    public getBoardWidth(): number {
        return this.boardWidth
    }

    public getBoardHeight(): number {
        return this.boardHeight
    }

    public draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.board.forEach((row) => {
            row.forEach((tile) => {
                if (tile.withSnake) {
                    this.ctx.fillStyle = '#eab308'
                    this.ctx.fillRect(tile.x, tile.y, tile.w, tile.h)
                } else if (tile.withFood) {
                    this.ctx.fillStyle = '#00fff0'
                    this.ctx.fillRect(tile.x, tile.y, tile.w, tile.h)
                }
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
                // this.ctx.fill()
                this.ctx.lineWidth = 2
                this.ctx.strokeRect(tile.x, tile.y, tile.w, tile.h)
            })
        })
    }
}
class Snake {
    private direction: Direction
    private body: GridCoords[]
    private running: boolean
    private gameboard: Gameboard
    private timeBetweenMoves: number = 500
    private lastMove: number = 0

    constructor(game: Gameboard) {
        this.gameboard = game
        this.direction = Direction.Right
        this.initSnake()
        this.run(0)
    }

    public setDirection(direction: Direction) {
        if (this.direction === Direction.Up && direction === Direction.Down) {
            return
        } else if (
            this.direction === Direction.Down &&
            direction === Direction.Up
        ) {
            return
        } else if (
            this.direction === Direction.Left &&
            direction === Direction.Right
        ) {
            return
        } else if (
            this.direction === Direction.Right &&
            direction === Direction.Left
        ) {
            return
        } else {
            this.direction = direction
        }
    }

    private getDxDy(): { dx: number; dy: number } {
        switch (this.direction) {
            case Direction.Up:
                return { dx: 0, dy: -1 }
            case Direction.Down:
                return { dx: 0, dy: 1 }
            case Direction.Left:
                return { dx: -1, dy: 0 }
            case Direction.Right:
                return { dx: 1, dy: 0 }
        }
    }

    private moveSnake = () => {
        const { dx, dy } = this.getDxDy()
        const newHead = { x: this.body[0].x + dx, y: this.body[0].y + dy }
        if (this.isColliding(newHead)) {
            this.stop()
            return
        }
        this.body.unshift(newHead)
        this.body.pop()
        this.checkIfWall()
    }

    private checkIfWall() {
        this.body.forEach((tile) => {
            if (tile.x < 0 || tile.x >= this.gameboard.getBoardWidth()) {
                tile.x = tile.x < 0 ? this.gameboard.getBoardWidth() - 1 : 0
            }
            if (tile.y < 0 || tile.y >= this.gameboard.getBoardHeight()) {
                tile.y = tile.y < 0 ? this.gameboard.getBoardHeight() - 1 : 0
            }
        })
    }

    private isColliding = (newHead: { x: number; y: number }): boolean => {
        this.body.forEach((snakePart) => {
            if (snakePart.x === newHead.x && snakePart.y === newHead.y) {
                return true
            }
        })
        return false
    }

    private initSnake() {
        this.body = [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 4, y: 1 },
            { x: 5, y: 1 },
        ]
        this.body.forEach((snakeEl) => {
            this.gameboard.setSnakeOnBoardTile(snakeEl)
        })
    }

    private removeFromGameboard() {
        this.body.forEach((snakeEl) => {
            this.gameboard.removeSnakeFromBoardTile(snakeEl)
        })
    }

    private addToGameboard() {
        this.body.forEach((snakeEl) => {
            this.gameboard.setSnakeOnBoardTile(snakeEl)
        })
    }

    private updateSnake() {
        this.removeFromGameboard()
        this.moveSnake()
        this.addToGameboard()
    }

    public run(now): void {
        this.gameboard.draw()
        setTimeout(() => {
            this.lastMove = now
            this.updateSnake()
            this.gameboard.draw()
            requestAnimationFrame((now) => this.run(now))
        }, this.timeBetweenMoves)
    }

    public stop(): void {
        // clearInterval(this.running)
    }
}
export { Snake, Gameboard }
