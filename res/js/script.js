$(document).ready(function () {

    let isMobile = $(window).width() < 768;

    $(window).on('resize', function () {
        isMobile = $(window).width() < 768;
    });


    // Funzione per far scorrere il testo su mobile
    function scrollText($this, textWidth, spaceWidth) {
        $this.animate({ "margin-left": -(textWidth + spaceWidth) }, 15000, "linear", function () {
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
        $title.stop().animate({ "margin-left": (-2 * (widths.single) + spaceWidth) }, animationDuration, "linear", function () {
            $title.css("margin-left", 0);
            startAnimation($title, widths, spaceWidth); // Ricomincia l'animazione
        });
    }

    // Animazione scorrimento testo se troppo lungo da mobile / animazione testo desktop durante hover
    setTimeout(() => {
        if (isMobile) {
            // Scorrimento testo per mobile se il testo è troppo lungo
            $(".project-title p").each(function () {
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
            $(".project").each(function () {
                var $project = $(this);
                var $title = $project.find(".project-title p");
                var originalText = $title.text();
                var hoverTimeout;
                var spaceWidth = 100;
                var numOfCopies = 10;

                $project.hover(
                    function () {
                        var widths = setCorrectText($title, originalText, spaceWidth, numOfCopies);
                        hoverTimeout = setTimeout(() => startAnimation($title, widths, spaceWidth), 500);
                    },
                    function () {
                        clearTimeout(hoverTimeout);
                        $title.stop().css("margin-left", 0).text(originalText);
                    }
                );
            });
        }
    }, 100);





    /* COMPORTAMENTO MOBILE DELL'HOVER */
    var $projects = $('.project');
    // Variabile globale
    let g = [];

    if (isMobile) {
        // Inizializza g con gli elementi .project
        $projects.each((index, project) => {
            g.push([
                $(project),                  // Elemento jQuery
                false,                       // Visibile (inizialmente impostato su false)
                !$(project).hasClass('mobile-inactive') // Attivo (true se non ha la classe 'mobile-inactive')
            ]);
        });

        // Funzione per aggiornare l'elemento attivo basandosi su g
        function updateActiveElement() {
            let firstVisibleFound = false;

            g.forEach((item, index) => {
                if (item[1] && !firstVisibleFound) {
                    // Se l'elemento è visibile e non abbiamo ancora trovato un elemento visibile
                    if (!item[2]) {
                        // Se l'elemento non è attivo, attivalo
                        item[0].removeClass('mobile-inactive');
                        g[index][2] = true;
                    }
                    firstVisibleFound = true;
                } else {
                    // Se l'elemento non è il primo elemento visibile o non è visibile, disattivalo
                    if (item[2]) {
                        item[0].addClass('mobile-inactive');
                        g[index][2] = false;
                    }
                }
            });
        }

        // Callback per IntersectionObserver
        const handleIntersection = (entries, observer) => {
            let visibilityChanged = false;

            entries.forEach(entry => {
                const elementIndex = g.findIndex(item => item[0][0] === entry.target);

                if (entry.isIntersecting && !g[elementIndex][1]) {
                    g[elementIndex][1] = true;
                    visibilityChanged = true;
                } else if (!entry.isIntersecting && g[elementIndex][1]) {
                    g[elementIndex][1] = false;
                    visibilityChanged = true;
                }
            });

            // Aggiorna l'elemento attivo solo se c'è stato un cambiamento nella visibilità
            if (visibilityChanged) {
                updateActiveElement();
            }
        };

        // Opzioni per l'IntersectionObserver
        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.95
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        // Monitora ogni elemento .project
        $projects.each((index, project) => {
            observer.observe(project);
        });
    }



});