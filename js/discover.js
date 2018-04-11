function discoverCardLeave() {
    var col = document.getElementById("discover-col");
    col.style.transition = "left 0.195s cubic-bezier(0.4, 0.0, 1, 1)";
    col.style.left = "-" + window.innerWidth +"px";
}

function discoverCardEnter() {
    var col = document.getElementById("discover-col");
    col.style.opacity = 0;
    col.style.transition = undefined;
    col.style.left = window.innerWidth + "px";
    window.setTimeout(function() {
        col.style.opacity = 1;
        col.style.transition = "left 0.225s cubic-bezier(0.0, 0.0, 0.2, 1)";
        col.style.left = "0px";
    }, 100);        
}

ons.ready(function () {
    const starPrecentage = 50;
    const starPercentageRounded = `${(Math.round(starPrecentage / 10) * 10)}%`;
    document.getElementsByClassName("stars-inner")[0].style.width = "50%";
    document.getElementById("discover-skip-button").onclick = function() {
        discoverCardLeave();
        window.setTimeout(discoverCardEnter, 195);
    };
});