// app.js

(function() {
	const names = ['Sammy', 'Chewie'];

	function createCats() {
		let kittenHTML;

		names.forEach(function(name) {
		
			kittenHTML = `<div id="${name}-clicker">
		            <h3>${name} clicked on <span id="${name}-counter">0</span> times.<h3>
		           <img src="images/${name}.jpg" alt="${name} the cat">
		        </div>`;
		    
		    $(".main").append(kittenHTML);
		})
	}

	createCats();

	
	let counter = [],
		length = names.length;


	for (let i = 0; i < length; i++) {
		let counterLoc = $("#" + names[i] + "-counter"),
			clickerLoc = $("#" + names[i] + "-clicker");

		counter[i] = 0;

		console.log("loop counter[" + i + "] = " + counter[i]);
		console.log("counterLoc: " + counterLoc);
		console.log("clickerLoc: " + clickerLoc);

		clickerLoc.on("click", function() {
			counter[i] = counter[i] + 1;
			console.log("counter[" + i + "]: " + counter[i]);
			counterLoc.text(counter[i]);
		});
	}

})()

