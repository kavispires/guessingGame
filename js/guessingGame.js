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
	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	// If player has guessed the right number
	if (this.playersGuess === this.winningNumber) {
		return "You Win!";
	// If player has guessed a repeated guess
	} else if (this.pastGuesses.indexOf(this.playersGuess) != -1) {
		return "You have already guessed that number."
	} else {
		this.pastGuesses.push(this.playersGuess);
	}

	// If this was the 5th guess and player was wrong
	if (this.pastGuesses.length === 5) {
		return "You Lose.";
	} else {
		// Returns string depending on difference
		var difference = this.difference();
		if (difference < 10) {
			return "You\'re burning up!";
		} else if (difference >= 10 && difference < 25) {
			return "You\'re lukewarm.";
		} else if (difference >= 25 && difference < 50) {
			return "You\'re a bit chilly.";
		} else {
			return "You\'re ice cold!";
		}
	}		
}