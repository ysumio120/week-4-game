/*
	name 	: 	Name of object
	HP		:  	Health Points
	AP 		:  	Attack Power
	cAP 	: 	Counter Attack Power
	attack 	: 	Increases AP by base amount every attack
*/
var obiWan = {
	name: "Obi-Wan Kenobi",
	HP: 100,
	AP: 10,
	cAP: 15,
	attack: function() {
		this.AP += 10;
	}
};

var darthVader = {
	name: "Darth Vader",
	HP: 150,
	AP: 12,
	cAP: 20,
	attack: function() {
		this.AP += 15;
	}	
};

var hanSolo = {
	name: "Han Solo",
	HP: 90,
	AP: 5,
	cAP: 8,
	attack: function() {
		this.AP += 5;
	}
};

var chewbacca = {
	name: "Chewbacca",
	HP: 175,
	AP: 8,
	cAP: 15,
	attack: function() {
		this.AP += 8;
	}
};

/*
 *	Returns corresponding object given the character clocked on the page
 */
function selected(character) {

	switch($(character).attr("id")) {
		case "hanSolo":
			return hanSolo;
		case "darthVader":
			return darthVader;
		case "obiWan":
			return obiWan;
		case "chewbacca":
			return chewbacca;
	}

}

var ally = true;
var enemy = true;
var kills = 0;
var originalPosition;
var allyChosen;
var enemyChosen;
var health;

$(document).ready(function() {

		$(document).on("click", "[data-clickable='true']", function() {
			if(ally) {

				//	Move your character to battlefield
				$(this).attr("class", "playing");
				$(this).attr("data-clickable", "false");
				$(this).appendTo(".ally");
				ally = false;
				$(".instructions p").html("Select your opponent to fight");
				$(".ally").css("display", "initial");
				$(".vs p").css("display", "initial");
				allyChosen = selected(this);
				health = allyChosen.HP;

				//Adjust fraction and percent based on character health point
				$(".ally .progress-bar").attr("aria-valuenow", health.toString());
				$(".ally .progress-bar").attr("aria-valuemax", health.toString());
				$(".ally .progress-bar").attr("style", "width: 100%");
				$(".ally .progress span").html(health + "/" + health);
			}
			else if(enemy) {

				//	Move opponent to battlefield
				enemyChosen = $(this);
				originalPosition = $(this).parent();
				$(this).attr("class", "playing");
				$(this).attr("data-clickable", "false");
				$(this).appendTo(".opponent");
				enemy = false;
				$(".instructions p").empty();
				$(".opponent").css("display", "initial");
				enemyChosen = selected(this);
				health = enemyChosen.HP;

				//	Adjust fraction and percent based on character health point
				$(".opponent .progress-bar").attr("aria-valuenow", health.toString());
				$(".opponent .progress-bar").attr("aria-valuemax", health.toString());
				$(".opponent .progress-bar").attr("style", "width: 100%");
				$(".opponent .progress span").html(health + "/" + health);
				$(".attack").css("display", "initial");
			};
		});

		$(".attack").on("click", function() {
			$(".action p").html(allyChosen.name + " hit " + enemyChosen.name + " for " + allyChosen.AP + " damage.<br>"
					 + enemyChosen.name + " counter-attacked for " + enemyChosen.cAP + " damage.");
			
			/*
			 *	If enemy dies,
			 * 		-	"Tint" character image to red to signify death
			 *		-	Return the image to its original position from the start of the game
			 *		-	Enemy will not be able to return to battle (unclickable)
			 */
			if((enemyChosen.HP -= allyChosen.AP) <= 0) {
				$(".action p").append("<br>You defeated " + enemyChosen.name + ".");
				$(".instructions p").html("Select your next opponent to fight");
				var op = $(".opponent .playing"); 
				op.appendTo(originalPosition);
				op.removeAttr("playing");
				op.attr("class", "tint");
				console.log(op.data("clickable"));
				$(".opponent").css("display", "none");
				$(".attack").css("display", "none");
				enemy = true;
				kills++;
				if(kills >= 3) {
					$(".reset").css("display", "initial");
					$(".attack").css("display", "none");
					$(".action p").html("YOU WIN!");
					$(".reset").on("click", function() {
						location.reload();
					});
				}
			}
			else {

				//	If your character dies, "tint" image to red and reset" button 
				//	will appear to restart the game
				if((allyChosen.HP -= enemyChosen.cAP) <= 0) {
					$(".ally .playing").attr("class", "tint");
					$(".reset").css("display", "initial");
					$(".attack").css("display", "none");
					$(".action p").html("YOU DIED! TRY AGAIN!");
					$(".reset").on("click", function() {
						location.reload();
					});
				}
				else {
					//	Update progress bar after each attack

					//	Ally porgress bar
					$(".ally .progress-bar").attr("aria-valuenow", allyChosen.HP.toString());
					var maxHealth = parseInt($(".ally .progress-bar").attr("aria-valuemax"));
					var percent = (allyChosen.HP/maxHealth) * 100;
					$(".ally .progress-bar").attr("style", "width:" + percent + "%");
					$(".ally .progress span").html(allyChosen.HP + "/" + maxHealth);

					//	Opponent progress bar
					$(".opponent .progress-bar").attr("aria-valuenow", enemyChosen.HP.toString());
					var maxHealth = parseInt($(".opponent .progress-bar").attr("aria-valuemax"));
					var percent = (enemyChosen.HP/maxHealth) * 100;
					$(".opponent .progress-bar").attr("style", "width:" + percent + "%");
					$(".opponent .progress span").html(enemyChosen.HP + "/" + maxHealth);
				}
			}
			allyChosen.attack();
			
		});

		

});