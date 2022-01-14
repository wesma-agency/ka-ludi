document.addEventListener(
	"DOMContentLoaded",
	function () {
		let sliderPersonal = new Swiper(".personnel__slider-container", {
			slidesPerView: 1,
			spaceBetween: 20,
			freeMode: false,

			navigation: {
				nextEl: ".personnel__button-next",
				prevEl: ".personnel__button-prev",
			},
			breakpoints: {
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
					freeMode: false,
				},

				768: {
					slidesPerView: "auto",
					spaceBetween: 30,
					freeMode: true,
				},
			},
		});

		let sliderNews = new Swiper(".useful-info__slider-container", {
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: {
				nextEl: ".useful-info__arrow-next",
				prevEl: ".useful-info__arrow-prev",
			},
		});

		let sliderTrustTop = new Swiper(".trust__slider-container-top", {
			slidesPerView: 2,
			spaceBetween: 10,
			speed: 1000,
			autoplay: {
				delay: 1500,
			},
			breakpoints: {
				600: {
					slidesPerView: 3,
					spaceBetween: 30,
				},

				768: {
					slidesPerView: 4,
					spaceBetween: 30,
				},

				1175: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
			},
		});

		let slidesTrustBottom = document.querySelectorAll(".trust__slide-bottom");
		let lastSlideBottom;
		if (slidesTrustBottom != null) {
			lastSlideBottom = slidesTrustBottom.length;
		}

		let sliderTrustBottom = new Swiper(".trust__slider-container-bottom", {
			slidesPerView: 2,
			spaceBetween: 10,
			initialSlide: lastSlideBottom,
			speed: 1000,
			autoplay: {
				delay: 1500,

				reverseDirection: true,
			},
			breakpoints: {
				600: {
					slidesPerView: 3,
					spaceBetween: 30,
				},

				768: {
					slidesPerView: 4,
					spaceBetween: 30,
				},

				1175: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
			},
		});

		let sliderOffice = new Swiper(".offices__slider-container", {
			slidesPerView: 2,
			spaceBetween: 30,
			observer: true,
			observeParents: true,
			breakpoints: {
				600: {
					slidesPerView: 3,
					spaceBetween: 30,
					observer: true,
					observeParents: true,
				},
			},
		});

		let match = [window.matchMedia("(max-width: 1175px)")];

		// Сортирока поддоменов
		let itemDomain = Array.prototype.slice.call(document.querySelectorAll(".popup-domain__item"));
		if (itemDomain != null) {
			itemDomain.sort(function (a, b) {
				// сортируем от а до я
				if (a.querySelector("a").textContent[0] < b.querySelector("a").textContent[0]) return -1;
				if (a.querySelector("a").textContent[0] > b.querySelector("a").textContent[0]) return 1;
				return 0;
			});

			itemDomain.forEach((el, index, array) => {
				// берем перую букву
				let wordFirst = el.querySelector("a").textContent[0];

				// берем следующий элемент после текущего
				let elemInsert = array[index + 1] ? array[index + 1].querySelector("a").textContent[0] : null;

				// создаем обертку для буквы
				let wordAppend = document.createElement("span");

				wordAppend.classList.add("first-word");

				// первому элементу сразу вставляем букву
				if (index == 0) {
					wordAppend.textContent = wordFirst;
					el.prepend(wordAppend);
				}

				// проверяем отличаются ли первые буквы текущего и следующего элемента
				if (wordFirst != elemInsert) {
					wordAppend.textContent = elemInsert;

					array[index + 1] ? array[index + 1].prepend(wordAppend) : null;
				}

				// вставляем букву слдеующему элементу за текущим
				el.parentNode.append(el);
			});

			function moveFirstWordMobil() {
				if (match[0].matches) {
					itemDomain.forEach((element) => {
						element.querySelector("span") ? element.parentNode.insertBefore(element.querySelector("span"), element) : null;
					});
				} else {
					if (itemDomain[0].parentNode.querySelector(".first-word").parentNode == itemDomain[0].parentNode) {
						let arrSpan = Array.prototype.slice.call(itemDomain[0].parentNode.querySelectorAll(".first-word"));

						arrSpan.forEach((element) => {
							element.nextSibling.append(element);
						});
					}
				}
			}

			match[0].addListener(moveFirstWordMobil);
			moveFirstWordMobil();
		}

		let stickyEl;
		if (document.querySelector(".from-selection") != null) {
			stickyEl = new Sticksy('.from-selection', { topSpacing: 140, listen: true }, true);
		}
	},
	false
);

$(document).ready(function () {
	$("#my-menu").mmenu({
		extensions: ["pagedim-black", "position-left"],
		navbar: {
			title: "Меню",
		},
	});

	var $menu = $("#my-menu");
	var $icon = $(".header__burger");
	var API = $menu.data("mmenu");

	$icon.on("click", function () {
		API.open();
	});

	API.bind("open:finish", function () {
		$icon.addClass("is-active");
		$("html").addClass("lock");
	});
	API.bind("close:finish", function () {
		$icon.removeClass("is-active");
		$("html").removeClass("lock");
	});

	$.each($(".card-personnel__list"), function (index, val) {
		if ($(val).find(".card-personnel__item").length > 5) {
			$.each($(val).find(".card-personnel__item"), function (i, el) {
				if (i > 3) {
					$(el).addClass("item-hidden");
					$(el).css({ height: "0" });
				}
			});

			$(val).append("<span class='button-view-all small-btn anim-button-small'>еще</span>");
		}
	});

	$(".button-view-all").on("click", function (e) {
		let button = $(this);

		$.each($(this).parents(".card-personnel__list").find(".card-personnel__item.item-hidden"), function (i, el) {
			if ($(el).height() == 0) {
				let elHeight = el.scrollHeight;
				$(el).css({ height: elHeight });
				button.text("скрыть");
			} else {
				$(el).css({ height: "0" });
				button.text("еще");
			}
		});
	});

	let heightHeader = $(".header").height();
	let paddingNextBlock = $(".header").next().css("padding-top");
	let subFrom = paddingNextBlock.length - 2;

	console.log(heightHeader);
	console.log(paddingNextBlock);
	console.log(subFrom);

	$(window).on("resize", function () {
		heightHeader = $(".header").height();
		if (!$(".header").next().hasClass("next-scrolled")) {
			paddingNextBlock = $(".header").next().css("padding-top");
		}
		subFrom = paddingNextBlock.length - 2;
	});

	$(window).on("scroll", function () {
		let scrolled = $(this).scrollTop();

		if (scrolled > heightHeader) {
			$(".header").addClass("scrolled");
			$(".header").next().addClass("next-scrolled");
			$(".header")
				.next()
				.css({ "padding-top": `${heightHeader + parseInt(paddingNextBlock.substring(0, subFrom))}px` });
		}

		if (scrolled <= heightHeader) {
			$(".header").removeClass("scrolled");
			$(".header").next().removeClass("next-scrolled");
			$(".header").next().css({ "padding-top": `` });
		}
	});

	$(".js-modal-show").on("click", function (e) {
		e.preventDefault();

		let modal = $("#" + $(this).attr("data-popup"));
		modal.fadeIn(300);
		modal.css({ "max-height": $(window).height() });

		if ($(this).attr("data-popup") == "domain") {
			modal.find(".popup-domain__list").css({ height: $(window).height() - modal.find(".popup-domain__wrap").height() - 40 });
		}

		$("body").addClass("lock");

		$(".overlay-popup").fadeIn(300);

		API.close();
	});

	$(".js-modal-close").on("click", function (e) {
		let modal = $(this).parents(".modal");
		modal.fadeOut(300);
		modal.css({ "max-height": "" });

		$("body").removeClass("lock");

		$(".overlay-popup").fadeOut(300);
	});

	$(".overlay-popup").on("click", function (e) {
		$(".modal").fadeOut(300);
		$("body").removeClass("lock");
		$(this).fadeOut(300);
	});

	// Переключение ресурсов
	$(".card-resource__item").on("click", function () {
		if (!$(this).hasClass("active")) {
			let arrElem = $(this).parent().find(".card-resource__item");

			arrElem.removeClass("active");

			$(this).addClass("active");

			let indexCurrent = $.inArray(this, arrElem);

			let arrText = $(this).parents(".card-resource").find(".card-resource__text-wrap");

			arrText.removeClass("active");

			arrText.eq(indexCurrent).addClass("active");
		}
	});

	// Переключение команды
	$(".team__button").on("click", function (e) {
		e.preventDefault();
		if (!$(this).hasClass("active")) {
			$(".team__button").removeClass("active");
			$(".team__item").removeClass("active");

			$(this).addClass("active");
			$($(this).attr("href")).addClass("active");
		}
	});


	// Расставляем точки на карте
	function mapHint() {
		$.each($(".offices__item"), function (index, val) {
			let coordinatesTop = $(val).attr("data-coordinates-top");
			let coordinatesLeft = $(val).attr("data-coordinates-left");

			$(val).css({ top: coordinatesTop, left: coordinatesLeft });
		});
	}

	mapHint();

	let jqMatch = [window.matchMedia("(max-width: 768px)")];

	// Обработчик события для открытия информации о офисе на моиблке 
	function cityClickMobile() {
		let city = $(this).attr("data-city");

		if (!$(this).hasClass("active")) {

			$(".offices__item").removeClass("active");

			$(".offices__item-office").slideUp(300);
	
			setTimeout(() => {
				$(".offices__item-office").removeClass("active");
			}, 300);
	
			$(this).addClass("active");
	
			$("#" + city).slideDown(300);
	
			setTimeout(() => {
				$("#" + city).addClass("active");
			}, 300);

		} else {
			$(".offices__item").removeClass("active");

			$(".offices__item-office").slideUp(300);
	
			setTimeout(() => {
				$(".offices__item-office").removeClass("active");
			}, 300);
		}
	}

	// Обработчик события для открытия информации о офисе на десктопе 
	function cityClickDesktop() {
		if (!$(this).hasClass("active")) {
			let city = $(this).attr("data-city");

			$(".offices__item").removeClass("active");

			$(".offices__item-office").slideUp(300);

			setTimeout(() => {
				$(".offices__item-office").removeClass("active");
			}, 300);

			$(this).addClass("active");

			$("#" + city).slideDown(300);

			setTimeout(() => {
				$("#" + city).addClass("active");
			}, 300);

		}
	}

	function moveOfficeInfo() {
		if (jqMatch[0].matches) {

			// Елси разрешение ниже 768 пикселей переносим блоки с информацие об офисах
			$.each($(".offices__item"), function(index, val) {
				let city = $(val).attr("data-city");

				$(val).after($("#" + city));
			});

			// Скрываем всю инфу
			$(".offices__item").removeClass("active");
			$(".offices__item-office").removeClass("active");
			$(".offices__item-office").slideUp(300);

			// Вешаем обработчик для мобилки
			$(".offices__item").off();
			$(".offices__item").on("click", cityClickMobile);

		} else {
			// Если разрешение больше 768 пикселей возвращаем блоки на место
			$(".offices__info").append($(".offices__item-office"));

			// Если ни один блок не активен делаем активным первый
			if (!$(".offices__item").hasClass("active")) {
				$(".offices__item").eq(0).addClass("active");
			
				$("#" + $(".offices__item").eq(0).attr("data-city")).addClass("active");
	
				$("#" + $(".offices__item").eq(0).attr("data-city")).slideDown(300);
			}

			// Вешаем обработчик для десктопа
			$(".offices__item").off();
			$(".offices__item").on("click", cityClickDesktop);
		}
	}

	jqMatch[0].addListener(moveOfficeInfo);
	moveOfficeInfo();

	// Кастомный скроллбар
	$(".popup-domain__list").mCustomScrollbar({
		theme: "my-theme",
	});

	$(".card-resource__text-list").mCustomScrollbar({
		theme: "my-theme-2",
	});

	$(".card-resource__list").mCustomScrollbar({
		theme: "my-theme-3",
	});

	// Маска номера телефона
	$("input[type=tel]").inputmask({
		mask: "+7 (Z99) 999-99-99",
		definitions: {
			Z: {
				validator: "[0-6,9]",
			},
		},
	});

	$(".lightgallery").lightGallery({
		selector: 'a'
	});

	// Скролл к верху страницы

	$(window).scroll(function (e) {
		if ($(this).scrollTop() > 0) {
			$("#scroller").fadeIn();
		} else {
			$("#scroller").fadeOut();
		}
	});

	$("#scroller").click(function (e) {
		e.preventDefault();
		$("body,html").animate({ scrollTop: 0 }, 400);
	});

	//===============ANIMATION SCROLL======================
	const animItems = $(".anim-items");

	if (animItems.length > 0) {
		$(window).on("scroll", animOnScroll);
		function animOnScroll() {
			$.each(animItems, function (index, val) {
				const animItem = animItems.eq(index);
				const animItemHeight = animItem.innerHeight();
				const animItemOffset = animItem.offset().top;
				const animStart = 10; // начало анимации при достижении скролом 1/10 части элемента

				let animItemPoint = $(window).height() - animItemHeight / animStart;

				if (animItemHeight > $(window).height()) {
					animItemPoint = $(window).height() - $(window).height() / animStart;
				}

				if ($(window).scrollTop() > animItemOffset - animItemPoint && $(window).scrollTop() < animItemOffset + animItemHeight) {
					animItem.addClass("animate");
				} else {
					if (!animItem.hasClass("anim-no-scrollTop")) {
						animItem.removeClass("animate");
					}
				}
			});
		}
		setTimeout(animOnScroll, 0);
	}
});
