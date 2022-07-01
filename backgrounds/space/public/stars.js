const numStars = 250;

function newStar(index) {
    var starSize = (Math.random() * 10 % 10) + 1;
    var docHeight = $(document).height();
    var docWidth = $(document).width();

    var time = Math.random() * 100 % 20;
    //var repeats = Math.random() * 100 % 100;

    var starPosX = Math.random() * 10000 % (docWidth - starSize);
    var starPosY = Math.random() * 10000 % (docHeight - starSize);

    $("body").append(
        "<div class='star-container' id='b"
        + index
        + "'><div class='star' id='a"
        + index
        + "'></div></div>"
    )
    var box = document.querySelector("#b" + index);
    var star = document.querySelector("#a" + index);

    star.style.setProperty('--animation-time', time + "s");
    box.style.setProperty('--star-size', starSize + "px");
    box.style.position = "absolute";
    box.style.top = starPosY + "px";
    box.style.left = starPosX + "px";

    star.onanimationend = function(event) {
        star.parentElement.remove();
        newStar(index);
    }
}

function shootComet() {
    var randomDelay = Math.random() * 100 % 20;

    var chooseDirection = Math.random();
    
    let cometStartX = 0;
    let cometStartY = 0;
    let cometEndX = 0;
    let cometEndY = 0;

    if (chooseDirection < .25) {
        //chose left
        cometStartX = -60;
        cometEndX = $(document).width() + 60;
        cometStartY = Math.random() * 10000 % $(document).height();
        cometEndY = Math.random() * 10000 % $(document).height();
    } else if (chooseDirection >= .25 && chooseDirection < .5) {
        //chose top
        cometStartY = -60;
        cometEndY = $(document).height() + 60;
        cometStartX = Math.random() * 10000 % $(document).width();
        cometEndX = Math.random() * 10000 % $(document).width();
    } else if (chooseDirection >= .5 && chooseDirection < .75) {
        //chose right
        cometStartX = $(document).width() + 60;
        cometEndX = -60;
        cometStartY = Math.random() * 10000 % $(document).height();
        cometEndY = Math.random() * 10000 % $(document).height();
    } else {
        //chose bottom
        cometStartY = $(document).height() + 60;
        cometEndY = -60;
        cometStartX = Math.random() * 10000 % $(document).width();
        cometEndX = Math.random() * 10000 % $(document).width();
    }

    // do the calcs for this comet
    angle = (Math.atan((cometEndY - cometStartY) / (cometEndX - cometStartX)) * 180 / Math.PI);

    setTimeout(() => {
        $("body").append(
            "<div class='comet' id='c'></div>"
        );
        let comet = document.querySelector("#c");
        comet.style.setProperty('--comet-start-x', cometStartX + "px");
        comet.style.setProperty('--comet-start-y', cometStartY + "px");
        comet.style.setProperty('--comet-end-x', cometEndX + "px");
        comet.style.setProperty('--comet-end-y', cometEndY + "px");
        comet.style.rotate = angle + "deg";

        comet.onanimationend = function(event) {
            comet.remove();
            shootComet();
        }
        
        //global_index++;
    }, randomDelay * 1000);
}

$(document).ready(function() {
    for (let i = 0; i < numStars; i++) {
        newStar(i);
    }
    shootComet()
});