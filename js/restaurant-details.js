$(function(){
    var restaurantID = sessionStorage.getItem('resID');
    if (restaurantID === null) {
        restaurantID = 10;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost/EatWhere/restaurant-index.php?action=menu&restaurant_id=" + restaurantID
    })
    .done(function(dishes) {
        var finalResult = "";
        dishes.forEach(function(dish) {
            var menu =  '<ons-list-item> \
                            <div class="left"> \
                                <img class="list-item__thumbnail" src="'+ dish.img_link +'"> \
                            </div> \
                            <div class="center"> \
                                <span class="list-item__title">'+ dish.dish_name +'</span> \
                                <span class="list-item__subtitle">'+ dish.desc +'</span> \
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
});
