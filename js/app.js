// app.js

(function() {
	var data = {
		currentCat: null,
		cats: [
			{
				name: "Sammy",
				clickCounter: 0,
				imgSrc: "images/Sammy.jpg"
			},{
				name: 'Chewie',
				clickCounter: 0,
				imgSrc: 'images/Chewie.jpg'
			},{
				name: 'Max',
				clickCounter: 0,
				imgSrc: 'images/Max.jpg'
			},{
				name: 'Fluffy',
				clickCounter: 0,
				imgSrc: 'images/Fluffy.jpg'
			},{
				name: 'Ash',
				clickCounter: 0,
				imgSrc: 'images/Ash.jpg'
			}
		]
	};

	var octopus = {	
		init: function() {
			this.setCurrentCat(data.cats[0], 0);
			viewList.init();
			viewCat.init();
			viewAdmin.init();
		},

		getCats: function() {
			return data.cats;
		},

		incCounter: function() {
			data.currentCat.clickCounter++
		},

		setCurrentCat: function(cat, i) {
			data.currentCat = cat;
			data.index = i;
		},

		getCurrentCat: function() {
			return data.currentCat;
		},

		getIndex: function() {
			return data.index;
		},

		updateView: function() {
			viewList.update();
			viewCat.render();
			if (viewAdmin.isRendered === true) {
				viewAdmin.update();
			}
		},

		saveCat: function(name, counter, src) {
			data.currentCat.name = name;
			data.currentCat.clickCounter = counter;
			data.currentCat.imgSrc = src;
			this.updateView();
		},
	};

	var viewList = {
		init: function() {
			let cats = octopus.getCats();
			this.render(cats);

			for (let i = 0; i < cats.length; i++) {
				let listName = $("#cat" + i + "-list");

				listName.on('click', function() {
					$('.list li').removeClass('selected');
					listName.addClass("selected");
					octopus.setCurrentCat(cats[i], i);
					octopus.updateView();
				});
			}
		},

		render: function(cats) {
			let listHTML = "<ul>";
			$('.list').empty();

			for (let i = 0; i < cats.length; i++) {
				listHTML = listHTML + '<li id="cat' + i + '-list">' + cats[i].name + '</li>';
			}
			listHTML = listHTML + '</ul>';
			$('.list').append(listHTML);
			$('.list li').first().addClass("selected");
		},

		update: function() {
			let catIndex = octopus.getIndex(),
				catName = octopus.getCurrentCat().name;

			listLoc = $("#cat" + catIndex + "-list");
			listLoc.text(catName);
		},
	};

	var viewCat = {
		init: function() {
			this.clicker = $('#cat-clicker');
			this.counter = $('#cat-counter');
			this.name = $('#cat-name');
			this.src = $('#cat-src');

			this.render();

			this.clicker.on('click', () => {
				octopus.incCounter();
				this.render();
			})
		},

		render: function(){
			currentCat = octopus.getCurrentCat();

			this.counter.text(currentCat.clickCounter);
			this.name.text(currentCat.name);
			this.src.attr('src', currentCat.imgSrc);
		}
	}

	var viewAdmin = {
		init: function() {
			this.adminButton = $('#admin-button');
			this.view = $('.admin-view');
			
			this.isRendered = false;

			this.adminButton.on('click', () => {
				if (this.isRendered === false) {
					this.isRendered = true;
					this.view.removeClass('hidden');
					this.render();
					
					$('#admin-cancel').on('click', () => {
						this.view.addClass('hidden');
					});

					$('#admin-save').on('click', () => {
						octopus.saveCat(this.inputName.val(), this.inputCount.val(), this.inputImgSrc.val());
						this.view.toggleClass('hidden');
					});

				} else {
					this.view.toggleClass('hidden');
				}

				this.update();	
			});
		},

		render: function() {
			let addHTML = `<header><h3>ADMIN</h3></header>
            
                <label for="name">Cat name:</label>
                <input type="text" name="name" id="admin-cat-name" value="cat"></input>
            <form>
                <label for="count">Cat click count:</label>
                <input type="text" name="count" id="admin-cat-count"></input>
            </form><form>
                <label for="image">Cat image source file:</label>
                <input type="text" name="image" id="admin-cat-imgsrc"></input>
            </form>
            <div id="admin-save-area">
                <button class="button" id="admin-cancel">Cancel</button>
                <button class="button" id="admin-save">Save</button>
            </div>`;

			this.view.empty();
			this.view.append(addHTML);

			this.inputName = $('#admin-cat-name');
			this.inputCount = $('#admin-cat-count');
			this.inputImgSrc = $('#admin-cat-imgsrc');
			this.update();
		},
	
		update: function() {
			cat = octopus.getCurrentCat();
			this.inputName.val(cat.name);
			this.inputCount.val(cat.clickCounter);
			this.inputImgSrc.val(cat.imgSrc);
		},
	}

octopus.init();

})()

