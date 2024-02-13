
"use strict"; // fix lenis in safari

const lenis = new Lenis({
    lerp: 0.15,
    wheelMultiplier: 0.7,
    infinite: false,
    gestureOrientation: "vertical",
    normalizeWheel: true,
    smoothTouch: false,
    syncTouchLerp: 1,
    touchMultiplier: 0.1,
    autoResize: true
});


lenis.on('scroll', (e) => {
    //console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
