document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const sidebar = document.querySelector('.sidebar');
        if (window.scrollY > 120) {
            sidebar.classList.add('not-top');
        } else {
            sidebar.classList.remove('not-top');
        }
    });

    const singleSlider = new Swiper('.single-page__imgs', {
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
            prevEl: '.single-page__imgs .swiper-slide-prev',
            nextEl: '.single-page__imgs .swiper-slide-next',
        }
    })

    const clientsSlider = new Swiper('.clients__swiper', {
        slidesPerView: 9,
        spaceBetween: 10,
        loop: true,
        initialSlide: 1,
        autoplay: {
            delay: 2500,
        },

        breakpoints: {
            0: {
                slidesPerView: 3,
            },
            380: {
                slidesPerView: 4,
            },
            420: {
                slidesPerView: 5,
            },
            560: {
                slidesPerView: 6,
            },
            768: {
                slidesPerView: 7,
            },
            920: {
                slidesPerView: 8,
            }

        }
    })

    const expertsSlider = new Swiper('.experts__swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1.5,
            },
            520: {
                slidesPerView: 1.8,
            },
            620: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 3
            }
        }
    })

    let servicesSliders = [];

    const servicesCards = document.querySelectorAll('.services__cards');
    if (servicesCards.length != 0) {
        function enableServicesSliders() {
            document.querySelectorAll('.services__cards').forEach(cards => {
                if (!cards.classList.contains('swiper-initialized') && !cards.classList.contains('swiper')) {
                    cards.classList.add('swiper', 'services__swiper');
                    const slides = cards.querySelectorAll('.services__card');
                    slides.forEach(card => card.classList.add('swiper-slide'));
                    // Оборачиваем в swiper-wrapper, если еще не обернуто
                    if (!cards.querySelector('.swiper-wrapper')) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'swiper-wrapper';
                        while (cards.firstChild) {
                            wrapper.appendChild(cards.firstChild);
                        }
                        cards.appendChild(wrapper);
                    }
                    const slider = new Swiper(cards, {
                        slidesPerView: 2.5,
                        spaceBetween: 15,
                        loop: false,
                        breakpoints: {
                            0: {
                                slidesPerView: 1.2,

                            },
                            560: {
                                slidesPerView: 1.5,

                            },
                            768: {
                                slidesPerView: 2.5,

                            },
                        }
                    });
                    servicesSliders.push({ slider, cards });
                }
            });
        }

        function disableServicesSliders() {
            servicesSliders.forEach(({ slider, cards }) => {
                slider.destroy(true, true);
                cards.classList.remove('swiper', 'services__swiper');
                const wrapper = cards.querySelector('.swiper-wrapper');
                if (wrapper) {
                    while (wrapper.firstChild) {
                        cards.appendChild(wrapper.firstChild);
                    }
                    wrapper.remove();
                }
                cards.querySelectorAll('.services__card').forEach(card => card.classList.remove('swiper-slide'));
            });
            servicesSliders = [];
        }

        function handleServicesSliders() {
            if (window.innerWidth <= 920) {
                enableServicesSliders();
            } else {
                disableServicesSliders();
            }
        }

        window.addEventListener('resize', handleServicesSliders);
        handleServicesSliders();
    }


    // переключение меню

    const mobileMenubtn = document.querySelector('.header__mobile-btn .burger-btn');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    if (mobileMenubtn) {
        mobileMenubtn.addEventListener('click', (e) => {
            let target = e.target;
            if (target.classList.contains('active')) {
                CloseMenu();
            } else {
                OpenMenu();
            }
        });

        function OpenMenu() {
            mobileMenubtn.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeAllPopup();
        }
        function CloseMenu() {
            mobileMenubtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };


    const buttons = document.querySelectorAll('.main-btn[data-popup]');
    const popupOverlay = document.querySelector('.popup');
    const popupItems = document.querySelectorAll('.popup-item');

    function closeAllPopup() {
        popupOverlay.classList.remove('active');
        popupItems.forEach(item => item.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const popupId = button.getAttribute('data-popup');
            const targetPopup = document.querySelector(`.popup-item[data-item="${popupId}"]`);

            if (targetPopup) {
                closeAllPopup();
                popupOverlay.classList.add('active');
                targetPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closeAllPopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPopup();
        }
    });

})