ripOutAllProjects();
filterProjectsList();
ripOutAllCategories();
animateShowFilters();
createProjectSliders();

window.addEventListener("DOMContentLoaded", (event) => {
    setFakeHeaderHeight();

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

});

window.addEventListener("resize", (event) => {
    setFakeHeaderHeight();
});


function animateShowFilters() {

    let filtersContainer = document.querySelector(".projects-list-nav");
    let filtersWrapper = document.querySelector(".filters-container");
    let showFiltersButton = document.querySelector(".show-filters");
    let isMobile = window.matchMedia("(max-width: 991px)");

    let isSwitched = false;

    if (isMobile.matches) {
        console.log(filtersContainer.offsetHeight);
        filtersWrapper.style.transform = "translateY(" + filtersContainer.offsetHeight + "px)";
    }

    showFiltersButton.addEventListener("click", (event) => {



        if (isSwitched) {
            gsap.to(filtersWrapper, {
                y: filtersContainer.offsetHeight,
                ease: "power3.inOut"
            });

            showFiltersButton.innerHTML = "SHOW FILTERS";
        } else {
            gsap.to(filtersWrapper, {
                y: 0,
                ease: "power3.inOut"
            });

            showFiltersButton.innerHTML = "HIDE FILTERS";
        }

        isSwitched = !isSwitched;


    }, false);
}


function createProjectSliders() {

    let allProjectsNodes = document.querySelectorAll(".projects-list-item");
    let allImagesNodes = document.querySelectorAll(".projects-list-item-image");

    allImagesNodes.forEach((imageNode) => {
        if (imageNode.style.backgroundImage == "none") {
            imageNode.remove();
        }
    });

    allProjectsNodes.forEach((projectNode) => {

        let imagesNodes = projectNode.querySelectorAll(".projects-list-item-image");

        if (imagesNodes.length > 1) {

            let emblaNode = projectNode.querySelector(".projects-list-item-link");
            let emblaContainer = projectNode.querySelector(".embla__container");
            let paginationContainer = projectNode.querySelector(".project-list-slider-pagination-container");


            let options = {
                loop: true,
                container: emblaContainer
            };

            let embla = EmblaCarousel(emblaNode, options);

            //Run these on slider initialization
            function emblaInit() {
                setupPaginationDots(paginationContainer, embla);
                toggleDotBtnsActive(paginationContainer, embla);
            }

            //Run these when slider change slide
            function emblaSelect() {
                toggleDotBtnsActive(paginationContainer, embla);
            }

            embla.on('init', emblaInit);
            embla.on('select', emblaSelect);
        }

    });




    function setupPaginationDots(container, slider) {

        let paginationDots = [];

        //Populate container with pagination dots
        container.innerHTML = slider
            .scrollSnapList()
            .map(() => '<div class="project-list-paginator"><div class="paginator"></div></div>')
            .join('');

        paginationDots = Array.from(container.querySelectorAll('.project-list-paginator'))
        paginationDots.forEach((node, index) => {
            node.addEventListener('click', () => slider.scrollTo(index), false);
        });

    }

    function toggleDotBtnsActive(container, slider) {
        let paginationDots = Array.from(container.querySelectorAll('.project-list-paginator'));

        const previous = slider.previousScrollSnap();
        const selected = slider.selectedScrollSnap();
        paginationDots[previous].childNodes[0].classList.remove('active');
        paginationDots[selected].childNodes[0].classList.add('active');
    }

}


function ripOutAllProjects() {
    let allProjectsNodes = document.querySelectorAll(".projects-list-item");
    //console.log(allProjectsNodes);
    let collectionListNode = document.querySelector(".temporal-projects-container");
    let actualProjectsContainerNode = document.querySelector(".projects-list");

    collectionListNode.remove();

    allProjectsNodes.forEach((element) => {
        actualProjectsContainerNode.appendChild(element);
    });

}



function filterProjectsList() {
    let allCategoriesNodes = document.querySelectorAll(".projects-list-nav-item");
    let allProjectsNodes = document.querySelectorAll(".projects-list-item");

    let activeCategory = document.querySelector(".projects-list-nav-item.active");
    let categoriesArray = [];

    //Get All categories in project items
    allProjectsNodes.forEach((project, index) => {

        let allTags = project.querySelectorAll(".category-utility-text");
        let tagList = [];

        allTags.forEach((tag, index) => {
            tagList[index] = tag.getAttribute("category");
        });

        categoriesArray[index] = tagList.join(", ");

        //console.log(categoriesArray[index]);
    });


    allCategoriesNodes.forEach((category, index) => {

        let filterBy = category.getAttribute("filtering");

        let indexArr = categoriesArray.findIndex(element => element.includes(filterBy));

        if ((indexArr == -1) && (filterBy != "all")) {
            allCategoriesNodes[index].parentNode.remove();
        }


    });


    allCategoriesNodes.forEach((category) => {

        let filterBy = category.getAttribute("filtering");

        if (filterBy == "all") {

            category.addEventListener("click", (event) => {

                gsap.to(".projects-list-item", {
                    opacity: 0,
                    yPercent: 20,
                    //duration: 0.3,
                    stagger: { amount: 0.4 },
                    ease: "power1.out",
                    onComplete: filtering
                });


                activeCategory.classList.remove("active");
                category.classList.add("active");
                activeCategory = category;

                function filtering() {
                    allProjectsNodes.forEach((project) => {
                        project.classList.remove('project-unfiltered');
                        //console.log(project);
                    });

                    gsap.to(".projects-list-item", {
                        opacity: 1,
                        yPercent: 0,
                        //duration: 0.3,
                        ease: "power1.out",
                        stagger: { amount: 0.4 },
                    });

                }


            });

        } else {

            category.addEventListener("click", (event) => {

                gsap.to(".projects-list-item", {
                    opacity: 0,
                    yPercent: 20,
                    //duration: 0.3,
                    ease: "power1.out",
                    stagger: { amount: 0.4 },
                    onComplete: filtering
                });


                activeCategory.classList.remove("active");
                category.classList.add("active");
                activeCategory = category;

                function filtering() {
                    categoriesArray.forEach((projectCategory, index) => {

                        if (projectCategory.includes(filterBy)) {
                            allProjectsNodes[index].classList.remove('project-unfiltered');
                        } else {
                            allProjectsNodes[index].classList.add('project-unfiltered');
                        }

                    });

                    gsap.to(".projects-list-item", {
                        opacity: 1,
                        yPercent: 0,
                        //duration: 0.4,
                        ease: "power1.out",
                        stagger: { amount: 0.4 }
                    });

                }

            }, false);

        }



    });


}


function ripOutAllCategories() {
    let allCategoriesNodes = document.querySelectorAll(".projects-list-nav-item");
    //console.log(allProjectsNodes);
    let collectionListNode = document.querySelector(".nav-list-container");
    let actualProjectsContainerNode = document.querySelector(".projects-list-nav");

    collectionListNode.parentNode.remove();

    allCategoriesNodes.forEach((element) => {
        actualProjectsContainerNode.appendChild(element);
    });

}


function pinNavigation() {

    // Fixes navigation
    gsap.to(".projects-list-nav", {
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            pin: ".projects-list-nav"
        }
    });
}
