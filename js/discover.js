ons.ready(function () {
    displayStarRating(4 / 10 * 5);
    document.getElementById("discover-skip-button").onclick = function () {
        discoverCardLeave();
        window.setTimeout(requestSuggestion, 195);
    };

    document.getElementById("discover-img").addEventListener("load", function () {
        document.getElementById("discover-progress").style.opacity = 0;
        discoverCardEnter();
    });

    document.getElementById("discover-details-button").onclick = function () {
        var id = document.getElementById("discover-restaurant-name").dataset.id;

        window.location = "restaurant-detail.html?restaurant_id="
            + (document.getElementById("discover-restaurant-name").dataset.id ? 6 
            : document.getElementById("discover-restaurant-name").dataset.id)
            + "&restaurant_address=" 
            + document.getElementById("discover-restaurant-name").dataset.address
            + "&restaurant_name=" 
            + document.getElementById("discover-restaurant-name").innerHTML;
    };
});

document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function() {
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
      };
    } else if (page.id === 'page2') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });

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
    s.src = "http://www.students.oamk.fi/~t6plro00/EatWhere/discover.php?id=" + id;
    document.body.appendChild(s);
}

function handleSuggestion(data) {
    if (data.id !== null) {
        document.getElementById("discover-restaurant-name").dataset.id = data.id;
        document.getElementById("discover-restaurant-name").dataset.address =
            data.address;
        document.getElementById("discover-progress").style.opacity = 1;
        displayRestaurantSuggestion(data.name, data.rating, data.description,
            data.imageUrl, data.userName, data.review);
    }
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