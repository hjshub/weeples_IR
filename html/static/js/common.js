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
	this.header = $('header');
	this.menuAll = $('.menu-all');
	this.navigation = $('.swiper-navigation');
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
			gb.menuAll.find('> a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				if(!gb.header.hasClass('open')){
					gb.header.addClass('open');
					gb.menuAll.find('> div')
					.stop().fadeIn('300', function(){
						gb.body.css({
							'height': gb.menuAll.find('> div').height() + 'px',
							'overflow' : 'hidden' 
						});
					});
					gb.menuAll.find('.animate')
					.addClass('animation--start');
				}else {
					gb.header.removeClass('open');
					gb.menuAll.find('> div')
					.stop().fadeOut('300', function(){
						gb.body.css({
							'height': 'auto',
							'overflow' : 'auto' 
						});
					});
					gb.menuAll.find('.animate')
					.removeClass('animation--start');
				}
			});
		},

		mainSwiper = function(){ // 메인 스와이퍼
			if(gb.introSwiper == undefined){
				gb.introSwiper = new Swiper('main > .swiper-container', {
					// Optional parameters
					//loop : true,
					speed : 600,
					//centeredSlides : true,
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
				});

				gb.introSwiper.on('activeIndexChange', function(swiper){
					var currentIndex = gb.introSwiper.realIndex;
					console.log(currentIndex + 1);

					contentsAjaxCall(currentIndex + 1);
					setTimeout(scrollReset, 100);
				});

			}
			contentsAjaxCall(1);
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

		contentsAjaxCall = function(n){
			loading('on');

			var currentSlide = $('.section-0' + n);
			$.ajax({
				url : '../html/contents.html?',// + Math.random(),
				dataType : 'html',
				//cache : false,
				type : 'get',
				success : function(data){
					currentSlide.html($(data).filter('#contents-' + n).html());
					$('.swiper-slide').not(currentSlide).html('');
					motion();
					setTimeout(function(){
						loading('off');
					},600);
				}
			});
		},

		detailView = function(){
			$(document).on('click', '.more', function(){
				var trg = $(this),
				trgPos = trg.offset().top,
				container = trg.closest('.heading').next('.container');

				container.addClass('active');
				gb.navigation.css('display','none');
				gb.pagination.css('display','none');
				gb.header.addClass('sticky');
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
				el5 = gsap.utils.toArray('.zoomIn .item');

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

				$('#nft').on('mouseenter focusin', function(){
					vibration.restart();
				});

				var vibration = gsap.timeline({paused: true});
				vibration.to('#nft',{
			    rotation: 6 ,
			    transformOrigin: "center center",
			    ease: "elastic.out(1, 0.1)",
			    repeat: 7,
				  yoyo: true,
				  duration: 0.05
				});

				$('#art').on('mouseenter focusin', function(){
					vibration2.restart();
				});

				var vibration2 = gsap.timeline({paused: true});
				vibration2.to('#art',{
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
			gb.navigation.css('display','block');
			gb.pagination.css('display','block');
			gb.header.removeClass('sticky');
			$('.container').removeClass('active');
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
			//contextMenuCancel();
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

	window.addEventListener('scroll', function(){
		var currentTrg = $('.swiper-slide-active .more'),
			container = currentTrg.closest('.heading').next('.container');

		if(!gb.isScroll 
			&& document.documentElement.scrollTop > 0){
			container.addClass('active');
			gb.navigation.css('display','none');
			gb.pagination.css('display','none');
			gb.header.addClass('sticky');
			gb.isScroll = true;

		}
		else if(document.documentElement.scrollTop == 0){
			container.removeClass('active');
			gb.html.stop().animate({scrollTop : 0}, 100);
			gb.navigation.css('display','block');
			gb.pagination.css('display','block');
			gb.header.removeClass('sticky');
			gb.isScroll = false;
		}
	});

})(jQuery);