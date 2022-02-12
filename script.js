const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

const timer = 1;




function createSlots (ring) {

	var slotAngle = 360 / SLOTS_PER_REEL;

	var seed = getSeed();

	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');

		slot.className = 'slot';

		// compute and assign the transform for this slot
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

		slot.style.transform = transform;

		// setup the number to show inside the slots
		// the position is randomized to

		val = ((seed + i)%12) + 1;
		source = "./img/image" + String(val) + ".png";
		// <img src="img_girl.jpg" >

		var content = $(slot).append('<img src="' + source + '" class = "images">');

		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(value){
	//var txt = 'seeds: ';
	console.log(value);
	for(var i = 1; i < 7; i ++) {
		var oldSeed = -1;
		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 5) {
			oldSeed = parseInt(oldClass.slice(10));
		}
		var seed = getSeed();
		while(oldSeed == seed) {
			seed = getSeed();
		}

		$('#ring'+i)
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}
}



$(document).ready(function() {
	let count = 0;
	let totalValue = 0
	let income_matrix =[
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
	[2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0],
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 2, 0, 1, 0, 2, 2, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0]
];
let randomNr = Math.floor(Math.random() * income_matrix.length - 1);

 	createSlots($('#ring1'));
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
 	createSlots($('#ring4'));
 	createSlots($('#ring5'));
	createSlots($('#ring6'));

const button = document.querySelector('.go')
 	$('.go').on('click',function(){
		button.disabled = true;
		if (count === 20){
			alert("You won 15 euro");
		}
 		spin(income_matrix[randomNr][count]);
			$('#credit').text(function () {
				totalValue = income_matrix[randomNr][count] + totalValue;
				return "Total income " + String(totalValue);
			});

		setTimeout(function(){
			button.disabled = false;
		}, 4000)

		count = count + 1;
 	})
 });
