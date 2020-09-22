import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import form from'./modules/form';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModel} from './modules/modal';
 
 window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout (() => openModel('.modal', modalTimerId), 2000);
   
     tabs(".tabheader__item", '.tabcontent', '.tabheader__items');
     modal('[data-modal]', '.modal', modalTimerId );
     calc();
     cards();
     form('.form', modalTimerId);
     timer('.timer', '2020-12-08');   
     slider({
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




 