$(document).ready(function() {
    $('.menu-toggle').on('click', function() {
        let menuContainer = $('#menuContainer');
        let menuOverlay = $('.menu-overlay');
        let menuListContainer = $('#menuListContainer');
        let isMobile = $(window).width() < 768;
    
        if (menuContainer.hasClass('menu-active')) {
            // Se il menu è attualmente attivo, chiudilo
            menuContainer.removeClass('menu-active');

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
            menuContainer.addClass('menu-active');

    
            if (isMobile) {
                menuOverlay.removeClass('menu-overlay-closed');
                menuOverlay.removeClass('hide');
    
                if (!menuListContainer.hasClass("menu-list-container")) {
                    menuListContainer.addClass("menu-list-container");
                }
            }
    
            // Cambia la visibilità tra MENU e la X
            $('#menuLabel').hide();
            $('#closeLabel').show();
        }
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

    $(".project-title p").each(function() {

        let isMobile = $(window).width() < 768;

        if (isMobile) {

            var $this = $(this);
            var parentWidth = $this.parent().width();
            var textWidth = $this.width();
            var spaceWidth = 50; // Larghezza dello spazio in pixel
            
            if (textWidth > parentWidth) {
                // Genera lo spazio utilizzando un elemento <span>
                var space = $('<span class="space">').css('width', spaceWidth + 'px');
                
                // Duplica il testo e aggiungi lo spazio tra le repliche
                $this.html($this.text() + space[0].outerHTML + $this.text());

                function scrollText() {
                    // Scorrimento del testo fino alla metà della sua lunghezza complessiva
                    $this.animate({ "margin-left": -(textWidth + spaceWidth) }, 15000, "linear", function() {
                        $this.css("margin-left", 0); // Resetta la posizione senza soluzione di continuità
                        scrollText(); // Ricomincia l'animazione
                    });
                }

                scrollText();
            }

        }

    });
    
});
