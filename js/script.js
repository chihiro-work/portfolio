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

    /*------------------------------------------
    フォームのバリデーション
    ------------------------------------------*/
    /* 各項目の必須確認 */
    const err_msg_obj = {
        err_required: '入力してください',
        err_mail: 'メール形式で入力してください'
    };
    let $required = $('.required');
    $required.on('blur', function () {
        if ($(this).val() == '') {
            $(this).siblings('p').children('.erroy-msg').text(err_msg_obj['err_required']);
        } else {
            $(this).siblings('p').children('.erroy-msg').text('');
        }   
    })

    /* メール形式チェック */
    let $mail = $('._js_mail-validation');
    const mail_expr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    $mail.on('blur', function () {
        if(!$(this).val() == '' && !$mail.val().match(mail_expr)) {
            $mail.siblings('p').children('.erroy-msg').text(err_msg_obj['err_mail']);
        } else if(!$(this).val() == '' && $mail.val().match(mail_expr)) {
            $mail.siblings('p').children('.erroy-msg').text('');
        }
    })


    /* 送信時の必須確認 */
    $('#_js_submit').on('click', function () {
        let flag = true;

        // 必須項目入力チェック
        $required.each(function (index, element) {
            if (!$(element).val()) {
                flag = false;
                $(element).siblings('p').children('.erroy-msg').text(err_msg_obj['err_required']);
            } else if(!$mail.val().match(mail_expr)) {
                flag = false;
            }
        })
        if (flag) {
            // 送信の確認
            if (!confirm('送信しますか？')) {
                return false;
            } else {
                $('form').off().submit();
                $('form').submit();
            }
        } else {
            return false;
        }
    })
})