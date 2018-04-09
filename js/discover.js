ons.ready(function () {
    const starPrecentage = 50;
    const starPercentageRounded = `${(Math.round(starPrecentage / 10) * 10)}%`;
    document.getElementsByClassName("stars-inner")[0].style.width = "50%";
});