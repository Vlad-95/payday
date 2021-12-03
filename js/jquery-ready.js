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
            if (checkInput()) {
                let currentStepNumb = checkStep();
                let nextStepNumb = (currentStepNumb == 4) ? currentStepNumb : currentStepNumb + 1;
        
                //=====скрытие кнопки "К предыдущему шагу"
                if (nextStepNumb == 4) {
                    //btnPrev.hide();
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
                $('div.error').text('').fadeOut();
                return true
            }
            
        } else if ($('.step[data-step="3"]').hasClass('active')) {

            if (!$('.filelist').find('filelist__item').length) {
                btnSubmit.addClass('disabled');
                $('div.error').text('Прикрепите минимум один документ для продолжения').fadeIn();

                return false;
            } else {
                btnNext.removeClass('disabled');
                $('div.error').text('').fadeOut();
                
                return true;
            }
        } else {
            return true;
        }        
    }

    $('input[type="text"]').on('change', checkInput);

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
    btnSubmit.on('click', function(evt) {
        evt.preventDefault();
        stepHandle("submit");
    })
    
    form.on('submit', function(evt) {
        evt.preventDefault();
        
    });
    
    
    //=====Инпут с файлами========
    let dropZone = $('.dropzone');
    let filelist = $('.filelist');
    

    dropZone.on('dragover', function() {
        $(this).addClass('dragover');
        return false;
    });
    
    dropZone.on('dragleave', function() {
        $(this).removeClass('dragover');
        return false;
    });
    
    dropZone.on('drop', function(evt) {
        evt.preventDefault();
        $(this).removeClass('dragover');
        upload(evt.originalEvent.dataTransfer.files)
    });    

    $('.files').change(function(){
        upload(this.files);

        if ($(this).val() != "") {
            btnSubmit.removeClass('disabled');
            $('div.error').text('').fadeOut();
        }
    });

    function upload(files) {        
        let  formData = new FormData();

        for (item of files) {
            formData.append('files[]', item);            
        }        
    
        $.ajax({
            type: "POST",//DELETE
            url: 'upload.php',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,//поле name = имя файла
            dataType : 'json',
            success: function(data){      
				for (item of data.files) {
                    filelist.append(`<div class="filelist__item"><p class="filelist__item-name">${item}</p><div class="delete"></div></dvi></div>`)
                }
			}
        });
    }

    $('.filelist').on('click', '.delete', function() {
        let fileName = $(this).parent().find('.filelist__item-name').text();
        
        $.ajax({
            type: "DELETE",
            url: 'upload.php?name='+fileName,
            cache: false,
            contentType: false,
            processData: false,
            //data: {'name' : fileName},//поле name = имя файла
            dataType : 'json',
            success: function(evt){  
                if (evt.ok) {
                    $('p.filelist__item-name:contains("'+ fileName +'")').parent().remove();
                }    
			}
        });
    })
});
