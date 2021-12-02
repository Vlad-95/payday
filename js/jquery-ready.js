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
            let inputs = $('.form__item-input.required');       
            let agree = $('input.agree');

            inputs.each(function() {
                if ($(this).val() == "") {
                    $(this).addClass('error');
                } else {
                    $(this).removeClass('error');
                }
            });

            if (!agree.is(':checked')) {
                agree.addClass('error')
            } else {
                agree.removeClass('error');
            }
            
            if ($('.step[data-step="2"].active input.error').length) {
                btnNext.addClass('disabled');
                $('div.error').text('Поля обозначенные * являются обязательными для заполнения').fadeIn();
                return false;
            } else {
                btnNext.removeClass('disabled');
                $('div.error').text('').fadeOut()
                return true
            }
            
        } else {
            return true;
        }        
    }

    $('input').on('change', checkInput);

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
    
    
    //=====Инпут с файлами========
    let dropzone = $('.dropzone');
	let base_url = window.location.origin + '/';

    dropzone.on('dragover', function() {
        $(this).addClass('dragover');
        return false;
    });
    
    dropzone.on('dragleave', function() {
        $(this).removeClass('dragover');
        return false;
    });
    
    dropzone.on('drop', function(evt) {
        evt.preventDefault();
        $(this).removeClass('dragover');

        let files = evt.originalEvent.dataTransfer.files;

        console.log(files[0])

        for (let i = 0; i < files.length; i++) {
            dropzone.next().append('<div class="filelist__item"><p class="filelist__item-name">'+ files[i].name +'</p><div class="delete"></div></div>')
        }
    });

    $('#files').filepond();

    $('#files').on('change', function(evt) {
        console.log($(this).val());
        // let dt = new DataTransfer();

        // console.log(dt.files)
    
        // let files = $(this)[0].files[0];

        // let reader = new FileReader();
      
        // reader.readAsDataURL(files);
      
        // reader.onload = function() {
        //   console.log(reader.result);
        // };
      
        // reader.onerror = function() {
        //   console.log(reader.error);
        // };

        // for (let file of files) {
        //     //dt.items.add(files[i]);
            
        //     dropzone.next().append('<div class="filelist__item"><p class="filelist__item-name">'+ file.name +'</p><div class="delete"></div></div>')
        // }

    });

    $('.filelist').on('click', '.delete', function() {
        $(this).closest('.filelist__item').remove();
    })
});
