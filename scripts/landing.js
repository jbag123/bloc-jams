function revealPoint() {
        var points = document.getElementsByClassName('point');
        var pointsTitle = document.getElementsByClassName('point-title');
        var pointsSymbols = document.querySelectorAll('.ion-music-note, .ion-radio-waves, .ion-iphone');
        for (var i = 0; i < points.length; i++ ) {
                points[i].style.opacity = 1;
                points[i].style.background = "linear-gradient(rgb(58,23,63), rgba(0, 255, 255, 0.7)";
                points[i].style.color = "rgb(58,23,63)";
                points[i].style.transform = "scaleX(1) translateY(0)";
                points[i].style.msTransform = "scaleX(1) translateY(0)";
                points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
        }
        for (var i = 0; i < pointsTitle.length; i++ ) {
                pointsTitle[i].style.borderBottom = "1px solid rgb(58,23,63)";
        }
        for (var i = 0; i < pointsSymbols.length; i++ ) {
                pointsSymbols[i].style.color = "rgb(233,50,117)";
        }
        revealPoint();
};
