/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc (){
    const result = document.querySelector(".calculating__result");
    let sex, height, weight, age, radio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'male';
        localStorage.setItem('sex', 'male');
    }

    if (localStorage.getItem('radio')) {
        radio = localStorage.getItem('radio');
    } else {
        radio = 1.375;
        localStorage.setItem('radio', 1.375);
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if (el.getAttribute('id') === localStorage.getItem('sex')){
                el.classList.add(activeClass);
            } 
            if (el.getAttribute('data-radio') === localStorage.getItem('radio')){
                el.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if(!sex || !height || !weight || !age || !radio){
            result.textContent = '____';
            return;
        }

        if (sex === "female"){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * radio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * radio);
        }
    }

    calcTotal();

    function getStaticInform (selector, activeClass) {
        const element = document.querySelectorAll(selector);

        element.forEach( el => {
            el.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-radio')){
                    radio = +e.target.getAttribute('data-radio');
                    localStorage.setItem('radio', +e.target.getAttribute('data-radio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
    
                console.log(radio, sex);
    
                element.forEach(el => {
                    el.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInform('#gender div', 'calculating__choose-item_active');
    getStaticInform('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInform(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            }else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }

    getDinamicInform('#height');
    getDinamicInform('#weight');
    getDinamicInform('#age');

}


/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function carts (){
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this. alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27; 
            this.parent = document.querySelector(parentSelector); 
            this.changeToUAH();
            this.classes = classes;
        }

        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        render () {
            const element = document.createElement('div');

            if (this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

   

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         }); 
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
             }); 
        });

}

/* harmony default export */ __webpack_exports__["default"] = (carts);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form (formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Данные уcпешно отправлены',
        failure: 'что-то пошло не так...'
    };

    forms.forEach( form => {
        bindPostData (form);
    });

   

    function bindPostData (form) {
        form.addEventListener ('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.style.display = 'none';
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModel"])('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.style.display = 'block';
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModel"])('.modal');
        }, 4000);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModel, openModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModel", function() { return closeModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModel", function() { return openModel; });
function openModel(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModel(modalSelector) {
    const  modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal (triggerSelector, modalSelector, modalTimerId){
    const btns = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    btns.forEach (btn => {
        btn.addEventListener('click', () => {
            openModel(modalSelector);
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModel(modalSelector);
        }
    });

    document.addEventListener ('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == "block") {
            closeModel(modalSelector, modalTimerId);
        }
    });

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
     
    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const slides = document.querySelectorAll(slide),
    btnNext = document.querySelector(nextArrow),
    btnPrev = document.querySelector(prevArrow),
    curSlide = document.querySelector(currentCounter),
    totalSlider = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width, //получение ширины 
    slider = document.querySelector(container);

let slideIndex = 1;


//Carousel 

if(slides.length < 10 ) {
  totalSlider.textContent = `0${slides.length}`;
  curSlide.textContent = `0${slideIndex}`;
} else {            
  totalSlider.textContent =`${slides.length}`;
  curSlide.textContent = slideIndex;
}



slidesField.style.width = 100 * slides.length + '%';  //ширина всего блока(слайдера) равная длине всех слайдов

slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; //скрывает все элементы, кот. не попадают в область видимости

let offset = 0;



slides.forEach (item => {
  item.style.width = width;
});

slider.style.position = 'relative';

const dots = document.createElement('ol'),
    dotsArr = [];
dots.classList.add('carousel-indicators');
dots.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;

slider.append(dots);

for (let i=0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i+1);
  dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
  `;

  if(i == 0) {
      dot.style.opacity = 1;
  }

  dots.append(dot);
  dotsArr.push(dot);
}

btnNext.addEventListener ('click', () => {
  if(offset == parseInt(width) * (slides.length - 1)) {
      offset = 0;
  } else {
      offset +=parseInt(width);
  }

  slidesField.style.transform =`translateX(-${offset}px)`;

  if (slideIndex == slides.length) {
      slideIndex = 1;
  } else {
      slideIndex +=1;
  }
  
  if(slides.length < 10) {
      curSlide.textContent = `0${slideIndex}`;
  } else {
      curSlide.textContent = slideIndex;
  }

  dotsArr.forEach (dot => dot.style.opacity ='.5');
  dotsArr[slideIndex-1].style.opacity = '1';
})

btnPrev.addEventListener ('click', () => {
  if(offset == 0 ) {
      offset =  parseInt(width) * (slides.length - 1);
  } else {
      offset -=parseInt(width);
  }

  slidesField.style.transform =`translateX(-${offset}px)`;

  if (slideIndex == 1) {
      slideIndex = slides.length;
  } else {
      slideIndex -=1;
  }

  if(slides.length < 10) {
      curSlide.textContent = `0${slideIndex}`;
  } else {
      curSlide.textContent = slideIndex;
  }

  dotsArr.forEach (dot => dot.style.opacity ='.5');
  dotsArr[slideIndex-1].style.opacity = '1';

})

dotsArr.forEach (dot => {
  dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = parseInt(width) * (slideTo-1);
      
      slidesField.style.transform =`translateX(-${offset}px)`;

      if(slides.length < 10) {
          curSlide.textContent = `0${slideIndex}`;
      } else {
          curSlide.textContent = slideIndex;
      }

      dotsArr.forEach (dot => dot.style.opacity ='.5');
      dotsArr[slideIndex-1].style.opacity = '1';

  });
});
}

/* harmony default export */ __webpack_exports__["default"] = (slider);


// SIMPLE SLIDER


// showSlides(slideIndex);

// if(slides.length < 10 ) {
//     totalSlider.textContent = `0${slides.length}`;
// } else {
//     totalSlider.textContent =`${slides.length}`;
// }

// function showSlides(n) {
//     if (n < 1 ){
//         slideIndex = slides.length;
//     }

//     if (n > slides.length) {
//         slideIndex = 1;
//     }

//     slides.forEach (item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';

//     if(slides.length < 10 ) {
//         curSlide.textContent = `0${slideIndex}`;
//     } else {
//         totalSlider.textContent =`${slideIndex}`;
//     }
// }

// function plusSlides (n) {
//     showSlides(slideIndex += n);
// }

// btnNext.addEventListener ('click', () => {
//     plusSlides(1);
// })

// btnPrev.addEventListener('click', () => {
//     plusSlides(-1);
// })





/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector) {
        const tabs = document.querySelectorAll(tabsSelector),
        tabСontent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent () {
        tabСontent.forEach (item => {
            item.style.display = 'none';
        });

        tabs.forEach (item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i=0) {
        tabСontent[i].style.display = "block";
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer (id, deadline){

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t/(1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    } 


    function getZero (n) {
        if (n >= 0 && n <10) {
            return `0${n}`;
        } else {
            return n;
        }
    }


    function setClock (selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');

        const timeID = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero (t.days);
            hours.innerHTML = getZero (t.hours);
            minutes.innerHTML = getZero (t.minutes);
            seconds.innerHTML = getZero (t.seconds);

            if (t.total <= 0) {
                clearInterval(timeID);
            } 
        }
    }

    setClock(id, deadline);

}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








 
 window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout (() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["openModel"])('.modal', modalTimerId), 2000);
   
     Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", '.tabcontent', '.tabheader__items');
     Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId );
     Object(_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
     Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
     Object(_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])('.form', modalTimerId);
     Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2020-12-08');   
     Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider_inner'
    });

});




 

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async (url, data) => {
    const res = await  fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await  fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};






/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map