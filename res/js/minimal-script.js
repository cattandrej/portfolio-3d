$(document).ready(function() {

    let isMobile = $(window).width() < 768;

    // Event listener per il resize della finestra, così da aggiornare il valore di isMobile
    $(window).on('resize', function() {
        isMobile = $(window).width() < 768;
    });


    // Gestione menu in alto a destra
    $('.menu-toggle').on('click', function() {
        let menuContainer = $('#menuContainer');
        let menuOverlay = $('.menu-overlay');
        let menuListContainer = $('#menuListContainer');
    
        if (menuContainer.hasClass('menu-active')) {
            // Se il menu è attualmente attivo, chiudilo
            menuContainer.removeClass('menu-active');

            setTimeout(() => {
                menuListContainer.addClass('hide');
            }, 500);
            
            if (isMobile) {
                menuOverlay.addClass('menu-overlay-closed');
    
                // Ritarda l'aggiunta di 'display: none' di 0.5 secondi
                setTimeout(() => {
                    menuOverlay.addClass('hide');
                }, 500);
    
                if (menuListContainer.hasClass("menu-list-container")) {
                    // Ritarda la rimozione di 0.5 secondi
                    setTimeout(() => {
                        menuListContainer.removeClass("menu-list-container");
                    }, 500);
                }
            }
    
            // Cambia la visibilità tra MENU e la X
            $('#menuLabel').show();
            $('#closeLabel').hide();
    
        } else {
            // Altrimenti, apri il menu
            menuListContainer.removeClass('hide');

            setTimeout(() =>  {
                menuContainer.addClass('menu-active');

    
                if (isMobile) {
                    menuOverlay.removeClass('hide');
                    menuOverlay.removeClass('menu-overlay-closed');
                    
        
                    if (!menuListContainer.hasClass("menu-list-container")) {
                        menuListContainer.addClass("menu-list-container");
                    }
                }
        
                // Cambia la visibilità tra MENU e la X
                $('#menuLabel').hide();
                $('#closeLabel').show();
            }, 5);

        }
    });
    

    // ombrettina sotto barra menu in alto
    $(window).on("scroll", function(){
        var scrollDistance = $(window).scrollTop();
        var maxOpacity = 0.8;  // imposta l'opacità massima
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
