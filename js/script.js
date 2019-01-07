(function ($) {
    'use strict';

    // Sticky Menu
    $(window).scroll(function () {
        if ($('.navigation').offset().top > 100) {
            $('.navigation').addClass('nav-bg');
        } else {
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Closes responsive menu when a scroll link is clicked
    $('.nav-link').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    // animation scroll js
    var html_body = $('html, body');
    $('.page-scroll, .nav-link').on('click', function () { //use page-scroll class in any HTML tag for scrolling
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                html_body.animate({
                    scrollTop: target.offset().top - 120
                }, 1500, "easeInOutExpo");
                return false;
            }
        }
    });

    // easeInOutExpo Declaration
    jQuery.extend(jQuery.easing, {
        easeInOutExpo: function (x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    });

    //  Headroom Initialize
    $('.navigation').headroom();


    $(window).on("load", function () {
        // isotope filter
        $(".filter-controls li").on("click", function () {
            var filterValue = $(this).attr('data-filter');
            $(".filter-items").isotope({
                filter: filterValue,
                masonry: {
                    columnWidth: 1
                }
            });
        });

        // masonry item
        $(".filter-items").isotope({
            layoutMode: "masonry",
            masonry: {
                columnWidth: 1,
                horizontalOrder: false
            }
        });
    });

    //Active changer
    $('.filter-controls li').on('click', function () {
        $('.filter-controls li').removeClass("active");
        $(this).addClass("active");
    });


    // Aos js
    AOS.init({
        once: true
    });

})(jQuery);