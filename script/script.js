let images = [{
    src: "images/project1.jpg",
    title: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don<br>LCD admiral",
    apartment_area: "81 m2",
    repair_time: "3.5 months",
    repair_cost: "Upon request",
}, {
    src: "images/project2.jpg",
    title: "Sochi Thieves",
    city: "Sochi<br>Thieves",
    apartment_area: "105 m2",
    repair_time: "4 months",
    repair_cost: "Upon request",
}, {
    src: "images/project3.jpg",
    title: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don<br>Patriotic",
    apartment_area: "93 m2",
    repair_time: "3 months",
    repair_cost: "Upon request",
}]


function initSlider(options) {

    if (!images || !images.length) return;

    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".slider-images");
    let sliderArrows = document.querySelector(".slider-arrows");
    let sliderDots = document.querySelector(".slider-dots");
    let sliderTitle = document.querySelectorAll(".name-project");
    let sliderSubtitle = document.querySelector(".grid-city");    

    initImages();
    initArrows();

    if (options.dots) {
        initDots();
    };

    if (options.titles) {
        changeTitle();
        initSubtitle();
    };

    if (options.autoplay) {
        initAutoplay();
      }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<img class="project-image n${index} ${index === 0? "active-slide" : ""}" data-index="${index}" src="${images[index].src}">`;
            sliderImages.innerHTML += imageDiv;
        })
    }

    function initSubtitle() {
        images.forEach((image, index) => {
            let cityText = `<p class="subtitle subtitle-grid subtitle-grid-1 n${index} ${index === 0? "active-grid" : ""}" data-index="${index}">${images[index].city}</p>`;
            let areaText = `<p class="subtitle subtitle-grid subtitle-grid-2 n${index} ${index === 0? "active-grid" : ""}" data-index="${index}">${images[index].apartment_area}</p>`;
            let timeText = `<p class="subtitle subtitle-grid subtitle-grid-3 n${index} ${index === 0? "active-grid" : ""}" data-index="${index}">${images[index].repair_time}</p>`;
            let costText = `<p class="subtitle subtitle-grid subtitle-grid-4 n${index} ${index === 0? "active-grid" : ""}" data-index="${index}">${images[index].repair_cost}</p>`;
            sliderSubtitle.innerHTML += cityText + areaText + timeText + costText;
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".slider-arrow").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let activeNumber = +sliderImages.querySelector(".active-slide").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = activeNumber === 0? images.length - 1 : activeNumber - 1;
                } else {
                    nextNumber = activeNumber === images.length - 1? 0 : activeNumber + 1;
                }
                moveSlider(nextNumber);
            })
        })
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider-dots-item n${index} ${index ===0? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider-dots-item").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active-slide").classList.remove("active-slide");
        sliderImages.querySelector(".n" + num).classList.add("active-slide");
        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        };
        if (options.titles) {
            let activeTitle = +sliderImages.querySelector(".active-slide").dataset.index;
            let nextTitle = activeTitle === 0? images.length - 1 : activeTitle - 1;
            let beforeTitle = activeTitle === images.length - 1? 0 : activeTitle + 1;
            sliderTitle[nextTitle].classList.remove("active-title");
            sliderTitle[beforeTitle].classList.remove("active-title");
            sliderTitle[activeTitle].classList.add("active-title");
            
            changeSubtitle(activeTitle);
        };
    };

    function changeSubtitle(num) {
        let nonActiveNumCity_1 = num === 0? images.length - 1 : num - 1;
        let nonActiveNumCity_2 = num === images.length - 1? 0 : num + 1;

        let sliderSubtitleCity = sliderSubtitle.querySelectorAll(".subtitle-grid-1");
        let activeGridCity = sliderSubtitleCity[num];
        activeGridCity.classList.add("active-grid");
        sliderSubtitleCity[nonActiveNumCity_1].classList.remove("active-grid");
        sliderSubtitleCity[nonActiveNumCity_2].classList.remove("active-grid");

        let sliderSubtitleArea = sliderSubtitle.querySelectorAll(".subtitle-grid-2");
        let activeGridArea = sliderSubtitleArea[num];
        activeGridArea.classList.add("active-grid");
        sliderSubtitleArea[nonActiveNumCity_1].classList.remove("active-grid");
        sliderSubtitleArea[nonActiveNumCity_2].classList.remove("active-grid");

        let sliderSubtitleTime = sliderSubtitle.querySelectorAll(".subtitle-grid-3");
        let activeGridTime = sliderSubtitleTime[num];
        activeGridTime.classList.add("active-grid");
        sliderSubtitleTime[nonActiveNumCity_1].classList.remove("active-grid");
        sliderSubtitleTime[nonActiveNumCity_2].classList.remove("active-grid");

        let sliderSubtitleCost = sliderSubtitle.querySelectorAll(".subtitle-grid-4");
        let activeGridCost = sliderSubtitleCost[num];
        activeGridCost.classList.add("active-grid");
        sliderSubtitleCost[nonActiveNumCity_1].classList.remove("active-grid");
        sliderSubtitleCost[nonActiveNumCity_2].classList.remove("active-grid");
    }

    function changeTitle() {
        sliderTitle.forEach(title => {
            title.addEventListener("click", function() {
                moveSlider(this.dataset.index);  
            })
        });  
    }

    function initAutoplay() {
        setInterval(() => {
          let curNumber = +sliderImages.querySelector(".active-slide").dataset.index;
          let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          moveSlider(nextNumber);
        }, options.autoplayInterval);
      }
}

let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000
  };

document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
});