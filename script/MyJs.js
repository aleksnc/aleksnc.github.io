/*---Routs----*/
var pathName;


function pageGET() {
    $('.GETcontent').empty();
    var path = window.location.pathname.split("/");
     pathName = path[path.length - 1];


    switch (pathName) {
        case 'index.html':
            appendPage('main.html', true);
            break;

        case 'registration.html':
            appendPage('registration.html', true);
            break;

        case 'login.html':
            appendPage('login.html');
            break;

        case 'account.html':
            appendPage('account.html');
            break;

        case 'maps.html':
            appendPage('maps.html');
            break;


        case 'settings.html':
            appendPage('settings.html');
            break;

        case 'messages.html':
            appendPage('messages.html');
            break;

        case 'message.html':
            appendPage('message.html');
            break;

        case 'search.html':
            appendPage('search.html');
            break;

        default:
            appendPage('main.html', true);
            break;
    }
}


function appendPage(e) {
    if (arguments.length > 1) {
        $('.mainMenu').slideUp(arguments[1]);
        $('.mainBlock').toggleClass('notMenu',arguments[1]);
    } else{
        $('.mainMenu').slideDown();
        $('.mainBlock').removeClass('notMenu');
    }

    $.get(
        "/template/" + e,
        onAjaxSuccess
    );

    function onAjaxSuccess(data) {

        $('.history').each(function(){

          var path = $(this).attr('href').split("/");
           var linkPath = path[path.length - 1];

            if(linkPath==pathName){
                $('.history').removeClass('active');
                $(this).addClass('active');
                if(pathName=='maps.html'){
                    $('.search_js').slideDown();
                    $('.maps_js').hide();
                }else{
                    $('.search_js').hide();
                    $('.maps_js').slideDown();
                };
            }
        });

        $('.mainBlock').empty();
        $('.mainBlock').append(data);
        searchBlock()
    }
}

/*---END Routs----*/

function historyAPI() {
    window.onpopstate = function (event) {
        pageGET()
    }

    $(document).on('click', 'a.history', function (e) {
        console.log('ok');
        var uri = $(this).attr('href');
        e.preventDefault();
        history.pushState(null, '', uri);
        pageGET()
    })
}

function searchBlock(){
//    if($('.search_js').find('div').hasClass('active')){
//        $('.map__wrapper').addClass('paddingTop');
//
//        $('.searchBlock__wrapper').slideDown();
//    } else{
//        $('.map__wrapper').removeClass('paddingTop');
//
//        $('.searchBlock__wrapper').slideUp();
//    }
};

$(document).ready(function () {
    pageGET();
    historyAPI();

    $(document).on('click', '.search_js', function(e){
        $(this).find('div').toggleClass('active');
        searchBlock()
    })
})



