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

        if ($(window).height() > 950) {
                animatePoints();
        }

        var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

        $(window).scroll(function(event) {
                if ($(window).scrollTop() >= scrollDistance) {
                        animatePoints();
                }
        });
});
