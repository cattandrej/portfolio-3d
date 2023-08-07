$(document).ready(function() {
    $('.menu-toggle').on('click', function() {
        $('#menuContainer').toggleClass('menu-active');
        if ($(window).width() < 768) {
            if ($('#menuListContainer').hasClass("menu-list-container")) {
                // Se l'elemento ha già la classe, ritarda la rimozione di 0,5 secondi
                setTimeout(() => {
                    $('#menuListContainer').toggleClass("menu-list-container");
                }, 500);
            } else {
                // Altrimenti, aggiungi la classe immediatamente
                $('#menuListContainer').toggleClass("menu-list-container");
            }
            $('.menu-overlay').toggle(); // Mostra/nasconde l'overlay
        }
        $('#menuLabel, #closeLabel').toggle(); // Cambia la visibilità tra MENU e la X
    });

    $(window).on("scroll", function(){
        var scrollDistance = $(window).scrollTop();
        var maxOpacity = 0.8;  // imposta l'opacità massima che desideri qui
        var activationDistance = 128;  // imposta la distanza di scroll prima che inizi la trasparenza

        if (scrollDistance <= activationDistance) {
            $('.shadow-top-bar').css('opacity', 0);
        } else if (scrollDistance <= activationDistance * 2) {
            var opacity = ((scrollDistance - activationDistance) / activationDistance) * maxOpacity;
            $('.shadow-top-bar').css('opacity', opacity);
        } else {
            $('.shadow-top-bar').css('opacity', maxOpacity);
        }
    });
});
