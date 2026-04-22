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














(function() {
        // DOM элементы
        const heightSlider = document.getElementById('heightSlider');
        const weightSlider = document.getElementById('weightSlider');
        const heightValueSpan = document.getElementById('heightValueDisplay');
        const weightValueSpan = document.getElementById('weightValueDisplay');
        const statusTitleSpan = document.getElementById('statusTitle');
        const statusDescSpan = document.getElementById('statusDesc');
        const statusBlockDiv = document.getElementById('statusBlock');
        const categories = document.querySelectorAll('.category-item');
        const gaugeBmiSpan = document.getElementById('gaugeBmiNumber');
        
        const canvas = document.getElementById('bmiGauge');
        const ctx = canvas.getContext('2d');
        
        let currentBmi = 24.2;   // стартовое значение

        // Настройки спидометра (НЕ МЕНЯЕМ — оставляем как было)
        const MIN_BMI = 10;
        const MAX_BMI = 45;
        const ANGLE_START = -180 * Math.PI / 180;  // -210° (левая нижняя дуга)
        const ANGLE_END = 0 * Math.PI / 180;      // 30° (правая нижняя дуга)
        const TOTAL_ANGLE = ANGLE_END - ANGLE_START; // 240°
        
        // Функция преобразования BMI в угол
        function bmiToAngle(bmi) {
            let t = (bmi - MIN_BMI) / (MAX_BMI - MIN_BMI);
            t = Math.min(1, Math.max(0, t));
            const angle = ANGLE_START + t * TOTAL_ANGLE;
            return angle;
        }
        
        // Получить цвет градиента в зависимости от BMI (зеленый -> желтый -> красный)
        function getBmiGradientColor(bmi) {
            let ratio = (bmi - MIN_BMI) / (MAX_BMI - MIN_BMI);
            ratio = Math.min(0.95, Math.max(0.05, ratio));
            let r, g, b;
            if (ratio <= 0.4) { 
                const t2 = ratio / 0.4;
                r = Math.floor(50 + 205 * t2);
                g = Math.floor(200 - 50 * t2);
                b = Math.floor(70 - 40 * t2);
            } else if (ratio <= 0.7) {
                const t2 = (ratio - 0.4) / 0.3;
                r = Math.floor(180 + 75 * t2);
                g = Math.floor(140 - 60 * t2);
                b = Math.floor(40 - 30 * t2);
            } else {
                const t2 = (ratio - 0.7) / 0.3;
                r = Math.floor(230 + 25 * t2);
                g = Math.floor(60 - 50 * t2);
                b = Math.floor(20 - 15 * t2);
            }
            return `rgb(${Math.min(255,r)}, ${Math.min(255,g)}, ${Math.min(255,b)})`;
        }
        
        // ---------- НОВАЯ ОТРИСОВКА СПИДОМЕТРА (с градиентом и скруглёнными краями) ----------
        function drawGauge(bmiValue) {
            if (!ctx) return;
            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;
            const centerY = height / 2;
            const radiusOuter = width * 0.38;
            const radiusInner = width * 0.28;
            const midRadius = (radiusOuter + radiusInner) / 2;
            const lineWidth = radiusOuter - radiusInner; // толщина дуги
            
            ctx.clearRect(0, 0, width, height);
            
            // 1) Фоновая серая дуга (подложка)
            ctx.beginPath();
            ctx.arc(centerX, centerY, midRadius, ANGLE_START, ANGLE_END);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = "#e9edf2";
            ctx.lineCap = 'round';   // скругление для подложки
            ctx.stroke();
            
            // 2) Градиентная дуга — рисуем одной линией с линейным градиентом между концами дуги
            //    Вычисляем координаты начала и конца дуги для линейного градиента
            const startX = centerX + midRadius * Math.cos(ANGLE_START);
            const startY = centerY + midRadius * Math.sin(ANGLE_START);
            const endX = centerX + midRadius * Math.cos(ANGLE_END);
            const endY = centerY + midRadius * Math.sin(ANGLE_END);
            
            const grad = ctx.createLinearGradient(startX, startY, endX, endY);
grad.addColorStop(0, "#6aabdd");
grad.addColorStop(0.2, "#4989c1");
grad.addColorStop(0.35, "#33b2b1");
grad.addColorStop(0.5, "#51b9b7");
grad.addColorStop(0.65, "#8fdccc");
grad.addColorStop(0.8, "#ffb366");
grad.addColorStop(0.9, "#ff9966");
grad.addColorStop(1, "#ff6b6b");




            ctx.beginPath();
            ctx.arc(centerX, centerY, midRadius, ANGLE_START, ANGLE_END);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = grad;
            ctx.lineCap = 'round';  
            ctx.stroke();
            
            // 3) Внутренний белый круг (чтобы скрыть лишнее)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radiusInner - 2, 0, Math.PI * 2);
            ctx.fillStyle = "#f0fafc";
            ctx.fill();

const anglePointer = bmiToAngle(bmiValue);
const arrowBaseRadius = radiusOuter - 50;   
const arrowTipRadius = 10;                 
const arrowWidth = 16;                     

const tipX = centerX + Math.cos(anglePointer) * arrowTipRadius;
const tipY = centerY + Math.sin(anglePointer) * arrowTipRadius;
const baseX = centerX + Math.cos(anglePointer) * arrowBaseRadius;
const baseY = centerY + Math.sin(anglePointer) * arrowBaseRadius;
const perpX = -Math.sin(anglePointer) * (arrowWidth / 2);
const perpY = Math.cos(anglePointer) * (arrowWidth / 2);

ctx.beginPath();
ctx.moveTo(tipX, tipY);
ctx.lineTo(baseX + perpX, baseY + perpY);
ctx.lineTo(baseX - perpX, baseY - perpY);
ctx.closePath();
ctx.fillStyle = "#008D96";
ctx.fill();


            // центральный кружок
            ctx.beginPath();
            ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
            ctx.fillStyle = "#008D96";
            ctx.fill();
        }
        
        // ----- ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ (расчёт ИМТ, категории, обновление) без изменений -----
        function calculateBMI(heightCm, weightKg) {
            if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return null;
            const heightMeters = heightCm / 100;
            const bmi = weightKg / (heightMeters * heightMeters);
            return Math.round(bmi * 10) / 10;
        }
        
function getBMICategory(bmi) {
    if (bmi === null) return null;
    if (bmi < 18.5) {
        return {
            key: 'under',
            title: 'Недостаток веса',
            description: 'Недостаточная масса тела. Рекомендуем полноценное питание и консультацию с диетологом.',
            borderColor: '#f59e0b',
            bgColor: '#fffbeb',
            titleColor: '#b45309'
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            key: 'normal',
            title: 'Нормальный вес',
            description: 'Нормальный вес. У вас отличные показатели. Не забывайте делать ежегодные чекапы',
            borderColor: '#10b981',
            bgColor: '#ecfdf5',
            titleColor: '#065f46'
        };
    } else if (bmi >= 25 && bmi <= 29.9) {
        return {
            key: 'preobesity',
            title: 'Предожирение',
            description: 'Избыточная масса тела (предожирение). Рекомендуется увеличить физическую активность и сбалансировать рацион.',
            borderColor: '#f97316',
            bgColor: '#fff7ed',
            titleColor: '#9a3412'
        };
    } else if (bmi >= 30 && bmi <= 34.9) {
        return {
            key: 'obesity1',
            title: 'Ожирение I степени',
            description: 'Ожирение I степени. Рекомендуется консультация эндокринолога и диетолога, коррекция образа жизни.',
            borderColor: '#ef4444',
            bgColor: '#fef2f2',
            titleColor: '#b91c1c'
        };
    } else if (bmi >= 35 && bmi <= 39.9) {
        return {
            key: 'obesity2',
            title: 'Ожирение II степени',
            description: 'Ожирение II степени. Необходимо медицинское наблюдение, диетотерапия и физическая активность.',
            borderColor: '#dc2626',
            bgColor: '#fef2f2',
            titleColor: '#991b1b'
        };
    } else if (bmi >= 40 && bmi <= 49.9) {
        return {
            key: 'obesity3',
            title: 'Ожирение III степени',
            description: 'Ожирение III степени (морбидное). Вам показана бариатрическая операция! Обратитесь к хирургу.',
            borderColor: '#b91c1c',
            bgColor: '#fef2f2',
            titleColor: '#7f1d1d'
        };
    } else {
        return {
            key: 'superobesity',
            title: 'Сверхожирение',
            description: 'Сверхожирение (супер-морбидное). Требуется срочное медицинское вмешательство и рассмотрение бариатрической операции.',
            borderColor: '#991b1b',
            bgColor: '#fef2f2',
            titleColor: '#7f1d1d'
        };
    }
}
        
        function updateActiveCategory(activeKey) {
            categories.forEach(cat => {
                const catValue = cat.getAttribute('data-cat');
                if (catValue === activeKey) {
                    cat.classList.add('category-active');
                } else {
                    cat.classList.remove('category-active');
                }
            });
        }
        
        function updateAll() {
            let heightCm = parseFloat(heightSlider.value);
            let weightKg = parseFloat(weightSlider.value);
            
            heightValueSpan.textContent = Math.round(heightCm);
            weightValueSpan.textContent = weightKg.toFixed(1);
            
            if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
                gaugeBmiSpan.textContent = '—';
                statusTitleSpan.textContent = 'Некорректные данные';
                statusDescSpan.textContent = 'Пожалуйста, используйте ползунки для выбора роста и веса.';
                categories.forEach(cat => cat.classList.remove('category-active'));
                drawGauge(22);
                return;
            }
            
            const bmi = calculateBMI(heightCm, weightKg);
            if (bmi === null) {
                gaugeBmiSpan.textContent = '—';
                return;
            }
            currentBmi = bmi;
            const bmiFormatted = bmi.toFixed(1);
            gaugeBmiSpan.textContent = bmiFormatted;
            
            const categoryData = getBMICategory(bmi);
            if (categoryData) {
                statusTitleSpan.textContent = categoryData.title;
                statusDescSpan.textContent = categoryData.description;
                updateActiveCategory(categoryData.key);
                statusBlockDiv.style.borderLeftColor = categoryData.borderColor;
                statusBlockDiv.style.backgroundColor = categoryData.bgColor;
                statusTitleSpan.style.color = categoryData.titleColor;
            } else {
                updateActiveCategory(null);
            }
            
            drawGauge(bmi);
        }
        
        heightSlider.addEventListener('input', () => updateAll());
        weightSlider.addEventListener('input', () => updateAll());
        
        function resizeCanvas() {
            const container = canvas.parentElement;
            const size = Math.min(container.clientWidth, 280);
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
            canvas.width = 500;
            canvas.height = 500;
            updateAll();
        }
        
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
        
        heightSlider.value = 170;
        weightSlider.value = 70.0;
        heightValueSpan.textContent = "170";
        weightValueSpan.textContent = "70.0";
        
        resizeCanvas();
        updateAll();
    })();





let resultSwiper = new Swiper('.result-swiper', {
    slidesPerView: 1, 
    slidesOffsetBefore: 1,
    initialSlide: 0,
    loop: true,

    navigation: {
    nextEl: '.result-next',
    prevEl: '.result-prev',
  },

});











let aboutGallerySwiper = new Swiper('.about-gallery__swiper', {
    slidesPerView: 5, 
    slidesOffsetBefore: 1,
    spaceBetween: 10,
    // initialSlide: 0,
    loop: true,

    navigation: {
    nextEl: '.about-gallery__next',
    prevEl: '.about-gallery__prev',
  },

});
