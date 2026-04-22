$(function () {
  ("use strict");

  // ─────────────────────────────────────────────────────────────────
  // Variável de referência à janela do browser
  // ─────────────────────────────────────────────────────────────────
  var wind = $(window);

  // ─────────────────────────────────────────────────────────────────
  // SLIDER PARALLAX (Swiper.js)
  // Inicializa o slider de fundo com efeito parallax.
  // Cada slide tem uma imagem (.bg-img) que se move mais lentamente
  // do que o slide, criando profundidade visual. O valor
  // data-swiper-parallax é calculado como 75% da largura do slider.
  // O loop:true garante que o carrossel nunca tem fim.
  // ─────────────────────────────────────────────────────────────────
  var parallaxSlider;
  var parallaxSliderOptions = {
    speed: 1500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    parallax: true,
    loop: true,
    on: {
      init: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find('.bg-img')
            .attr({
              'data-swiper-parallax': 0.75 * swiper.width
            });
        }
      },
      resize: function () {
        this.update();
      }
    },
    pagination: {
      el: '.slider-prlx .parallax-slider .swiper-pagination',
      dynamicBullets: true,
      clickable: true
    },
    navigation: {
      nextEl: '.slider-prlx .parallax-slider .next-ctrl',
      prevEl: '.slider-prlx .parallax-slider .prev-ctrl'
    }
  };
  parallaxSlider = new Swiper('.slider-prlx .parallax-slider', parallaxSliderOptions);

  // ─────────────────────────────────────────────────────────────────
  // IMAGEM DE FUNDO VIA DATA-ATTRIBUTE
  // Percorre todos os elementos com data-background="caminho.jpg"
  // e aplica esse valor como background-image via CSS inline.
  // Permite definir backgrounds no HTML sem os colocar no CSS.
  // ─────────────────────────────────────────────────────────────────
  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css("background-image", "url(" + $(this).data("background") + ")");
    }
  });

// ─────────────────────────────────────────────────────────────────
// NAVBAR STICKY
// Verifica a posição do scroll tanto no carregamento como no scroll.
// Assim, se a página recarregar já com scroll, o estado fica correcto.
// Se recarregar no topo, a navbar fica transparente como esperado.
// ─────────────────────────────────────────────────────────────────
function checkNavbarSticky() {
  if ($(window).scrollTop() > 120) {
    $('.navbar-section').addClass('is-sticky');
  } else {
    $('.navbar-section').removeClass('is-sticky');
  }
}

// Corre no scroll
$(window).on('scroll', checkNavbarSticky);

// Corre imediatamente ao carregar a página
$(document).ready(function () {
  checkNavbarSticky();
});

  // ─────────────────────────────────────────────────────────────────
  // MENU RESPONSIVO (Mean Menu)
  // Ativa o plugin meanmenu para ecrãs com largura <= 991px.
  // O menu desktop (.techvio-nav) fica oculto e é substituído
  // pelo menu móvel (.techvio-responsive-nav) com o ícone hambúrguer.
  // ─────────────────────────────────────────────────────────────────
  jQuery('.mean-menu').meanmenu({
    meanScreenWidth: "991"
  });

  // ─────────────────────────────────────────────────────────────────
  // POPUP DE VÍDEO (Magnific Popup)
  // Ao clicar num elemento com a classe .popup-video, abre o vídeo
  // numa lightbox com efeito de fade. O vídeo é carregado num
  // iframe (YouTube, Vimeo, etc.). Em ecrãs abaixo de 320px
  // o comportamento é desactivado (disableOn: 320).
  // ─────────────────────────────────────────────────────────────────
  $(".popup-video").magnificPopup({
    disableOn: 320,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  // ─────────────────────────────────────────────────────────────────
  // EFEITO RIPPLE NOS BOTÕES (Onda/Ondulação ao passar o rato)
  // Este é o efeito de "onda" visível nos botões .default-btn,
  // .default-btn-one e .default-btn-two.
  //
  // Lógica detalhada:
  //   1. Ao entrar o cursor (mouseenter), calcula a posição relativa
  //      do rato dentro do botão (relX, relY).
  //   2. Move o <span> interno (que está em position:absolute,
  //      z-index:-1, width:0, height:0) para essa posição exacta.
  //   3. O CSS em :hover expande esse span para width:200% e
  //      height:500px com transition, criando a ilusão de uma onda
  //      que nasce exactamente onde o cursor tocou.
  //   4. O mesmo acontece no mouseout — o span colapsa a partir do
  //      ponto onde o cursor saiu, tornando a animação suave em
  //      ambas as direcções.
  // ─────────────────────────────────────────────────────────────────
  $(function () {
    $('.default-btn, .default-btn-one, .default-btn-two')
      .on('mouseenter', function (e) {
        var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
        $(this).find('span').css({ top: relY, left: relX });
      })
      .on('mouseout', function (e) {
        var parentOffset = $(this).offset(),
          relX = e.pageX - parentOffset.left,
          relY = e.pageY - parentOffset.top;
        $(this).find('span').css({ top: relY, left: relX });
      });
  });

  // ─────────────────────────────────────────────────────────────────
  // BARRAS DE PROGRESSO ANIMADAS (Secção "About")
  // Ao fazer scroll, verifica se cada barra .progres já entrou
  // no viewport (bottom_of_window > bottom_of_object).
  // Quando visível, aplica a largura definida em data-value="90%",
  // ativando a transição CSS de 1.5s que expande a barra.
  // Enquanto a barra não entrar no ecrã, a largura mantém-se em 10%
  // (definido no CSS), criando uma animação progressiva e visível.
  // ─────────────────────────────────────────────────────────────────
  wind.on('scroll', function () {
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr('data-value');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({ width: myVal });
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // SLIDER DE TESTEMUNHOS (Owl Carousel)
 
  /* ── TESTIMONIALS — replica o carousel do layout original ── */
  $('.testimonial-slider').owlCarousel({
    loop: true,
    margin: 28,
    dots: true,
    nav: false,
    smartSpeed: 650,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4650,
    navText: [
      "<i class='bi bi-chevron-left'></i>",
      "<i class='bi bi-chevron-right'></i>"
    ],
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      768: {
        items: 2,
        nav: true
      },
      992: {
        items: 3,
        nav: false
      }
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // CONTADOR ANIMADO (CounterUp)
  // Quando os números (.counter-number) entram no viewport,
  // o plugin anima a contagem desde 0 até ao valor HTML do elemento.
  //   - delay:15  → intervalo entre cada frame (ms)
  //   - time:2000 → duração total da animação (2 segundos)
  // ─────────────────────────────────────────────────────────────────
  $('.counter-number').counterUp({
    delay: 15,
    time: 2000
  });

  // ─────────────────────────────────────────────────────────────────
  // FILTRO DE PORTFÓLIO (Isotope.js)
  // Após a página carregar completamente, inicializa o layout
  // isotope no .portfolio-container. Ao clicar nos filtros
  // (#portfolio-flters li), filtra os itens pelo atributo
  // data-filter (ex: ".branding", ".webdesign", ".all").
  // O Isotope reorganiza o grid com animação suave.
  // ─────────────────────────────────────────────────────────────────
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: ".portfolio-grid-item",
    });
    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // BOTÃO "VOLTAR AO TOPO"
  // O botão .go-top fica oculto por defeito. Ao fazer scroll > 600px
  // aparece com animação (classe "active"). Ao clicar, faz scroll
  // suave até ao topo em 100ms. Em hover o CSS mostra dois chevrons
  // animados em sequência (o primeiro desaparece, o segundo sobe).
  // ─────────────────────────────────────────────────────────────────
  $(function () {
    $(window).on('scroll', function () {
      var scrolled = $(window).scrollTop();
      if (scrolled > 600) $('.go-top').addClass('active');
      if (scrolled < 600) $('.go-top').removeClass('active');
    });
    $('.go-top').on('click', function () {
      $("html, body").animate({ scrollTop: "0" }, 100);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CONTADOR DECRESCENTE (Countdown Timer)
  // Calcula o tempo restante até à data definida em endTime.
  // Actualiza os elementos #days, #hours, #minutes e #seconds
  // a cada segundo via setInterval. Adiciona zero à esquerda
  // quando os valores são inferiores a 10 (ex: "07").
  // ─────────────────────────────────────────────────────────────────
  function makeTimer() {
    var endTime = new Date("June 10, 2027 17:00:00 PDT");
    var endTime = (Date.parse(endTime)) / 1000;
    var now = new Date();
    var now = (Date.parse(now) / 1000);
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }
    $("#days").html(days + "<span>Days</span>");
    $("#hours").html(hours + "<span>Hours</span>");
    $("#minutes").html(minutes + "<span>Minutes</span>");
    $("#seconds").html(seconds + "<span>Seconds</span>");
  }
  setInterval(function () { makeTimer(); }, 1000);

  // ─────────────────────────────────────────────────────────────────
  // ANIMAÇÕES DE ENTRADA (WOW.js)
  // Após a página carregar, inicializa o WOW.js que detecta todos os
  // elementos com a classe .wow e aplica as animações do Animate.css
  // (classe "animated") quando entram no viewport.
  //   - offset:20  → activa a animação quando o elemento está 20px
  //                  antes de entrar no ecrã
  //   - mobile:true→ animações também activas em dispositivos móveis
  //   - live:true  → funciona também com conteúdo carregado de forma
  //                  assíncrona (AJAX)
  // ─────────────────────────────────────────────────────────────────
  $(window).on('load', function () {
    if ($(".wow").length) {
      var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 20,
        mobile: true,
        live: true,
      });
      wow.init();
    }
  });

  // ─────────────────────────────────────────────────────────────────
  // PRELOADER — Ocultar após carregamento completo
  // Quando todos os recursos da página terminam de carregar,
  // adiciona a classe "preloader-deactivate" ao .preloader.
  // Via CSS essa classe colapsa os dois painéis de fundo
  // (::before e ::after) de 60% para 0%, criando um efeito de
  // "abertura de cortinas" que revela o conteúdo por baixo.
  // ─────────────────────────────────────────────────────────────────
  $(window).on('load', function () {
    $('.preloader').addClass('preloader-deactivate');
  });

}(jQuery));
