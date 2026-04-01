    $().ready(function(){
    (function($) { "use strict";
	
    //Page cursors
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");

    // Remove position transition from CSS to fix stuttering
    var transCSS = "width 0.3s, height 0.3s, transform 0.3s, background 0.3s, box-shadow 0.3s";
    t.style.transition = transCSS; t.style.webkitTransition = transCSS;
    e.style.transition = transCSS; e.style.webkitTransition = transCSS;
    i.style.transition = transCSS; i.style.webkitTransition = transCSS;

    var mouseX = -100, mouseY = -100;
    var eX = -100, eY = -100;
    var iX = -100, iY = -100;

    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        mouseX = n.clientX;
        mouseY = n.clientY;
        
        t.style.left = mouseX + "px";
        t.style.top = mouseY + "px";

        if (t.style.opacity === "0") {
            t.style.opacity = "";
            e.style.opacity = "";
            i.style.opacity = "";
            eX = iX = mouseX;
            eY = iY = mouseY;
        }
    });

    function renderCursor() {
        eX += (mouseX - eX) * 0.2;
        eY += (mouseY - eY) * 0.2;
        iX += (mouseX - iX) * 0.1;
        iY += (mouseY - iY) * 0.1;

        e.style.left = eX + "px";
        e.style.top = eY + "px";
        i.style.left = iX + "px";
        i.style.top = iY + "px";
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    $(document).on("mouseenter", ".hover-target", n);
    $(document).on("mouseleave", ".hover-target", s);
	var app = function () {
		var body = undefined;
		var menu = undefined;
		var menuItems = undefined;
		var init = function init() {
			body = document.querySelector('body');
			menu = document.querySelector('.menu-icon');
			menuItems = document.querySelectorAll('.nav__list-item');
			applyListeners();
		};
		var applyListeners = function applyListeners() {
			menu.addEventListener('click', function () {
				return toggleClass(body, 'nav-active');
			});
		};
		var toggleClass = function toggleClass(element, stringClass) {
			if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
		};
		init();
	}();

	
	//Switch light/dark
	$("#switch").on('click', function () {
		if ($("body").hasClass("light")) {
			$("body").removeClass("light");
			$("#switch").removeClass("switched");
		}
		else {
			$("body").addClass("light");
			$("#switch").addClass("switched");
		}
	});	
    })(jQuery);        
    });