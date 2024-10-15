document.addEventListener("DOMContentLoaded", function () {
	const bodyEl = document.body;
	const pageHeader = document.querySelector('.header');
	const menuToggle = document.querySelector('#menu-toggle');
	const headerMenu = document.querySelector('#menu');
	// setTimeout(function(){
	// 	bodyEl.style.opacity = 1;	
	// }, 300);
	$('.lazy').lazy();
	
	menuToggle.addEventListener('click', ()=> {
		
		if (menuToggle.classList.contains('active')) {
			 menuToggle.classList.remove('active');
			 headerMenu.classList.remove('active');
			 if(window.innerWidth < 1024){
				bodyEl.classList.remove('lock');
			 }
		
		} else {
			menuToggle.classList.add('active');
			headerMenu.classList.add('active');
			if(window.innerWidth < 1024){
				bodyEl.classList.add('lock');
			 }
		}
	});
	window.addEventListener('scroll', ()=>{
		if(window.scrollY > 40){
			pageHeader.classList.add('header-fixed');
		}
		else{
			pageHeader.classList.remove('header-fixed');
		}
	});
	
	let sliders = [];

	function initSwipers() {
		const screenWidth = window.innerWidth;
		const sliderElements = document.querySelectorAll('.swiper');

		sliderElements.forEach((sliderElement, index) => {
			if (screenWidth >= 599 && !sliders[index]) {
				// Инициализация Swiper для каждого слайдера
				sliders[index] = new Swiper(sliderElement, {
					slidesPerView: 'auto',
					spaceBetween: 15,
					speed: 1500,
					loop: true,
					autoplay: {
						delay: 1000,
						disableOnInteraction: false,
					},
					breakpoints: {
						1024: {
							spaceBetween: 25,
						},
						1199: {
							spaceBetween: 40,
						}
					}
				});
			} else if (screenWidth < 600 && sliders[index]) {
				// Уничтожаем Swiper для слайдера на экранах меньше 600px
				sliders[index].destroy(true, true);
				sliders[index] = undefined; // Сбрасываем объект слайдера

				// Убираем стили Swiper, чтобы слайды выстроились в колонку
				const slides = sliderElement.querySelectorAll('.swiper-slide');
				slides.forEach(slide => {
					slide.style.width = '100%';
				});
			}
		});
	}

	// Вызываем функцию при загрузке страницы и при изменении размера окна
	window.addEventListener('load', initSwipers);
	window.addEventListener('resize', initSwipers);
	
	/*DROPDOWN */
	document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
		const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
		const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
		const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
		const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

		// Клик по кнопке. Открыть/Закрыть select
		dropDownBtn.addEventListener('click', function (e) {
			if(!this.classList.contains('dropdown__button--active')){
				this.classList.add('dropdown__button--active');
				dropDownList.classList.add('dropdown__list--visible');
				dropDownList.style.height = dropDownList.scrollHeight + 'px';
				
			}else{
				this.classList.remove('dropdown__button--active');
				dropDownList.style.height ='0';
				dropDownList.classList.remove('dropdown__list--visible');
			}
			
			
		});
			

		// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
		dropDownListItems.forEach(function (listItem) {
			listItem.addEventListener('click', function (e) {
				e.stopPropagation();
				dropDownBtn.innerText = this.innerText;
				dropDownBtn.focus();
				dropDownInput.value = this.dataset.value;
				dropDownList.classList.remove('dropdown__list--visible');
				dropDownBtn.classList.remove('dropdown__button--active');
				
			});
		});

		// Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			if (e.target !== dropDownBtn) {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		});

		// Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		});
	});
});