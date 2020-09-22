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

export default slider;


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



