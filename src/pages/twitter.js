console.log('JS Connected');

const typedTitle = new Typed('.twitter-header_title', {
  strings: ['Protect your Twitter account.'],
  typeSpeed: 50,
  startDelay: 1500,
  showCursor: false,
  attr: null,
  onComplete: () => {
    $('.twitter-header_title').addClass('no-cursor');
  },
});

const typedParagraph = new Typed('.twitter-header_paragraph', {
  strings: [
    'Now you can insure your Twitter account against hacks with Notch, the first insurance product for Twitter creators.',
  ],
  typeSpeed: 25,
  startDelay: 4000,
  showCursor: false,
  attr: null,
  onBegin: () => {
    console.log('onBegin ' + self);
  },
});
