import { Ref } from 'vue'

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

const isDark = useDark()

class Gameboard {
    private width: number
    private height: number
    private ctx: CanvasRenderingContext2D
    private step: number
    private snakePartSize: number
    private board: Boardtile[][]
    private boardWidth: number
    private boardHeight: number
    private wOffset: number
    private hOffset: number
    private wSteps: number
    private hSteps: number

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
        this.step = snakePartSize * pixelRatio
        const { heightOffset, widthOffset, heightSteps, widthSteps } =
            this.calculateStep(snakePartSize, pixelRatio)
        this.hOffset = heightOffset
        this.wOffset = widthOffset
        this.hSteps = heightSteps
        this.wSteps = widthSteps
        this.createGrid()
    }

    public setSnakeOnBoardTile(coord: GridCoords) {
        this.board[coord.x][coord.y].withSnake = true
    }
    public removeSnakeFromBoardTile(coord: GridCoords) {
        this.board[coord.x][coord.y].withSnake = false
    }

    public setFoodOnBoardTile(newFood) {
        this.board[newFood.x][newFood.y].withFood = true
    }
    public removeFoodFromBoardTile(coord: GridCoords) {
        this.board[coord.x][coord.y].withFood = false
    }

    getBoard(): Boardtile[][] {
        return this.board
    }

    private calculateStep(snakePartSize: number, pixelRatio: number) {
        const widthOffset = this.width % (snakePartSize * pixelRatio)
        const heightOffset = this.height % (snakePartSize * pixelRatio)
        const widthSteps = Math.floor(this.width / (snakePartSize * pixelRatio))
        const heightSteps = Math.floor(
            this.height / (snakePartSize * pixelRatio)
        )
        return {
            widthOffset,
            heightOffset,
            widthSteps,
            heightSteps,
        }
    }

    private createGrid() {
        this.board = []
        let i, x, j, y

        for (
            i = this.wOffset / 2, x = 0;
            i < this.width - this.wOffset;
            i += this.step, x++
        ) {
            this.board[x] = []
            for (
                j = this.hOffset / 2, y = 0;
                j < this.height - this.hOffset;
                j += this.step, y++
            ) {
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
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.fillStyle = 'rgba(23,23,23,0.5)'
        this.ctx.fillRect(
            0 + this.wOffset / 2,
            0 + this.hOffset / 2,
            this.ctx.canvas.width - this.wOffset,
            this.ctx.canvas.height - this.hOffset
        )
        this.board.forEach((row) => {
            row.forEach((tile) => {
                if (tile.withSnake) {
                    this.ctx.fillStyle = 'rgba(234,179,9,1)'
                    this.ctx.fillRect(tile.x, tile.y, tile.w, tile.h)
                    if (isDark.value) {
                        this.ctx.strokeStyle = 'rgba(23,23,23,0.5)'
                    } else {
                        this.ctx.strokeStyle = 'rgba(120,113,109,0.5)'
                    }
                    this.ctx.lineWidth = 2
                    this.ctx.strokeRect(tile.x, tile.y, tile.w, tile.h)
                } else if (tile.withFood) {
                    this.ctx.fillStyle = '#00fff0'
                    this.ctx.fillRect(tile.x, tile.y, tile.w, tile.h)
                    if (isDark.value) {
                        this.ctx.strokeStyle = 'rgba(23,23,23,0.5)'
                    } else {
                        this.ctx.strokeStyle = 'rgba(120,113,109,0.5)'
                    }
                    this.ctx.lineWidth = 2
                    this.ctx.strokeRect(tile.x, tile.y, tile.w, tile.h)
                }
            })
        })
    }
}

type GameState = 'playing' | 'paused' | 'gameover'
class Snake {
    private direction: Direction
    private requestedDirection: Direction
    private body: GridCoords[]
    private stopped: boolean
    private gameboard: Gameboard
    private timeBetweenMoves: number = 300
    private lastMove: number = 0
    public currentScore: number = 0
    private externalScore
    private gamestate

    constructor(
        game: Gameboard,
        score: Ref<number>,
        gamestate: Ref<GameState | null>
    ) {
        this.gameboard = game
        this.direction = Direction.Right
        this.requestedDirection = this.direction
        this.initSnake()
        this.externalScore = score
        this.gamestate = gamestate
        this.start()
    }

    private setDirection(direction: Direction) {
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

    public requestDirection(direction: Direction) {
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
            this.requestedDirection = direction
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

    // private dispatchScore() {
    //     dispatchEvent(
    //         new CustomEvent('score', {
    //             detail: this.currentScore,
    //             bubbles: true,
    //         })
    //     )
    // }

    private addToScore() {
        this.currentScore += 1
        this.externalScore.value = this.currentScore
        // this.dispatchScore()
    }

    private resetScore() {
        this.currentScore = 0
        this.externalScore.value = this.currentScore
        // this.dispatchScore()
    }

    private moveSnake = () => {
        this.setDirection(this.requestedDirection)
        const { dx, dy } = this.getDxDy()
        let newHead = { x: this.body[0].x + dx, y: this.body[0].y + dy }
        newHead = this.checkNewHeadInWall(newHead)
        if (this.isColliding(newHead)) {
            this.stop()
        }
        if (this.isEatingFood(newHead)) {
            this.addToScore()
            this.body.unshift(newHead)
            this.gameboard.removeFoodFromBoardTile(newHead)
            this.addNewFood()
            if (this.timeBetweenMoves > 0) {
                if (this.timeBetweenMoves > 100) {
                    this.timeBetweenMoves -= 50
                } else if (
                    this.timeBetweenMoves <= 100 &&
                    this.timeBetweenMoves > 50
                ) {
                    this.timeBetweenMoves -= 10
                } else if (this.timeBetweenMoves <= 50) {
                    this.timeBetweenMoves -= 2
                } else if (this.timeBetweenMoves <= 10) {
                    this.timeBetweenMoves -= 1
                }
            }
        } else {
            this.body.unshift(newHead)
            this.body.pop()
        }
        this.checkIfWall()
    }

    private isEatingFood(newHead: GridCoords): boolean {
        return this.gameboard.getBoard()[newHead.x][newHead.y].withFood
    }

    private checkNewHeadInWall(newHead: GridCoords): GridCoords {
        if (newHead.x < 0) {
            newHead.x = this.gameboard.getBoardWidth() - 1
        } else if (newHead.x > this.gameboard.getBoardWidth() - 1) {
            newHead.x = 0
        }
        if (newHead.y < 0) {
            newHead.y = this.gameboard.getBoardHeight() - 1
        } else if (newHead.y > this.gameboard.getBoardHeight() - 1) {
            newHead.y = 0
        }
        return newHead
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
        for (let i = 0; i < this.body.length; i++) {
            const snakePart: GridCoords = this.body[i]
            if (snakePart.x === newHead.x && snakePart.y === newHead.y) {
                return true
            }
        }
        return false
    }

    private initSnake() {
        this.body = [
            { x: 5, y: 1 },
            { x: 4, y: 1 },
            { x: 3, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
        ]
        this.body.forEach((snakeEl) => {
            this.gameboard.setSnakeOnBoardTile(snakeEl)
        })
        this.addNewFood()
    }

    private resetSnake() {
        this.resetScore()
        this.timeBetweenMoves = 300
        while (this.body.length > 1) this.body.pop()
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

    private addNewFood() {
        const newFood = {
            x: Math.floor(Math.random() * this.gameboard.getBoardWidth()),
            y: Math.floor(Math.random() * this.gameboard.getBoardHeight()),
        }
        this.gameboard.setFoodOnBoardTile(newFood)
    }

    private updateSnake() {
        this.removeFromGameboard()
        this.moveSnake()
        this.addToGameboard()
    }

    private run(): void {
        this.gameboard.draw()
        setTimeout(() => {
            this.updateSnake()
            // this.gameboard.draw()
            if (!this.stopped) {
                requestAnimationFrame(() => this.run())
            }
        }, this.timeBetweenMoves)
    }

    public restart() {
        this.stopped = false
        this.resetSnake()
        this.run()
    }

    private start() {
        this.stopped = false
        this.run()
    }

    public stop(): void {
        this.stopped = true
        this.gamestate.value = 'gameover'
    }
}
export { Snake, Gameboard }
