var elem = document.querySelector('.testimonial-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  freeScroll: true,
  wrapAround: true
});

var sectionEl = document.querySelectorAll('.block-animate-common');

var parallaxDeepEl = document.querySelectorAll('.parallax-bg-layer-deep');

var sectionElArray = [];

var parallaxDeepElArray = [];

sectionEl.forEach((el) => {
  var viewportOffset = el.getBoundingClientRect();
  var top = viewportOffset.y;
  var left = viewportOffset.x;
  var height = viewportOffset.height;

  sectionElArray.push({
    el,
    top,
    height,
    allowActivate: true
  })

})

parallaxDeepEl.forEach((el) => {
  var viewportOffset = el.getBoundingClientRect();
  var top = viewportOffset.y;
  var left = viewportOffset.x;
  var height = viewportOffset.height;

  parallaxDeepElArray.push({
    el,
    top,
    height
  })

})




window.onscroll = function(){
  const scrollTop = window.scrollY;
  
  
  sectionElArray.forEach((sectionEl) => {

    const childrenEl = Array.from(sectionEl.el.children[0].children[0].children);

    if(scrollTop >= sectionEl.top - 100 && sectionEl.allowActivate) {
      childrenEl.forEach((el) => {
        el.classList.add('active')
        sectionEl.allowActivate = false
      })
    }
    
    if (scrollTop >= sectionEl.height + sectionEl.top){
      childrenEl.forEach((el) => {
        el.classList.remove('active')  
      })
    }

    if(scrollTop < sectionEl.top+350) {
      sectionEl.allowActivate = true
    }

    if((scrollTop < 350 +  (sectionEl.top - sectionEl.height)) || scrollTop < 50){
      childrenEl.forEach((el) => {
        el.classList.remove('active')
      })
      sectionEl.allowActivate = true
    }
  })


  parallaxDeepElArray.forEach((parallaxDeepEl) => {

    console.log(parallaxDeepElArray)

    if(scrollTop >= parallaxDeepEl.top - 300) {
      parallaxDeepEl.el.style.transform = 'translate3d(0, '+(scrollTop - parallaxDeepEl.top)/2+'px, 0)';
    }
  })
}