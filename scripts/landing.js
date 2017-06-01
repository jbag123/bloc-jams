var animatePoints = function(points,pointsTitle,pointsSymbols) {
        function revealPoint(index) {
                points[index].style.opacity = 1;
                points[index].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.5 95%)";
                points[index].style.color = "rgb(58,23,63)";
                points[index].style.transform = "scaleX(1) translateY(0)";
                points[index].style.msTransform = "scaleX(1) translateY(0)";
                points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
                pointsTitle[index].style.borderBottom = "1px solid rgb(58,23,63)";
                pointsSymbols[index].style.color = "rgb(233,50,117)";
        }
        forEach(points, revealPoint);
        forEach(pointsTitle, revealPoint);
        forEach(pointsSymbols, revealPoint);
};

window.onload = function () {

        var pointsArray = document.getElementsByClassName('point');
        var pointsTitleArray = document.getElementsByClassName('point-title');
        var pointsSymbolsArray = document.querySelectorAll('.ion-music-note, .ion-radio-waves, .ion-iphone');

        if (window.innerHeight > 950) {
                animatePoints(pointsArray,pointsTitleArray,pointsSymbolsArray);
        }
        var sellingPoints = document.getElementsByClassName('selling-points')[0];
        var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
        window.addEventListener('scroll', function(event) {
                if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                        animatePoints(pointsArray,pointsTitleArray,pointsSymbolsArray);
                }
        });
}
