/*****************************************************Main Function***************************************************/
window.addEventListener("DOMContentLoaded", (event) => {

    let schemeScreen = document.querySelector("#schemeSlider");
    let additionalScreen = document.querySelector("#secondScreen");
    let progressScreen = document.querySelector("#progressScreen");

    let heroSlider = createHeroSlider();
    if (schemeScreen.classList.contains("w-condition-invisible") == false) { createSchemeSlider(); }
    if (additionalScreen.classList.contains("w-condition-invisible") == false) { createAdditionalSlider(); }
    if (progressScreen.classList.contains("w-condition-invisible") == false) { createProjectProgressSlider(); }


    makeSliderButtonsFlow(document.querySelector("#mainScreen"));
    makeSliderButtonsFlow(document.querySelector("#secondScreen"));

    // Mix-blend for header section
    gsap.to(".header-section", {
        scrollTrigger: {
            trigger: "body",
            start: "top -80%",
            toggleClass: { targets: ".header-section", className: "difference" },
            toggleActions: "restart none none reverse",
        },
    });

    //Animate Cue arrow icon
    gsap.to(".cue-arrow-svg", {
        y: 10,
        duration: 0.7,
        ease: "power3.inOut",
        yoyo: true,
        repeat: -1
    });

    gsap.from(".slider-item-image", {
        scale: 1.15,
        duration: 5,
        ease: "power1.inOut",
    });


    let isMobile = window.matchMedia("(min-width: 1024px)");

    //Animate First Screen
    let mainScreenTimeline = gsap.timeline();
    mainScreenTimeline.
        from([".slider-description-headline-container", ".slider-description-overview"], {
            y: 100,
            autoAlpha: 0,
            delay: 1,
            duration: 0.7,
            ease: "power2.inOut"
        })
        .from(".slider-item--description--container", {
            y: 100,
            autoAlpha: 0,
            duration: 1,
            ease: "power2.inOut"
        });

});

window.addEventListener("resize", (event) => { });


/*****************************************************Functions***************************************************/
function createHeroSlider() {
    let emblaNode = document.querySelector(".embla");
    let options = {
        loop: true,
        container: ".embla__container"
    };
    let plugins = [
        EmblaCarouselAutoplay({
            delay: 5000,
            stopOnMouseEnter: true,
            stopOnInteraction: true
        }),
    ]; // Plugins

    let embla = EmblaCarousel(emblaNode, options, plugins);

    let prevButtonNode = document.querySelector(".slider-left-area");
    let nextButtonNode = document.querySelector(".slider-right-area");
    let sliderCounter = document.querySelector("#counter-pagination");
    let paginationContainer = document.querySelector(".pagination-container");
    let listOfSlides = embla.slideNodes();

    prevButtonNode.addEventListener("click", (event) => {
        embla.scrollPrev();
        embla.plugins().autoplay.stop();
    }, false);

    nextButtonNode.addEventListener("click", (event) => {
        embla.scrollNext();
        embla.plugins().autoplay.stop();
    }, false);

    function setupSliderCounter() {
        let selectedIndex = embla.selectedScrollSnap() + 1;
        let totalAmount = listOfSlides.length;
        sliderCounter.innerHTML = selectedIndex + " / " + totalAmount;
    }

    function setupPaginationDots() {

        let paginationDots = [];

        //Populate container with pagination dots
        paginationContainer.innerHTML = embla
            .scrollSnapList()
            .map(() => '<div class="pagination-holder"><div class="pagination"></div></div>')
            .join('');

        paginationDots = Array.from(paginationContainer.querySelectorAll('.pagination-holder'))
        paginationDots.forEach((node, index) => {
            node.addEventListener('click', () => embla.scrollTo(index), false);
        });

    }

    function toggleDotBtnsActive() {
        let paginationDots = Array.from(paginationContainer.querySelectorAll('.pagination-holder'));

        const previous = embla.previousScrollSnap();
        const selected = embla.selectedScrollSnap();
        paginationDots[previous].childNodes[0].classList.remove('active-pagination');
        paginationDots[selected].childNodes[0].classList.add('active-pagination');
    }


    //Run these on slider initialization
    function emblaInit() {
        setupSliderCounter();
        setupPaginationDots();
        toggleDotBtnsActive();
    }

    //Run these when slider change slide
    function emblaSelect() {
        setupSliderCounter();
        toggleDotBtnsActive();
    }

    //Run these when cursor is up
    function emblaPointerUP() {

    }


    embla.on('init', emblaInit);
    embla.on('select', emblaSelect);
    embla.on('pointerUp', emblaPointerUP);




    return embla;
}


function makeSliderButtonsFlow(target) {

    let offset = target.getBoundingClientRect();
    let prevButtonNode = target.querySelector(".previous-slide-button");
    let nextButtonNode = target.querySelector(".next-slide-button");
    let workingArea = target.querySelector(".slider-controls");
    let leftArea = target.querySelector(".slider-left-area");
    let rightArea = target.querySelector(".slider-right-area");
    let mousePosX, mousePosY = 0;
    let buttonScale = 0.3;
    let buttonWidth = prevButtonNode.offsetWidth / 2;

    gsap.set([prevButtonNode, nextButtonNode], {
        autoAlpha: 0,
        scale: buttonScale,
    });


    leftArea.addEventListener("click", (event) => {
        scaleOnClick(prevButtonNode);
    }, false);

    rightArea.addEventListener("click", (event) => {
        scaleOnClick(nextButtonNode);
    }, false);


    leftArea.addEventListener("mouseenter", (event) => {
        showButton(prevButtonNode);
    });

    leftArea.addEventListener("mouseout", (event) => {
        hideButton(prevButtonNode);
    });

    leftArea.addEventListener("mousemove", (event) => {
        moveButton(prevButtonNode);
    });

    rightArea.addEventListener("mouseenter", (event) => {
        showButton(nextButtonNode);
    });

    rightArea.addEventListener("mouseout", (event) => {
        hideButton(nextButtonNode);
    });

    rightArea.addEventListener("mousemove", (event) => {
        moveButton(nextButtonNode);
    });


    //Update Mouse Position
    workingArea.addEventListener("mousemove", updateMousePos, false);
    function updateMousePos(event) {
        mousePosX = event.pageX;
        mousePosY = event.pageY - offset.top;
    }

    //Animation of the buttons

    function moveButton(element) {
        gsap.to(element, {
            x: mousePosX - buttonWidth,
            y: mousePosY - buttonWidth,
            duration: 0
        });
    }

    function showButton(element) {
        gsap.to(element, {
            autoAlpha: 1,
            scale: 1.25,
            duration: 0.2
        });
    }

    function hideButton(element) {
        gsap.to(element, {
            autoAlpha: 0,
            scale: buttonScale,
            duration: 0.2
        });
    }

    function scaleOnClick(element) {
        gsap.to(element, {
            scale: 0.9,
            yoyo: true,
            repeat: 1,
            duration: 0.15,
            overwrite: true
        });
    }

}


function createSchemeSlider() {
    let emblaNode = document.querySelector(".project-plan-slider");
    let emblaContainer = emblaNode.querySelector(".embla__container");
    let imageArray = emblaContainer.querySelectorAll("img");
    let schemeOverview = document.querySelector(".project-plan-description-list");
    let schemeOverviewContainer = document.querySelector("#plan-overview");

    let sliderWrapper = document.querySelector(".project-plan");
    let sliderCounter = document.querySelector("#counter-pagination-scheme");
    let paginationContainer = sliderWrapper.querySelector(".pagination-container");


    let options = {
        loop: true,
        container: emblaContainer
    };

    let plugins = [
        EmblaCarouselAutoplay({
            delay: 3000,
        }),
    ]; // Plugins

    let embla = EmblaCarousel(emblaNode, options);
    let listOfSlides = embla.slideNodes();

    function changeOverview() {
        let selectedIndex = embla.selectedScrollSnap();
        let altOverview = imageArray[selectedIndex].alt;

        if (altOverview != "") {
            schemeOverviewContainer.style.display = "flex";
            schemeOverview.innerHTML = altOverview;
        } else {
            schemeOverviewContainer.style.display = "none";
        }

    }

    function setupSliderCounter() {
        let selectedIndex = embla.selectedScrollSnap() + 1;
        let totalAmount = listOfSlides.length;
        sliderCounter.innerHTML = selectedIndex + " / " + totalAmount;
    }

    function setupPaginationDots() {

        let paginationDots = [];

        //Populate container with pagination dots
        paginationContainer.innerHTML = embla
            .scrollSnapList()
            .map(() => '<div class="pagination-holder"><div class="pagination"></div></div>')
            .join('');

        paginationDots = Array.from(paginationContainer.querySelectorAll('.pagination-holder'))
        paginationDots.forEach((node, index) => {
            node.addEventListener('click', () => embla.scrollTo(index), false);
        });

    }

    function toggleDotBtnsActive() {
        let paginationDots = Array.from(paginationContainer.querySelectorAll('.pagination-holder'));

        const previous = embla.previousScrollSnap();
        const selected = embla.selectedScrollSnap();
        paginationDots[previous].childNodes[0].classList.remove('active-pagination');
        paginationDots[selected].childNodes[0].classList.add('active-pagination');
    }


    //Run these on slider initialization
    function emblaInit() {
        setupSliderCounter();
        setupPaginationDots();
        toggleDotBtnsActive();
        changeOverview();
    }

    //Run these when slider change slide
    function emblaSelect() {
        setupSliderCounter();
        toggleDotBtnsActive();
        changeOverview();
    }

    embla.on("init", emblaInit);
    embla.on("select", emblaSelect);

}

function createAdditionalSlider() {
    let emblaNode = document.querySelector(".additional-images-slider");
    let emblaContainer = emblaNode.querySelector(".embla__container");

    let sliderWrapper = document.querySelector(".project-additional-images-slider");
    let sliderCounter = document.querySelector("#counter-pagination-additional");
    let paginationContainer = sliderWrapper.querySelector(".pagination-container");

    let options = {
        loop: true,
        container: emblaContainer
    };
    let plugins = [
        EmblaCarouselAutoplay({
            delay: 5000,
        }),
    ]; // Plugins

    let embla = EmblaCarousel(emblaNode, options, plugins);
    let listOfSlides = embla.slideNodes();


    let target = document.querySelector("#secondScreen");
    let prevButtonNode = target.querySelector(".slider-left-area");
    let nextButtonNode = target.querySelector(".slider-right-area");

    prevButtonNode.addEventListener("click", (event) => {
        embla.scrollPrev();
        embla.plugins().autoplay.stop();
    }, false);

    nextButtonNode.addEventListener("click", (event) => {
        embla.scrollNext();
        embla.plugins().autoplay.stop();
    }, false);


    function setupSliderCounter() {
        let selectedIndex = embla.selectedScrollSnap() + 1;
        let totalAmount = listOfSlides.length;
        sliderCounter.innerHTML = selectedIndex + " / " + totalAmount;
    }

    function setupPaginationDots() {

        let paginationDots = [];

        //Populate container with pagination dots
        paginationContainer.innerHTML = embla
            .scrollSnapList()
            .map(() => '<div class="pagination-holder"><div class="pagination"></div></div>')
            .join('');

        paginationDots = Array.from(paginationContainer.querySelectorAll('.pagination-holder'))
        paginationDots.forEach((node, index) => {
            node.addEventListener('click', () => embla.scrollTo(index), false);
        });

    }

    function toggleDotBtnsActive() {
        let paginationDots = Array.from(paginationContainer.querySelectorAll('.pagination-holder'));

        console.log(paginationDots);

        const previous = embla.previousScrollSnap();
        const selected = embla.selectedScrollSnap();
        paginationDots[previous].childNodes[0].classList.remove('active-pagination');
        paginationDots[selected].childNodes[0].classList.add('active-pagination');
    }


    //Run these on slider initialization
    function emblaInit() {
        setupSliderCounter();
        setupPaginationDots();
        toggleDotBtnsActive();
    }

    //Run these when slider change slide
    function emblaSelect() {
        setupSliderCounter();
        toggleDotBtnsActive();
    }

    embla.on("init", emblaInit);
    embla.on("select", emblaSelect);

}

function createProjectProgressSlider() {
    let emblaNode = document.querySelector(".project-progress-slider");
    let emblaContainer = emblaNode.querySelector(".progress-slider-container");
    let imageArray = emblaContainer.querySelectorAll("img");
    let descriptArray = emblaContainer.querySelectorAll(".gray-label");

    let options = {
        loop: true,
        container: emblaContainer
    };
    let plugins = [
        EmblaCarouselAutoplay({
            delay: 3000,
        }),
    ]; // Plugins

    let embla = EmblaCarousel(emblaNode, options, plugins);


    descriptArray.forEach((element, index) => {

        let altOverview = imageArray[index].alt;

        if (altOverview != "") {
            //element.style.display = "flex";
            element.innerHTML = altOverview;
        } else {
            element.style.display = "none";
        }

    });
}
