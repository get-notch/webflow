// console.log('Connected');

//Random tags order in the Who Is This For Section
$.fn.shuffleChildren = function () {
  $.each(this.get(), function (index, el) {
    var $el = $(el);
    var $find = $el.children();

    $find.sort(function () {
      return 0.5 - Math.random();
    });

    $el.empty();
    $find.appendTo($el);
  });
};

$('.for-who_bg-row').shuffleChildren();

//Hero Phone Rotation GSAP
$('.lp-phone-wrapper').eq(0).addClass('active');

function switchItem() {
  let prevItem = $('.lp-phone-wrapper.active');
  prevItem.removeClass('active');
  let nextItem = prevItem.next();
  if (prevItem.next().length === 0) {
    nextItem = $('.lp-phone-wrapper').eq(0);
  }
  nextItem.addClass('active');
  //create animation
  let tl = gsap.timeline();
  tl.fromTo(
    '.lp-phone-animation-wrapper',
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
      '.lp-phone-animation-wrapper',
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
      nextItem.find('.lp-alert-wrapper'),
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

//Splide slider at the bottom (LP-CTA)
new Splide('.lp-cta-slider_component', {
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

//Format Text with commas and 'K'
const formatter = (value, withCurrency = false) =>
  Intl.NumberFormat('en', {
    ...(withCurrency
      ? {
          style: 'currency',
          currency: 'USD',
        }
      : {}),
    ...(value > 10_000 ? { notation: 'compact' } : {}),
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);

function addClass(elements, className) {
  elements.forEach((element) => {
    element.classList.add(className);
  });
}

function removeClass(elements, className) {
  elements.forEach((element) => {
    element.classList.remove(className);
  });
}

const searchParams = new URLSearchParams(window.location.search); // get url params
const username = searchParams.get('username'); // get username from url

// if username exists in url
if (username) {
  // find all data elements
  const usernameElements = document.querySelectorAll('.username');
  const followersElements = document.querySelectorAll('.followers_number');
  // TODO: add other query selectors

  // add skeleton class name
  const skeletonClassName = 'skeleton';
  addClass(usernameElements, skeletonClassName);
  addClass(followersElements, skeletonClassName);
  // TODO: add other add class

  // fetch data
  fetch(`https://dev-api.get-notch.dev/instagram/profile/landing-page/${username}`)
    .then((response) => response.json())
    .then(
      ({
        userName,
        following,
        followers,
        postsCount,
        biography,
        profilePictureUrl,
        posts,
        fullName,
      }) => {
        if (userName) {
          usernameElements.forEach((element) => {
            element.innerText = `@${userName}`;
          });
        }

        const status = followers == null ? 'not_found' : 'ok';

        if (status === 'not_found') {
          document.getElementById('stats_personal').remove();
        } else {
          document.getElementById('stats_generic').remove();

          if (followers != null) {
            followersElements.forEach((element) => {
              element.innerText = formatter(followers);
            });
          }

          if (following != null) {
            document.querySelectorAll('.following_number').forEach((element) => {
              element.innerText = formatter(following);
            });
          }

          if (postsCount != null) {
            document.querySelectorAll('.posts_number').forEach((element) => {
              element.innerText = postsCount;
            });
          }

          if (biography != null) {
            document.querySelectorAll('.lp-bio-text').forEach((element) => {
              element.innerText = biography;
            });
          }

          if (profilePictureUrl != null) {
            document.querySelectorAll('.lp-profile-pic').forEach((element) => {
              element.src = profilePictureUrl;
            });
          }

          if (fullName != null) {
            document.querySelectorAll('.lp-full-name').forEach((element) => {
              element.innerText = fullName;
            });
          }

          if (posts.length > 0) {
            for (const [index, url] of posts.entries()) {
              if (url != null) {
                document.querySelectorAll(`.lp-image${index + 1}`).forEach((element) => {
                  element.src = url;
                });
              }
            }
          }
        }

        // remove skeleton class name when done fetching data
        removeClass(usernameElements, skeletonClassName);
        removeClass(followersElements, skeletonClassName);
        // TODO: add other remove class
      }
    );
}
