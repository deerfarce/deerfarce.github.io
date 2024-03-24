var css = `
@charset "UTF-8";

.Bigchat {font-size: 2rem!important;}
.Smallchat {font-size: 1rem!important;}
.Mediumchat {font-size: 1.5rem!important;}
:root {
--videowidth: 500px;
--chatwidth: 305px;
}
#mainpage > .nano {
width: calc(100% - var(--chatwidth)) !important;
}
#chatwrap {
width: var(--chatwidth)!important;
}


`;

 var cssTag = document.createElement('style');
  if (cssTag.styleSheet) {
    cssTag.styleSheet.cssText = css;
  } else {
    cssTag.appendChild(document.createTextNode(css));
  }

  document.querySelector('head').appendChild(cssTag);
  window.addEventListener('message', function(e) {
    var data;
    try
    {
      data = JSON.parse(e.data);
    }
    catch
    {
      return;
    }
    if (data.event === 'onStateChange') {
      onPlayerStateChange(data.info);
    }
});







window.cytubeEnhanced.Settings.configureTheme(function (app, tab, storage) {
    'use strict';

    var scheme = {
        'player-position': {
            title: app.t('theme[.]Video Position'),
            default: 'left',
            options: [
                {value: 'left', title: app.t('theme[.]Left')},
                {value: 'right', title: app.t('theme[.]Right')}
            ]
        },

		'video-size': {
            title: app.t('theme[.]Chat Window Size'),
            default: 'small',
            options: [
                {value: 'big', title: app.t('theme[.]Small')},
                {value: 'small', title: app.t('theme[.]Medium')},
                {value: 'smaller', title: app.t('theme[.]Big')},
				{value: 'full', title: app.t('theme[.]Hidden')}
            ]
        },
	    'Chat-text': {
            title: app.t('theme[.]Chat Text Size'),
            default: 'medium',
            options: [
                {value: 'big', title: app.t('theme[.]Big')},
                {value: 'medium', title: app.t('theme[.]Medium')},
                {value: 'small', title: app.t('theme[.]Small')}
            ]
        },
		'fit-video': {
            title: app.t('theme[.]Fit Video'),
            default: 'off',
            options: [
                {value: 'on', title: app.t('theme[.]On')},
                {value: 'off', title: app.t('theme[.]Off')}
            ]
        },
		 'ambientmode': {
            title: app.t('theme[.]Video Ambient mode'),
            default: 'no',
            options: [
                {value: 'yes', title: app.t('theme[.]On')},
                {value: 'no', title: app.t('theme[.]Off')}
            ]
        },
			'hide-header': {
            title: app.t('theme[.]Hide MOTD'),
            default: 'no',
            options: [
                {value: 'yes', title: app.t('theme[.]Yes')},
                {value: 'no', title: app.t('theme[.]No')}
            ]
        },
		'server-messages': {
            title: app.t('theme[.]Server Messages'),
            default: 'off',
            options: [
                {value: 'on', title: app.t('theme[.]On')},
                {value: 'off', title: app.t('theme[.]Off')}
            ]
        }
    };

    /**
     * Initializing
     */
    var schemeItem;
    var option;
    var sort = 100;
    for (var itemName in scheme) {
        schemeItem = scheme[itemName];

        storage.setDefault(itemName, schemeItem.default);

        if (storage.get(itemName)) {
            for (option in schemeItem.options) {
                schemeItem.options[option].selected = (storage.get(itemName) == schemeItem.options[option].value)
            }
        }

        tab.addControl('select', 'horizontal', schemeItem.title, itemName, schemeItem.options, null, sort);
        sort += 100;
    }
function msgDelete(user) {
    $('.chat-msg-' + user).remove();
    $('#userlist > :contains(' + user + ')').css('text-decoration', 'line-through');
    window.scrollChat();
}

function serviceBtn(enable) {
    if (enable) {
        window.socket.on('addUser', addUser);
        window.socket.on('userLeave', userLeave);
        $('.chat-msg-xtra').show();
        window.scrollChat();
    } else {
        console.log('serviceMsg button clicked with false');
        removeListener('addUser', addUser);
        removeListener('userLeave', userLeave);
        $('.chat-msg-xtra').hide();
    }
    storage.set('service_msgs', enable);
}

function serviceMsg(user, type) {
    console.log('serviceMsg called');
    if(user !== '' && user != window.CLIENT.name) {
        let mdiv = $("<div/>").addClass('chat-msg-xtra');

        if(window.USEROPTS.show_timestamps) {
            let timestamp = new Date(Date.now()).toTimeString().split(" ")[0];
            $("<span/>").addClass("timestamp server-whisper")
                        .text("["+timestamp+"] ")
                        .appendTo(mdiv);
                        //.click(function() {$(this).parent().toggle();});
        }
        if(type == 'join') {
            $('<span/>').text(user+" Joined the chat")
                        .addClass('server-whisper')
                        .appendTo(mdiv);
        } else if(type == 'leave') {
            $('<span/>').text(user+" left the chat")
                        .addClass('server-whisper')
                        .appendTo(mdiv);
        }
        return mdiv;
    } else {
        return;
    }
}

function addUser(data) {
    console.log('Called addUser listener');
    let smsg = serviceMsg(data.name, 'join');
    $(smsg).appendTo("#messagebuffer");
    //window.LASTCHAT.name = '---';
    window.scrollChat();
}


function userLeave(data) {
    console.log('Called addUser listener');
    let smsg = serviceMsg(data.name, 'leave');
    $(smsg).appendTo("#messagebuffer");
    //window.LASTCHAT.name = '---';
    window.scrollChat();
}


function removeListener(listener, func) {
    window.socket.removeListener(listener, func);
}

function randomInt(min, max) {
    var rand = Math.round((min - 0.5 + Math.random() * (max - min + 1)));
    return rand;
}

    var applySettings = function (storage) {
		        if (storage.get('fit-video') === 'on') {
            $('#ytapiplayer_html5_api').css({'object-fit':'cover',});
            $('#ytapiplayer_html5_api').data('fit', '1');
        } else {
            if ($('#ytapiplayer_html5_api').data('fit') !== '1') {
                $('#ytapiplayer_html5_api').css({'object-fit':'contain',});
            }
            $('#ytapiplayer_html5_api').data('fit', '0');
        }
		
        if (storage.get('hide-header') === 'yes') {
            $('#motdrow').hide();
            $('#motdrow').data('hiddenByLayout', '1');
        } else {
            if ($('#motdrow').data('hiddenByMinimize') !== '1') {
                $('#motdrow').show();
            }
            $('#motdrow').data('hiddenByLayout', '0');
        }

        if (storage.get('player-position') === 'left') {
            if ($('#chatwrap').hasClass('leftcontent')) {
                $('#chatwrap').removeClass('leftcontent');
                $('#chatwrap').addClass('rightcontent');
            }
            if ($('#maincontain').hasClass('rightcontent')) {
                $('#maincontain').removeClass('rightcontent');
                $('#maincontain').addClass('leftcontent');
            }

            $('#maincontain').detach().insertBefore($('#chatwrap'));
      } else if (storage.get('player-position') === 'center') {
        $('#chatwrap').removeClass(function (index, css) { //remove all col-* classes
              return (css.match(/(\s)*col-(\S)+/g) || []).join('');
          });
          $('#maincontain').removeClass(function (index, css) { //remove all col-* classes
             return (css.match(/(\s)*col-(\S)+/g) || []).join('');
          });

           $('#chatwrap').addClass('col-md-10 col-md-offset-1');
            $('#maincontain').addClass('col-md-10 col-md-offset-1');

           $('#maincontain').detach().insertBefore($('#chatwrap'));
        } else { //right
            if ($('#chatwrap').hasClass('rightcontent')) {
                $('#chatwrap').removeClass('rightcontent');
                $('#chatwrap').addClass('leftcontent');
            }
            if ($('#maincontain').hasClass('leftcontent')) {
                $('#maincontain').removeClass('leftcontent');
                $('#maincontain').addClass('rightcontent');
            }

            $('#chatwrap').detach().insertBefore($('.maincontain'));
        }

        if (storage.get('playlist-position') === 'left') {
            $('#rightcontrols').detach().insertBefore($('#leftcontrols'));
            $('#rightpane').detach().insertBefore($('#leftpane'));
        } else { //right
            $('#leftcontrols').detach().insertBefore($('#rightcontrols'));
            $('#leftpane').detach().insertBefore($('#rightpane'));
        }

        if (storage.get('userlist-position') === 'right') {
            $('#userlist').addClass('pull-right');
        } else { //left
            $('#userlist').removeClass('pull-right');
        }
		
        if (storage.get('video-size') === 'big') {
        //    $("#maincontain").css({'width': '82%'});
         $("body").get(0).style.setProperty("--chatwidth", "290px");
        } 
		if (storage.get('video-size') === 'small') {
        //    $("#maincontain").css({'width': '78%'});
        $("body").get(0).style.setProperty("--chatwidth", "350px");         
        }
		if (storage.get('video-size') === 'smaller') {
        //    $("#maincontain").css({'width': '67%'});
        $("body").get(0).style.setProperty("--chatwidth", "485px"); 
        }
		if (storage.get('video-size') === 'full') {
        //    $("#maincontain").css({'width': '100%'});
        $("body").get(0).style.setProperty("--chatwidth", "0px"); 
        }
		 if (storage.get('server-messages') === 'on') {
        window.socket.on('addUser', addUser);
        window.socket.on('userLeave', userLeave);
        $('.chat-msg-xtra').show();
        window.scrollChat(); 
		} else {
        console.log('serviceMsg button clicked with false');
        removeListener('addUser', addUser);
        removeListener('userLeave', userLeave);
        $('.chat-msg-xtra').hide();         
        }
		
		if (storage.get('Chat-text') === 'big') {
        $('[class^="chat-msg-"]').addClass('Bigchat');
        } else { 
        $('[class^="chat-msg-"]').removeClass('Bigchat');
        }
		if (storage.get('Chat-text') === 'medium') {
        $('[class^="chat-msg-"]').addClass('Mediumchat');
        } else { 
        $('[class^="chat-msg-"]').removeClass('Mediumchat');
        }
		if (storage.get('Chat-text') === 'small') {
        $('[class^="chat-msg-"]').addClass('Smallchat');
        } else { 
        $('[class^="chat-msg-"]').removeClass('Smallchat');
        }
		
		if (storage.get('ambientmode') === 'yes') {
var script = document.createElement('script'); 
script.type = 'text/javascript'; 
script.src = 'https://cdn.jsdelivr.net/gh/BillTube/BillTube2@latest/BillTube_Ambient.js';
document.body.appendChild(script);
        } else { 
        $('[class^="chat-msg-"]').removeClass('Smallchat');
        }
	}

////////////




    /**
     * Saving and applying settings
     */
    app.Settings.onSave(function () {
        for (var itemName in scheme) {
            storage.set(itemName, $('#' + app.prefix + itemName).val());
        }

        applySettings(storage);
    });
    applySettings(storage);
});





