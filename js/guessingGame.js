function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
	var l  = array.length,
		t,
		i;

	while (l) {
		i = Math.floor(Math.random() * l--);

		t = array[l];
		array[l] = array[i];
		array[i] = t;
	}
	
	return array;
}

var Game = function() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	if (this.playersGuess > this.winningNumber) {
		return this.playersGuess - this.winningNumber;
	} else {
		return this.winningNumber - this.playersGuess; 
	}
}

Game.prototype.isLower = function() {
	if (this.playersGuess > this.winningNumber) {
		return false;
	} else {
		return true; 
	}
}

Game.prototype.playersGuessSubmission = function(num) {
	// Stop Invalid guesses
	if (num <= 0 || num > 100 || isNaN(num)) { 
		throw "That is an invalid guess." 
	}
	this.playersGuess = num;
}