$(document).ready(function() {

    let isMobile = $(window).width() < 768;

    // Animazione scorrimento testo se troppo lungo da mobile / animazione testo desktop durante hover
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

    $(window).on('scroll', function() {
        if (isMobile) {
            let noEffectElement = $('.project:not(.mobile-inactive)'); // l'elemento attuale senza l'effetto
    
            // Se non esiste alcun elemento senza l'effetto
            if (noEffectElement.length === 0) {
                $('.project').each(function() {
                    var windowTop = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var elementTop = $(this).offset().top;
                    var elementBottom = elementTop + $(this).outerHeight();
    
                    // Se l'elemento corrente soddisfa le condizioni
                    if (elementTop >= windowTop && elementBottom <= (windowTop + windowHeight)) {
                        $(this).removeClass('mobile-inactive');
                        return false; // interrompe il ciclo
                    }
                });
            } 
            // Se esiste un elemento senza l'effetto
            else {
                var windowTop = $(window).scrollTop();
                var windowHeight = $(window).height();
                var noEffectElementTop = noEffectElement.offset().top;
                var noEffectElementBottom = noEffectElementTop + noEffectElement.outerHeight();
    
                // Se l'elemento attuale senza l'effetto non soddisfa più le condizioni
                if (noEffectElementTop < windowTop || noEffectElementBottom > (windowTop + windowHeight)) {
                    noEffectElement.addClass('mobile-inactive');
    
                    // Ciclo per trovare un altro elemento da cui rimuovere l'effetto
                    $('.project').each(function() {
                        var elementTop = $(this).offset().top;
                        var elementBottom = elementTop + $(this).outerHeight();
    
                        if (elementTop >= windowTop && elementBottom <= (windowTop + windowHeight)) {
                            $(this).removeClass('mobile-inactive');
                            return false; // interrompe il ciclo
                        }
                    });
                }
            }
        }
    });
    
});
