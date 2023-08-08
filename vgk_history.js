let buttonList = document.querySelectorAll('.button-year-select');
let lineList = document.querySelectorAll('.time-line');


const tlWrapper = document.querySelector('.tl-wrapper');

tlWrapper.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    yearChange(e, e.target)
});

const yearChange = (e, currElement) => {
    let prevElement = document.querySelector('.button-year-select.active');
    // remove .active from previous header, line, and button                 
    let prevWrapper = document.querySelectorAll('.active');
    prevWrapper.forEach((element) => {
        element.classList.remove('active');
    });

    // add .active to newly selected year
    let currWrapper = currElement.parentElement.children;
    Array.from(currWrapper).forEach((element) => {
        if (!(element.classList.contains('after'))) {
            element.classList.add('active');
        }
    });

    animateLine(prevElement, currElement, lineList, buttonList);

    changeColor(buttonList,
        'var(--gold-color)',
        'var(--gray-color)',
        'active');

    changeColor(lineList,
        'var(--gold-color)',
        'var(--gray-color)',
        'active');

    let prevIndex = parseInt(Array.prototype.indexOf.call(buttonList, prevElement));
    let currIndex = parseInt(Array.prototype.indexOf.call(buttonList, currElement));

    showInfo(currIndex);

    delayAnimate(prevIndex, currIndex, e);
}

// delay scroll animation until main timeline animation has completed
const delayAnimate = (prevIndex, currIndex, e) => {
    let delay = Math.abs(currIndex - prevIndex) * 1000 * (0.5 / Math.E);
    if (Math.abs(currIndex - prevIndex) < 5) {
        delay += 350;
    }
    setTimeout(function () { autoScroll(e.target, e); }, delay);
}

// changes colors of main timeline buttons based on year clicked
const changeColor = (elementList, pastColor, futureColor, classBreak) => {
    let changeColor = true;
    elementList.forEach((element) => {
        if (changeColor) {
            element.style.backgroundColor = pastColor;
        } else {
            element.style.backgroundColor = futureColor;
        } if (element.classList.contains(classBreak)) {
            changeColor = false;
        }
    });
}

// changes colors of main timeline based on year clicked
const animateLine = (prevElement, currElement, lineList, buttonList) => {
    let duration = 0.15;
    let delay = 0.2;
    let prevIndex = parseInt(Array.prototype.indexOf.call(buttonList, prevElement));
    let currIndex = parseInt(Array.prototype.indexOf.call(buttonList, currElement));
    let prevHeader = prevElement.parentElement.children[0];
    let currHeader = currElement.parentElement.children[0];

    // previous element is BEFORE the new selection
    if (prevIndex < currIndex) {
        for (let i = prevIndex; i < currIndex + 1; i++) {
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            buttonList[i].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i + 1].style.transition = `background-color ${duration}s ease ${delay}s`;
        }
        buttonList[currIndex].style.transition = `background-color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s`;
        currHeader.style.transition = `color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s`;

        // previous element is AFTER the new selection
    } else {
        for (let i = prevIndex; i > currIndex - 1; i--) {
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i + 1].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            buttonList[i].style.transition = `background-color ${duration}s ease ${delay}s`;
            duration += 0.02;
            delay += 0.02;
            lineList[2 * i].style.transition = `background-color ${duration}s ease ${delay}s`;
        }
        buttonList[currIndex].style.transition = `background-color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s`;
        currHeader.style.transition = `color ${duration}s ease ${delay}s, scale ${duration}s linear ${delay}s`;
    }
    buttonList[prevIndex].style.transition = '';
    prevHeader.style.transition = '';
}

// shows a given year's individual timeline
const showInfo = (index) => {
    let infoPages = document.querySelectorAll('.year-info');
    infoPages.forEach((p) => {
        if (p.classList.contains('active')) {
            p.classList.remove('active');
        }
    });
    infoPages[index].classList.add('active');
}

// autoscrolls to specified value
const autoScroll = (element, e, top) => {
    e.preventDefault();
    let offsetTop = 0;
    if (top != 0) {
        let href = element.getAttribute("href");
        offsetTop = document.querySelector(href).offsetTop;
    }

    scroll({
        top: offsetTop - 125,
        behavior: "smooth"
    });
}

// slowly reveals time posts for individual years as scrolled past
const reveal = () => {
    let revealImg = document.querySelectorAll(".reveal");

    for (let i = 0; i < revealImg.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = revealImg[i].getBoundingClientRect().top;
        let elementVisible = 40;

        if (elementTop < (windowHeight - elementVisible)) {
            revealImg[i].classList.add("active");
        } else {
            revealImg[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);

// sticks the NAV to top of page when scrolled past
const makeSticky = () => {
    let makeStick = document.querySelector(".sticky");
    let listener = document.querySelector(".sticky-listener");
    let elementTop = listener.getBoundingClientRect().top;

    if (elementTop < 1) {
        listener.classList.add("retake-space")
        makeStick.classList.add("scroll-past");
    } else {
        listener.classList.remove("retake-space");
        makeStick.classList.remove("scroll-past");
    }


}
window.addEventListener("scroll", makeSticky);

// back button auto scrolls to top of page
const backButton = document.querySelectorAll('.back-button');
backButton.forEach((button) => {
    button.addEventListener('click', (e) => {
        autoScroll(e.target, e, 0);
    });
});

const majorEventButtons = document.querySelectorAll('.major-button');
majorEventButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        autoScroll(e.target, e);
    })
})

// previous year button is not allowed for first year
document.querySelector(".prev").addEventListener('mouseover', (e) => {
    let buttonList = document.querySelectorAll('.button-year-select');
    let currElement = document.querySelector('.button-year-select.active');
    let index = parseInt(Array.prototype.indexOf.call(buttonList, currElement));
    if (index < 1) {
        e.target.style.cursor = 'not-allowed';
    } else {
        e.target.style.cursor = 'pointer';
    }
});

// next year button is not allowed for last year
document.querySelector(".next").addEventListener('mouseover', (e) => {
    let buttonList = document.querySelectorAll('.button-year-select');
    let currElement = document.querySelector('.button-year-select.active');
    let index = parseInt(Array.prototype.indexOf.call(buttonList, currElement));
    if (index == buttonList.length - 1) {
        e.target.style.cursor = 'not-allowed';
    } else {
        e.target.style.cursor = 'pointer';
    }
});

// previous year button
document.querySelector(".prev").addEventListener('click', (e) => {
    let buttonList = document.querySelectorAll('.button-year-select');
    let currElement = document.querySelector('.button-year-select.active');
    let index = parseInt(Array.prototype.indexOf.call(buttonList, currElement));

    if (!(e.target.style.cursor == 'not-allowed')) {
        buttonList[index - 1].click();
        reveal();
    }
});

// next year button
document.querySelector(".next").addEventListener('click', (e) => {
    let buttonList = document.querySelectorAll('.button-year-select');
    let currElement = document.querySelector('.button-year-select.active');
    let index = parseInt(Array.prototype.indexOf.call(buttonList, currElement));
    if (!(e.target.style.cursor == 'not-allowed')) {
        buttonList[index + 1].click();
        reveal();
    }
});