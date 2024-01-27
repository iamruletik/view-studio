/*****************************************************Main Function***************************************************/
runPreloaderAnimation();

window.addEventListener("DOMContentLoaded", (event) => {
    let isMobile = window.matchMedia("(max-width: 1024px)");

    if (isMobile.matches) {
        hideMobileHeaderonScroll();
    }

    animateLinks();
    initMobileMenu();

});

window.addEventListener("resize", (event) => { });





/*****************************************************Functions***************************************************/
function animateLinks() {
    let heroLinks = document.querySelectorAll(".hero-link");
    heroLinks.forEach((herolink) => {
        const templink = herolink.querySelector("*");
        templink.style.textShadow = "0 1em";
        herolink.addEventListener("mouseenter", () => {
            gsap.to(templink, {
                yPercent: -101,
                overwrite: true,
                ease: "circ.inOut",
                overwrite: true,
            });
        });

        herolink.addEventListener("mouseleave", () => {
            gsap.set(templink, {
                yPercent: 0,
                overwrite: true,
            });
        });
    });
}

function setFakeHeaderHeight() {
    let fakeHeader = document.querySelector(".fake-header-spacer");
    let actualHeader = document.querySelector(".header-section");
    fakeHeader.style.height = actualHeader.offsetHeight + "px";
}

function hideMobileHeaderonScroll() {
    const hideMobileMenu = gsap.from('.mobile-header-layout', {
        yPercent: -100,
        autoAlpha: 0,
        paused: true,
        duration: 0.5
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            self.direction === -1 ? hideMobileMenu.play() : hideMobileMenu.reverse()
        }
    });
}

function initMobileMenu(element) {
    let menuLayout = document.querySelector(".mobile-menu");
    let menuButton = document.querySelector(".menu-svg-icon");
    let closeMenuButton = document.querySelector(".close-menu-svg");

    gsap.set(menuLayout, {
        autoAlpha: 0
    });

    menuButton.addEventListener("click", (event) => {
        gsap.to(menuLayout, {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.inOut"
        });
    }, false);


    closeMenuButton.addEventListener("click", (event) => {
        gsap.to(menuLayout, {
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.inOut"
        });
    }, false);

}


function runPreloaderAnimation() {

    let preloaderTimeline = gsap.timeline();

    let typeSplit = new SplitType(".preloader-logo-text", {
        types: "chars",
        tagName: "span"
    });


    preloaderTimeline.to(".preloader-logo-text > .char", {
        yPercent: -100,
        stagger: { amount: 0.7 },
        ease: "expo.inOut"
    })
        .to(".preloader-logo-text > .char", {
            yPercent: -200,
            stagger: { amount: 0.3 },
            ease: "expo.inOut"
        })
        .to(".preloader-sections-chunk", {
            yPercent: -100,
            stagger: { amount: 1 },
            ease: "expo.inOut"
        }, "<");


    window.onbeforeunload = function () {
        //gsap.to(".preloader-sections-chunk", {
        // yPercent: 0,
        //  duration: 0.1
        //  });
        //   console.log("unloading");
    }
}