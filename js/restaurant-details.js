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

    $.ajax({
        method: "GET",
        url: "http://localhost/EatWhere/restaurant-index.php?action=menu&restaurant_id=" + params.restaurant_id
    })
    .done(function(dishes) {
        console.log(dishes);
        var image = "";
        var finalResult = "";

        // dishes.forEach(function(dish){
        //   var image ='<div class="image-wrapper"> \
        //                 <img src="'+ dish.image +'" width="300" height="300" alt=""> \
        //               </div>';
        // });
        // $('#image-wrap').append(image);

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
      url: "http://localhost/EatWhere/restaurant-index.php?action=review&restaurant_id=" + params.restaurant_id
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
