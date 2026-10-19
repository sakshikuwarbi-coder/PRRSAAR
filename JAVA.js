// =====================================================
// 01. PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // 02. TAB LINKS
    // =====================================================

    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(function (link) {

        link.addEventListener("mouseenter", function (e) {

            e.preventDefault();

            // Remove active class from all links
            tabLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            // Add active class to hovered link
            this.classList.add("active");

            // Hide all tab contents
            tabContents.forEach(function (content) {
                content.classList.remove("active");
            });

            // Get target tab ID
            const targetTabId = this.getAttribute("data-tab");

            // Find target content
            const targetTabContent =
                document.getElementById(targetTabId);

            // Show target content
            if (targetTabContent) {
                targetTabContent.classList.add("active");
            }

        });

    });


    // =====================================================
    // 03. TESTIMONIAL SLIDER
    // =====================================================

    // Get HTML elements
    const track = document.getElementById("testimonialTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const sliderWindow = document.getElementById("sliderWindow");


    // Check if slider elements exist
    if (!track || !prevBtn || !nextBtn || !sliderWindow) {
        console.warn("Testimonial slider elements not found.");
        return;
    }


    // =====================================================
    // 04. SLIDER VARIABLES
    // =====================================================

    let currentIndex = 0;
    let autoSlideInterval;


    // =====================================================
    // 05. CARDS PER VIEW
    // =====================================================

    function getCardsPerView() {

        if (window.innerWidth <= 992) {
            return 1;
        }

        return 3;
    }


    // =====================================================
    // 06. UPDATE SLIDER POSITION
    // =====================================================

    function updateSlider() {

        const card = track.querySelector(".testimonial-card");

        if (!card) {
            return;
        }

        const gap = 25;

        const cardWidth = card.offsetWidth + gap;

        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;

        syncDots();
    }


    // =====================================================
    // 07. NEXT SLIDE
    // =====================================================

    function nextSlide() {

        const totalCards = track.children.length;

        const cardsPerView = getCardsPerView();

        const maxIndex =
            Math.max(0, totalCards - cardsPerView);


        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }

        updateSlider();
    }


    // =====================================================
    // 08. PREVIOUS SLIDE
    // =====================================================

    function prevSlide() {

        const totalCards = track.children.length;

        const cardsPerView = getCardsPerView();

        const maxIndex =
            Math.max(0, totalCards - cardsPerView);


        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex = maxIndex;

        }

        updateSlider();
    }


    // =====================================================
    // 09. START AUTO SLIDE
    // =====================================================

    function startAutoScroll() {

        stopAutoScroll();

        autoSlideInterval =
            setInterval(nextSlide, 3000);
    }


    // =====================================================
    // 10. STOP AUTO SLIDE
    // =====================================================

    function stopAutoScroll() {

        clearInterval(autoSlideInterval);
    }


    // =====================================================
    // 11. NEXT BUTTON
    // =====================================================

    nextBtn.addEventListener("click", function () {

        nextSlide();

        stopAutoScroll();

        startAutoScroll();

    });


    // =====================================================
    // 12. PREVIOUS BUTTON
    // =====================================================

    prevBtn.addEventListener("click", function () {

        prevSlide();

        stopAutoScroll();

        startAutoScroll();

    });


    // =====================================================
    // 13. PAUSE ON HOVER
    // =====================================================

    sliderWindow.addEventListener(
        "mouseenter",
        stopAutoScroll
    );


    // =====================================================
    // 14. RESUME AFTER HOVER
    // =====================================================

    sliderWindow.addEventListener(
        "mouseleave",
        startAutoScroll
    );


    // =====================================================
    // 15. RESET ON SCREEN RESIZE
    // =====================================================

    window.addEventListener("resize", function () {

        currentIndex = 0;

        updateSlider();

        buildDots();

    });


    // =====================================================
    // 16. SLIDER DOTS
    // =====================================================

    const dotsWrap = document.getElementById("sliderDots");

    function buildDots() {

        if (!dotsWrap) {
            return;
        }

        dotsWrap.innerHTML = "";

        const pages =
            Math.max(0, track.children.length - getCardsPerView()) + 1;

        for (let i = 0; i < pages; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.className = "slider-dot";

            dot.setAttribute("aria-label", "Go to slide " + (i + 1));

            dot.addEventListener("click", function () {

                currentIndex = i;

                updateSlider();

                stopAutoScroll();

                startAutoScroll();

            });

            dotsWrap.appendChild(dot);
        }

        syncDots();
    }

    function syncDots() {

        if (!dotsWrap) {
            return;
        }

        const dots = dotsWrap.querySelectorAll(".slider-dot");

        dots.forEach(function (dot, i) {

            dot.classList.toggle("active", i === currentIndex);
        });
    }

    buildDots();


    // =====================================================
    // 17. INITIALIZE SLIDER
    // =====================================================

    updateSlider();

    startAutoScroll();

});
document.addEventListener("DOMContentLoaded", function () {
    const sebiModal = document.getElementById("sebiModalOverlay");
    const closeBtn = document.getElementById("closeSebiModal");
    const rdModal = document.getElementById("rdModalOverlay");

    function openRdModal() {
        if (rdModal) {
            setTimeout(function () {
                rdModal.classList.add("active");
            }, 250);
        }
    }

    if (sebiModal) {
        // Page load hone ke 400ms baad automatically open hoga
        setTimeout(function () {
            sebiModal.classList.add("active");
        }, 400);

        // Close hone par agla popup (Risk Disclosures) khulega
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                sebiModal.classList.remove("active");
                openRdModal();
            });
        }

        // Bahar background overlay par click karne par bhi band hoga
        sebiModal.addEventListener("click", function (e) {
            if (e.target === sebiModal) {
                sebiModal.classList.remove("active");
                openRdModal();
            }
        });
    }

    if (rdModal) {
        ["closeRdModal", "rdOkBtn"].forEach(function (id) {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener("click", function () {
                    rdModal.classList.remove("active");
                });
            }
        });

        rdModal.addEventListener("click", function (e) {
            if (e.target === rdModal) {
                rdModal.classList.remove("active");
            }
        });
    }
});

// =====================================================
// MOBILE NAV DRAWER (auto-injected on every page)
// =====================================================
(function () {

    function initMobileNav() {

        var navbar = document.querySelector(".navbar");
        if (!navbar || document.getElementById("mobileMenuToggle")) {
            return;
        }

        var nav = navbar.querySelector("nav");
        var navButtons = navbar.querySelector(".nav-buttons");

        var toggle = document.createElement("button");
        toggle.type = "button";
        toggle.id = "mobileMenuToggle";
        toggle.className = "menu-toggle";
        toggle.setAttribute("aria-label", "Open Menu");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navbar.appendChild(toggle);

        var overlay = document.createElement("div");
        overlay.className = "mobile-drawer-overlay";

        var drawer = document.createElement("div");
        drawer.className = "mobile-drawer";

        var head = document.createElement("div");
        head.className = "drawer-head";
        head.innerHTML = '<span class="drawer-title">Menu</span>';

        var closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "drawer-close";
        closeBtn.setAttribute("aria-label", "Close Menu");
        closeBtn.innerHTML = "&times;";
        head.appendChild(closeBtn);
        drawer.appendChild(head);

        if (nav) {
            var navClone = nav.cloneNode(true);

            // Rename ids (keep them unique in drawer for tab lookups)
            navClone.querySelectorAll("[id]").forEach(function (el) {
                el.id = "m-" + el.id;
            });
            navClone.querySelectorAll("[data-tab]").forEach(function (el) {
                el.setAttribute("data-tab", "m-" + el.getAttribute("data-tab"));
            });

            // Separate "Home" entry at top of drawer
            var homeLink = document.createElement("a");
            homeLink.href = "index.html";
            homeLink.textContent = "Home";
            navClone.insertBefore(homeLink, navClone.firstChild);

            drawer.appendChild(navClone);
        }

        if (navButtons) {
            var btnsClone = navButtons.cloneNode(true);
            btnsClone.className = "nav-buttons drawer-buttons";
            drawer.appendChild(btnsClone);
        }

        document.body.appendChild(overlay);
        document.body.appendChild(drawer);

        function openDrawer() {
            document.body.classList.add("drawer-open");
            toggle.setAttribute("aria-expanded", "true");
        }

        function closeDrawer() {
            document.body.classList.remove("drawer-open");
            toggle.setAttribute("aria-expanded", "false");
        }

        toggle.addEventListener("click", openDrawer);
        closeBtn.addEventListener("click", closeDrawer);
        overlay.addEventListener("click", closeDrawer);

        window.addEventListener("resize", function () {
            if (window.innerWidth > 1024) {
                closeDrawer();
            }
        });

        // Hover-only mega dropdown becomes tap-to-expand inside drawer
        drawer.querySelectorAll(".dropdown").forEach(function (dd) {
            var btn = dd.querySelector(".dropbtn");
            if (!btn) {
                return;
            }
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                drawer.querySelectorAll(".dropdown.open").forEach(function (other) {
                    if (other !== dd) {
                        other.classList.remove("open");
                    }
                });
                dd.classList.toggle("open");

                // Fresh state: only category names visible, no sub-lists open
                if (dd.classList.contains("open")) {
                    dd.querySelectorAll(".tab-content").forEach(function (tc) {
                        tc.classList.remove("active");
                    });
                    dd.querySelectorAll(".tab-link").forEach(function (tl) {
                        tl.classList.remove("active");
                    });
                }
            });
        });

        // Progressive accordion: tap a category -> only its list expands
        drawer.querySelectorAll(".tab-link").forEach(function (link) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                var dd = link.closest(".dropdown");
                if (!dd) {
                    return;
                }
                var targetId = link.getAttribute("data-tab");
                var target = document.getElementById(targetId);
                var wasActive = link.classList.contains("active");

                dd.querySelectorAll(".tab-content").forEach(function (tc) {
                    tc.classList.remove("active");
                });
                dd.querySelectorAll(".tab-link").forEach(function (tl) {
                    tl.classList.remove("active");
                });

                if (!wasActive && target) {
                    target.classList.add("active");
                    link.classList.add("active");
                }
            });
        });

        // Close drawer after navigating
        drawer.querySelectorAll("a").forEach(function (link) {
            if (link.closest(".dropdown") &&
                (link.classList.contains("dropbtn") || link.classList.contains("tab-link"))) {
                return;
            }
            link.addEventListener("click", closeDrawer);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMobileNav);
    } else {
        initMobileNav();
    }

})();

// =====================================================
// NAV / DRAWER ACTION BUTTONS -> LIVE PRRSAAR PORTALS
// =====================================================
(function () {

    var OPEN_ACCOUNT = "https://live.meon.co.in/prrsaar/individual";
    var LOGIN = "https://backoffice.prrsaar.com:8085/capexweb/capexweb";

    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".nav-buttons .primary, .nav-buttons .bag");
        if (!btn) {
            return;
        }
        var url = btn.classList.contains("primary") ? OPEN_ACCOUNT : LOGIN;
        window.open(url, "_blank", "noopener");
    });

})();

// =====================================================
// POLICY PAGES: AUTO IN-PAGE "ON THIS PAGE" INDEX
// =====================================================
(function () {

    function buildPolicyToc() {

        var art = document.querySelector(".policy-verbatim-article, .policy-article");
        if (!art) {
            return;
        }

        var heads = art.querySelectorAll("h3");
        if (heads.length < 3) {
            return;
        }

        var items = "";

        heads.forEach(function (h, i) {

            if (!h.id) {
                h.id = "policy-sec-" + (i + 1);
            }

            items += '<li><a href="#' + h.id + '">' + h.textContent.trim() + "</a></li>";
        });

        var toc = document.createElement("details");
        toc.className = "policy-toc";
        toc.innerHTML = '<summary><i class="fa-solid fa-list-ul"></i> On This Page</summary><ul class="policy-toc-list">' + items + "</ul>";

        if (window.innerWidth <= 768) {
            toc.open = false;
        }

        var side = document.querySelector(".policy-sidebar, .policies-sidebar-box");
        if (side) {
            side.insertBefore(toc, side.firstChild);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildPolicyToc);
    } else {
        buildPolicyToc();
    }

})();