var animatePoints = function() {
    var points = document.getElementsByClassName('point');
    var pointsTitle = document.getElementsByClassName('point-title');
    var pointsSymbols = document.querySelectorAll('.ion-music-note, .ion-radio-waves, .ion-iphone');

    var revealFirstPoint = function() {
        points[0].style.opacity = 1;
        points[0].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.7)";
        points[0].style.color = "rgb(58,23,63)";
        points[0].style.transform = "scaleX(1) translateY(0)";
        points[0].style.msTransform = "scaleX(1) translateY(0)";
        points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    var revealSecondPoint = function() {
        points[1].style.opacity = 1;
        points[1].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.7)";
        points[1].style.color = "rgb(58,23,63)";
        points[1].style.transform = "scaleX(1) translateY(0)";
        points[1].style.msTransform = "scaleX(1) translateY(0)";
        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    var revealThirdPoint = function() {
        points[2].style.opacity = 1;
        points[2].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.7)";
        points[2].style.color = "rgb(58,23,63)";
        points[2].style.transform = "scaleX(1) translateY(0)";
        points[2].style.msTransform = "scaleX(1) translateY(0)";
        points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    var alterPointTitles = function() {
        pointsTitle[0].style.borderBottom = "1px solid rgb(58,23,63)";
        pointsTitle[1].style.borderBottom = "1px solid rgb(58,23,63)";
        pointsTitle[2].style.borderBottom = "1px solid rgb(58,23,63)";
    }

    var alterPointSymbols = function() {
        pointsSymbols[0].style.color = "rgb(233,50,117)";
        pointsSymbols[1].style.color = "rgb(233,50,117)";
        pointsSymbols[2].style.color = "rgb(233,50,117)";
    }

    revealFirstPoint();
    revealSecondPoint();
    revealThirdPoint();
    alterPointTitles();
    alterPointSymbols();
};
