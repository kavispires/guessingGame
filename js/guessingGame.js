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