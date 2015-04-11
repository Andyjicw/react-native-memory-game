class Board {
    /**
     * Shuffled cards in play
     * @type {String[]}
     */
    cards: Array<string>;
    
    /**
     * Number of rows
     * @type {number}
     */
    numRows: number;

    /**
     * Number of columns
     * @type {number}
     */
    numCols: number;

    /**
     * Currently selected card (if any)
     * @type {String}
     */
    selected: string;

    /**
     * Number of found cards 
     * @type {Number}
     */
    found: number;

    /**
     * Flag that tells us whether card flipping is allowed
     * @type {Boolean}
     */
    isLocked: boolean;

    /**
     * Score tracker
     * @type {Object}
     */
    score: object;

    /**
     * Number of player whose turn it is
     * @type {[type]}
     */
    turn: number;

    constructor(numRows, numCols) {
        this.numRows = numRows || 4;
        this.numCols = numCols || 4;
        this.isLocked = false;

        this.turn = 1;

        this.score = {
            player1: 0,
            player2: 0
        }

        var numberOfCards = numRows * numCols / 2;
        var cards = this.cards = this.getCards(numberOfCards);
        this.createGrid();
    }

    getCards(numberOfCards: number): Array {
        var playingCards = this.arrayShuffle([
            'http://www.picgifs.com/disney-gifs/disney-gifs/disney-glitter/disney-graphics-disney-glitter-017763.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/disney-glitter/disney-graphics-disney-glitter-953286.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/belle-and-the-beast/disney-graphics-belle-and-the-beast-928628.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/dumbo/disney-graphics-dumbo-193099.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/peter-pan/disney-graphics-peter-pan-107140.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/madagascar/disney-graphics-madagascar-224386.jpg',
            'http://www.picgifs.com/disney-gifs/disney-gifs/tweety-and-sylvester/disney-graphics-tweety-and-sylvester-481783.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/ariel/animaatjes-ariel-0232913.gif'
        ]).slice(0, numberOfCards);

        var deck = playingCards.concat(playingCards);

        this.arrayShuffle(deck);

        return deck;
    }

    arrayShuffle(items: array): Array {
        var currentIndex = items.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = items[currentIndex];
            items[currentIndex] = items[randomIndex];
            items[randomIndex] = temporaryValue;
        }

        return items;
    }

    createGrid(): Array {
        var cards = this.cards,
            numCols = this.numCols,
            numRows = this.numRows,
            index = 0,
            grid = [];

        for (var i = 0; i < numRows; i++) {
            var row = Array(numCols);
            for (var j = 0; j < numCols; j++) {
                row[j] = {
                    url: cards[index],
                    hidden: true
                }
                index++;
            }
            grid[i] = row;
        }

        this.grid = grid;
    }

    lock(): Boolean {
        this.isLocked = true;
        return true;
    }

    unlock(): Boolean {
        this.isLocked = false;
        return true;
    }

    /**
     * Process successful match
     * @param  {number} player Player number, used to increment score
     * @return {Board} Board
     */
    pair() {
        var player = this.turn;

        this.score['player' + player] += 1;
        this.selected = null;

        return this;
    }

    finishTurn() {
        this.turn = this.turn === 1 ? 2 : 1;
    }

    /**
     * Process missed try
     * @param  {Boolean} lock True to lock the grid
     * @return {Board}  Board
     */
    miss(lock: boolean) {
        this.selected = null;

        if (lock) {
            this.lock()
        }

        this.finishTurn();

        return this;
    }
}

module.exports = Board;