/*
- Niconico Chat script for cytu.be
- version 1.0374
- (still in testing, some things will NOT work as they should)
*/

function offsetRight(parent, el) {
  return parent.offsetWidth - el.offsetWidth - el.offsetLeft;
}

(function() {

    let _defaultEnabled = true,
        _defaultFontSize = 32,
        _defaultImageHeight = 128,
        _scrollDuration = 7;
        
    if (CLIENT.runNND) {
        console.error('NND Chat script attempted to load, but it looks like it has already been loaded!');
        nnd._fn.setupCSS();
        return;
    }
    CLIENT.runNND = true;

    window.nnd = {
        'enabled':_defaultEnabled, //enabled? self-explanatory
        'MAX':125, //maximum amount of messages allowed on screen before the oldest messages are removed
        'offsetType':0, //0: position based on fontsize and player height; 1: random %
        'fromRight':true, //move messages from right? if false, moves from left instead
        'fontSize':_defaultFontSize, //font size of messages in pixels
        'imageHeight':_defaultImageHeight, //max height of images in pixels
        'displayImages':false, //show emotes/images in niconico messages
        'discardWhenFull':false,
        'opacity':70,
        'forced':-1,
        '_reloading': false,
        '_fn': {
            'reload_plugin':()=>{
              
              if (nnd._reloading) return;
              
              nnd._reloading = true;
              
              socket.off('chatMsg', onChatMsg);
              nnd._fn.removeAll();
              $('.videochatContainer').remove();
              
              nnd._fn.setupCSS();
              $('.embed-responsive').prepend($('<div/>', {
                  'class': 'videochatContainer'
              }));
              socket.on('chatMsg', onChatMsg);
              console.debug('NND has been successfully reloaded');
              
              let classes = ["server-msg-reconnect", "server-msg-disconnect", "poll-notify", "greentext"];
              let cls = classes[Math.floor(Math.random() * classes.length)];
              
              $("<div/>").addClass(cls)
                .text((cls === "greentext" ? ">" : "") + "Restarted NND!")
                .appendTo($("#messagebuffer"));
              scrollChat();
              
              nnd._reloading = false;
            },
            'getopts':()=>{
              var tmp = {};
              for (var i in window.nnd)
                if (!(/^\_/).test(i))
                  tmp[i] = window.nnd[i];
              return tmp;
            },
            'save':()=>{
              if (!nnd.enabled) {nnd._fn.removeAll();}
              localStorage.setItem(CHANNEL.name.toLowerCase() + '_nndOptions', JSON.stringify(window.nnd._fn.getopts()));
            },
            'load':()=>{
              var tmp = JSON.parse(localStorage.getItem(CHANNEL.name.toLowerCase()+'_nndOptions'));

              if (tmp === null || tmp === undefined) {
                
                nnd['enabled'] = _defaultEnabled;
                nnd['MAX'] = 125;
                nnd['offsetType'] = 0;
                nnd['fromRight'] = true;
                nnd['fontSize'] = _defaultFontSize;
                nnd['imageHeight'] = _defaultImageHeight;
                nnd['displayImages'] = false;
                nnd['discardWhenFull'] = false;
                nnd['opacity'] = 70;
                nnd['forced'] = 1;

                nnd._fn.setFontSize(_defaultFontSize, _defaultImageHeight);
                
                nnd._fn.updateModal();
                nnd._fn.save()
                
                console.debug('NND settings not found, using defaults and saving them');
                return;
              } else {
                for (var i in tmp) {
                  if (nnd.hasOwnProperty(i) && !(/^\_/).test(i)) {
                    if (i === "displayImages" && (!tmp.hasOwnProperty("forced") || tmp.forced < 1)) {
                      nnd[i] = false;
                    } else
                      nnd[i] = tmp[i];
                  }
                }
                nnd["forced"] = 1;
                nnd._fn.save();
                nnd._fn.updateModal();
              }
              nnd._fn.setupCSS();
            },
            'updateModal':()=>{
              $('#nnd-enable').prop('checked', nnd.enabled);
              $('#nnd-displayimages').prop('checked', nnd.displayImages);
              $('#nnd-discardwhenfull').prop('checked', nnd.discardWhenFull);
              $('#nnd-opacity').val(nnd.opacity);
              $('#nnd-opacity-value').text(nnd.opacity + "%")
              $('#nnd-offsettype-' + nnd.offsetType).prop('checked', true);
              $('#nnd-fromright-' + nnd.fromRight).prop('checked', true);
              $('#nnd-maxmsgs').attr('placeholder', nnd.MAX);
              $('#nnd-maxmsgs').val(nnd.MAX)
              $('#nnd-fontsize').attr('placeholder', nnd.fontSize);
              $('#nnd-fontsize').val(nnd.fontSize);
              $('#nnd-imageheight').attr('placeholder', nnd.imageHeight);
              $('#nnd-imageheight').val(nnd.imageHeight);
              nnd._fn.setFontSize(nnd.fontSize, nnd.imageHeight);
            },
            'saveFromModal':()=>{
              nnd['enabled'] = $('#nnd-enable').prop('checked');
              nnd['displayImages'] = $('#nnd-displayimages').prop('checked');

              if (!nnd['enabled']) {
                nnd._fn.removeAll();
              }

              nnd['discardWhenFull'] = $('#nnd-discardwhenfull').prop('checked');
              nnd['opacity'] = parseFloat($('#nnd-opacity').val());
              $('#nnd-opacity-value').text(nnd.opacity + "%");
              nnd._fn.setOpacity();

              if ($('#nnd-offsettype-0').prop('checked'))
                nnd['offsetType'] = 0;
              else if ($('#nnd-offsettype-1').prop('checked'))
                nnd['offsetType'] = 1;

              let oldFrom = nnd['fromRight'];
              nnd['fromRight'] = $('#nnd-fromright-true').prop('checked');
              if (nnd.fromRight !== oldFrom) {nnd._fn.removeAll();}

              nnd._fn.validateAndSetValue('MAX', $('#nnd-maxmsgs'), 1, 125);
              nnd._fn.validateAndSetValue('fontSize', $('#nnd-fontsize'), 1, _defaultFontSize);
              nnd._fn.validateAndSetValue('imageHeight', $('#nnd-imageheight'), 1, _defaultImageHeight);

              nnd._fn.setFontSize(nnd.fontSize, nnd.imageHeight);

              nnd._fn.save();
            },
            'setOpacity':()=>{
              $('.head-NNDCSS-opacity').remove();
              $('<style />', {
                  'class':'head-NNDCSS-opacity',
                  text:".videoText {opacity:" + (nnd.opacity/100) + ";}"
              }).appendTo('head');
            },
            'setupCSS':()=>{
              
              $('.head-NNDCSS').remove();
              $('.head-NNDCSS-opacity').remove();
              
              $('<style />', {
                'class':'head-NNDCSS',
                text:".videoText {color: white;position: absolute;z-index: 1;cursor: default;white-space:nowrap;font-family: 'Meiryo', sans-serif;letter-spacing: 0.063em;user-select: none;text-shadow: 0 -0.063em #000, 0.063em 0 #000, 0 0.063em #000, -0.063em 0 #000;pointer-events: none}"+
                    ".videoText.moving {transition: right "+_scrollDuration+"s linear, left "+_scrollDuration+"s linear}"+
                    ".videoText.greentext {color: #789922}"+
                    ".videoText img, .videochatContainer .channel-emote {box-shadow: none!important; vertical-align: middle!important;display: inline-block!important;transition: none!important;}"+
                    ".videoText.shout {color: #f00}"+
                    ".videochatContainer {z-index: 11}"+
                    ".modal .left-warning {float: left;padding: 10px 12px;font-size: 13px;color: #ff8f8f}"+
                    ".modal .modal-caption {font-size: 13px;text-indent: 35px;color: #8f9cad}"+
                    "#nndSettingsWrap .radio label {display: block;color: #c4ccd8}"+
                    "#nndSettingsWrap #nnd-maxmsgs, #nndSettingsWrap #nnd-fontsize, #nndSettingsWrap #nnd-imageheight {margin: 10px 0;width: 100px;}"+
                    ".modal-subheader {font-size: 16px;border-bottom: 1px solid #212123;margin-left: -10px;padding: 10px 0 0 2px}"+
                    "#nndSettingsModal .subfooter {text-align: center;position: absolute;right: 0;left: 0;pointer-events: none;color: #757575;bottom: 12px;display: inline-block;}"+
                    "#nndSettingsModal .subfooter > * {border-right: 1px solid rgba(0,0,0,0.48);pointer-events: none;padding: 0px 8px;border-left: 1px solid rgba(255,255,255,0.22);}"+
                    "#nndSettingsModal .subfooter a {pointer-events:all;}"+
                    "#nndSettingsModal .subfooter > *:first-child {border-left:0!important;} #nndSettingsModal .subfooter > *:last-child {border-right:0!important;}"+
                    "#nndSettingsModal .radio, #nndSettingsModal .modal-option > input {margin-left: 35px!important;}"+
                    "#nndSettingsModal .radio, #nndSettingsModal .checkbox, #nndSettingsModal .modal-option > input {margin-top: 4px!important;margin-bottom: 4px!important;}"+
                    "#nnd-opacity-value {color: #8f9cad;}"+
                    ".modal .modal-group {display: inline-block; margin-left: 35px;padding: 0 6px;border-radius: 4px;background: rgba(143, 156, 173, 0.15);}"+
                    ".modal .modal-group > * {display: inline-block;text-indent: 0!important;}"+
                    ".modal .modal-group > input {margin-left: 4px !important;}"
              }).appendTo('head');
              
              nnd._fn.setOpacity();
              
              console.debug('NND Chat: CSS added to page header');
            },
            'placeMessage':(frm, player, container, el)=>{
              container.appendChild(el);

              el.addEventListener("transitionend", function() {
                this.remove();
                if (nnd._msgCount > 0)
                  nnd._msgCount--;
              }, {once: true});

              if (nnd.fontSize <= 0) nnd.fontSize = _defaultFontSize;
              let maxLane = (Math.floor(player.clientHeight / nnd.fontSize)) - 1,
                  lane = 0,
                  playerWidth = player.clientWidth,
                  thisWidth = el.clientWidth;

              if (nnd._msgCount <= 0) {

                if (nnd.offsetType === 0) {
                  lane = Math.floor(Math.random() * (maxLane + 1));
                }

              } else {

                let msgs = [];

                if (nnd.offsetType === 0) {//RANDOM

                  let openLanes = [];

                  for (;lane <= maxLane; lane++) {
                    msgs = document.getElementsByClassName("nn-lane-" + lane);

                    if (msgs.length <= 0 || !nnd._fn.willCollide(thisWidth, msgs[msgs.length-1], (frm==='right'?offsetRight(container,msgs[msgs.length-1]):msgs[msgs.length-1].offsetLeft), playerWidth)) {
                      openLanes.push(lane);
                      continue;
                    }
                  }

                  if (openLanes.length <= 0) {
                    if (nnd.discardWhenFull) {el.remove(); return;}
                    lane = Math.floor(Math.random() * (maxLane + 1));
                  } else {
                    lane = openLanes[Math.floor(Math.random() * openLanes.length)];
                  }

                } else {//ORDERED

                  let furthestLane = 0,
                    furthestLaneGap = 0,
                    allFull = false;

                  for (;lane <= maxLane; lane++) {
                    msgs = document.getElementsByClassName("nn-lane-" + lane);
                    if (msgs.length <= 0) break;
                    else {

                      let offset = (frm==='right'?offsetRight(container,msgs[msgs.length-1]):msgs[msgs.length-1].offsetLeft);

                      if (!nnd._fn.willCollide(thisWidth, msgs[msgs.length-1], offset, playerWidth)) break;

                      if (furthestLaneGap >= 0 || offset > furthestLaneGap) {
                        furthestLane = lane;
                        furthestLaneGap = offset;
                      }
                      if (lane === maxLane) allFull = true;
                    }
                  }

                  if (allFull) {
                    if (nnd.discardWhenFull) {el.remove(); return;}
                    lane = furthestLane;
                  }

                }
              }

              nnd._msgCount++;
              $(el).css('top', (nnd.fontSize * lane) + 'px');
              $(el).addClass('nn-lane-' + lane);
              $(el).css(frm, (0 - thisWidth) + 'px');
              $(el).addClass('moving');
              requestAnimationFrame(function() {
                $(el).css('visibility', 'visible');
                $(el).css(frm, $(player).width()+'px');
              });
            },
            'addScrollingMessage':(message, extraClass)=>{
              if (typeof window.nnd === "undefined") return;
              var opts = window.nnd;
              var container = document.getElementsByClassName("videochatContainer");
              var player = document.getElementById("videowrap");
              if (container.length <= 0 || !player) return;
              container = container[0];
              if (opts.MAX < 1 || isNaN(parseInt(opts.MAX))) opts.MAX = window.nnd.MAX = 125;
              if (nnd._msgCount >= opts.MAX && opts.MAX >= 1) return;
              if (opts.offsetType < 0 || opts.offsetType > 1) {
                  console.error('NNDchat: Unknown offsetType '+opts.offsetType+', reverting to 0');
                  window.nnd.offsetType = 0;
              }
              if (opts.enabled && document.visibilityState === "visible") {
                  if (message !== null && typeof message === "string" && message.length > 0 && !(/^(?:\<.+?\>)?[\uD83E\uDD16\$\!]/.test(message))) {

                      var frm = 'right';
                      if (!opts.fromRight) frm = 'left';

                      let txt = document.createElement("div");
                      txt.classList.add('videoText');
                      if (extraClass && extraClass.length > 0)
                        txt.classList.add(extraClass);
                      txt.style.visibility = "hidden";
                      txt.innerHTML = message;

                      var imgs = txt.getElementsByTagName("img"),
                        loadedImgs = 0;

                      for (var i = imgs.length - 1; i >= 0; --i) {
                        if (!opts.displayImages)
                          imgs[i].remove();
                        else {
                          imgs[i].onload = function() {
                            loadedImgs++;
                            if (loadedImgs >= imgs.length) opts._fn.placeMessage(frm, player, container, txt);
                          }
                        }
                      }
                      if (txt.innerHTML.trim() === "") return;

                      if (imgs.length <= 0) {
                        opts._fn.placeMessage(frm, player, container, txt);
                      }

                  }
              } else return;
            },
            'willCollide':(nWidth, targetMsg, targetOffset, playerWidth)=>{
              let tWidth = targetMsg.clientWidth;
              //console.log("nWidth: " + nWidth + " // tWidth: " + tWidth + " // playerWidth: " + playerWidth + " // targetOffset: " + targetOffset);
              if (nWidth <= tWidth) return targetOffset < 0;
              let delta = (playerWidth - targetOffset) / nnd._fn.getSpeed(tWidth, playerWidth);
              //console.log("delta: " + delta);
              return (delta * nnd._fn.getSpeed(nWidth, playerWidth)) >= playerWidth;
            },
            'getSpeed':(elWidth, playerWidth)=>{
              return (playerWidth + elWidth) / _scrollDuration;
            },
            'validateAndSetValue':(valName, modalEl, min, _default)=>{
              if (!nnd.hasOwnProperty(valName)) {console.error("NND: tried to validate invalid property " + valName); return;}
              var value = parseFloat(modalEl.val());

              if (!isNaN(value) && value >= min) {
                nnd[valName] = value;
              } else {
                if (nnd[valName] < min) nnd[valName] = _default;
              }
              modalEl.attr('placeholder', nnd[valName]);
              modalEl.val(nnd[valName]);
            },
            'setFontSize':(fontsize, imageheight)=>{
              $('.head-NNDCSS-fontsize').remove();
              $('<style />', {
                  'class':'head-NNDCSS-fontsize',
                  text:".videoText img, .videochatContainer .channel-emote {max-height: "+imageheight+"px!important;max-width: "+(imageheight*2)+"px!important;}"+
                  ".videoText {font-size: "+fontsize+"px}"
              }).appendTo('head');
            },
            'removeAll':()=>{
              $('.videoText').remove();
              nnd._msgCount = 0;
            }
        },
        '_msgCount': 0,
        '_ver':'1.0374'
    };
    
    //ignore messages sent by [server], [voteskip] and anything within CHANNEL.bots if defined
    let onChatMsg = function(data) {
        if (IGNORED.indexOf(data.username) > -1) return;
        if (window.nnd.enabled &&
            ((data.meta && !data.meta.action) || !data.meta) &&
            data.time >= Date.now() - 2000 &&
            data.username.toLowerCase() !== '[server]' &&
            data.username.toLowerCase() !== '[voteskip]' &&
            (!CHANNEL.hasOwnProperty("bots") || (Array.isArray(CHANNEL.bots) && !~CHANNEL.bots.indexOf(data.username)))) {
            if (!data.meta['addClass'])
                data.meta['addClass'] = '';
            window.nnd._fn.addScrollingMessage(data.msg, data.meta.addClass);
        }
    };

    //getopts: returns the window's current nnd object excluding any of its keys beginning with "_"
    //save: stores the return value of getopts as a JSON string in localStorage, in an item named "X_nndOptions" where X is CHANNEL.name
    //load: attempts to grab [CHANNEL.name]_nndOptions from localStorage and replaces the current window's nnd options with them. finally, calls _fn.save then _fn.updateModal. only replaces properties that are found within the current nnd object, excludes keys beginning with "_". initializes settings if the localStorage settings are empty or null.
    //updateModal: updates the modal window elements to reflect the current nnd options.
    //saveFromModal: sets the current window's nnd object properties based on the options selected in the modal window, and calls _fn.save

    //create modal element, insert before #pmbar
    $('<div class="fade modal"id=nndSettingsModal aria-hidden=true role=dialog style=display:none tabindex=-1><div class=modal-dialog><div class=modal-content><div class=modal-header><button class=close data-dismiss=modal aria-hidden=true>×</button><h4>Niconico Chat Settings [<span id=modal-nnd-roomname>'+CHANNEL.name+'</span>]</h4></div><div class=modal-body id=nndSettingsWrap><div class=modal-option><div class=checkbox><label for=nnd-enable><input id=nnd-enable type=checkbox> Enable Niconico Chat</label><div class=modal-caption>Enable Niconico-style chat messages. Places chat messages on the currently playing video and scrolls them to the opposite side.</div></div></div><div class=modal-option><div class=checkbox><label for=nnd-displayimages><input id=nnd-displayimages type=checkbox> Display Images and Emotes</label><div class=modal-caption>Show images in Niconico messages.</div></div></div><div class="modal-option"><div class="checkbox"><label for="nnd-discardwhenfull"><input id="nnd-discardwhenfull" type="checkbox"> Discard New Messages When Full</label><div class="modal-caption">If checked, new messages will be ignored if there\'s no room for them. Otherwise, when there\'s no room, it will essentially be placed on a random line regardless of overlaps.</div></div></div><div class="modal-option"><div class="slider"><label for="nnd-opacity"> Opacity <span id="nnd-opacity-value">70%</span><input id="nnd-opacity" min="0" max="100" type="range"></label><div class="modal-caption">Controls transparency of messages. Default 70%.</div></div></div><div class=modal-option><div class=modal-subheader> Message Order</div><div class=modal-caption>Determines the order in which new messages are placed, as long as there is enough room.</div><div class=radio><label for=nnd-offsettype-0><input id=nnd-offsettype-0 type=radio name=offsettype> Random </label><br><label for=nnd-offsettype-1><input id=nnd-offsettype-1 type=radio name=offsettype> Top to Bottom </label></div></div><div class=modal-option><div class=modal-subheader>Message Direction</div><div class=modal-caption>Determines where new messages will start and end.</div><div class=radio><label for=nnd-fromright-true><input id=nnd-fromright-true type=radio name=fromright> from Right to Left</label><br><label for=nnd-fromright-false><input id=nnd-fromright-false type=radio name=fromright> from Left to Right</label></div></div><div class=modal-option><div class=modal-subheader>Maximum Messages</div><div class=modal-caption>Maximum amount of messages allowed on screen at once. New messages will be ignored if this many are on screen. A large amount of messages may cause lag. Default 125.</div><input id=nnd-maxmsgs type=text class=form-control placeholder=125></div><div class="modal-option"><div class="modal-subheader">Message Size</div><div class="modal-caption">Sizes of all text and images in Niconico messages. Max image width is always twice the max image height. If you want to avoid vertical image overlap, make sure Max Image Height is the same as or less than Font Size.</div><div class="modal-group"><div class="modal-caption">Font Size (px, default '+_defaultFontSize+') </div><input id="nnd-fontsize" type="text" class="form-control" placeholder="'+_defaultFontSize+'"></div><div class="modal-group"><div class="modal-caption">Max Image Height (px, default '+_defaultImageHeight+')</div><input id="nnd-imageheight" type="text" class="form-control" placeholder="'+_defaultImageHeight+'"></div></div></div><div class=modal-footer><div class=left-warning>Settings are not applied until you click Save.</div><button class="btn btn-primary"data-dismiss=modal type=button onclick=nnd._fn.saveFromModal()>Save</button> <button class="btn btn-primary"data-dismiss=modal type=button onclick=nnd._fn.updateModal()>Close</button><div class="subfooter"><span class="by">made by biggles-</span><a href="https://github.com/deerfarce/deerfarce.github.io/blob/main/cytube-nnd-chat-custom.js" target="_blank" rel="noreferrer noopener">github</a><span class="ver">version '+nnd._ver+'</span></div></div></div></div></div>').insertBefore('#pmbar');

    //load the user's options then update the modal element
    nnd._fn.load();
    nnd._fn.updateModal();

    $('#nnd-opacity').on("change", function(e) {
        $('#nnd-opacity-value').text(e.target.value + "%")
    })

    //create the button in #leftcontrols or in the navbar. toggles the NND Chat modal window when clicked
    if ($("#toggleNND").length <= 0) {
      if (window.cytubeEnhanced) {
        $('<li/>').append($('<a/>',{href:'#',id:'toggleNND',text:'NND settings',click:(t)=>{t.preventDefault();t.stopPropagation();$('#nndSettingsModal').modal();}})).insertAfter($("#" + window.cytubeEnhanced.prefix + "ui").parent());
        $('<li/>').append($('<a/>',{href:'#',id:'reloadNND',text:'Reload NND',  click:(t)=>{t.preventDefault();t.stopPropagation();nnd._fn.reload_plugin(); t.target.blur();}})).insertAfter($("#" + window.cytubeEnhanced.prefix + "ui").parent());
      } else {
        $('#leftcontrols').append($('<button/>',{id:'toggleNND','class':'btn btn-default btn-sm',html:'<span class="glyphicon glyphicon-cog"></span> NND Chat Settings',click:()=>$('#nndSettingsModal').modal()}));
      }
    }


    //create .videochatContainer which is basically an invisible container element. this holds the chat messages that will be scrolling by
    $('.embed-responsive').prepend($('<div/>', {
        'class': 'videochatContainer'
    }));

    //attach addScrollingMessage to the chatMsg socket event
    socket.on('chatMsg', onChatMsg);

    //save user's settings on page unload so they are persistent
    $(window).unload(function() {window.nnd._fn.save()});

    $(document).on("visibilitychange", function() {
      if (document.visibilityState !== "visible") {
        nnd._fn.removeAll();
      }
    });

    setTimeout(function() {
      let staleMessages = $('.videoText');
      if (staleMessages.length > 0) {
        setTimeout(function() {
          staleMessages.each(function(i,e) {e.remove(); if (nnd._msgCount > 0) nnd._msgCount--;});
        }, 7500);
      }
    }, 2500);

    console.log('LOADED: Niconico chat script for cytu.be [https://github.com/deerfarce/deerfarce.github.io/blob/main/cytube-nnd-chat-custom.js]. Version '+nnd._ver);

})();
