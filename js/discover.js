function discoverCardLeave() {
    var col = document.getElementById("discover-col");
    col.style.transition = "transform 0.195s cubic-bezier(0.4, 0.0, 1, 1)";
    col.style.transform = "translateX(-100%)";
}

function discoverCardEnter() {
    var col = document.getElementById("discover-col");
    col.style.opacity = 0;
    col.style.transition = undefined;
    col.style.transform = "translateX(100%)";
    window.setTimeout(function () {
        col.style.opacity = 1;
        col.style.transition = "transform 0.225s cubic-bezier(0.0, 0.0, 0.2, 1)";
        col.style.transform = "translateX(0%)";
    }, 100);
}

function requestSuggestion() {
    var id = document.getElementById("discover-restaurant-name").dataset.id;
    var s = document.createElement("script");
    s.src = "http://localhost:90/discover.php?id=" + id;
    document.body.appendChild(s);
}

function handleSuggestion(data) {
    document.getElementById("discover-restaurant-name").dataset.id = data.id;
    console.log(data);
    displayRestaurantSuggestion(data.name, data.rating, data.descirption,
        data.imageUrl, data.userName, data.review);
    window.setTimeout(function () {
        var img = document.getElementById("discover-img");
        if (img.complete != true) {
            var progress = document.getElementById("discover-progress");
            progress.style.opacity = 0;
            progress.style.opacity = 1;
            img.addEventListener("load", function () {
                progress.style.opacity = 0;
                discoverCardEnter();
            });
        } else
            discoverCardEnter();
    }, 195);
}

function displayRestaurantSuggestion(name, rating, description, imgUrl, reviewUser,
    reviewContent) {
    document.getElementById("discover-restaurant-name").innerHTML = name;
    if (description != "") {
        document.getElementById("discover-description").innerHTML = description;
    }
    document.getElementById("discover-img").src = imgUrl;
    document.getElementById("discover-review-user").innerHTML = reviewUser;
    document.getElementById("discover-review-content").innerHTML = reviewContent;
    displayStarRating(rating);
}

function displayStarRating(rating) {
    const starPrecentage = rating / 5 * 100;
    const starPercentageRounded = `${(Math.round(starPrecentage / 10) * 10)}%`;
    document.getElementsByClassName("stars-inner")[0].style.width = starPercentageRounded;
}

ons.ready(function () {

    const starPrecentage = 40;
    const starPercentageRounded = `${(Math.round(starPrecentage / 10) * 10)}%`;
    document.getElementsByClassName("stars-inner")[0].style.width = starPercentageRounded;

    document.getElementById("discover-skip-button").onclick = function () {
        discoverCardLeave();
        requestSuggestion();
    };
});