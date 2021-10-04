// vì không lồng thẻ a bên ngoài từng project được
$(".project").on("click", function () {
	$(this).find(".link").trigger("click");
});

const sections = document.querySelectorAll("section[id]");
function handleScrollToSections() {
	if ($(window).scrollTop() >= $(".header").height() + 20) {
		$(".header").addClass("scroll");
	} else {
		$(".header").removeClass("scroll");
	}

	const scrollY = window.scrollY;

	sections.forEach((section) => {
		let sectionHeight = section.offsetHeight;
		let sectionTop = section.offsetTop - 250; // -50

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			$("header a[href*='" + section.id + "']").addClass("on");
		} else {
			$("header a[href*='" + section.id + "']").removeClass("on");
		}
	});
}

$(window).on("scroll", handleScrollToSections);

$("#navToggle").on("click", function () {
	const closeIcon = `<i class="uil uil-times"></i>`;
	const openIcon = `<i class="uil uil-bars"></i>`;
	$(this).siblings(".header ul").toggleClass("on");

	if ($(this).siblings(".header ul").hasClass("on")) {
		$(this).html(closeIcon);
	} else {
		$(this).html(openIcon);
	}
});

$(".header li").on("click", function () {
	$(".header ul").removeClass("on");
	$("#navToggle").html(`<i class="uil uil-bars"></i>`);
});

// dùng media query
$(window).on("resize", function () {
	handleBreakpointChange(breakpoint);
});
function handleBreakpointChange(breakpoint) {
	if (breakpoint.matches) {
		// thêm class để thành swiper
		$(".projects > .container").addClass("swiper").addClass("projectsSwiper");
		$(".projects > .container > .project-wrapper").addClass("swiper-wrapper").removeClass("row");
		$(".projects > .container > .project-wrapper > div[class*='col']").addClass("swiper-slide");
		$(".button-next").addClass("swiper-button-next");
		$(".button-prev").addClass("swiper-button-prev");
		$(".pagination").addClass("swiper-pagination");

		// khởi tạo swiper
		const swiper = new Swiper(".projectsSwiper", {
			cssMode: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			mousewheel: true,
			keyboard: true,
		});
	} else {
		console.log("no changes");
	}
}

var breakpoint = window.matchMedia("(max-width: 768px)");
handleBreakpointChange(breakpoint); // Call listener function at run time

/**
 * back to top
 */
$(window).on("scroll", function () {
	if ($(window).scrollTop() >= $(document).height() / 2) {
		$(".to-top").addClass("on");
	} else {
		$(".to-top").removeClass("on");
	}
});
$(".to-top").on("click", function () {
	$("html").scrollTop(0);
});
