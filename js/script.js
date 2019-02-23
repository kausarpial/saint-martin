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
    // $('.navigation').headroom();


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

    // Load More
    $('#loadMore').on('click', function () {
        $('.filter-items').find('.it-hide').each(function () {
            $(this).addClass('it-show').removeClass('it-hide');
        })
    })

    // Aos js
    AOS.init({
        once: true
    });

})(jQuery);

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
var container, stats;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = -150;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();
function init() {
    container = document.createElement('div');
    container.className = 'top-animation';
    document.getElementById('home').appendChild(container);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    particles = new Array();
    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({
        //color: 0x3f6e86,
        color: 0x3f6e86,
        // color: 0xffffff,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, .3, 0, PI2, true);
            context.fill();
        }
    });
    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Sprite(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
            // scene.background = new THREE.Color( 0x254a5d ); // UPDATED
            scene.add(particle);
        }
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer = new THREE.CanvasRenderer({ alpha: true }); // gradient
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //stats = new Stats();
    //container.appendChild( stats.dom );
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    //
    window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    //mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        //mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        //mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
//
function animate() {
    requestAnimationFrame(animate);
    render();
    //stats.update();

}
function render() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);
    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
                (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
                (Math.sin((iy + count) * 0.5) + 1) * 4;
        }
    }

    renderer.render(scene, camera);
    count += 0.1;
}

// var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
// var container, stats;
// var camera, scene, renderer;
// var particles, particle, count = 0;
// var mouseX = 0, mouseY = -200;
// var windowHalfX = window.innerWidth / 2;
// var windowHalfY = window.innerHeight / 2;

// init();
// animate();

// function init() {
//     container = document.createElement('div');
//     container.className = 'top-animation';
//     document.body.appendChild(container);
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
//     camera.position.z = 1000;
//     scene = new THREE.Scene();
//     particles = new Array();
//     var PI2 = Math.PI * 2;
//     var material = new THREE.SpriteCanvasMaterial({
//         //color: 0x3f6e86,
//         color: 0x3f6e86,
//         // color: 0xffffff,
//         program: function (context) {
//             context.beginPath();
//             context.arc(0, 0, .3, 0, PI2, true);
//             context.fill();
//         }
//     });
//     var i = 0;
//     for (var ix = 0; ix < AMOUNTX; ix++) {
//         for (var iy = 0; iy < AMOUNTY; iy++) {
//             particle = particles[i++] = new THREE.Sprite(material);
//             particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION ) / 2 );
//             particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION ) / 2 );
//             // scene.background = new THREE.Color( 0x254a5d ); // UPDATED
//             scene.add(particle);
//         }
//     }
//     renderer = new THREE.CanvasRenderer();
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer = new THREE.CanvasRenderer({ alpha: true }); // gradient
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     container.appendChild(renderer.domElement);
//     //stats = new Stats();
//     //container.appendChild( stats.dom );
//     document.addEventListener('mousemove', onDocumentMouseMove, false);
//     document.addEventListener('touchstart', onDocumentTouchStart, false);
//     document.addEventListener('touchmove', onDocumentTouchMove, false);
//     //
//     window.addEventListener('resize', onWindowResize, false);
// }
// function onWindowResize() {
//     windowHalfX = window.innerWidth / 2;
//     windowHalfY = window.innerHeight / 2;
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
// //
// function onDocumentMouseMove(event) {
//     mouseX = event.clientX - windowHalfX;
//     //mouseY = event.clientY - windowHalfY;
//     //mouseY=-100;
// }
// function onDocumentTouchStart(event) {
//     if (event.touches.length === 1) {
//         event.preventDefault();
//         mouseX = event.touches[0].pageX - windowHalfX;
//         mouseY = event.touches[0].pageY - windowHalfY;
//     }
// }
// function onDocumentTouchMove(event) {
//     if (event.touches.length === 1) {
//         event.preventDefault();
//         mouseX = event.touches[0].pageX - windowHalfX;
//         mouseY = event.touches[0].pageY - windowHalfY;
//     }
// }
// //
// function animate() {
//     requestAnimationFrame(animate);
//     render();
//     //stats.update();

// }
// function render() {
//     camera.position.x += (mouseX - camera.position.x) * .05;
//     camera.position.y += (- mouseY - camera.position.y) * .05;
//     camera.lookAt(scene.position);
//     var i = 0;
//     for (var ix = 0; ix < AMOUNTX; ix++) {
//         for (var iy = 0; iy < AMOUNTY; iy++) {
//             particle = particles[i++];
//             particle.position.y = (Math.sin((ix + count) * 0.3) * 50 ) +
//                 (Math.sin((iy + count) * 0.5) * 50 );
//             particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
//             (Math.sin((iy + count) * 0.5) + 1) * 4;
//         }
//     }

//     renderer.render(scene, camera);
//     count += 0.1;
// }
