//this purposefully iterates past the emote limit to blank out any excessive emote text, so it's not efficient - but it does reduce text spam

if (!window.hasOwnProperty("EMOTESPERLINE") || !window.hasOwnProperty("FXPERLINE")) {
  window["EMOTESPERLINE"] = 3;
  window["FXPERLINE"] = 9;
}

window.execEmotesEfficient = function(e){
  var c=0;
  var d=0;
  return CHANNEL.badEmotes.forEach(function(t){
    e=e.replace(t.regex, function(match, cont) {
      if (/^(fx|ov)[A-Z0-9]/.test(t.name)) {
        if (window["DISABLE_EMOTE_FX"]) return '';
        return (d++>=window["FXPERLINE"] ? '' : (cont+'<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">'))
      }
      return (c++>=window["EMOTESPERLINE"] ? '' : (cont+'<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">'))
    })
  }),
  e=e.replace(/[^\s]+/gi,function(e){
    if (CHANNEL.emoteMap.hasOwnProperty(e)){
      var t=CHANNEL.emoteMap[e];
      if (/^(fx|ov)[A-Z0-9]/.test(t.name)) {
        if (window["DISABLE_EMOTE_FX"]) return '';
        return (d++>=window["FXPERLINE"] ? '' : '<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">');
      }
      return (c++>=window["EMOTESPERLINE"] ? '' : '<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">');
    }
    return e
  })
}

window.execEmotes = function(e){
  var c=0;
  var d=0;
  return (USEROPTS.no_emotes || window["EMOTESPERLINE"] === 0) ? e :
    (CyTube.featureFlag && CyTube.featureFlag.efficientEmotes) ? execEmotesEfficient(e) :
      (CHANNEL.emotes.forEach(function(t){
        e=e.replace(t.regex, function(match, cont) {
          if (/^(fx|ov)[A-Z0-9]/.test(t.name)) {
            if (window["DISABLE_EMOTE_FX"]) return '';
            return (d++>=window["FXPERLINE"] ? '' : (cont+'<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">'))
          }
          return (c++>=window["EMOTESPERLINE"] ? '' : (cont+'<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">'))
        })
      }) ,e)
}