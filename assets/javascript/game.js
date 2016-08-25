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
		this.AP += 10;
	}
};

var darthVader = {
	HP: 150,
	AP: 15,
	cAP: 20,
	attack: function() {
		this.AP += 15;
	}	
};

var hanSolo = {
	HP: 90,
	AP: 5,
	cAP: 8,
	attack: function() {
		this.AP += 5;
	}
};

var chewbacca = {
	HP: 300,
	AP: 8,
	cAP: 15,
	attack: function() {
		this.AP += 8;
	}
};

function reset() {
	obiWan.HP = 100;
	obiWan.AP = 10;
	darthVader.HP = 150;
	darthVader.AP = 15;
	hanSolo.HP = 90;
	hanSolo.AP = 5;
	chewbacca.HP = 300;
	chewbacca.AP = 8;
};

function selected(character) {

	switch($(character).attr("id")) {
		case "hanSolo":
			return 90;
		case "darthVader":
			return 150;
		case "obiWan":
			return 100;
		case "chewbacca":
			return 300;
	}

}
var ally = true;
var enemy = true;
var originalPosition;
var allyChosen;
var enemyChosen;
var health;

$(document).ready(function() {

		$(".char div").on("click", function() {
			console.log(originalPosition);
			if(ally) {
				$(this).appendTo(".ally");
				ally = false;
				$(".instructions").html("Now select a character to fight");
				$(".ally").css("display", "initial");
				health = selected(this);
				$(".ally .progress-bar").attr("aria-valuenow", health.toString());
				$(".ally .progress-bar").attr("aria-valuemax", health.toString());
				$(".ally .progress-bar").attr("style", "width: 100%");
				$(".ally span").html(health + "/" + health);
				//console.log(health);
			}
			else if(enemy) {
				enemyChosen = $(this);
				originalPosition = $(this).parent();
				$(this).appendTo(".opponent");
				enemy = false;
				$(".instructions").html("FIGHT!!");
				$(".opponent").css("display", "initial");
				health = selected(this);
				$(".opponent .progress-bar").attr("aria-valuenow", health.toString());
				$(".opponent .progress-bar").attr("aria-valuemax", health.toString());
				$(".opponent .progress-bar").attr("style", "width: 100%");
				$(".opponent span").html(health + "/" + health);
				//console.log("REACHED");
				$("<button class='btn btn-default btn-lg'>Attack</button>").appendTo(".action");
			};
		});

		

});

function play() {

};