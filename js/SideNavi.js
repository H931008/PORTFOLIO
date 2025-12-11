; (function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'TweenMax'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS / nodejs module
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery, TweenMax);
    }
}(function ($, TweenMax) {
    var SideNavi = function (obj, cb) {
        var opt = {};
        $.extend(opt, obj);
        var _this = this,
            $sideNavi = $("#" + opt.id);
        $sideNavi.append('<article class="km-side-navi-outer"><div class="km-name-tag"><figure class="km-bg"></figure><ul></ul></div><ul class="km-side-navi-ul"></ul></article>');
        var $sideNaviOuter = $sideNavi.find(".km-side-navi-outer"),
            $sideNaviUl = $sideNavi.find(".km-side-navi-ul"),
            $sideNaviLi = $sideNaviUl.find('li'),
            $lime = $sideNaviLi.find('.km-semi-circle'),
            $circle = $sideNaviLi.find('span.km-circle'),
            $nameTag = $sideNavi.find(".km-name-tag"),
            $nameTagUl = $nameTag.find("ul"),
            $tagBg = $nameTag.find(".km-bg"),
            tempArr = [],
            initTime = 0,
            m = 32;
        this.crtID = -1;
        this.menu = [];
        $sideNavi.css(opt['position'], '2%');
        TweenMax.to($sideNavi, 1, { opacity: 1 });
        TweenMax.set($tagBg, { css: { "background-color": opt.themeColor } });
        this.init = function () {
            for (var p in opt.menu) {
                initTime += 100 * p;
                _this.appendMenu(opt.menu[p], 100 * p, parseInt(p) + 1)
            }
            if (opt.afterInit) {
                setTimeout(opt.afterInit, initTime + 600)
            }
        };
        this.appendMenu = function (menuName, time, itemId) {
            var $nameTagLi = $("<li>" + menuName + "</li>").appendTo($nameTagUl);
            $nameTagLi.css('color', opt.txtColor);
            tempArr[itemId] = {
                li: $nameTagLi,
                offsetX: $nameTagLi.offset().left - $sideNaviOuter.offset().left,
                width: $nameTagLi.outerWidth()
            };
            var $tLi = $("<li data-menuanchor='" + itemId + "'></li>");
            var $circle = $('<span class="km-circle"></span>'),
                $lime = $('<div class="km-semi-circle"></div>');
            TweenMax.set($sideNaviLi, {
                transformPerspective: 1E3
            });
            TweenMax.set($lime, { css: { "background-color": opt.themeColor } });
            if (opt.position === 'left') {
                TweenMax.set($lime, { css: { transform: "rotate(40deg)" } });
            } else {
                TweenMax.set($lime, { css: { transform: "rotate(-40deg)" } });
            }
            this.menu[itemId] = {
                name: menuName,
                li: $tLi,
                circle: $circle,
                id: itemId,
                lime: $lime,
                offsetY: 0
            };
            TweenMax.set([$circle, $lime], {
                scale: 0,
                opacity: 0
            });
            $circle.appendTo($tLi);
            $lime.appendTo($tLi);
            TweenMax.set($nameTag, {
                y: m - 8
            });
            setTimeout(function () {
                $tLi.appendTo($sideNaviUl);
                TweenMax.to($tLi, 2, {
                    minHeight: 16,
                    paddingTop: 8,
                    paddingBottom: 8,
                    ease: Elastic.easeOut
                });
                TweenMax.to($lime, 1, {
                    scale: 1,
                    opacity: 1,
                    ease: Elastic.easeOut
                });
                TweenMax.to($lime, .5, {
                    delay: .6,
                    scale: 0,
                    opacity: 0,
                    ease: Elastic.easeOut
                });
                TweenMax.to($circle, 2, {
                    delay: .5,
                    scale: 1,
                    opacity: 1,
                    ease: Elastic.easeOut
                });

                // Click handler for navigation
                $tLi.on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Show semi-circle animation
                    TweenMax.to($lime, 0.5, {
                        scale: 1,
                        opacity: 1,
                        ease: Elastic.easeOut
                    });
                    TweenMax.to($circle, 0.3, {
                        scale: 0,
                        opacity: 0,
                        ease: Elastic.easeOut
                    });

                    // Auto-hide semi-circle and show circle again after 1.5 seconds
                    setTimeout(function () {
                        TweenMax.to($lime, 0.5, {
                            scale: 0,
                            opacity: 0,
                            ease: Elastic.easeOut
                        });
                        TweenMax.to($circle, 0.5, {
                            scale: 1,
                            opacity: 1,
                            ease: Elastic.easeOut
                        });
                    }, 1500);

                    // Trigger scroll to section by index (0-based)
                    var sectionIndex = itemId - 1; // Convert 1-based to 0-based
                    var sections = $('#fullpage section');
                    var targetSection = sections.eq(sectionIndex);
                    if (targetSection.length) {
                        window.scrollTo({
                            top: targetSection.offset().top,
                            behavior: 'smooth'
                        });
                        // Update active state
                        $('#exampleSide .km-name-tag ul li').removeClass('active');
                        $('#exampleSide .km-name-tag ul li').eq(sectionIndex).addClass('active');
                        // Call activeMenuAndTag
                        if (_this.activeMenuAndTag) {
                            setTimeout(function () {
                                _this.activeMenuAndTag(itemId);
                            }, 100);
                        }
                    }
                });

                $tLi.on("mouseover", function () {
                    _this.activeMenu(itemId);
                    _this.moveTag(itemId)
                });
                $tLi.on("mouseout", function () {
                    _this.activeMenu(_this.crtID);
                    _this.moveTag(-1)
                });
            }, time)
        };
        this.activeOn = function (a, b) {
            TweenMax.to(a, 2, {
                scale: 1,
                opacity: 1,
                ease: Elastic.easeOut
            });
            TweenMax.to(b, 1, {
                scale: 0,
                opacity: 0,
                ease: Elastic.easeOut
            })
        };
        this.activeOff = function (a, b) {
            TweenMax.to(a, 1, {
                scale: 0,
                opacity: 0,
                ease: Elastic.easeOut
            });
            TweenMax.to(b, 2, {
                scale: 1,
                opacity: 1,
                ease: Elastic.easeOut
            })
        };
        this.moveTag = function (menuId) {
            if (clearTimeout(timer), -1 == menuId) {
                if (opt.position === 'left') {
                    TweenMax.set($nameTag, {
                        left: 40,
                        width: 0
                    });
                } else {
                    TweenMax.set($nameTag, {
                        right: 40,
                        width: 0
                    });
                }
            } else {
                var tempX = -tempArr[menuId].offsetX;
                //left/right：nametag side navi
                //y：nametag
                //width：nametag
                if (opt.position === 'left') {
                    TweenMax.set($nameTag, {
                        left: 50,
                        y: 32 * menuId,
                        width: tempArr[menuId].width
                    });
                } else {
                    TweenMax.set($nameTag, {
                        right: 50,
                        y: 32 * menuId,
                        width: tempArr[menuId].width
                    });
                }
                //x：nametag ul
                TweenMax.set($nameTagUl, {
                    x: tempX
                })

            }
        };
        this.activeMenu = function (itemId) {
            for (var key in _this.menu) {
                var item = _this.menu[key];
                key == itemId ? this.activeOn(item.lime, item.circle) : this.activeOff(item.lime, item.circle)
            }
        };
        this.menuChange = function (itemId) {
            _this.crtID = itemId;
            _this.activeMenu(itemId)
        };
        var timer = null;
        this.tagViewMoment = function (itemId) {
            this.moveTag(itemId);
            clearTimeout(timer);
            timer = setTimeout(function () {
                _this.moveTag(-1);
                timer = null
            }, 900)
        };
        this.activeMenuAndTag = function (itemId) {
            this.menuChange(itemId);
            this.tagViewMoment(itemId);
        }
        function setTransition(target, time, func) {
            time = time + "s " + func;
            target.css({
                "-webkit-transition": time,
                transition: time
            });
        }
        function setAnimate() {
            setTransition($nameTag, .3, "cubic-bezier(0.44,0.09,0.29,1)");
            setTransition($nameTagUl, .5, "cubic-bezier(0.72,-0.21,0.17,1)")
        }
        setAnimate.call(this);
        this.init();
    };
    window.SideNavi = SideNavi;
    return SideNavi;
}))