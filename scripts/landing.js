var pointsArray = document.getElementsByClassName('point');
var pointsTitle = document.getElementsByClassName('point-title');
var pointsSymbols = document.querySelectorAll('.ion-music-note, .ion-radio-waves, .ion-iphone');

function forEach(points) {

                for (var i = 0; i < points.length; i++ ) {
                        points[i].style.opacity = 1;
                        points[i].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.5 95%)";
                        points[i].style.color = "rgb(58,23,63)";
                        points[i].style.transform = "scaleX(1) translateY(0)";
                        points[i].style.msTransform = "scaleX(1) translateY(0)";
                        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
                        points[i].addEventListener('click', function() {
                                prompt('sign in!')
                        });
                }

        for (var i = 0; i < pointsTitle.length; i++ ) {
                pointsTitle[i].style.borderBottom = "1px solid rgb(58,23,63)";
        }

        for (var i = 0; i < pointsSymbols.length; i++ ) {
                pointsSymbols[i].style.color = "rgb(233,50,117)";
        }
        
};

window.onload = function () {
        if (window.innerHeight > 950) {
                forEach(pointsArray);
        }
        var sellingPoints = document.getElementsByClassName('selling-points')[0];
        var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
        window.addEventListener('scroll', function(event) {
                if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                        forEach(pointsArray);
                }
        });
}
