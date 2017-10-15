var elem = document.querySelector('.testimonial-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  freeScroll: true,
  wrapAround: true
});

var titleElem = document.querySelectorAll('.section-title');

var titleElArray = [];

titleElem.forEach((el) => {
  var viewportOffset = el.getBoundingClientRect();
  var top = viewportOffset.y;
  var left = viewportOffset.x;
  var height = viewportOffset.height;

  titleElArray.push({
    el,
    top,
    height
  })

})

window.onscroll = function(){
  const scrollTop = window.scrollY; 
  titleElArray.forEach((titleEl) => {
    if(scrollTop > titleEl.top - 400 && scrollTop < titleEl.top + titleEl.height) {
      titleEl.el.classList.add('active')
    }else{
      titleEl.el.classList.remove('active')
    }
  })
}