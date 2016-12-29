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

var newGame = function() {
	return new Game();
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
		$("#hint, #submit").attr("disabled", true);
		$("#subtitle").text("The number was " + this.winningNumber + ". Click the Reset button to play again.");
		return "You Win!";
	// If player has guessed a repeated guess
	} else if (this.pastGuesses.indexOf(this.playersGuess) != -1) {
		return "You have already guessed that number."
	} else {
		this.pastGuesses.push(this.playersGuess);
		$('.guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
	}

	// If this was the 5th guess and player was wrong
	if (this.pastGuesses.length === 5) {
		$("#hint, #submit").attr("disabled", true);
		$("#subtitle").text("The number was " + this.winningNumber + ". Click the Reset button to play again.");
		return "You Lose.";
	} else {
		// Tells player if s/he should guess higher or lower depending of the result of isLower
		if(this.isLower()) {
			$('#subtitle').text("Guess higher!");
		} else {
			$('#subtitle').text("Guess lower!");
		}
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

Game.prototype.provideHint = function() {
	var result = [];
	// Add winning number
	result.push(this.winningNumber);
	// Add two 'different' random numbers
	while (result.length < 3) {
		var random = generateWinningNumber();
		if (random != this.winningNumber) {
			result.push(random);
		}
	}
	return shuffle(result);
}

function submitGuess(game) {
	// Get value of input
	var input = parseInt($("#player-input").val());
	// If input is empty
	if (input == '') {
		alert('You should guess a number between 1 and 100.');
	} else {
		$("#title").text(game.playersGuessSubmission(input));
	}

	// Clear dom input field
	$("#player-input").val('');
}

$(document).ready(function(){
	// Create new Game
	var game = newGame();

	// When player presses the Go button
	$('#submit').on('click', function(){
		submitGuess(game);
	});

	// When player presses enter
	$(document).keypress(function(e) {
    	if(e.which == 13) {
    		submitGuess(game);
    	}
	});

	// When player presses the reset button
	$('#reset').on('click', function(){
		game = newGame();
		// Reset title, subtitle and guesses values
		$("#title").text("Guessing Game");
		$("#subtitle").text("Guess a number between 1 and 100.");
		$('.guess').text('-');
		// Enable buttons
		$("#hint, #submit").attr("disabled", false);
	});

	// When player presses the reset button
	$('#hint').on('click', function(){
		var hint = game.provideHint();
		$("#title").text('Hint: It\'s one of these numbers ' + hint.join(', '));
		$("#hint").attr("disabled", true);
	});
});
