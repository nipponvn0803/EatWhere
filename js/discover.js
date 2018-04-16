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
    obj = { "table": "customers", "limit": 10 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "json_demo_db.php?x=" + dbParam, true);
    xmlhttp.send();
}

function displayRestaurantSuggestion(name, rating, description, imgUrl, reviewUser,
    reviewContent) {
    document.getElementById("discover-restaurant-name").innerHTML = name;
    document.getElementById("discover-description").innerHTML = description;
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
        window.setTimeout(function() {
            displayRestaurantSuggestion("Hesburger", 4.5, "Made in Finland",
        "https://www.hesburger.fi/clients/hesburger/output/ravintolakuva.php?id=10993",
            "Roberts", "It sucks!");
            var img = document.getElementById("discover-img");
            if (img.complete != true) {
                var progress = document.getElementById("discover-progress");
                progress.style.opacity = 0;
                progress.style.opacity = 1;
                img.addEventListener("load", function() {
                    progress.style.opacity = 0;
                    discoverCardEnter();
                });
            } else
                discoverCardEnter();
        }, 195);
    };
});