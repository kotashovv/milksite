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
    })

    const expertsSlider = new Swiper('.experts__swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
    })
})