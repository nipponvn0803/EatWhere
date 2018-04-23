$(function(){

    ///////////////////////////////////////
    // Start params processing from URL
    //////////////////////////////////////

    var currentUrl = location.search;
    var params = getParams(currentUrl);

    function getParams(url) {
        var params = {};

        // Remove "?" from the string
        url
            .substr(1)
            .split("&")
            .forEach(function (item) {
            typeof item;

            var paramKey,
                paramValue;

            var temp = item.split("=");

            paramKey = temp[0];
            paramValue = temp[1];

            params[paramKey] = paramValue;
        });

        return params;
    }

    ////////////////////////////////////
    // End params processing from URL
    ///////////////////////////////////

    console.log(params.restaurant_id);

    $.ajax({
        method: "GET",
        url: "http://www.students.oamk.fi/~t6plro00/EatWhere/restaurant-index.php?action=details&restaurant_id=" + params.restaurant_id
    })
    .done(function(response) {

        var dishes = response.menu;
        var image = response.image;
        var finalResult = "";

        // Set restaurant image
        $('#restaurant-image').attr('src', image);

        document.getElementById("restaurant-name").innerHTML = params
            .restaurant_name.replace(/\+/g, " ").replace(/%20/g, " ")
            .replace(/%27/g, "\'");

        dishes.forEach(function(dish) {
            var menu =  '<ons-list-item tappable> \
                            <div class="left"> \
                                <img class="list-item__thumbnail" src="'+ dish.img_link +'"> \
                            </div> \
                            <div class="center"> \
                                <span class="list-item__title">'+ dish.dish_name +'</span> \
                                <span class="list-item__subtitle">'+ dish.desc +'</span> \
                            </div> \
                            <div class="right"> \
                                <span class="list-item__subtitle">'+ dish.price +'€</span> \
                            </div> \
                        </ons-list-item>';
            finalResult = finalResult + menu;
        });
        $('#dishes-list').append(finalResult);
    })

    .fail(function(err) {
        console.log(err);
    });

  $.ajax({
      method: "GET",
      url: "http://www.students.oamk.fi/~t6plro00/EatWhere/restaurant-index.php?action=review&restaurant_id=" + params.restaurant_id
  })
  .done(function(reviews) {
      console.log(reviews);
      var reviewResult = "";
      reviews.forEach(function(review) {
          var user_review =  '<ons-list-item tappable> \
                          <div class="left"> \
                              <img class="list-item__thumbnail" src="'+ review.user_avt +'"> \
                          </div> \
                          <div class="center"> \
                              <span class="list-item__title">'+ review.user_name +'</span> \
                              <span class="list-item__subtitle">'+ review.review +'</span> \
                          </div> \
                          <div class="right"> \
                              <span class="list-item__title">'+ review.rating +' Stars</span> \
                          </div> \
                      </ons-list-item>';
          reviewResult = reviewResult + user_review;
      });
      $('#review-list').append(reviewResult);
  })
  .fail(function(err) {
      console.log(err);
  });
});
