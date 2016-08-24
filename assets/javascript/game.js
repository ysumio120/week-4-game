/*
	HP:  Health Points
	AP:  Attack Power
	cAP: Counter Attack Power
*/
var obiWan = {
	HP: 50,
	AP:50,
	cAP: 50,
	attack: function() {
		this.AP += this.AP;
	}
};

var darthVader = {
	HP: 50,
	AP: 50,
	cAP: 50,
	attack: function() {
		this.AP += this.AP;
	}	
};

var lukeSkywalker = {
	HP: 50,
	AP: 50,
	cAP: 50,
	attack: function() {
		this.AP += this.AP;
	}
};

var chewbacca = {
	HP: 50,
	AP: 50,
	cAP: 50,
	attack: function() {
		this.AP += this.AP;
	}
};

var bool = true;
$(document).ready(function() {
	if(bool) {
		$(".char").on("click", function() {
			var picked = $(this).appendTo(".ally");
			bool = false;
			$(".selection .char").appendTo(".enemies");
		});
	}

});