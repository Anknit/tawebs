/*global $*/
(function () {
    'use strict';
    if (!("ontouchstart" in document.documentElement)) {
        document.body.className += " no-touch";
    }
    var appObj = {};
    $(function () {
        window.onscroll = function () {
            if (window.scrollY > 70) {
                $('body').addClass('scroll');
            } else {
                $('body').removeClass('scroll');
            }
        };
        appObj.animator = new appObj.class_animator();
        appObj.animator.slide('slide-container');
        appObj.animator.imageSlider('highlight', 'inner-screen');
        appObj.animator.startAutoImageSlider();
    });
    appObj.class_animator = function () {
        var recursiveId, imageSliderIndex = 0;
        this.slide = function (selectorClass) {
            $('.' + selectorClass).bind('mouseover', function (event) {
                var elem = $(this);
                elem.find('.slide-item').each(function () {
                    var direction, item = $(this);
                    item.addClass('revealed');
                });
                elem.removeClass(selectorClass);
                elem.unbind('mouseover');
            });
        };
        this.imageSlider = function (initiatorClass, imageContainer) {
            var imgContainer, classObj = this;
            imgContainer = $('.' + imageContainer);
            $('.' + initiatorClass).bind('mouseover', function () {
                classObj.stopAutoImageSlider();
                imageSliderIndex = Number($(this).attr('data-index'));
                var leftValue = -1 * 193 * imageSliderIndex;
                imgContainer.find('img').each(function () {
                    $(this).css('left', leftValue + 'px');
                });
            });
            $('.' + initiatorClass).bind('mouseout', function () {
                imageSliderIndex = Number($(this).attr('data-index'));
                classObj.startAutoImageSlider();
            });
        };
        function recursiveSlideNext() {
            imageSliderIndex = imageSliderIndex + 1;
            if (imageSliderIndex === 6) {
                imageSliderIndex = 0;
            }
            $('.highlight.highlighted').removeClass('highlighted');
            $('.highlight[data-index="' + imageSliderIndex + '"]').addClass('highlighted');
            var leftValue = -1 * 193 * imageSliderIndex;
            $('.inner-screen').find('img').each(function () {
                $(this).css('left', leftValue + 'px');
            });
        }
        this.startAutoImageSlider = function () {
            recursiveId = window.setInterval(recursiveSlideNext, 2000);
        };
        this.stopAutoImageSlider = function () {
            $('.highlight.highlighted').removeClass('highlighted');
            window.clearInterval(recursiveId);
        };
    };
}());