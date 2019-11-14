const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation__item');

function noScroll() {
    window.scrollTo(0, 0);
}
const handleClick = () => {
    if (hamburger.classList.contains('hamburger--active')) {
        window.removeEventListener('scroll', noScroll);
    } else {
        window.addEventListener('scroll', noScroll);
    }
    hamburger.classList.toggle('hamburger--active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('hamburger--active'));
    nav.classList.toggle('navigation--active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index/7+0.2}s`;
        }
    });
};
hamburger.addEventListener('click', handleClick);

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 767) {
            handleClick();
        }
    });
});


function sendEmal() {
    const formEmail = document.querySelector('.formEmail');
    if (!formEmail) {
        return;
    }
    formEmail.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const message = document.querySelector('#message');
        emailjs.init("user_AtMGx9oEKvGqfN20zSsz6");
        var templateParams = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        emailjs.send('smtp_server', 'template_CiAurJN7', templateParams)
            .then(function (response) {
                // console.log('SUCCESS!', response.status, response.text);
                name.value = '';
                email.value = '';
                message.value = '';
                alert("Wiadomość została wysłana ✉️");
            }, function (error) {
                console.log('FAILED...', error);
            });
    });


}

sendEmal();

let flag = 0;
const TopNav = document.querySelector('nav');
let topOfNav = TopNav.offsetTop;

function fixNav() {
    if (window.scrollY >= topOfNav) {
        // document.body.style.paddingTop = nav.offsetHeight + 'px';
        TopNav.classList.add('fixed-nav');
    } else {
        if (flag == 0) {
            TopNav.classList.remove('fixed-nav');
            // document.body.style.paddingTop = 0;
        }
    }
}

window.addEventListener('scroll', fixNav);
fixNav();



//photoSwipe 
let onThumbnailsClick = function (e) {
    let allPhotos = [];
    let index;
    for (let i = 0; i < galleryElements.length; i++) {
        if (e.target === galleryElements[i]) {
            index = i;
        }
        let item = {
            src: galleryElements[i].getAttribute('src'),
            w: galleryElements[i].naturalWidth,
            h: galleryElements[i].naturalHeight,
            msrc: galleryElements[i].getAttribute('src')
        };
        allPhotos.push(item);
    }
    openPhotoSwipe(index, allPhotos);
};

let openPhotoSwipe = function (index, allPhotos) {

    let pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;
    items = allPhotos;
    options = {
        index,
        shareEl: false,
        bgOpacity: 0.7,
        fullscreenEl: false,
        zoomEl: true,
        history: false,
    };
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

// loop through all gallery elements and bind events
const galleryElements = document.querySelectorAll(".galleryPhotos--photo");
for (let i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].addEventListener('click', onThumbnailsClick, true);
}