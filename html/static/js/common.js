//
//-----------------------------------------------------------------
//페이지 공통 스크립트
//-----------------------------------------------------------------
//

'use strict'

var _gb = function(){
	this.html =  $('html');
	this.body =  $('body');
	this.layout = $('#layout');
	this.main = $('main');
	this.header = $('header');
	this.menuAll = $('.menuAll');
	this.pagination = $('.swiper-pagination');
	this.isScroll = false;
},

gb = new _gb();

$(function(){
	commonFunction().init();
});

function commonFunction(){
	var commonFunction = new gb.CommonFunction();

	return commonFunction;
}

(function($){
	gb.CommonFunction = function(){
		var menuOn = function(){ // 상단 전체메뉴
			gb.menuAll.on('click', function(){
				if(!gb.header.hasClass('open')){
					gb.header.addClass('open');
					gb.body.append('<div class="dimmed_trans"></div>');
					$('.dimmed_trans').stop().fadeIn(300);
				}
			});

			$(document).on('click','.btn-close, .dimmed_trans', function(){
				gb.header.removeClass('open');
				$('.dimmed_trans')
				.stop().fadeOut(300, function(){
					$(this).remove();
					gb.header.find('.category').stop().animate({
						scrollTop : 0
					},100);
				});
			});
		},

		mainSwiper = function(){ // 메인 스와이퍼
			if(gb.introSwiper == undefined){
				gb.introSwiper = new Swiper('main > .swiper-container', {
					// Optional parameters
					//loop : true,
					speed : 600,
					effect : 'fade',
					fadeEffect: {
						crossFade: true
					},
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
					},
					//shortSwipes: false,
					navigation: {
						nextEl: ".swiper-nxt",
						prevEl: ".swiper-prev",
					},
					slidesPerView: 1,
					debugger: true, // Enable debugger
					hashNavigation : {
						replaceState : true,
						watchState : true,
					}
				});

				gb.introSwiper.on('activeIndexChange', function(swiper){
					setTimeout(function(){
						var currentHash = $('.swiper-slide-active').data('hash');
						loading('on');
						location.hash = '#' + currentHash;
						location.reload();
					},100);
				});

				loading('on');
				var currentHash = $('.swiper-slide-active').data('hash');
				getData(currentHash);
			}
		},

		loading = function(status){
			if(status == 'on'){
				$('.dimmed')
				.css('display','block')
				.append('<span class="progressBar"><i></i><i></i><i></i><i></i></span></div>');
				blockWheel('on');
			}else {
				$('.dimmed').stop().fadeOut(300);
				$('.progressBar').stop().fadeOut(300).remove();
				blockWheel('off');
			}
		},

		contentsAjaxCall = function(name, callbackFunc){
			$.ajax({
				url : 'sub/' + name + '.html',
				dataType : 'html',
				type : 'get',
				success : function(data){
					callbackFunc(data);
				}
			});
		},

		getData = function(name){
			var currentSlide = $('.swiper-slide-active');
			contentsAjaxCall(name, function(result){
				currentSlide.html($(result).filter('.wrapper').html());
				$('.swiper-slide').not(currentSlide).html('');
				setTimeout(function(){
					scrollReset();
					loading('off');
					motion();
				},300);
			});
		},

		detailView = function(){
			$(document).on('click', '.more', function(){
				var trg = $(this),
				trgPos = trg.offset().top,
				container = trg.closest('.heading').next('.container');

				container.addClass('active');
				gb.pagination.css('display','none');
				gb.isScroll = true;

				gb.html.stop().animate({scrollTop : trgPos + 'px'}, 600);
			});
		},

		motion = function(){
			gsap.registerPlugin(ScrollTrigger);

			var el1 = gsap.utils.toArray('.aniLeftBig'),
				el2 = gsap.utils.toArray('.aniLeft'),
				el3 = gsap.utils.toArray('.aniRight'),
				el4 = gsap.utils.toArray('.aniUp'),
				el5 = gsap.utils.toArray('.zoomIn .item'),
				el6 = gsap.utils.toArray('.fadeIn');

			el1.forEach(function(section, i){
				gsap.to(section, {
					scrollTrigger: {
						trigger : section,
						scrub: 3,
						//markers: true,
						toggleActions:" restart pause resume pause",
						start:"top 60%",
						end:"30% 100%",
						stagger: 0.4
					},
					x:0,
					opacity:1,
					duration:0.6
				});
			});

			el2.forEach(function(section, i){
				gsap.to(section, {
					scrollTrigger: {
						trigger : section,
						scrub: 3,
						//markers: true,
						toggleActions:" restart pause resume pause",
						start:"top 90%",
						end:"30% 100%",
						stagger: 0.4
					},
					x:0,
					opacity:1,
					duration:0.6
				});
			});

			el3.forEach(function(section, i){
				gsap.to(section, {
					scrollTrigger: {
						trigger : section,
						scrub: 3,
						//markers: true,
						toggleActions:" restart pause resume pause",
						start:"top 90%",
						end:"30% 100%",
						stagger: 0.4
					},
					x:0,
					opacity:1,
					duration:0.6
				});
			});

			el4.forEach(function(section, i){
				gsap.to(section, {
					scrollTrigger: {
						trigger : section,
						scrub: 3,
						//markers: true,
						toggleActions:" restart pause reset pause",
						start:"top 90%",
						end:"30% 100%",
						stagger: 0.4
					},
					y:0,
					opacity:1,
					duration:0.5
				});
			});

			el5.forEach(function(section, i){
				gsap.to(section, {
					scrollTrigger: {
						trigger : section,
						scrub: 1.5,
						//markers: true,
						toggleActions: "restart pause reset pause",
						start: "top 90%",
						end: "30% 100%",
						stagger: 0.4
					},
					scale: 1,
					opacity: 1
				});
			});

			el6.forEach(function(section, i){
				gsap.to(section, {
					scrollTrigger: {
						trigger : section,
						scrub: 1.5,
						//markers: true,
						toggleActions: "restart pause reset pause",
						start: "top 90%",
						end: "30% 100%",
						stagger: 0.4
					},
					opacity: 1
				});
			});

			if($('.feature').length){
				var scene = gsap.timeline();

				ScrollTrigger.create({
					animation: scene,
					trigger: ".feature",
					scrub: 2,
					toggleActions: "restart pause reset pause",
					start: "top 60%",
					end: "30% 100%",
					//markers: true
				});

				scene.to('.feature', {opacity:1, ease: "power1.in"});
				scene.to('.feature .pic ', {scale:1, opacity:1, ease: "power1.in"});
				//scene.to('.feature .nft .pic ', {rotation: 6, transformOrigin: "center center", ease: "elastic.out(1, 0.1)", repeat: 5, yoyo: true});
				scene.to('.feature b', {y:0, opacity:1, ease: "power1.in"});

				$('#nft_sample').on('mouseenter focusin', function(){
					vibration.restart();
				});

				var vibration = gsap.timeline({paused: true});
				vibration.to('#nft_sample',{
			    rotation: 6 ,
			    transformOrigin: "center center",
			    ease: "elastic.out(1, 0.1)",
			    repeat: 7,
				  yoyo: true,
				  duration: 0.05
				});

				$('#art_sample').on('mouseenter focusin', function(){
					vibration2.restart();
				});

				var vibration2 = gsap.timeline({paused: true});
				vibration2.to('#art_sample',{
			    rotation: 6 ,
			    transformOrigin: "center center",
			    ease: "elastic.out(1, 0.1)",
			    repeat: 7,
				  yoyo: true,
				  duration: 0.05
				});	
			}
			
		},

		blockWheel = function(status){
			if(status == "on") {
				gb.layout.on('mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll', function(e){
					e.preventDefault();
					e.stopPropagation();
					return;
				});

				gb.layout.on("keydown.disableScroll", function(e) {
	        var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
	        for (var i = 0; i < eventKeyArray.length; i++) {
            if (e.keyCode === eventKeyArray [i]) {
              e.preventDefault();
              return;
            }
	        }
   	 		});
			}
			else {
				gb.layout.off('.disableScroll');
			}
		},

		scrollReset = function(){
			$('.container').removeClass('active');
			gb.pagination.css('display','block');
			gb.html.stop().animate({scrollTop : 0}, 100);
			gb.isScroll = false;
		},

		contextMenuCancel = function(){ // 우 클릭, 드래그 방지
			$(document).on('contextmenu selectstart dragstart', function(){
				return false;
			});
		},

		init = function(){
			menuOn();
			detailView();
			contextMenuCancel();
		}

		return {
			init : init,
			scrollReset : scrollReset,
			blockWheel : blockWheel,
			motion : motion,
			loading : loading,
			contextMenuCancel : contextMenuCancel,
			mainSwiper : mainSwiper
		}
	}

	window.addEventListener('load', function(){
		commonFunction().scrollReset();
	});

	window.onpageshow = function(event) {
		if (event.persisted 
			|| (window.performance 
				&& window.performance.navigation.type == 2)) {
			location.reload();
		}
	};

	window.addEventListener('scroll', function(){
		var currentTrg = $('.swiper-slide-active .more'),
			container = currentTrg.closest('.heading').next('.container');

		if(!gb.isScroll 
			&& document.documentElement.scrollTop > 0){
			gb.pagination.css('display','none');
			container.addClass('active');
			gb.isScroll = true;

		}
		else if(document.documentElement.scrollTop == 0){
			gb.pagination.css('display','block');
			container.removeClass('active');
			gb.html.stop().animate({scrollTop : 0}, 100);
			gb.isScroll = false;
		}
	});

})(jQuery);