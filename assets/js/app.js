document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const sidebar = document.querySelector('.sidebar');
        if (window.scrollY > 120) {
            sidebar.classList.add('not-top');
        } else {
            sidebar.classList.remove('not-top');
        }
    });

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



    // let portfolioSliders = [];

    // function initializeSlider(cards) {
    //     if (cards.classList.contains('swiper-initialized') || cards.classList.contains('swiper')) {
    //         return null;
    //     }

    //     cards.classList.add('swiper', 'portfolio__swiper');
    //     const slides = cards.querySelectorAll('.portfolio__card');
    //     slides.forEach(card => card.classList.add('swiper-slide'));

    //     if (!cards.querySelector('.swiper-wrapper')) {
    //         const wrapper = document.createElement('div');
    //         wrapper.className = 'swiper-wrapper';
    //         while (cards.firstChild) {
    //             wrapper.appendChild(cards.firstChild);
    //         }
    //         cards.appendChild(wrapper);
    //     }

    //     const slider = new Swiper(cards, {
    //         slidesPerView: 1.1,
    //         spaceBetween: 16,
    //         loop: false,
    //         init: true,
    //         observer: true,
    //         observeParents: true,
    //         observeSlideChildren: true
    //     });

    //     // Force Swiper to update and render immediately
    //     slider.update();
    //     return slider;
    // }

    // function enablePortfolioSliders() {
    //     if (portfolioSliders.length > 0) return;

    //     document.querySelectorAll('.portfolio__tab-item').forEach(cards => {
    //         const slider = initializeSlider(cards);
    //         if (slider) {
    //             portfolioSliders.push({ slider, cards });
    //             // Ensure slider is fully rendered
    //             setTimeout(() => {
    //                 slider.update();
    //                 slider.updateSize();
    //                 slider.updateSlides();
    //             }, 100);
    //         }
    //     });
    // }

    // function disablePortfolioSliders() {
    //     portfolioSliders.forEach(({ slider, cards }) => {
    //         slider.destroy(true, true);
    //         cards.classList.remove('swiper', 'portfolio__swiper');
    //         const wrapper = cards.querySelector('.swiper-wrapper');
    //         if (wrapper) {
    //             while (wrapper.firstChild) {
    //                 cards.appendChild(wrapper.firstChild);
    //             }
    //             wrapper.remove();
    //         }
    //         cards.querySelectorAll('.portfolio__card').forEach(card => card.classList.remove('swiper-slide'));
    //     });
    //     portfolioSliders = [];
    // }

    // function handlePortfolioSliders() {
    //     if (window.innerWidth <= 920) {
    //         enablePortfolioSliders();
    //     } else {
    //         disablePortfolioSliders();
    //     }
    // }

    // // Initialize on page load
    // handlePortfolioSliders();

})