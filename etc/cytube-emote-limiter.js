//this purposefully iterates past the emote limit to blank out any excessive emote text, so it's not efficient - but it does reduce text spam

if (!window.hasOwnProperty("EMOTESPERLINE")) {
  window["EMOTESPERLINE"] = 3;
}

window.execEmotesEfficient = function(e){
  var c=0;
  return CHANNEL.badEmotes.forEach(function(t){
    e=e.replace(t.regex, function(match, cont) {
      return (c++>=window["EMOTESPERLINE"] ? '' : (cont+'<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">'))
    })
  }),
  e=e.replace(/[^\s]+/gi,function(e){
    if (CHANNEL.emoteMap.hasOwnProperty(e)){
      var t=CHANNEL.emoteMap[e];
      return (c++>=window["EMOTESPERLINE"] ? '' : '<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">');
    }
    return e
  })
}

window.execEmotes = function(e){
  var c=0;
  return (USEROPTS.no_emotes || window["EMOTESPERLINE"] === 0) ? e :
    (CyTube.featureFlag && CyTube.featureFlag.efficientEmotes) ? execEmotesEfficient(e) :
      (CHANNEL.emotes.forEach(function(t){
        e=e.replace(t.regex, function(match, cont) {
          return (c++>=window["EMOTESPERLINE"] ? '' : (cont+'<img class="channel-emote" src="'+t.image+'" title="'+t.name+'">'))
        })
      }) ,e)
}