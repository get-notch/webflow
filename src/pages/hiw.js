//Hero Phone Rotation GSAP
$('.phone-wrapper').eq(0).addClass('active');

function switchItem() {
  let prevItem = $('.phone-wrapper.active');
  prevItem.removeClass('active');
  let nextItem = prevItem.next();
  if (prevItem.next().length === 0) {
    nextItem = $('.phone-wrapper').eq(0);
  }
  nextItem.addClass('active');
  //create animation
  let tl = gsap.timeline();
  tl.fromTo(
    '.phone-animation-wrapper',
    {
      rotationY: 0,
    },
    {
      rotationY: 90,
      ease: 'power2.in',
      duration: 0.3,
    }
  )
    .set(prevItem, { opacity: 0 })
    .set(nextItem, { opacity: 1 })
    .fromTo(
      '.phone-animation-wrapper',
      {
        rotationY: -90,
      },
      {
        rotationY: 0,
        ease: 'power2.out',
        duration: 0.6,
      }
    )
    .fromTo(
      nextItem.find('.alert-wrapper'),
      {
        scale: 0.4,
        opacity: 0,
        x: '32px',
      },
      {
        scale: 1,
        opacity: 1,
        x: '0px',
        stagger: 0.2,
        ease: 'power2',
        duration: 0.4,
      },
      '<'
    );
}

setInterval(function () {
  switchItem();
}, 3000);

new Splide('.bottom-cta-slider_component', {
  autoScroll: {
    speed: 1,
    pauseOnHover: true,
  },
  autoWidth: true,
  focus: 'center',
  type: 'loop',
  gap: '2.5em',
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
}).mount(window.splide.Extensions);
