var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
        function revealPoint(index) {
                points[index].style.opacity = 1;
                points[index].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.5 95%)";
                points[index].style.color = "rgb(58,23,63)";
                points[index].style.transform = "scaleX(1) translateY(0)";
                points[index].style.msTransform = "scaleX(1) translateY(0)";
                points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
        }
        for (var i = 0; i < points.length; i++) {
                revealPoint(i);
        }
};

        // var pointsTitle = document.getElementsByClassName('point-title');
        // var pointsSymbols = document.querySelectorAll('.ion-music-note, .ion-radio-waves, .ion-iphone');
        // for (var i = 0; i < points.length; i++ ) {
        //
        // }
        // for (var i = 0; i < pointsTitle.length; i++ ) {
        //         pointsTitle[i].style.borderBottom = "1px solid rgb(58,23,63)";
        // }
        // for (var i = 0; i < pointsSymbols.length; i++ ) {
        //         pointsSymbols[i].style.color = "rgb(233,50,117)";
        // }
// };

window.onload = function () {
        if (window.innerHeight > 950) {
                animatePoints(pointsArray);
        }
        var sellingPoints = document.getElementsByClassName('selling-points')[0];
        var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
        window.addEventListener('scroll', function(event) {
                if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                        animatePoints(pointsArray);
                }
        });
}
