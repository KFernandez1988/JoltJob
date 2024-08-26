// /*
// 	Dimension by HTML5 UP
// 	html5up.net | @ajlkn
// 	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
// */

// (function($) {

// 	var	$window = $(window),
// 		$body = $('body'),
// 		$wrapper = $('#wrapper'),
// 		$header = $('#header'),
// 		$footer = $('#footer'),
// 		$main = $('#main'),
// 		$main_articles = $main.children('article');

// 	// Breakpoints.
// 		breakpoints({
// 			xlarge:   [ '1281px',  '1680px' ],
// 			large:    [ '981px',   '1280px' ],
// 			medium:   [ '737px',   '980px'  ],
// 			small:    [ '481px',   '736px'  ],
// 			xsmall:   [ '361px',   '480px'  ],
// 			xxsmall:  [ null,      '360px'  ]
// 		});

// 	// Play initial animations on page load.
// 		$window.on('load', function() {
// 			window.setTimeout(function() {
// 				$body.removeClass('is-preload');
// 			}, 100);
// 		});

// 	// Fix: Flexbox min-height bug on IE.
// 		if (browser.name == 'ie') {

// 			var flexboxFixTimeoutId;

// 			$window.on('resize.flexbox-fix', function() {

// 				clearTimeout(flexboxFixTimeoutId);

// 				flexboxFixTimeoutId = setTimeout(function() {

// 					if ($wrapper.prop('scrollHeight') > $window.height())
// 						$wrapper.css('height', 'auto');
// 					else
// 						$wrapper.css('height', '100vh');

// 				}, 250);

// 			}).triggerHandler('resize.flexbox-fix');

// 		}

// 	// Nav.
// 		var $nav = $header.children('nav'),
// 			$nav_li = $nav.find('li');

// 		// Add "middle" alignment classes if we're dealing with an even number of items.
// 			if ($nav_li.length % 2 == 0) {

// 				$nav.addClass('use-middle');
// 				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

// 			}

// 	// Main.
// 		var	delay = 325,
// 			locked = false;

// 		// Methods.
// 			$main._show = function(id, initial) {
//                 console.log('article show was active', initial, id)
// 				var $article = $main_articles.filter('#' + id);

// 				// No such article? Bail.
// 					if ($article.length == 0)
// 						return;

// 				// Handle lock.

// 					// Already locked? Speed through "show" steps w/o delays.
// 						if (locked || (typeof initial != 'undefined' && initial === true)) {

// 							// Mark as switching.
// 								$body.addClass('is-switching');

// 							// Mark as visible.
// 								$body.addClass('is-article-visible');

// 							// Deactivate all articles (just in case one's already active).
// 								$main_articles.removeClass('active');

// 							// Hide header, footer.
// 								$header.hide();
// 								$footer.hide();

// 							// Show main, article.
// 								$main.show();
// 								$article.show();

// 							// Activate article.
// 								$article.addClass('active');

// 							// Unlock.
// 								locked = false;

// 							// Unmark as switching.
// 								setTimeout(function() {
// 									$body.removeClass('is-switching');
// 								}, (initial ? 1000 : 0));

// 							return;

// 						}

// 					// Lock.
// 						locked = true;

// 				// Article already visible? Just swap articles.
// 					if ($body.hasClass('is-article-visible')) {

// 						// Deactivate current article.
// 							var $currentArticle = $main_articles.filter('.active');

// 							$currentArticle.removeClass('active');

// 						// Show article.
// 							setTimeout(function() {

// 								// Hide current article.
// 									$currentArticle.hide();

// 								// Show article.
// 									$article.show();

// 								// Activate article.
// 									setTimeout(function() {

// 										$article.addClass('active');

// 										// Window stuff.
// 											$window
// 												.scrollTop(0)
// 												.triggerHandler('resize.flexbox-fix');

// 										// Unlock.
// 											setTimeout(function() {
// 												locked = false;
// 											}, delay);

// 									}, 25);

// 							}, delay);

// 					}

// 				// Otherwise, handle as normal.
// 					else {

// 						// Mark as visible.
// 							$body
// 								.addClass('is-article-visible');

// 						// Show article.
// 							setTimeout(function() {

// 								// Hide header, footer.
// 									$header.hide();
// 									$footer.hide();

// 								// Show main, article.
// 									$main.show();
// 									$article.show();

// 								// Activate article.
// 									setTimeout(function() {

// 										$article.addClass('active');

// 										// Window stuff.
// 											$window
// 												.scrollTop(0)
// 												.triggerHandler('resize.flexbox-fix');

// 										// Unlock.
// 											setTimeout(function() {
// 												locked = false;
// 											}, delay);

// 									}, 25);

// 							}, delay);

// 					}

// 			};

// 			$main._hide = function(addState) {

// 				var $article = $main_articles.filter('.active');

// 				// Article not visible? Bail.
// 					if (!$body.hasClass('is-article-visible'))
// 						return;

// 				// Add state?
// 					if (typeof addState != 'undefined'
// 					&&	addState === true)
// 						history.pushState(null, null, '#');

// 				// Handle lock.

// 					// Already locked? Speed through "hide" steps w/o delays.
// 						if (locked) {

// 							// Mark as switching.
// 								$body.addClass('is-switching');

// 							// Deactivate article.
// 								$article.removeClass('active');

// 							// Hide article, main.
// 								$article.hide();
// 								$main.hide();

// 							// Show footer, header.
// 								$footer.show();
// 								$header.show();

// 							// Unmark as visible.
// 								$body.removeClass('is-article-visible');

// 							// Unlock.
// 								locked = false;

// 							// Unmark as switching.
// 								$body.removeClass('is-switching');

// 							// Window stuff.
// 								$window
// 									.scrollTop(0)
// 									.triggerHandler('resize.flexbox-fix');

// 							return;

// 						}

// 					// Lock.
// 						locked = true;

// 				// Deactivate article.
// 					$article.removeClass('active');

// 				// Hide article.
// 					setTimeout(function() {

// 						// Hide article, main.
// 							$article.hide();
// 							$main.hide();

// 						// Show footer, header.
// 							$footer.show();
// 							$header.show();

// 						// Unmark as visible.
// 							setTimeout(function() {

// 								$body.removeClass('is-article-visible');

// 								// Window stuff.
// 									$window
// 										.scrollTop(0)
// 										.triggerHandler('resize.flexbox-fix');

// 								// Unlock.
// 									setTimeout(function() {
// 										locked = false;
// 									}, delay);

// 							}, 25);

// 					}, delay);


// 			};

// 		// Articles.
// 			$main_articles.each(function() {

// 				var $this = $(this);

// 				// Close.
// 					$('<div class="close">Close</div>')
// 						.appendTo($this)
// 						.on('click', function() {
// 							location.hash = '';
// 						});

// 				// Prevent clicks from inside article from bubbling.
// 					$this.on('click', function(event) {
// 						event.stopPropagation();
// 					});

// 			});

// 		// Events.
// 			$body.on('click', function(event) {

// 				// Article visible? Hide.
// 					if ($body.hasClass('is-article-visible'))
// 						$main._hide(true);

// 			});

// 			$window.on('keyup', function(event) {

// 				switch (event.keyCode) {

// 					case 27:

// 						// Article visible? Hide.
// 							if ($body.hasClass('is-article-visible'))
// 								$main._hide(true);

// 						break;

// 					default:
// 						break;

// 				}

// 			});

// 			$window.on('hashchange', function(event) {

// 				// Empty hash?
// 					if (location.hash == ''
// 					||	location.hash == '#') {

// 						// Prevent default.
// 							event.preventDefault();
// 							event.stopPropagation();

// 						// Hide.
// 							$main._hide();

// 					}

// 				// Otherwise, check for a matching article.
// 					else if ($main_articles.filter(location.hash).length > 0) {

// 						// Prevent default.
// 							event.preventDefault();
// 							event.stopPropagation();

// 						// Show article.
// 							$main._show(location.hash.substr(1));

// 					}

// 			});

// 		// Scroll restoration.
// 		// This prevents the page from scrolling back to the top on a hashchange.
// 			if ('scrollRestoration' in history)
// 				history.scrollRestoration = 'manual';
// 			else {

// 				var	oldScrollPos = 0,
// 					scrollPos = 0,
// 					$htmlbody = $('html,body');

// 				$window
// 					.on('scroll', function() {

// 						oldScrollPos = scrollPos;
// 						scrollPos = $htmlbody.scrollTop();

// 					})
// 					.on('hashchange', function() {
// 						$window.scrollTop(oldScrollPos);
// 					});

// 			}

// 		// Initialize.

// 			// Hide main, articles.
// 				$main.hide();
// 				$main_articles.hide();

// 			// Initial article.
// 				if (location.hash != ''
// 				&&	location.hash != '#')
// 				    console.log('window load reach')
// 					$window.on('load', function() {
// 						console.log('window load reach')
// 						$main._show(location.hash.substr(1), true);
// 					});

// })(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    var $window = window,
        $body = document.body,
        $wrapper = document.getElementById('wrapper'),
        $header = document.getElementById('header'),
        $footer = document.getElementById('footer'),
        $main = document.getElementById('main'),
        $main_articles = $main ? Array.from($main.children) : [];

    // Breakpoints (assuming breakpoints is a function provided elsewhere in your code)
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Play initial animations on page load.
    window.addEventListener('load', function () {
        setTimeout(function () {
            $body.classList.remove('is-preload');
        }, 100);
    });

    // Fix: Flexbox min-height bug on IE.
    if (browser.name === 'ie') {
        var flexboxFixTimeoutId;

        window.addEventListener('resize', function () {
            clearTimeout(flexboxFixTimeoutId);

            flexboxFixTimeoutId = setTimeout(function () {
                if ($wrapper.scrollHeight > $window.innerHeight) {
                    $wrapper.style.height = 'auto';
                } else {
                    $wrapper.style.height = '100vh';
                }
            }, 250);
        });
    }

    // Nav.
    var $nav = $header ? $header.querySelector('nav') : null,
        $nav_li = $nav ? Array.from($nav.querySelectorAll('li')) : [];

    if ($nav_li.length % 2 === 0) {
        $nav.classList.add('use-middle');
        $nav_li[Math.floor($nav_li.length / 2)].classList.add('is-middle');
    }

    // Main.
    var delay = 325,
        locked = false;

    function showArticle(id, initial) {
        var $article = $main_articles.find(function (article) {
            return article.id === id;
        });

        if (!$article) return;

        if (locked || initial === true) {
            $body.classList.add('is-switching', 'is-article-visible');
            $main_articles.forEach(function (article) {
                article.classList.remove('active');
            });

            $header.style.display = 'none';
            $footer.style.display = 'none';

            $main.style.display = 'block';
            $article.style.display = 'block';
            $article.classList.add('active');

            locked = false;

            setTimeout(function () {
                $body.classList.remove('is-switching');
            }, initial ? 1000 : 0);

            return;
        }

        locked = true;

        if ($body.classList.contains('is-article-visible')) {
            var $currentArticle = $main_articles.find(function (article) {
                return article.classList.contains('active');
            });

            if ($currentArticle) {
                $currentArticle.classList.remove('active');

                setTimeout(function () {
                    $currentArticle.style.display = 'none';

                    $article.style.display = 'block';
                    setTimeout(function () {
                        $article.classList.add('active');
                        $window.scrollTo(0, 0);

                        setTimeout(function () {
                            locked = false;
                        }, delay);
                    }, 25);
                }, delay);
            }
        } else {
            $body.classList.add('is-article-visible');

            setTimeout(function () {
                $header.style.display = 'none';
                $footer.style.display = 'none';

                $main.style.display = 'block';
                $article.style.display = 'block';

                setTimeout(function () {
                    $article.classList.add('active');
                    $window.scrollTo(0, 0);

                    setTimeout(function () {
                        locked = false;
                    }, delay);
                }, 25);
            }, delay);
        }
    }

    function hideArticle(addState) {
        var $article = $main_articles.find(function (article) {
            return article.classList.contains('active');
        });

        if (!$body.classList.contains('is-article-visible')) return;

        if (addState) {
            history.pushState(null, null, '#');
        }

        if (locked) {
            $body.classList.add('is-switching');
            $article.classList.remove('active');

            $article.style.display = 'none';
            $main.style.display = 'none';

            $footer.style.display = 'block';
            $header.style.display = 'block';

            $body.classList.remove('is-article-visible');
            locked = false;
            $body.classList.remove('is-switching');
            $window.scrollTo(0, 0);
            return;
        }

        locked = true;

        $article.classList.remove('active');

        setTimeout(function () {
            $article.style.display = 'none';
            $main.style.display = 'none';

            $footer.style.display = 'block';
            $header.style.display = 'block';

            setTimeout(function () {
                $body.classList.remove('is-article-visible');
                $window.scrollTo(0, 0);

                setTimeout(function () {
                    locked = false;
                }, delay);
            }, 25);
        }, delay);
    }

    $main_articles.forEach(function (article) {
        var closeBtn = document.createElement('div');
        closeBtn.className = 'close';
        closeBtn.textContent = 'Close';
        article.appendChild(closeBtn);

        closeBtn.addEventListener('click', function () {
            location.hash = '';
        });

        article.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });

    $body.addEventListener('click', function () {
        if ($body.classList.contains('is-article-visible')) {
            hideArticle(true);
        }
    });

    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 27 && $body.classList.contains('is-article-visible')) {
            hideArticle(true);
        }
    });

    window.addEventListener('hashchange', function (event) {
        if (location.hash === '' || location.hash === '#') {
            event.preventDefault();
            event.stopPropagation();
            hideArticle();
        } else {
            var matchingArticle = $main_articles.find(function (article) {
                return article.id === location.hash.substr(1);
            });

            if (matchingArticle) {
                event.preventDefault();
                event.stopPropagation();
                showArticle(location.hash.substr(1));
            }
        }
    });

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    } else {
        var oldScrollPos = 0,
            scrollPos = 0,
            $htmlbody = document.documentElement;

        window.addEventListener('scroll', function () {
            oldScrollPos = scrollPos;
            scrollPos = $htmlbody.scrollTop;
        });

        window.addEventListener('hashchange', function () {
            window.scrollTo(0, oldScrollPos);
        });
    }

    $main.style.display = 'none';
    $main_articles.forEach(function (article) {
        article.style.display = 'none';
    });

    if (location.hash !== '' && location.hash !== '#') {
        window.addEventListener('load', function () {
            showArticle(location.hash.substr(1), true);
        });
    }
});
