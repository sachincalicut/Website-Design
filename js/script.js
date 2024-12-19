// .closest() Polyfill for browsers that supports document.querySelectorAll() - IE9 again...
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

// for active menu highlighting

document.getElementById('nav').querySelector('ul').insertAdjacentHTML("beforebegin", "<span id='menutoggle' class='test'><i class='bx bx-menu'></i></span>");
var menutoggle = document.getElementById("menutoggle");
var activeClass = "is-active"

menutoggle.onclick = function(event) {
	menutoggle.classList.toggle(activeClass);
	//menutoggle.nextSibling.classList.toggle(activeClass);
	var el = document.querySelectorAll("#nav span.submenu, #nav ul.submenu");
	var i; for (i = 0; i < el.length; i++) {
		el[i].classList.remove(activeClass);
	}
	event.preventDefault();
};

var forEach = function (array, callback, scope) {
	for (var i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]); // passes back stuff we need from the array
	}
};
forEach(document.querySelectorAll("#nav span.submenu"), function (index, value) {
	value.addEventListener('click', function() {
        if ( menutoggle.offsetWidth > 0 && menutoggle.offsetHeight > 0 ) { // if the #menutoggle is visible
    		value.classList.toggle(activeClass);
        }
	})
});

function hideMenu() {
	var el = document.querySelectorAll("#menutoggle, #menutoggle + ul, #nav span.submenu, #nav ul.submenu");
	var i; for (i = 0; i < el.length; i++) {
		el[i].classList.remove(activeClass);
	}
}

document.addEventListener('click', function(e) {
	if ( menutoggle.offsetWidth > 0 && menutoggle.offsetHeight > 0 ) { // if the #menutoggle is visible
		var e=e? e : window.event;
	    var event_element=e.target? e.target : e.srcElement;
		if (!event_element.closest("#nav")){
			//console.log(event_element.closest("#nav"));
			if (menutoggle.classList.contains(activeClass)) {
				hideMenu();
			}
		}
	}
}, false);



var resizeTimer;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if ( menutoggle.offsetWidth <= 0 && menutoggle.offsetHeight <=  0 ) { // if the #menutoggle is hidden
    		hideMenu();
    	}
    }, 250);
}, false);


// Dropdown Select Toggle
forEach(document.querySelectorAll(".dropdown_list span.dropdown"), function (index, value) {
	value.addEventListener('click', function() {
        //console.log(value.classList);
        if ( !value.classList.contains(activeClass) ) {
            var el = document.querySelectorAll(".dropdown_list span.dropdown");
            var i; for (i = 0; i < el.length; i++) {
                el[i].classList.remove(activeClass);
            }
            value.classList.toggle(activeClass);
        } else
        if ( value.classList.contains(activeClass) ) {
            value.classList.remove(activeClass);
        }
	})
});
document.addEventListener('click', function(e) {
	// Dropdown Select Toggle
	var el = document.querySelectorAll(".dropdown_list span.dropdown")
	var e=e? e : window.event;
    var event_element=e.target? e.target : e.srcElement;
	if (!event_element.closest(".dropdown_list")){
		//console.log(event_element.closest(".dropdown_list"));
		var i; for (i = 0; i < el.length; i++) {
			el[i].classList.remove(activeClass);
		}
	}
}, false);
