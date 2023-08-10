$(document).ready(function() {

    let isMobile = $(window).width() < 768;

    $(window).on('resize', function() {
        isMobile = $(window).width() < 768;
    });

    function animateMobileText($element) {
        var parentWidth = $element.parent().width();
        var textWidth = $element.width();
        var spaceWidth = 50; // Larghezza dello spazio in pixel
    
        if (textWidth > parentWidth) {
            var space = $('<span class="space">').css('width', spaceWidth + 'px');
            $element.html($element.text() + space[0].outerHTML + $element.text());
    
            $element.addClass('animating');
        }
    }
    
    function animateDesktopText($project) {
        var $title = $project.find(".project-title p");
        var originalText = $title.text();
        var spaceWidth = 100; // Larghezza dello spazio in pixel
        var numOfCopies = 10; // numero fisso di duplicati
    
        var setCorrectText = function() {
            var space = $('<span class="space">').css('width', spaceWidth + 'px');
            var newText = "";
            for (var i = 0; i < numOfCopies; i++) {
                newText += originalText + space[0].outerHTML;
            }
            $title.html(newText);
        };
    
        $project.hover(
            function() { // Mouse enter
                setCorrectText();
                $title.addClass('animating');
            },
            function() { // Mouse leave
                $title.removeClass('animating').css('margin-left', 0).text(originalText);
            }
        );
    }
    
    if (isMobile) {
        $(".project-title p").each(function() {
            animateMobileText($(this));
        });
    } else {
        $(".project").each(function() {
            animateDesktopText($(this));
        });
    }
    
    

    /* reset delle animazioni al resize */
    var resizeTimeout;

    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Esegui le operazioni qui dopo che il resize è stato completato
        }, 250); // 250 millisecondi di ritardo
    });


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
