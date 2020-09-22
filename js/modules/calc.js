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


export default calc;