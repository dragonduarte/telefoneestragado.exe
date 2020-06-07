$(document).ready(function() {
  var divx = document.getElementById('terminal');
  /* Welcome screen */
  $('#welcome-login').animate({'opacity': '1', 'top': $(window).height()/2 - $('#welcome-login').height()/2 }, 3000);

  setTimeout(function() {
      $('#login-input').animate({'opacity': '1'}, 3000);
  }, 4000);

  /* player login */
  var player_name = "Anonymous";
  var logged = 0;

  $('#login-input').keypress(function(e) {
    if(e.which === 13 && $(this).val() != '') {
      player_name = $(this).val();
      logged = 1;
      $('#welcome-login').animate({'opacity': '0'}, 1000);
      /* objectives */
      var help = 0;
      var list = 0;
      var connect = 0;
      var trojan = 0;
      var disconnect = 0;

      var won = 0;
      var able = 0;

      window.setInterval(function() {
        if (won === 0) {
          if (help === 1) {
            $('#objectives #help').css({'color': 'red'});
            $('#objectives #list').animate({'opacity': '1'}, 1000);
            if (list === 1) {
              $('#objectives #list').css({'color': 'red'});
              $('#objectives #connect').animate({'opacity': '1'}, 1000);
              if (connect === 1) {
                $('#objectives #connect').css({'color': 'red'});
                $('#objectives #trojan').animate({'opacity': '1'}, 1000);
                if (trojan === 1) {
                  $('#objectives #trojan').css({'color': 'red'});
                  $('#objectives #disconnect').animate({'opacity': '1'}, 1000);
                }
              }
            }
          }
        }

        if (disconnect === 1) {
          $('#objectives #disconnect').css({'color': 'red'});
        }

        if (minutes <= 1 && help === 1 && list === 1 && connect === 0 && trojan === 1 && disconnect === 1) {
          won++;
        }

        if (won === 1) {
          $('#objectives li').animate({'opacity': '0'}, 3000);
          $('#objectives #won').show(3000).animate({'opacity': '1'}, 3000);
        } else if (won > 1) {
          won = 2;
        }
      }, 1000);

      /* timer */
      var seconds = 0;
      var minutes = 0;
      var danger = 0;
      var lost = 0;

      window.setInterval(function() {
        if (connect === 1) {
          if (seconds < 10) {
            $('#time').text('Being traced: ' + minutes + ':0' +seconds);
          } else {
            $('#time').text('Being traced: ' + minutes + ':' +seconds);
          }
          if (seconds < 59) {
            seconds++;
          } else {
            seconds = 0;
            minutes++;
          }
          if (minutes >= 0 && seconds > 45) {
            $('#time').css({'color': 'red'});
            danger++;
          }
          if (danger === 1) {
            $('span').remove();
            $('#terminal').append('<div>Tens apenas 15 segundos restantes...<span id="blinking">_</span></div><br>');
            divx.scrollTop = divx.scrollHeight;
          } else if (danger > 1) {
            danger = 2;
          }
          if (minutes >= 1 && seconds > 0) {
            $('#time').text('Foste encontrado');
            lost++;
            able = 0;
          }
          if (lost === 1) {
            $('span').remove();
            $('#terminal').append('<div>Fosta apanhado!<br>A formatar HDD<br>Adeus...<span id="blinking">_</span></div><br>');
            $('#objectives li').animate({'opacity': '0'}, 3000);
            $('#objectives #lost').show(3000).animate({'opacity': '1'}, 3000);
            divx.scrollTop = divx.scrollHeight;
            $('#objectives li').css({'color': 'green'}).animate({'opacity': '1'}, 3000);
            setTimeout(function() {
              $('#terminal').animate({'opacity': '0'}, 1000);
              $('#root').animate({'opacity': '0'}, 1000);
              $('input').animate({'opacity': '0'}, 1000).hide(3000);
              $('#objectives').animate({'opacity': '0'}, 1000);
              $('#time').animate({'opacity': '0'}, 1000);
              help = 0;
              list = 0;
              connect = 0;
              trojan = 0;
              disconnect = 0;
              won = 0;
              $('#objectives li').css({'color': 'green'});
            }, 20000);
          } else if (lost > 1) {
            lost = 2;
          }
        }
      }, 1000);

      setTimeout(function(){
        $('#terminal').animate({'opacity': '1'}, 1000);
      }, 1000);

      setTimeout(function(){
        $('#root').animate({'opacity': '1'}, 1000);
        $('input').animate({'opacity': '1'}, 1000).show();
      }, 5000);

      setTimeout(function(){
        $('span').remove();
        $('#terminal').append('<br><div>Bem vindo ao Telefoneestragado.exe<br><br>' + player_name + ' autenticado<br>Telefoneestragado.exe pronto a ser usado<br>Usa help para a lista de comandos disponíveis<br><br><span id="initial-root">$</span>&nbsp;&nbsp;&nbsp;<span id="blinking">_</span></div>');
      }, 6500);

      setTimeout(function() {
        $('#time').animate({'opacity': '1'}, 3000);
        $('#objectives').animate({'opacity': '1'}, 3000);
      }, 7000);

      setTimeout(function() {
        $('#objectives #help').animate({'opacity': '1'}, 500);
        able = 1;
      }, 10000);

      $('#input').keypress(function(e) {
          if(e.which === 13 && $(this).val() != '' && able === 1) {
            $('div span').remove();
            $('initial-root').remove();

            /* 
             * List of commands available in the game:
             * 
             * help
             * list
             * connect nearest-phone-relay
             * send trojan
             * send adware
             * disconnect
             * exit
             * 
             */

            switch( $(this).val() ) {
              case 'help':
                $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>List of commands:<br>help - Mostra lista de comandos<br>connect [DNS name] - Conecta ao computador com DNS<br>disconnect -Desliga o computador com DNS <br>exit - Desliga o computador recetors<br>list - Mostra lista de aplicacoes<br>send [aplicacao] - Manda a aplicacao para o recetor<span id="blinking">_</span></div>');
                help = 1;
                break;
              case 'connect nearest.phone.relay':
                if (connect === 0) {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Connecting...<br>Conectado<br>Tens um minuto para seres apanhado<span id="blinking">_</span></div>');
                  connect = 1;
                } else {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Ja te encontras connectado ao nearest.phone.relay.<span id="blinking">_</span></div>');
                }
                break;
              case 'list':
                $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Lista de aplicações atuais<br>AdBreak - invada um computador com paginas pop-up (type: adware)<br>Trojan.Vaklik.BBB - rouba informacao importante do computador recetor (tipo: trojan)<span id="blinking">_</span>');
                list = 1;
                break;
              case 'send trojan':
                if (connect === 1) {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>A mandar Trojan.Vaklik.BBB...<br>Trojan.Vaklik.BBB enviado.<span id="blinking">_</span></div>');
                  trojan = 1;
                } else {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Não estás conectado a um DNS<span id="blinking">_</span></div>');
                }
                break;
              case 'send adware':
                if (connect === 1) {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Enviando AdBreak...<br>Envio falhado.<span id="blinking">_</span></div>');
                } else {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Nao estas connectado a nenhum DNS.<span id="blinking">_</span></div>');
                }
                break;
              case 'disconnect':
                if (connect === 1) {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Desconectando...<br>Desconectado<span id="blinking">_</span></div>');
                  disconnect = 1;
                  connect = 0;
                  minutes = 0;
                  seconds = 0;
                } else {
                  $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Nao estas connectado a nenhum DNS.<span id="blinking">_</span></div>');
                }
                break;
              case 'exit':
                $('#terminal').animate({'opacity': '0'}, 1000);
                $('#root').animate({'opacity': '0'}, 1000);
                $('input').animate({'opacity': '0'}, 1000).hide(3000);
                $('#objectives').animate({'opacity': '0'}, 1000);
                $('#time').animate({'opacity': '0'}, 1000);
                help = 0;
                list = 0;
                connect = 0;
                trojan = 0;
                disconnect = 0;
                won = 0;
                $('#objectives li').css({'color': 'green'});
                break;
              default:
                $('#terminal').append('<div>$&nbsp;&nbsp;&nbsp;' + $(this).val() + '<br>Comando não reconhecido. Escreva help<span id="blinking">_</span></div>');
            }
            $('#terminal').append('<br>');

            divx.scrollTop = divx.scrollHeight;
            $(this).val('');
          }
      });
    }
  });
});