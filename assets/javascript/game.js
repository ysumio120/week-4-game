/*
	HP:  	Health Points
	AP:  	Attack Power
	cAP: 	Counter Attack Power
	attack: Increases AP by base amount every attack
*/
var obiWan = {
	HP: 100,
	AP: 10,
	cAP: 15,
	attack: function() {
		this.AP += this.AP;
	}
};

var darthVader = {
	HP: 150,
	AP: 15,
	cAP: 20,
	attack: function() {
		this.AP += this.AP;
	}	
};

var hanSolo = {
	HP: 90,
	AP: 5,
	cAP: 8,
	attack: function() {
		this.AP += this.AP;
	}
};

var chewbacca = {
	HP: 300,
	AP: 8,
	cAP: 15,
	attack: function() {
		this.AP += this.AP;
	}
};

var ally = true;
var enemy = true;
var originalPosition;
var enemyChosen;

$(document).ready(function() {
		$(".char div").on("click", function() {
			console.log(originalPosition);
			if(ally) {
				$(this).appendTo(".ally");
				ally = false;
			}
			else if(enemy) {
				enemyChosen = $(this);
				originalPosition = $(this).parent();
				$(this).appendTo(".opponent");
				enemy = false;
				//console.log("REACHED");
			}
		});

		

});