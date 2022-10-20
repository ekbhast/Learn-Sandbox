$(document).ready(function(){

  //carousel
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

  document.querySelector('.prev').addEventListener ('click',function () {
    slider.goTo('prev');} );//Ищем элемент с классом .prev и вешаем на него слушаетль, при клике выполняем функцию GoTo (далее)
  document.querySelector('.next').addEventListener ('click',function () {
    slider.goTo('next');} );// аналогично

//tabs тут мы меняем активные категории каталога.
//получаем со страницы ul список с классом catalog tabs
//при клике на не класс active (соотвественно который не активный)
//тогда запускается функция для этого элемент (this)
//которая добавляет класс активности а у всех остальных элеменов на этой вложенности
//его удаляет то есть у всех соседних табов
//далее мы находим ближайший элемент с классом container в нашем случае это обертка всего блока с табами.
// можно конечно было обернуть все ще раз. 
//далее в этой оберке мы находим все жлементы с классом catalog_content и удаляем класс активности
//команда eq($(this).index) получает номер тот номер элемента на который мы нажали.
//когда мы нажали например на второй номер, то второму номеру мы прописываем активность.
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


// Создаем функцию переключения классов по сути
// функция такая-то с таким то параметром
// ищем элемент с параметром, перебираем по номреам
// для этого элемента при клике даелаем еще оджну функцию
// отменяем действия брайзера по умолчанию
// далее находим наш нужный элемент и оглим его класс на нужный
// или если у него класс нужный тоглим на первоначанльный 
// вот такая загагулина

  function toggleSlide (item) {
    $(item).each(function(i) {
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };
// тупо вызов функции с нужным классом
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //modal 
//  модалки появляютя при клике на кнопку у которой есть нужный дата атрибут
  $('[data-modal=consultation]').on('click',function(){
    $('.overlay, #consultation').fadeIn('slow');
  });

  //close modal

  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow'); 
  });

  //buy button
// Находим все кнопки и вешаем на них функцию 
// при клике 
// текст из дискришена карточки подтсавляем в текст субтайтла модалки
// и потом показываем модалку
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  function validateForms (form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages:{
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Имя должно содержать больше {0} симвалов")
        },
        phone: "Пожалуйста, введите телефон",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "email адреса должен быть формата name@example.com"
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask('+7(999) 999-99-99');

  $('form').submit(function(e){ //ищем на стрице все формы, по сабытию сабмит (отпрака формы), выполняем функцию.
    e.preventDefault(); //тут мы отменяем стандартное поведение браузера при отправке формы, а именно перезагрузку страницы.


    //проверка прошла ли форма валидацию. Если этот обект не прошел валидацию то просто прекращаем функцию.
    if (!$(this).valid()){
      return;
    }
    $.ajax({ //методом ajax мы отрпавляем данные на сервер. Вместо отключенного стандартног поведения.
      type: "POST", // методом POST мы отправляем данные на серве
      url: "mailer/smart.php", // каким образом мы отправляем данные, в данном случае мейлером.
      data: $(this).serialize() // какие данне и вкаком формате то есть данные и опять объект
    }).done(function(){
      $(this).find("input").val(""); // в этом объекте найти инпуты и в их валуе втсавить пустое значение
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset'); //перезагружаем формы.
    });
    return false;
  });

});