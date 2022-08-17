// Splide Components

// Header sliding Posts
new Splide('.header_slider', {
  autoScroll: {
    speed: 2,
    pauseOnHover: false,
  },
  direction: 'ltr',
  perPage: 6.5,
  perMove: 1,
  focus: 'center', // 0 = left and 'center' = center
  type: 'loop', // 'loop' or 'slide'
  gap: '2.5em', // space between slides
  arrows: false, // 'slider' or false
  pagination: false, // 'slider' or false
  speed: 600, // transition speed in miliseconds
  drag: false,
  dragAngleThreshold: 30, // default is 30
  autoWidth: false, // for cards with differing widths
  rewind: false, // go back to beginning when reach end
  rewindSpeed: 400,
  waitForTransition: false,
  updateOnMove: true,
  trimSpace: false, // true removes empty space from end of list
  breakpoints: {
    1600: {
      perPage: 4.5,
      autoScroll: {
        speed: 1.5,
        pauseOnHover: false,
      },
    },
    991: {
      perPage: 3.5,
      autoScroll: {
        speed: 1.5,
        pauseOnHover: false,
      },
    },
    767: {
      perPage: 2.5,
      autoScroll: {
        speed: 1,
        pauseOnHover: false,
      },
    },
    479: {
      perPage: 1.5,
      autoScroll: {
        speed: 1,
        pauseOnHover: false,
      },
    },
  },
}).mount(window.splide.Extensions);

// Bottom Testimonial Sliding
new Splide('.bottom-cta-slider_component', {
  autoScroll: {
    speed: 1,
    pauseOnHover: true,
  },
  autoWidth: true,
  focus: 'center',
  type: 'loop',
  gap: '2rem',
  arrows: false,
  pagination: false,
  speed: 600,
  drag: false,
  dragAngleThreshold: 30,
  rewind: false,
  rewindSpeed: 400,
  waitForTransition: false,
  updateOnMove: true,
  trimSpace: false,
  breakpoints: {
    479: {
      gap: '1rem',
    },
  },
}).mount(window.splide.Extensions);

// Hacked Posts GSAP

let posts = $('.glitch_single-post');
let delayDiff = 2;

posts.each(function (index) {
  let post = posts[index];
  let tl = gsap.timeline({
    repeat: -1,
    delay: index * delayDiff,
  });

  tl.to(post, {
    opacity: 0,
    duration: delayDiff / 2,
  });

  tl.to(post, {
    scale: 1,
    zIndex: 7,
    top: 40,
    duration: 0,
  });

  tl.to(post, {
    opacity: 1,
    top: 0,
    duration: delayDiff / 2,
  });

  tl.to(post, {
    scale: 0.95,
    top: -8,
    zIndex: 6,
    // delay: 1,
    duration: delayDiff,
  });

  tl.to(post, {
    scale: 0.9,
    top: -16,
    zIndex: 5,
    // delay: 1,
    duration: delayDiff,
  });

  tl.to(post, {
    scale: 0.85,
    top: -24,
    zIndex: 4,
    // delay: 1,
    duration: delayDiff,
  });

  tl.to(post, {
    scale: 0.8,
    top: -32,
    zIndex: 3,
    // delay: 1,
    duration: delayDiff,
  });

  tl.play(index * delayDiff);
});

console.log('i have changed')