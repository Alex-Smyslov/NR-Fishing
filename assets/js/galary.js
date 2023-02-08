
'use strict';

// slider



const images = document.querySelectorAll('.slider .slider-line img');
const sliderLine  = document.querySelector('.slider-line');
const sliderRound = document.querySelectorAll('[data-slide]');
let count = 0;
let width = null;

function init() {
	width = document.querySelector('.slider').offsetWidth;
	sliderLine.style.width = width*images.length + 'px';
	images.forEach( item => {
		item.style.width = width + 'px';
		item.style.height = 'auto';
	})
	rollSlider();
}
window.addEventListener('resize', init);
init();

document.querySelector('.slider-prev').addEventListener('click', function() {
	count--;
	if(count < 0){
		count = images.length - 1;
	}
	for(let i = 0; i < sliderRound.length; i++ ) {
		sliderRound[i].classList.remove('input--active');
	}
	for(let j = 0; j < sliderRound.length; j++ ) {
			if (j == count) {
					sliderRound[j].classList.add('input--active');
			}
		}
	rollSlider();
});

document.querySelector('.slider-next').addEventListener('click', function() {
	count++;
	if(count >= images.length){
		count = 0;
	}
	for(let i = 0; i < sliderRound.length; i++ ) {
		sliderRound[i].classList.remove('input--active');
	}
	for(let j = 0; j < sliderRound.length; j++ ) {
		if (j == count) {
			sliderRound[j].classList.add('input--active');
		}
	}
	rollSlider();
});

function rollSlider() {
	sliderLine.style.transform = 'translate(-'+count*width+'px)';
}

for (const round of sliderRound) {
	round.addEventListener('click', function () {
		for(let i = 0; i < sliderRound.length; i++ ) {
			sliderRound[i].classList.remove('input--active');}
		let countRound = round.getAttribute("data-slide");
		count = countRound;
		rollSlider();		
		round.classList.add('input--active');
	})
}

// slider2



const cards = Array.from(document.querySelectorAll(".gallery__card"));
const slider = document.querySelector(".slider2");
const sliderContainer = document.querySelector(".slider__container");
const picture = Array.from(document.querySelectorAll(".gallery__card-pic"));
const sliderBtnLeft = document.querySelector(".slider__btn-left");
const sliderBtnRight = document.querySelector(".slider__btn-right");
const sliderClose = document.querySelector(".slider__close");

let cardIndex = -1;
let pictureFull;

for (const card of cards) {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    cardIndex = cards.indexOf(card);
    pictureFull = picture[cardIndex].cloneNode();
    pictureFull.style.objectFit = "contain";
    sliderContainer.append(pictureFull);
    slider.classList.add("active");
  });
}

sliderBtnLeft.addEventListener("click", (event) => {
  event.preventDefault();
  changePicture("left");
});

sliderBtnRight.addEventListener("click", (event) => {
  event.preventDefault();
  changePicture("right");
});

function changePicture(dir) {
  if (dir === "left") {
    if (cardIndex > 0) {
      cardIndex--;
    } else {
      cardIndex = cards.length - 1;
    }
  } else if (dir === "right") {
    if (cardIndex < cards.length - 1) {
      cardIndex++;
    } else {
      cardIndex = 0;
    }
  }
  let newPictureFull = picture[cardIndex].cloneNode();
  newPictureFull.style.objectFit = "contain";
  pictureFull.replaceWith(newPictureFull);
  pictureFull = newPictureFull;
}

sliderClose.addEventListener("click", (event) => {
  event.preventDefault();
  slider.classList.remove("active");
  pictureFull.remove();
  newPictureFull.remove();
});