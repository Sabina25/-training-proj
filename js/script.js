 window.addEventListener('DOMContentLoaded', () => {
    //Tabi
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabСontent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

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

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2020-12-08';

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

    setClock('.timer', deadline);

    //Modal 

    const btns = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    

    function openModel() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }

    function closeModel() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    btns.forEach (btn => {
        btn.addEventListener('click', () => {
            openModel();
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModel();
        }
    });

    document.addEventListener ('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == "block") {
            closeModel();
        }
    });

    //const modalTimerId = setTimeout (openModel, 2000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
     
    window.addEventListener('scroll', showModalByScroll);

    //использование классов для карточек 

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
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

    const getResource = async (url) => {
        const res = await  fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

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


    //FORMS

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Данные уcпешно отправлены',
        failure: 'что-то пошло не так...'
    };

    forms.forEach( form => {
        bindPostData (form);
    });

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


            postData('http://localhost:3000/requests', json)
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
        openModel();

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
            closeModel();
        }, 4000);
    }

    //SLIDE

    const slides = document.querySelectorAll('.offer__slide'),
          btnNext = document.querySelector('.offer__slider-next'),
          btnPrev = document.querySelector('.offer__slider-prev'),
          curSlide = document.querySelector('#current'),
          totalSlider = document.querySelector('#total');

    let slideIndex = 1;

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



    //Carousel 

    if(slides.length < 10 ) {
        totalSlider.textContent = `0${slides.length}`;
        curSlide.textContent = `0${slideIndex}`;
    } else {            
        totalSlider.textContent =`${slides.length}`;
        curSlide.textContent = slideIndex;
    }

    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider_inner'),
          width = window.getComputedStyle(slidesWrapper).width; //получение ширины 

    slidesField.style.width = 100 * slides.length + '%';  //ширина всего блока(слайдера) равная длине всех слайдов
    
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; //скрывает все элементы, кот. не попадают в область видимости

    let offset = 0;

    const slider = document.querySelector('.offer__slider');

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

        })
    })

    //calc

    const result = document.querySelector(".calculating__result");
    let sex="female", height, weight, age, radio="1.375 ";

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

    function getStaticInform (parentSelector, activeClass) {
        const element = document.querySelectorAll(`${parentSelector} div`);

        element.forEach( el => {
            el.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-radio')){
                    radio = e.target.getAttribute('data-radio');
                } else {
                    sex = e.target.getAttribute('id');
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

    getStaticInform('#gender', 'calculating__choose-item_active');
    getStaticInform('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInform(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
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

});



