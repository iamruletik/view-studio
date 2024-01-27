window.addEventListener("DOMContentLoaded", (event) => {
    setFakeHeaderHeight();

    let isMobile = window.matchMedia("(max-width: 1024px)");

    if (isMobile.matches) {


        // Show footer only at the end of the page
        gsap.registerPlugin(ScrollTrigger);

        let showFooter = gsap.fromTo([".privacy-policy-container", ".design-by-radiance"], { y: 200 }, { y: 0 }).pause();

        ScrollTrigger.create({
            start: 0,
            end: () => ScrollTrigger.maxScroll(window) - 2, // just above the bottom of the page
            onEnter: () => showFooter.pause(),
            onEnterBack: () => showFooter.reverse(),
            onLeave: () => showFooter.play() // we're at the bottom of the page
        })

    }

});

window.addEventListener("resize", (event) => {
    setFakeHeaderHeight();
});
