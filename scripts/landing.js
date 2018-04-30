var animatePoints = function() {
  var revealPoint = function() {
    $(this).css( {
      opacity: 1,
      transform: 'scaleX(1) translateY(0)'
    });
  };

  $.each($('.point'), revealPoint);
};
$(window).load(function() {

  var pointsArray = document.getElementsByClassName('point');
  var pointsTitleArray = document.getElementsByClassName('point-title');
  var pointsSymbolsArray = document.querySelectorAll('.ion-music-note, .ion-radio-waves, .ion-iphone');

  // if the height of window is more than 950 pixels call animatePoints for taller screens
  if ($(window).height() > 950) {
    animatePoints();
  }

  // the top of .selling point minus the window height plus 200 pixels
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  // if the distance scroled inside the window element is more than or equal to scrolldistance call animatePoints
  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance) {
    animatePoints();
    }
  });
});
