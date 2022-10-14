// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         dots: false,
//         speed: 1200,
//         adaptiveHeight: false,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-arrow.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right-arrow.png"></button>',
//         responsive: [
//             {
//               breakpoint: 992,
//               settings: {
//                 dots: true,
//                 arrows: false
//               }
//             }         
//           ]
//     });
//   });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.prev').addEventListener ('click',function () {
    slider.goTo('prev');} );
    document.querySelector('.next').addEventListener ('click',function () {
        slider.goTo('next');} );