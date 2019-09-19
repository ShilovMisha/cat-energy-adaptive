

var menu = document.querySelector('.main-nav');
var menuToggle = menu.querySelector('.main-nav__toggle');

menuToggle.addEventListener('click', function (evt) {
	menu.classList.toggle('main-nav--open');
});





//ForEach для IE
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }
}

var lazyLoad = function(){
	if ('IntersectionObserver' in window){
	
	function lazyLoadPicture(element){
		  element.forEach(function(change) {
		 	
		
		
    
    if(change.isIntersecting) {
      	//для всех элементов с dataset-src
		if (change.target.dataset.src) {
			change.target.src = change.target.dataset.src;
			change.target.removeAttribute('data-src');
		}
		////////////////////////
		//для всех элементов с <img dataset-src='' dataset-srcset=''> внутри
		var picture = change.target.querySelector('img');
		if (picture){
				if (picture.dataset.src) {
				picture.src = picture.dataset.src;
				picture.removeAttribute('data-src');
			}
			if (picture.dataset.srcset) {
				picture.srcset = picture.dataset.srcset;
				picture.removeAttribute('data-srcset');
			}
		}
		
		//для всех элементов с <source dataset-srcset=''> внутри
		var sources = change.target.querySelectorAll('source');
		for (var j = 0; j < sources.length; j++){
			if (sources[j]){
				if (sources[j].dataset.srcset) {
					sources[j].srcset = sources[j].dataset.srcset;
					sources[j].removeAttribute('data-srcset');
				}
			}
			
		}
    }
  });
	}

		let options = {
	  threshold: [0],
	   rootMargin: '100px'
	};

	let watchMe = new IntersectionObserver(lazyLoadPicture, options);
	//установить обсервер для picture
	var pictures = document.querySelectorAll('picture');
	for (var i = 0; i < pictures.length; i++) {
		var picImg = pictures[i].querySelector('img');
		if (picImg) {
			if (picImg.dataset){
				if (picImg.dataset.src){
					watchMe.observe(pictures[i]);
				}
			}
		}	
	}
	//установить обсервер для iframe
	var iframes = document.querySelectorAll('iframe:not([src])');
	if (iframes){
		for (var i = 0; i < iframes.length; i++) {

			watchMe.observe(iframes[i]);	
		}
	}
}
}



//Инклюды для IE
var body = document.querySelector("body");
var html = document.querySelector("html");
var scriptElement = document.createElement('script');
if (!('IntersectionObserver' in window)){
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/intersection-observer.js";
	
	body.appendChild(currentElement);
//document.addEventListener("load", lazyLoad);
setTimeout(lazyLoad, 100);
	
} else lazyLoad();

var loadFallback = function () {
	if (html.classList.contains('no-picture')){
	console.log(1);
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/picturefill.min.js";
	
	body.appendChild(currentElement);
	var currentElement = scriptElement.cloneNode();
	currentElement.src = "js/pf.mutation.min.js";
	body.appendChild(currentElement);
	}
}
setTimeout(loadFallback, 10);	



var slider = function(){
	var slider = document.querySelector('.example__slider');
	if (slider){
		
var sliderFill = slider.querySelector('.example__slider-fill');
var sliderBgPoint = document.querySelector('.example__background-point');
var imgPoint = document.querySelector('.example__img-container-point');
var sliderButton = slider.querySelector('.example__slider-button');
var sliderImgFirst = document.querySelector('.example__img-container picture:first-of-type');
var sliderImgSecond = document.querySelector('.example__img-container picture:last-of-type');
var scaleValue;
var sliderButtonPosition = 0;
var pageCoords;
var obj = slider.getBoundingClientRect();
var width = obj.width;
var minScale = obj.left;
var maxScale = obj.right;
var picObj = sliderImgFirst.getBoundingClientRect();
var picWidth = picObj.width;
var imgPointObj = imgPoint.getBoundingClientRect();
	sliderImgSecond.setAttribute("style", "clip: rect(auto, auto, auto,"+ (imgPoint.getBoundingClientRect().left- picObj.left) +"px)");
	sliderImgFirst.setAttribute("style", "clip: rect(auto,"+ (imgPoint.getBoundingClientRect().left - picObj.left) +"px ,auto, auto)");
		var moveSlider = function (evtMove) {
				evtMove.preventDefault();
			if (evtMove.changedTouches) {
				pageCoords = evtMove.changedTouches[0].pageX;
			
			} else {
				pageCoords = evtMove.pageX;

			}
					if (pageCoords){
						
						if (pageCoords <= minScale) {
						sliderButtonPosition = 0;
					} else if (pageCoords >= maxScale) {
						sliderButtonPosition = 100;

					} else {
						sliderButtonPosition = ((pageCoords - minScale)/width)*100;
						}
					} 
					scaleValue = Math.floor(sliderButtonPosition);
					sliderBgPoint.setAttribute("style", "left:" + scaleValue + "%");
					sliderButton.setAttribute("style", "left:" + scaleValue + "%");
					sliderFill.setAttribute("style", "width:" + scaleValue + "%");
						imgPoint.setAttribute("style", "left:" + scaleValue + "%");
					sliderImgSecond.setAttribute("style", "clip: rect(auto, auto, auto,"+ (imgPoint.getBoundingClientRect().left- picObj.left) +"px)");
					sliderImgFirst.setAttribute("style", "clip: rect(auto,"+ (imgPoint.getBoundingClientRect().left - picObj.left) +"px ,auto, auto)");			
		}
		slider.addEventListener("touchstart", function(){

			document.addEventListener('touchmove',moveSlider);
		});
		document.addEventListener('touchend', function(evtUp){
			document.removeEventListener('touchmove',moveSlider);
		});
		slider.addEventListener('mousedown', function(){
			
				document.addEventListener('mousemove',moveSlider);
		});
		document.addEventListener('mouseup', function(evtUp){
				document.removeEventListener('mousemove', moveSlider);
		})
	}	
}
slider();
//Взывать слайдер при изменение размеров окна
// заново для переопределения размеров слайдера
var time;
window.addEventListener('resize',function(){
if (time)
    clearTimeout(time);
  time = setTimeout(slider, 1000);
});