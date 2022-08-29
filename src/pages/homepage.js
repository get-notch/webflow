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

// new Splide('.bubbles_wrapper', {
//   autoScroll: {
//     speed: 2,
//     pauseOnHover: false,
//   },
//   // direction: 'ltr',
//   width: '100vw',
//   perPage: 2,
//   perMove: 1,
//   focus: 'center', // 0 = left and 'center' = center
//   type: 'loop', // 'loop' or 'slide'
//   gap: '2.5em', // space between slides
//   arrows: false, // 'slider' or false
//   pagination: false, // 'slider' or false
//   speed: 600, // transition speed in miliseconds
//   drag: false,
//   dragAngleThreshold: 30, // default is 30
//   autoWidth: false, // for cards with differing widths
//   rewind: false, // go back to beginning when reach end
//   rewindSpeed: 400,
//   waitForTransition: false,
//   updateOnMove: true,
//   trimSpace: false, // true removes empty space from end of list
//   // breakpoints: {
//   //   640: {
//   //     // height: '6rem',
//   //   },
//   // },
// }).mount(window.splide.Extensions);
//
// $('.right_arrow').on('click', function () {
//   $('.splide__arrow--next').click();
// });
// $('.left_arrow').on('click', function () {
//   $('.splide__arrow--prev').click();
// });
