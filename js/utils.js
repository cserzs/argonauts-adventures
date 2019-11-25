
var Utils = {
    simRandom: new Random(),
    shuffle: function(a) {
        let currentIndex = a.length;
        let temp, rndIndex;
        while( 0 != currentIndex) {
            rndIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            temp = a[currentIndex];
            a[currentIndex] = a[rndIndex];
            a[rndIndex] = temp;
        }
        return a;
    },
    /** Libgdx forraskodbol vettem at. 
     * Returns a triangularly distributed random number between {@code min} (inclusive) and {@code max} (exclusive),
     * where values around {@code mode} are more likely.
	 * @param min the lower limit
	 * @param max the upper limit
	 * @param mode the point around which the values are more likely */
	randomTriangular: function(min, max, mode) {
        // let u = random.nextFloat();
        let u = Math.random();
		let d = max - min;
		if (u <= (mode - min) / d) return min + Math.sqrt(u * d * (mode - min));
		return max - Math.sqrt((1 - u) * d * (max - mode));
    },
    //  a max nincs benne!!!
    random: function(min, max) {
        return Math.floor(Math.random() * (max-min) + min);
    }
};


// function shuffle(a) {
//     let currentIndex = a.length;
//     let temp, rndIndex;
//     while( 0 != currentIndex) {
//         rndIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         temp = a[currentIndex];
//         a[currentIndex] = a[rndIndex];
//         a[rndIndex] = temp;
//     }
//     return a;
// }