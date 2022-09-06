console.log('yo yo');

//Homepage Accordion

const elements = ['.is--creators', '.is--shopers', '.is--nfts', '.is--gamers'];
const openedSelectors = ['shopers-opened', 'nfts-opened', 'gamers-opened', 'creators-opened'];

function replaceOpenedClass(classToOpen) {
  for (const openClassName of openedSelectors) {
    $('.vertical-text').removeClass(openClassName);
  }
  $('.vertical-text').addClass(classToOpen);
  for (const element of elements) {
    const selectedElement = $(element);
    for (const openClassName of openedSelectors) {
      selectedElement.removeClass(openClassName);
    }
    selectedElement.addClass(classToOpen);
  }
}

//Creators
$('.is--creators').on('click', function () {
  replaceOpenedClass('creators-opened');
});

// Shoppers
$('.is--shopers').on('click', function () {
  replaceOpenedClass('shopers-opened');
});

//gamers
$('.is--gamers').on('click', function () {
  replaceOpenedClass('gamers-opened');
});

//NFTs
$('.is--nfts').on('click', function () {
  replaceOpenedClass('nfts-opened');
});

// Bubbles Testimonials Splide
let object = {
  value: 1,
};

let tl = gsap.timeline({ repeat: -1 });
tl.fromTo(
  '.bubbles_marquee_track',
  {
    xPercent: 0,
  },
  {
    xPercent: -50,
    duration: 100,
    ease: 'none',
  }
);

$('.bubbles_marquee_track').on('mouseenter', function () {
  gsap.fromTo(
    object,
    {
      value: 1,
    },
    {
      value: 0,
      duration: 0.5,
      onUpdate: () => {
        tl.timeScale(object.value);
      },
    }
  );
});

$('.bubbles_marquee_track').on('mouseleave', function () {
  gsap.fromTo(
    object,
    {
      value: 0,
    },
    {
      value: 1,
      duration: 0.2,
      onUpdate: () => {
        tl.timeScale(object.value);
      },
    }
  );
});

//Hover in to dim the other bubbles
$('.bubble-collection-item').on('mouseenter', function () {
  $(this).siblings('.bubble-collection-item').css('opacity', '50%');
});

//Hover out to dim the other bubbles
$('.bubble-collection-item').on('mouseleave', function () {
  $(this).siblings('.bubble-collection-item').css('opacity', '100%');
});

// Who is it for section random faces
let faces = document.querySelectorAll('.face-image_img');

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

for (const face of faces) {
  TweenMax.from(face, randomNumber(1, 1), {
    opacity: 0,
    yoyo: true,
    delay: randomNumber(1, 80),
    repeatDelay: randomNumber(5, 70),
    repeat: -1,
    ease: Linear.easeNone,
  });
}
