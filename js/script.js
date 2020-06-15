$(function () {

    //position:fixed;で高さがなくなるため、ヘッダーの高さ分、margin-topを付ける
    const $header_height = $('header').height();
    $('main').css('margin-top', $header_height);

    /*------------------------------------------
    スムーススクロール
    ------------------------------------------*/
    const $from = $('a[href^="#"]');

    $from.on('click', function () {
      $('.humbergur-menu').removeClass('open');
          let position = $(this).attr('href');
          let $target = $(position).offset().top;
          $('body, html').animate({scrollTop: $target}, 800);
          return false;
    })
    
    /*------------------------------------------
    トップに戻るボタン
    ------------------------------------------*/
    $(function () {
        const $btn_top = $('.btn-top');
    
        //スクロール量によってトップに戻るボタンの表示・非表示を分ける
        $(window).on('scroll', function(){
            if($(this).scrollTop() > 100) {
                $btn_top.fadeIn()
            } else {
                $btn_top.fadeOut()
            }
        })
    
        //クリックすると1番上に戻る
        $btn_top.on('click', function () {
            $('body, html').animate({scrollTop: 0}, 500);
        })
    })

    /*------------------------------------------
    アコーディオン
    ------------------------------------------*/
    const $q = $('.faq > .question');

    $q.on('click', function () {
        let $a = $(this).siblings('.answer');
        if($a.hasClass('open')) {
            $a.slideToggle().toggleClass('open');
        } else {
            $a.slideToggle().toggleClass('open');
        }
        return false;
    })
  
    /*------------------------------------------
    ハンバーガーメニュー
    ------------------------------------------*/
    $('.humbergur-menu-icon').on('click', function () {
      $('.humbergur-menu').stop().slideToggle();
      return false;
    });

    $('.close-icon').on('click', function () {
      $('.humbergur-menu').stop().slideToggle();
      return false;
    });

    let $menu = $('.menu').find('a[href^="#"]');
    $menu.on('click', function () {
        $('.humbergur-menu').stop().slideToggle();
        return false;
    });

    /* ブログのアニメーション */
    new WOW().init();

    /* スライド */
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4.5,                 //表示数
        centeredSlides : true,
        spaceBetween: 56,　
        loop: true,
        disableOnInteraction: true,
        autoplay: {                         //カルーセル
            delay: 5000,
            disableOnInteraction: false,    //ユーザーがスライダーを操作した後も自動再生し続ける
        },

        pagination: {
            el: '.horizonal-pagination',
            clickable: true,
        },

        breakpoints: {
            // 959px以下の場合
            959: {
            slidesPerView: 3,
            spaceBetween: 20
            },
            // 559px以下の場合
            559: {
            slidesPerView: 1.05
            }
        }
    });
})