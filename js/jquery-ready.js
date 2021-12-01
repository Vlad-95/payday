$(document).ready(function() {

    //Переключение по шагам
    let btnNext = document.querySelector('.step-next');
    let btnPrev = document.querySelector('.step-back');
    let btnSubmit = document.querySelectorAll('.submit');

    function checkStep() {
        let stepActive = document.querySelector('.step.active');
        let stepActiveNumb = stepActive.getAttribute('data-step');

        return +stepActiveNumb;
    }

    function changeActiveNumber() {
        let stepActive = document.querySelector('.step.active');
        let stepActiveNumb = stepActive.getAttribute('data-step');
        let allNumbers = document.querySelectorAll('.numbers__item');

        for (let item of allNumbers) {
            item.classList.remove('active');
            document.querySelector('.numbers__item[data-step="'+ stepActiveNumb +'"]').classList.add('active');
        }
    }


    btnNext.addEventListener('click', function(evt) {
        evt.preventDefault();

        let allSteps = document.querySelectorAll('.step');
        let currentStepNumb = checkStep();
        let nextStepNumb = (currentStepNumb == 4) ? currentStepNumb : currentStepNumb + 1;

        //=====показ/скрытие кнопки "К предыдущему шагу"
        if (nextStepNumb > 1) {
            btnPrev.style.display = "block";
        }

        if (nextStepNumb == 4) {
            btnPrev.style.display = "none";
        }
        //========

        for (let item of allSteps) {
            item.classList.remove('active');
            document.querySelector('.step[data-step="'+ nextStepNumb +'"]').classList.add('active');
        }

        changeActiveNumber();
    });

    btnPrev.addEventListener('click', function(evt) {
        evt.preventDefault();

        let allSteps = document.querySelectorAll('.step');
        let currentStepNumb = checkStep();
        let nextStepNumb = (currentStepNumb == 1) ? currentStepNumb : currentStepNumb - 1;

        //=====показ/скрытие кнопки "К предыдущему шагу"
        if (nextStepNumb < 4) {
            btnPrev.style.display = "block";
        }

        if (nextStepNumb == 1) {
            btnPrev.style.display = "none";
        }
        //========

        for (let item of allSteps) {
            item.classList.remove('active');
            document.querySelector('.step[data-step="'+ nextStepNumb +'"]').classList.add('active');
        }

        changeActiveNumber();
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
