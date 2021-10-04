// vì không lồng thẻ a bên ngoài từng project được
$("body").on("click", ".project", function () {
	$(this).find(".link")[0].click();
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

/**
 * Scroll reveal
 */
const sr = ScrollReveal({
	origin: "top",
	distance: "80px",
	duration: 2000,
});
// banner
sr.reveal(".banner .introduction", { origin: "bottom" });

sr.reveal(".banner .img-parent", {
	origin: "top",
});

sr.reveal(".banner .socials", {
	origin: "bottom",
});

sr.reveal(".banner .introduction .btn", {
	delay: 1000,
	origin: "bottom",
	mobile: false,
});

// Project
const projectEls = document.querySelectorAll(".projects .project");
for (let i = 0; i < projectEls.length; i++) {
	sr.reveal(`.projects .project-wrapper > *:nth-child(${i + 1})`, {
		distance: "80px",
		origin: "bottom",
		delay: i * 150,
		mobile: false,
	});
}

// About
sr.reveal(".about .detail .img-parent", { origin: "top" });
sr.reveal(".about .detail .para", { origin: "bottom" });

// Contact
sr.reveal(".contact .img-parent", { origin: "top", mobile: false });
sr.reveal(".contact .contact-info", { origin: "bottom" });
