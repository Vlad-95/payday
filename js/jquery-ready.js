$(document).ready(function() {
    //===========Мобильное меню
    let body = $('body')
    let windowWidth = window.innerWidth;
    let header = $('.header');
    let headerWrap = $('.header__wrap');
    let nav = header.find('.nav');
    let phone = header.find('.phone');
    let lang = header.find('.lang')
    let burger = $('.burger');
    let windowHeight = $(window).height();

    if (windowWidth <= 992) {
        //создаем контейнер для менюшки
        let mobileMenu = $(document.createElement('div'));
        mobileMenu.addClass('mobile-menu');

        headerWrap.append(mobileMenu)

        //клонируем элементы хедера
        let mobileNav = nav.clone();
        let mobilePhone = phone.clone();
        let mobileLang = lang.clone();

        mobileMenu.append(mobileNav);
        mobileMenu.append(mobilePhone);  
        mobileMenu.append(mobileLang);        
    }

    function showMenu() {
        let mobileMenu = $('.mobile-menu');

        burger.toggleClass('active');
        body.toggleClass('no-scroll');
        mobileMenu.toggleClass('active');
    }

    burger.click(showMenu);

    //============Мобильное меню (КОНЕЦ)

    //====Переключалка языков======
    if ($(window).width() >= 992) {
        $('.lang').click(function() {
            $(this).find('.lang__toggle').toggleClass('active');
            $('.lang__content').slideToggle();
        })
    }
    
    //====Переключалка языков КОНЕЦ======

    //=====Якорные ссылки====
    function anchorLinks () {
        let currentLink = $(this).attr('data-anchor');
        let currentDiv = $('[data-anchor="'+ currentLink +'"]:not(a)');        

        //скролл до элемента
        $('html, body').animate({scrollTop: currentDiv.offset().top}, 500);

        if (windowWidth <= 992) {
            let mobileMenu = $('.mobile-menu');

            burger.removeClass('active');
            body.removeClass('no-scroll');
            mobileMenu.removeClass('active');
        }
    }

    $('a[data-anchor]').click(anchorLinks);

    //=====Якорные ссылки КОНЕЦ==

    //=====табы в блоке УСТАНОВКА======
    if ($('.install').length) {
        $('.install .tabs').on('click', '.tabs__item:not(".active")', function() {
           $(this).addClass('active').siblings().removeClass('active');

           $(this).closest('.install').find('.install__item').eq($(this).index()).fadeIn().addClass('active').siblings('.install__item').hide().removeClass('active');


           $('.install__item').find('.js-slider').slick('setPosition')

        });
    }
    //=====табы в блоке УСТАНОВКА КОНЕЦ==============

    //=====Слайдеры в блоке УСТАНОВКА======
    if ($('.install .js-slider').length) {
        $('.install .js-slider').slick({
            slidesToShow: 1,
            dots: true,
            arrows: false
        })
    }
    //=====Слайдеры в блоке УСТАНОВКА КОНЕЦ==============

    

    //=====Слайдер Галерея=========
    if($('.gallery').length) {
        $('.js-gallery').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: true,
            infinite: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 2,
                        infinite: true
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                        infinite: true,
                        arrows: false
                    }
                }
            ]
        });

        

        $('.js-gallery').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            let slideCount = $('.js-gallery .slick-slide').length;

            if ($(window).width() >= 993) {
                if (nextSlide == (slideCount - 1)) {
                    $('.js-gallery .slick-next').addClass('last-slide')
                } else {
                    $('.js-gallery .slick-next').removeClass('last-slide')
                }
    
                if (nextSlide == 0) {
                    $('.js-gallery .slick-prev').removeClass('first-slide')
                } else {
                    $('.js-gallery .slick-prev').addClass('first-slide')
                }
            }
            
            
        });

        
    }

    //=====Слайдер Галерея КОНЕЦ========

    
    //=====Табы в свяжитесь с нами=====
    if ($('.feedback').length) {
        $('.feedback .tabs').on('click', '.tabs__item:not(".active")', function() {
            $(this).addClass('active').siblings().removeClass('active');

            $(this).closest('.install').find('.install__item').eq($(this).index()).fadeIn().addClass('active').siblings('.install__item').hide().removeClass('active');

            
            if ($(this).attr('data-tab') == "feedback_visit") {
                $('.question-content').hide();
                $('.form').show();
                $('.form__item[data-tab="feedback_message"]').hide().find('input, textarea').prop('disabled', true);
                $('.form__item[data-tab="feedback_visit"]').show().find('input, textarea').prop('disabled', false);
            } else if ($(this).attr('data-tab') == "feedback_message") {
                $('.question-content').hide();
                $('.form').show();
                $('.form__item[data-tab="feedback_visit"]').hide().find('input, textarea').prop('disabled', true);
                $('.form__item[data-tab="feedback_message"]').show().find('input, textarea').prop('disabled', false);
            } else if ($(this).attr('data-tab') == "question") {
                $('.form').hide();
                $('.question-content').show();
            }

        });

        $('.intro .btns').on('click', '.btns__item', function () {
            let tab = $(this).attr('data-tab');

            if (tab) {
                $('.feedback .tabs .tabs__item[data-tab="'+ tab +'"]').addClass('active').siblings().removeClass('active');

                if (tab == "feedback_visit") {
                    $('.form__item[data-tab="feedback_message"]').hide().find('input, textarea').prop('disabled', true);
                    $('.form__item[data-tab="feedback_visit"]').show().find('input, textarea').prop('disabled', false);
                } else if (tab == "feedback_message") {
                    $('.form__item[data-tab="feedback_visit"]').hide().find('input, textarea').prop('disabled', true);
                    $('.form__item[data-tab="feedback_message"]').show().find('input, textarea').prop('disabled', false);
                }
            }
            
        })
    }
    //=====Табы в свяжитесь с нами КОНЕЦ======


    //=====Показ ошибки, если файл большой=====
    $('.form').on("change", "input[type='file']", function () {
        if ($(this)[0].files[0]) {
            let e = $(this)[0].files[0],
                i = $('.files-list .error'),
                t = Number((e.size / 1e6).toPrecision(2)),
                o = Number($(this).attr("data-max-file-size"));

            if (o && o < t) {
                i.text($(this).data().fileIsTooBigMessage);
                $(this).val("");
            } else {
                i.text("");
            }
        }
    })

    //=====

    //=====Показ имени файлов========
    $('.form').on('change', 'input[type="file"]', function() {
        
        //$('.files-list__item').remove();
        let fileName = $(this)[0].files[0].name;
        let clone = $(this).closest('.form__file').clone();
        
        let fileElement = $(document.createElement('div'));
        let fileElementDel = $(document.createElement('div'));

        fileElement.addClass('files-list__item');
        fileElementDel.addClass('delete');
        fileElement.attr('data-count', $('.form__file').length)

        fileElement.text(fileName);
        $('.files-list').append(fileElement);
        fileElement.append(fileElementDel);
        
        $('.form__item.file').append(clone)
        $(this).closest('.form__file').hide();
        clone.find('input').val('');
        clone.find('input').attr('data-count', $('.form__file').length);
        clone.find('input').attr('name', 'file['+ $('.form__file').length +']');        
    })

    //удаление файлов

    $('.form').on('click', '.delete', function() {
        let fileItem = $(this).parent();
        let fileItemCount = fileItem.attr('data-count');

        $('input[data-count="'+ fileItemCount +'"]').val("");
        fileItem.hide();        
    })

    //=====Показ имени файлов КОНЕЦ=======
});
