// app.js

(function() {
	const names = ['Sammy', 'Chewie', 'Max', 'Fluffy', 'Ash'];

	function createList() {
		let listHTML = "<ul>";

		names.forEach( name => {
			listHTML = listHTML + '<li id="' + name + '-list">' + name + '</li>';
		});
		listHTML = listHTML + '</ul>';
		
		$('.list').empty();
		$('.list').append(listHTML);
	}

	function createCats() {
		let kittenHTML;

		names.forEach(function(name) {
		
			kittenHTML = `<div id="${name}-clicker" class="hidden">
		            <h3>${name} clicked on <span id="${name}-counter">0</span> times.<h3>
		           <img src="images/${name}.jpg" alt="${name} the cat" class="auto-img">
		        </div>`;
		    
		    $('.viewport').append(kittenHTML);
		})
	}
	createList();
	createCats();

	
	let counter = [],
		length = names.length;


	for (let i = 0; i < length; i++) {
		let counterLoc = $("#" + names[i] + "-counter"),
			clickerLoc = $("#" + names[i] + "-clicker");

		counter[i] = 0;
		clickerLoc.on("click", function() {
			counter[i] = counter[i] + 1;
			console.log("counter[" + i + "]: " + counter[i]);
			counterLoc.text(counter[i]);
		});
	}

	for (let j = 0; j < names.length; j++) {
		let clickLoc = "#" + names[j] + "-list",
			displayLoc = "#" + names[j] + "-clicker";

		
		
		$(clickLoc).on("click", function() {
			$('.list li').removeClass('selected');
			$(clickLoc).addClass("selected");
			$('.viewport').children().addClass('hidden');
			$(displayLoc).removeClass('hidden');
		});
	}

	$('#Sammy-clicker').removeClass('hidden');
	$('#Sammy-list').addClass('selected');
})()

