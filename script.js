let smallStarsAmount = 50, // Amount of small stars on screen
    bigStarsAmount = 27, // Amount of big stars on screen
    smallStarsDuration = 4000, // Max duration of small star flying through screen
    bigStarsDuration = 10000, // Max duration of big star flying through screen
    smallStarsOffset = 45, // Width of screen from left and right sides, covered with small stars
    bigStarsOffset = 35, // Width of screen from left and right sides, covered with big stars
    maxDelay = 5000; // Max delay before each star will appeap on the screen

function addStars() {
    let starsWrapper = document.createElement('DIV');
    starsWrapper.classList.add('stars-background');
    for (let i = 1; i <= smallStarsAmount; i++) {
        addStar('-small', starsWrapper);
    }
    for (let i = 1; i <= bigStarsAmount; i++) {
        addStar('-big', starsWrapper);
    }
    document.body.prepend(starsWrapper);
    setStarsOffset();
    animateStars();
}

function addStar(className, wrapper) {
    let starElem = document.createElement('DIV');
    starElem.classList.add('star');
    starElem.classList.add(className);
    wrapper.append(starElem);
}

function setStarsOffset() {
    document.querySelectorAll('.star.-big').forEach((item, number, array) => {
        setOffset(item, number, array.length, bigStarsOffset);
    });
    document.querySelectorAll('.star.-small').forEach((item, number, array) => {
        setOffset(item, number, array.length, smallStarsOffset);
    });
}

function setOffset(element, number, amount, originalOffset) {
    if (number < amount / 2) {
        element.style.left =
            originalOffset * ((amount - number) / amount) ** 4 + '%';
    } else {
        element.style.left =
            100 - originalOffset * (number / amount) ** 4 + '%';
    }
}

function animateStars() {
    function animate({ timing, draw, duration }) {
        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) {
                timeFraction = 1;
            }

            let progress = timing(timeFraction);
            draw(progress);
            if (timeFraction === 1) {
                start = performance.now();
            }
            requestAnimationFrame(animate);
        });
    }
    document.querySelectorAll('.star').forEach((item) => {
        let duration = item.classList.contains('-big')
            ? bigStarsDuration
            : smallStarsDuration;
        setTimeout(() => {
            animate({
                duration:
                    Math.floor((Math.random() * duration) / 5) +
                    (4 * duration) / 5,
                timing: (timeFraction) => Math.pow(timeFraction, 3),
                draw(progress) {
                    // item.style.transform = `translateY(-${120 * progress}vh)`; // Better performance, but works worse if page scrolls
                    item.style.top = 110 - 120 * progress + '%';
                },
            });
        }, Math.floor(Math.random() * maxDelay));
    });
}

addStars();
