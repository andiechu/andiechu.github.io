// document is ready...
$(function() {
    $('.code pre, pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    var url_string = window.location.href;
    if (url_string.indexOf("blog") > -1) {
        var url_params = new URL(url_string).searchParams;
        var page = url_params.get("page");
        console.log(page);
    }

    if (url_string.indexOf("portfolio") > -1) {
        var carousel = $('.carousel');

        carousel.slick({
            initialSlide: 0,
            vertical: true,
            verticalSwiping: true,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 3,
            infinite: false,
            arrows: false,
            // responsive: [
            //     {
            //         breakpoint: 768,
            //         settings: {
            //             arrows: false,
            //             centerMode: true,
            //             centerPadding: '40px',
            //             slidesToShow: 3
            //         }
            //     },
            //     {
            //         breakpoint: 480,
            //         settings: {
            //             arrows: false,
            //             centerMode: true,
            //             centerPadding: '40px',
            //             slidesToShow: 1
            //         }
            //     }
            // ]
        });

        var projectPaginatorList = $(".portfolio-paginator-item");
        projectNum = projectPaginatorList.length;

        for (var i = 0; i < projectNum; i++) {
            if (i == projectNum-1) {
                $(".portfolio-paginator-item:nth-of-type(1)").css("top", "50%").css("transform", "translate(0, -50%)").css("-webkit-transform", "translate(0, -50%)");
            } else {
                $(".portfolio-paginator-item:nth-of-type(" + (projectNum - i) + ")").css("top", "calc(100% - "+ (i*10 + (i+1)*2)+"px)").css("transform", "translate(0, 0)").css("-webkit-transform", "translate(0, 0)");
            }

            $("#project-" + (i+1)).click(function(event) {
                var num = Math.floor(this.getAttribute("id").split(/-/)[1]);
                $(".carousel").slick("slickGoTo", num-1);
            });
        }

        carousel.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
            for (var i = 0; i <= nextSlide-1; i++) {
                var pagTop = $(".portfolio-paginator-item:nth-of-type(" + (i + 1) + ")");
                pagTop.css("top", i * (10 + 2) + "px").css("transform", "translate(0, 0)").css("-webkit-transform", "translate(0, 0)")

            }

            for (var i = 0; i < (projectNum - nextSlide); i++) {
                var pagBottom = $(".portfolio-paginator-item:nth-of-type(" + (projectNum - i) + ")");
                // pagBottom.css("top", "").css("bottom", i * (10 + 2) + "px").css("transform", "translate(0, 0)").css("-webkit-transform", "translate(0, 0)")
                pagBottom.css("top", "calc(100% - "+ (i*10 + (i+1)*2)+"px)").css("transform", "translate(0, 0)").css("-webkit-transform", "translate(0, 0)")
            }

            var centerPag = $(".portfolio-paginator-item:nth-of-type(" + (nextSlide+1) + ")")
            centerPag.css("top", "50%").css("transform", "translate(0, -50%)").css("-webkit-transform", "translate(0, -50%)")

            $("#project-cover-" + (currentSlide+1)).removeClass("show")
        });

        carousel.on("afterChange", function(event, slick, currentSlide) {
            $("#project-cover-" + (currentSlide+1)).addClass("show")
        });

    }


    var menuBtn = $(".menu-btn");
    var menuEl = $(".menu");
    var menuPanel = $(".menu-panel");
    var socialList = $(".social-media-list");
    var menuItemList = $(".menu-list-item");

    menuBtn.hover(function () {
        $(this).toggleClass("to-expand");
    });

    function menuBtnAction() {
        menuBtn.toggleClass("to-expand");

        if (menuBtn.hasClass("on-menu")) {
            menuBtn.addClass("off-menu");
        } else if (menuBtn.hasClass("off-menu")) {
            menuBtn.removeClass("off-menu");
        }
        menuBtn.toggleClass("on-menu");

        if (menuEl.hasClass("show")) {
            menuEl.addClass("noshow");
        } else if (menuEl.hasClass("noshow")) {
            menuEl.removeClass("noshow");
        }
        menuEl.toggleClass("show");

        if (menuPanel.hasClass("expend")) {
            menuPanel.addClass("collapse");
        } else if (menuPanel.hasClass("collapse")) {
            menuPanel.removeClass("collapse");
        }
        menuPanel.toggleClass("expend");

        if (socialList.hasClass("show")) {
            socialList.addClass("noshow");
        } else if (socialList.hasClass("noshow")) {
            socialList.removeClass("noshow");
        }
        socialList.toggleClass("show");

        if (menuItemList.hasClass("show")) {
            menuItemList.addClass("noshow");
        } else if (menuItemList.hasClass("noshow")) {
            menuItemList.removeClass("noshow");
        }
        menuItemList.toggleClass("show");
    }

    menuBtn.click(menuBtnAction);

    var content = $("main > div");
    var scrollbar = $(".scrollbar");
    var scrolltag = $(".scrollbar span");

    if (url_string.indexOf("portfolio") > -1 && !url_string.match(/portfolio\/$/)) {
        var project_content = $(".project-content-wrapper");
        var project_title = $(".project-content-title");

        if (project_content.scrollHeight <= project_content.clientHeight) {
            scrollbar.addClass("noscroll");
        } else {
            scrollbar.removeClass("noscroll");
        }

        $(window).resize(function() {
            if (project_content.scrollHeight <= project_content.clientHeight) {
                scrollbar.addClass("noscroll");
            } else {
                scrollbar.removeClass("noscroll");
            }
        });

        project_content.scroll(function() {
            var rate = this.scrollTop/(this.scrollHeight - this.clientHeight);
            scrolltag.css("transform", "translate(0, " + rate*(scrollbar[0].clientHeight-scrolltag[0].clientHeight) + "px");
            project_title.scrollLeft(rate * (project_title[0].scrollWidth-project_title[0].clientWidth));
        });

        project_title.scroll(function() {
            var rate = this.scrollLeft/(this.scrollWidth - this.clientWidth);
            scrolltag.css("transform", "translate(0, " + rate*(scrollbar[0].clientHeight-scrolltag[0].clientHeight) + "px");
            project_content.scrollTop(rate * (project_content[0].scrollHeight-project_content[0].clientHeight));
        });
    } else if (content.length > 0) {
        if (content[0].scrollHeight <= content[0].clientHeight) {
            scrollbar.addClass("noscroll");
        }

        $(window).resize(function() {
            if (content[0].scrollHeight <= content[0].clientHeight) {
                scrollbar.addClass("noscroll");
            } else {
                scrollbar.removeClass("noscroll");
            }
        });

        content.scroll(function() {
            var rate = this.scrollTop/(this.scrollHeight - this.clientHeight);
            scrolltag.css("transform", "translate(0, " + rate*(scrollbar[0].clientHeight-scrolltag[0].clientHeight) + "px");
            // scrolltag.context.style.transform = "translate(0, " + rate*(scrollbar.context.clientHeight-scrolltag.context.clientHeight) + "px";
        });
    } else {
        scrollbar.addClass("noscroll");
    }

});

// every content is ready...
$(window).on("load", function() {
    $(".page-loader").addClass("closed");
});



