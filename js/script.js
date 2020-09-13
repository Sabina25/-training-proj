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

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9, 
        '.menu .container',
        
    ).render();  

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15, 
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12, 
        '.menu .container',
        'menu__item'
    ).render();


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

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });


            postData('http://localhost:3000/requests', JSON.stringify(object))
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

});


