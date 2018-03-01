class Position {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    distance(position) {
        return Math.abs(this.row - position.row) + Math.abs(this.column - position.column);
    }
}

module.exports = Position;