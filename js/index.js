
/* document.addEventListener('prechange', function (event) {
    document.querySelector('ons-toolbar .center')
        .innerHTML = event.tabItem.getAttribute('label');
}); */

document.addEventListener('init', function (event) {
    var page = event.target;

    if (page.id === 'index') {
        page.querySelector('#navigation-button-2').onclick = function () {
            document.getElementsByTagName('ons-tabbar')[0].setActiveTab(3);
        };
    }/* 
     else if (page.id === 'page2') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    } */
});
