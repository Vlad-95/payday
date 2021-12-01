$(document).ready(function() {   
    let btnNext = $('.step-next');
    let btnPrev = $('.step-back');
    let btnSubmit = $('.submit');
    let btnClose = $('.close');
    let form = $('.form');
    
    //Переключение по шагам
    function checkStep() {
        let stepActive = $('.step.active');
        let stepActiveNumb = stepActive.attr('data-step');

        return +stepActiveNumb;
    }

    function changeActiveNumber() {
        let stepActive = $('.step.active');
        let stepActiveNumb = stepActive.attr('data-step');
        let numberItem = $('.numbers__item');

        numberItem.removeClass('active');
        $('.numbers__item[data-step="'+ stepActiveNumb +'"]').addClass('active');
    }

    function stepHandle(action) {

        let allSteps = $('.step');

        if (action == "next") {        
            console.log(checkInput())
            if (checkInput()) {
                let currentStepNumb = checkStep();
                let nextStepNumb = (currentStepNumb == 4) ? currentStepNumb : currentStepNumb + 1;
    
                //=====показ/скрытие кнопки "К предыдущему шагу"
                if (nextStepNumb > 1) {
                    btnPrev.show();
                }
                //========            
                
                //====показ/скрытие кнопки submit
                if (nextStepNumb == 3) {
                    btnNext.hide();
                    btnSubmit.show();
                }
                //====
    
                allSteps.removeClass('active');
                $('.step[data-step="'+ nextStepNumb +'"]').addClass('active');
                btnNext.removeClass('disabled');
            } else {                
                btnNext.addClass('disabled');
            }
            
            
        }

        if (action == "prev") {
            let currentStepNumb = checkStep();
            let nextStepNumb = (currentStepNumb == 1) ? currentStepNumb : currentStepNumb - 1;
    
            //=====показ/скрытие кнопки "К предыдущему шагу"
            if (nextStepNumb < 4) {
                btnPrev.show();
            }
    
            if (nextStepNumb == 1) {
                btnPrev.hide();
            }
            //========
    
            //====показ/скрытие кнопки submit
            if (nextStepNumb == 3) {
                btnNext.hide();
                btnSubmit.show();
            } else {
                btnNext.show();
                btnSubmit.hide();
            }
            //====

            allSteps.removeClass('active');
            $('.step[data-step="'+ nextStepNumb +'"]').addClass('active');
        }

        if (action == "submit") {
            let currentStepNumb = checkStep();
            let nextStepNumb = (currentStepNumb == 4) ? currentStepNumb : currentStepNumb + 1;
    
            //=====скрытие кнопки "К предыдущему шагу"
            if (nextStepNumb == 4) {
                btnPrev.hide();
            }
            //========
    
            //====скрытие кнопки submit
            if (nextStepNumb == 4) {
                btnNext.hide();
                btnSubmit.hide();
                btnClose.show();
            } 
            //====

            allSteps.removeClass('active');
            $('.step[data-step="'+ nextStepNumb +'"]').addClass('active');
        }

        changeActiveNumber();
    }

    //проверка текстовых полей и чекбокса
    function checkInput() {
        if ($('.step[data-step="2"]').hasClass('active')) {
            let inputText = $('.form__item-input.required');       
            let agree = $('input.agree');    

            inputText.each(function() {
                if ($(this).val() == "") {
                    $(this).addClass('error');
                } else {
                    $(this).removeClass('error');
                }
            });

            if (agree.is(':checked')) {
                agree.removeClass('error')
            } else {
                agree.addClass('error');
            }
            
            if (inputText.hasClass('error') && agree.hasClass('error')) {
                return false;
            } else {
                return true;
            }
            
        } else {
            return true;
        }        
    }

    //ввод значений в поля
    $('input[data-valid="numbers"]').on('input', function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    })

    $('input[data-valid="letter"]').on('input', function () {
        if (this.value.match(/[^а-яА-Яa-zA-Z\s]/g)) {
            this.value = this.value.replace(/[^а-яА-Яa-zA-Z\s]/g, '');
        }
    });

    //маска
    $('input[name="inn"]').mask("999999999999", {placeholder:""});


    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    $('input[name="tel"]').click(function(){
        $(this).setCursorPosition(3);
    }).mask("+7(999) 999-9999");

    $('input[name="tel"]').mask("+7(999)999-99-99");



    btnNext.on('click', function(evt) {
        evt.preventDefault();
        stepHandle("next");
    });

    btnPrev.on('click', function(evt) {
        evt.preventDefault();
        stepHandle("prev")
    });

    // отправка формы
    /*
        Здесь только функционал переключения шагов при отправке формы
    */
    form.on('submit', function(evt) {
        evt.preventDefault();
        stepHandle("submit");
    });
    
    
    //=====Показ имени файлов========
    // $('.form').on('change', 'input[type="file"]', function() {
        
    //     //$('.files-list__item').remove();
    //     let fileName = $(this)[0].files[0].name;
    //     let clone = $(this).closest('.form__file').clone();
        
    //     let fileElement = $(document.createElement('div'));
    //     let fileElementDel = $(document.createElement('div'));

    //     fileElement.addClass('files-list__item');
    //     fileElementDel.addClass('delete');
    //     fileElement.attr('data-count', $('.form__file').length)

    //     fileElement.text(fileName);
    //     $('.files-list').append(fileElement);
    //     fileElement.append(fileElementDel);
        
    //     $('.form__item.file').append(clone)
    //     $(this).closest('.form__file').hide();
    //     clone.find('input').val('');
    //     clone.find('input').attr('data-count', $('.form__file').length);
    //     clone.find('input').attr('name', 'file['+ $('.form__file').length +']');        
    // })

    // //удаление файлов

    // $('.form').on('click', '.delete', function() {
    //     let fileItem = $(this).parent();
    //     let fileItemCount = fileItem.attr('data-count');

    //     $('input[data-count="'+ fileItemCount +'"]').val("");
    //     fileItem.hide();        
    // })

    //=====Показ имени файлов КОНЕЦ=======
});
