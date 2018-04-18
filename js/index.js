document.addEventListener('init', function (event) {
    var page = event.target;
    var temp1 = document.getElementsByTagName("template")[0];

    if (page.id === 'index') {
      // navigate to discover tab when click on big discover button
      page.querySelector('#navigation-button-2').onclick = function () {
          document.getElementsByTagName('ons-tabbar')[0].setActiveTab(3);
      };
      //open filter template when click on filter button
      page.querySelector('#advanced').onclick = function () {
          document.querySelector('#myNavigator').pushPage('filter.html', { data: { title: 'Filter' } });
      };
      // navigate to promotion tab when click on big promotion button
      page.querySelector('#navigation-button-3').onclick = function () {
          document.getElementsByTagName('ons-tabbar')[0].setActiveTab(2);
      };
        //set eatwhere logo to smaller font when input is focused
        //add "focused " class to logo when input is selected
        function setFocused() {
        var results = document.querySelectorAll('#eatwhere');
        for (result of results) {
          result.classList.add('focused');
        }
      }
      // remove "focused" class from logo when input is blurred
      function unsetFocused() {
        var results = document.querySelectorAll('#eatwhere');
        for (result of results) {
          result.classList.remove('focused');
        }
      }
      //add event listener to input
      var results = document.querySelectorAll('input[type="search"]');
      for (result of results) {
        result.addEventListener("focus", setFocused);
        result.addEventListener("blur", unsetFocused);
      }
    }
     else if (page.id === 'filter') {
       // navigation tab bar title "filter" when push Filter template
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }

    if (event.target.id === 'filter') {
      //array of all filter option image
    var photo = document.querySelectorAll(".filter-image");
    // add clcik event listener to all image
    for (var i = 0; i < photo.length; i++) {
      photo[i].addEventListener('click', function() {
        this.classList.toggle("active-image");
      });
    }

    document.querySelector("#apply-button").addEventListener("click", applyFilter);

    function applyFilter() {
       var activeImage = document.querySelectorAll(".active-image");
       var userFilterArray = [];
       //push all filter user selected to userFilterArray
       for (var i = 0; i < activeImage.length; i++) {
        userFilterArray.push(activeImage[i].getAttribute("data-filter"));
       }
       //change the hidden filter input value to userInputArray
       var userFilter = userFilterArray.toString();
       document.getElementById("filter-search").value = userFilter;
       console.log(document.getElementById("filter-search").value);
       //return to homepage
       myNavigator.popPage();
    };
  }
});
