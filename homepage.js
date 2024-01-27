/*****************************************************Main Function***************************************************/
window.addEventListener("DOMContentLoaded", (event) => {

    let heroSlider = createEmblaSlider({
        "emblaNode": document.querySelector(".embla")
    });

    makeSliderButtonsFlow();

    let actualHeader = document.querySelector(".header-section");
    let fakeHeader = document.querySelector(".main-hero-description");
    fakeHeader.style.paddingTop = actualHeader.offsetHeight + "px";


    //Animate slider images
    gsap.from(".slider-image", {
        scale: 1.15,
        duration: 5,
        ease: "power1.inOut",
        //yoyo: true,
        //repeat: -1
    });

});

window.addEventListener("resize", (event) => { });


/*****************************************************Functions***************************************************/
function createEmblaSlider(params) {
    let emblaNode = params.emblaNode;
    let options = { loop: true };
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
    let projectDescription = document.querySelector("#slider-description");
    let middleArea = document.querySelector(".see-more-field");
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



    //Changing Dynamically Project Description Label
    function changeProjectDescription() {
        let selectedIndex = embla.selectedScrollSnap();
        let nameAttribute = listOfSlides[selectedIndex].childNodes[0].getAttribute("name-project");
        let yearAttrubute = listOfSlides[selectedIndex].childNodes[0].getAttribute("project-year");

        projectDescription.innerHTML = nameAttribute + " / " + yearAttrubute;
        //console.log(nameOfProject + " / " + projectYear);
    }


    //Dynamically changing link in See More Button
    function resetSeeMoreLink() {
        let selectedIndex = embla.selectedScrollSnap();

        middleArea.addEventListener("click", (event) => {
            window.open(listOfSlides[selectedIndex].childNodes[0].href, "_self");
        }, false);
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
        changeProjectDescription();
        resetSeeMoreLink();
        setupSliderCounter();
        setupPaginationDots();
        toggleDotBtnsActive();
    }

    //Run these when slider change slide
    function emblaSelect() {
        changeProjectDescription();
        resetSeeMoreLink();
        setupSliderCounter();
        toggleDotBtnsActive();
    }

    //Run these when cursor is up
    function emblaPointerUP() {
        changeProjectDescription();
        resetSeeMoreLink();
    }


    embla.on('init', emblaInit);
    embla.on('select', emblaSelect);
    embla.on('pointerUp', emblaPointerUP);

    return embla;
}


function makeSliderButtonsFlow() {
    let prevButtonNode = document.querySelector(".previous-slide-button");
    let nextButtonNode = document.querySelector(".next-slide-button");
    let seeMoreButton = document.querySelector(".see-more-button");
    let workingArea = document.querySelector(".slider-controls");
    let leftArea = document.querySelector(".slider-left-area");
    let rightArea = document.querySelector(".slider-right-area");
    let middleArea = document.querySelector(".see-more-field");
    let mousePosX, mousePosY = 0;
    let buttonScale = 0.3;
    let buttonWidth = prevButtonNode.offsetWidth / 2;

    gsap.set([prevButtonNode, nextButtonNode, seeMoreButton], {
        autoAlpha: 0,
        scale: buttonScale,
    });


    //Left Area Interactions
    leftArea.addEventListener("click", (event) => {
        scaleOnClick(prevButtonNode);
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


    //Right Area Interactions
    rightArea.addEventListener("click", (event) => {
        scaleOnClick(nextButtonNode);
    }, false);

    rightArea.addEventListener("mouseenter", (event) => {
        showButton(nextButtonNode);
    });

    rightArea.addEventListener("mouseout", (event) => {
        hideButton(nextButtonNode);
    });

    rightArea.addEventListener("mousemove", (event) => {
        moveButton(nextButtonNode);
    });


    //Middle Area Interactions
    middleArea.addEventListener("click", (event) => {
        scaleOnClick(seeMoreButton);
    }, false);

    middleArea.addEventListener("mouseenter", (event) => {
        showButton(seeMoreButton);
    });

    middleArea.addEventListener("mouseout", (event) => {
        hideButton(seeMoreButton);
    });

    middleArea.addEventListener("mousemove", (event) => {
        moveButton(seeMoreButton);
    });


    //Update Mouse Position
    workingArea.addEventListener("mousemove", updateMousePos, false);
    function updateMousePos(event) {
        mousePosX = event.pageX;
        mousePosY = event.pageY;
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