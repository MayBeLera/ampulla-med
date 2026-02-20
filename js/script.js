// Бургер меню
document.addEventListener('click', burgerInit)

function burgerInit(e) {

  const burgerIcon = e.target.closest('.burger-icon')
  const burgerNavLink = e.target.closest('.nav__link')

  if (!burgerIcon && !burgerNavLink) return
  if (document.documentElement.clientWidth > 900) return

  if (!document.body.classList.contains('body--opened-menu')) {
    document.body.classList.add('body--opened-menu')
  } else {
    document.body.classList.remove('body--opened-menu')
  }

} 
 
 
 // Маска для телефона
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Inputmask === 'function') {
    Inputmask("+7 (999) 999-99-99").mask('input[type="tel"]');
  }
});


let thumbsSwiper = new Swiper(".about__slider-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  loop: false,
});


const swiper = new Swiper('.about__swiper', {
  spaceBetween: 10,
  loop: true,
  slidesPerView: 1,
  autoHeight: true,
  centeredSlides: true,
  pagination: {
    el: '.about-pagination',
  },

  navigation: {
    nextEl: '.about-next',
    prevEl: '.about-prev',
  },

  thumbs: {
    swiper: thumbsSwiper,
  },
});



let feedbackSwiper = new Swiper('.feedback__slider', {
    spaceBetween: 45,
    slidesPerView: 1, 
    slidesOffsetBefore: 1,
    initialSlide: 0,
    loop: true,
  navigation: {
    nextEl: '.feedback-next',
    prevEl: '.feedback-prev',
  },
  pagination: {
    el: '.feedback-pagination'
  },
  breakpoints: {
            901: {
              centeredSlides: false,
              slidesPerView: 2,  
            }
          }

});



const accordionLists = document.querySelectorAll('.accordion-list');

accordionLists.forEach(el => {

  el.addEventListener('click', (e) => {

    const accordionList = e.currentTarget
    const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
    const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

    const accordionControl = e.target.closest('.accordion-list__control');
    if (!accordionControl) return
    e.preventDefault()
    const accordionItem = accordionControl.parentElement;
    const accordionContent = accordionControl.nextElementSibling;

    if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
      accordionOpenedItem.classList.remove('accordion-list__item--opened');
      accordionOpenedContent.style.maxHeight = null;
    }
    accordionItem.classList.toggle('accordion-list__item--opened');

    if (accordionItem.classList.contains('accordion-list__item--opened')) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    } else {
      accordionContent.style.maxHeight = null;
    }

    });

});


let awardsSwiper = new Swiper('.awards__swiper', {
    spaceBetween: 30,
    slidesPerView: 1, 
    slidesOffsetBefore: 1,
    initialSlide: 0,
    loop: true,
  pagination: {
    el: '.awards__paginetion'
  },
  breakpoints: {
    601:{
      centeredSlides: false,
      slidesPerView: 2, 
    },
    901:{
      centeredSlides: true,
      slidesPerView: 3, 
    },
            1151: {
              centeredSlides: false,
              slidesPerView: 4,  
            }
          }

});

    const tabControls = document.querySelector('.tabs-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e){

        const tabControl = e.target.closest('.tabs-control-link')

        if(!tabControl) return
        e.preventDefault()
        if(tabControl.classList.contains('tab-controls__link--active')) return

        const tabContentID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const activeContent = document.querySelector('.tab-content--show')
        
        if(activeControl){
            activeControl.classList.remove('tab-controls__link--active')
        }
        if(activeContent){
            activeContent.classList.remove('tab-content--show')
        }
        
        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')
        
    }