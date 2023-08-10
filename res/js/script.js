$(document).ready(function() {

    let isMobile = $(window).width() < 768;

    $(window).on('resize', function() {
        isMobile = $(window).width() < 768;
    });


// Funzione per far scorrere il testo su mobile
function scrollText($this, textWidth, spaceWidth) {
    $this.animate({ "margin-left": -(textWidth + spaceWidth) }, 15000, "linear", function() {
        $this.css("margin-left", 0);
        scrollText($this, textWidth, spaceWidth); // Ricomincia l'animazione
    });
}

// Funzione per impostare il testo corretto su desktop
function setCorrectText($title, originalText, spaceWidth, numOfCopies) {
    var space = $('<span class="space">').css('width', spaceWidth + 'px');
    var newText = "";
    for (var i = 0; i < numOfCopies; i++) {
        newText += originalText + space[0].outerHTML;
    }
    $title.html(newText);

    return {
        single: $title.width() / numOfCopies,
        total: $title.width()
    };
}

// Funzione per iniziare l'animazione su desktop
function startAnimation($title, widths, spaceWidth) {
    var animationDuration = 7500;
    $title.stop().animate({ "margin-left": (-2 * (widths.single) + spaceWidth) }, animationDuration, "linear", function() {
        $title.css("margin-left", 0);
        startAnimation($title, widths, spaceWidth); // Ricomincia l'animazione
    });
}

    // Animazione scorrimento testo se troppo lungo da mobile / animazione testo desktop durante hover
setTimeout(() => {
    if (isMobile) {
        // Scorrimento testo per mobile se il testo è troppo lungo
        $(".project-title p").each(function() {
            var $this = $(this);
            var parentWidth = $this.parent().width();
            var textWidth = $this.width();
            var spaceWidth = 50;

            if (textWidth > parentWidth) {
                var space = $('<span class="space">').css('width', spaceWidth + 'px');
                $this.html($this.text() + space[0].outerHTML + $this.text());
                scrollText($this, textWidth, spaceWidth);
            }
        });
    } else {
        // Animazione del testo durante hover su desktop
        $(".project").each(function() {
            var $project = $(this);
            var $title = $project.find(".project-title p");
            var originalText = $title.text();
            var hoverTimeout;
            var spaceWidth = 100;
            var numOfCopies = 10;

            $project.hover(
                function() {
                    var widths = setCorrectText($title, originalText, spaceWidth, numOfCopies);
                    hoverTimeout = setTimeout(() => startAnimation($title, widths, spaceWidth), 500);
                },
                function() {
                    clearTimeout(hoverTimeout);
                    $title.stop().css("margin-left", 0).text(originalText);
                }
            );
        });
    }
}, 100);
    
    



    /* COMPORTAMENTO MOBILE DELL'HOVER */
    var debounceTimer;
    var $projects = $('.project'); // Cache all the project elements
    
    $(window).on('scroll', function() {
        clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(function() {
            if (isMobile) {
                let windowTop = $(window).scrollTop();
                let windowHeight = $(window).height();
                
                let $noEffectElement = $projects.filter(':not(.mobile-inactive)'); // Use cached project elements
    
                // Se non esiste alcun elemento senza l'effetto
                if ($noEffectElement.length === 0) {
                    for (let i = 0; i < $projects.length; i++) {
                        let $currentProject = $($projects[i]);
                        let elementTop = $currentProject.offset().top;
                        let elementBottom = elementTop + $currentProject.outerHeight();
                        if (elementTop >= windowTop && elementBottom <= (windowTop + windowHeight)) {
                            $currentProject.removeClass('mobile-inactive');
                            break; // interrompe il ciclo
                        }
                    }
                } 
                // Se esiste un elemento senza l'effetto
                else {
                    var noEffectElementTop = $noEffectElement.offset().top;
                    var noEffectElementBottom = noEffectElementTop + $noEffectElement.outerHeight();
    
                    if (noEffectElementTop < windowTop || noEffectElementBottom > (windowTop + windowHeight)) {
                        $noEffectElement.addClass('mobile-inactive');
                        for (let i = 0; i < $projects.length; i++) {
                            let $currentProject = $($projects[i]);
                            let elementTop = $currentProject.offset().top;
                            let elementBottom = elementTop + $currentProject.outerHeight();
                            if (elementTop >= windowTop && elementBottom <= (windowTop + windowHeight)) {
                                $currentProject.removeClass('mobile-inactive');
                                break;
                            }
                        }
                    }
                }
            }
        }, 5);
    });
});