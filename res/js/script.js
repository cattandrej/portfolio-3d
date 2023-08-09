$(document).ready(function() {

    let isMobile = $(window).width() < 768;

    // Aggiungi un event listener per il resize della finestra, così da aggiornare il valore di isMobile
    $(window).on('resize', function() {
        isMobile = $(window).width() < 768;
    });

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

    setTimeout(() => {
        $(".project-title p").each(function() {

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
    
            }  else {
                $(".project").each(function() {
                    var $project = $(this);
                    var $title = $project.find(".project-title p");
                    var originalText = $title.text();
                    var hoverTimeout;
                    var spaceWidth = 100; // Larghezza dello spazio in pixel
                    var numOfCopies = 10; // numero fisso di duplicati
                
                    var setCorrectText = function() {
                        // Genera lo spazio utilizzando un elemento <span>
                        var space = $('<span class="space">').css('width', spaceWidth + 'px');
                
                        // Duplica il testo il numero desiderato di volte con lo spazio tra le repliche
                        var newText = "";
                        for (var i = 0; i < numOfCopies; i++) {
                            newText += originalText + space[0].outerHTML;
                        }
                        $title.html(newText);
                        
                        return {
                            single: $title.width() / numOfCopies,
                            total: $title.width()
                        };
                    };
                
                    var startAnimation = function(widths) {
                        // Animiamo solo sulla larghezza del testo originale più lo spazio
                        var animationDuration = 7500;
                        $title.stop().animate({ "margin-left": (-2 * (widths.single) + spaceWidth) }, animationDuration, "linear", function() {
                            $title.css("margin-left", 0);
                            startAnimation(widths);
                        });
                    };
                
                    $project.hover(
                        function() { // Mouse enter
                            var widths = setCorrectText();
                            hoverTimeout = setTimeout(() => startAnimation(widths), 500);
                        },
                        function() { // Mouse leave
                            clearTimeout(hoverTimeout);
                            $title.stop().css("margin-left", 0).text(originalText);
                        }
                    );
                });
            }
        });
    }, 100);


    /* COMPORTAMENTO MOBILE DELL'HOVER */

    /*
    $(window).on('scroll', function() {
        if (isMobile) {
            let activeElementFound = false;
    
            $('.project').each(function() {
                var windowTop = $(window).scrollTop();
                var windowHeight = $(window).height();
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
    
                var startEffect = windowTop + windowHeight * 0.10;
                var endEffect = windowTop + windowHeight * 0.50;
    
                if (elementTop >= windowTop + startEffect && elementBottom <= windowTop + endEffect && !activeElementFound) {
                    $(this).addClass('mobile-effect');
                    activeElementFound = true;
                } else {
                    $(this).removeClass('mobile-effect');
                }
            });
        }
    });
    */
    $(window).on('scroll', function() {
        if (isMobile) {
            let currentEffectElement = $('.project.mobile-effect'); // l'elemento attuale con l'effetto
    
            // Se non esiste alcun elemento con l'effetto applicato
            if (currentEffectElement.length === 0) {
                $('.project').each(function() {
                    var windowTop = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var elementTop = $(this).offset().top;
                    var elementBottom = elementTop + $(this).outerHeight();
    
                    // Se l'elemento corrente soddisfa le condizioni
                    if (elementTop >= windowTop && elementBottom <= (windowTop + windowHeight)) {
                        $(this).addClass('mobile-effect');
                        return false; // interrompe il ciclo
                    }
                });
            } 
            // Se esiste un elemento con l'effetto applicato
            else {
                var windowTop = $(window).scrollTop();
                var windowHeight = $(window).height();
                var effectElementTop = currentEffectElement.offset().top;
                var effectElementBottom = effectElementTop + currentEffectElement.outerHeight();
    
                // Se l'elemento attuale con l'effetto non soddisfa più le condizioni
                if (effectElementTop < windowTop || effectElementBottom > (windowTop + windowHeight)) {
                    currentEffectElement.removeClass('mobile-effect');
    
                    // Ciclo per trovare un altro elemento a cui applicare l'effetto
                    $('.project').each(function() {
                        var elementTop = $(this).offset().top;
                        var elementBottom = elementTop + $(this).outerHeight();
    
                        if (elementTop >= windowTop && elementBottom <= (windowTop + windowHeight)) {
                            $(this).addClass('mobile-effect');
                            return false; // interrompe il ciclo
                        }
                    });
                }
            }
        }
    });
    
});
