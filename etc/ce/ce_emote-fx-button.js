//for use with cytubeEnhanced/billtube

function showEmoteFxModal() {
  let fxmodal = createModal({title:"Emote Effects", wrap_id:"chat_fx_list"})
  $(fxmodal).find(".modal-body").html(`
    <div>To use effects, type the name of the effect (CASE SENSITIVE!) followed by an emote, like so: <code>fxGlow CIAstand</code><br>
    Some effects cannot be combined.</div>
    <br>
    <h4>Animated Effects</h4>
      <ul>
        <li>
          <code>fxSpin</code> - makes emotes spin around.
        </li>
        <li>
          <code>fxBounce</code> - gives emotes a stretchy bounce.
        </li>
        <li>
          <code>fxBounce2</code> - gives emotes a more lively bounce.
        </li>
        <li>
          <code>fxShrink</code> - makes emotes slowly shrink in size.
        </li>
        <li>
          <code>fxPop</code> - makes emotes grow and then "pop".
        </li>
        <li>
          <code>fxRainbow</code> - causes emotes to rapidly change color.
        </li>
        <li>
          <code>fxShake</code> - causes emotes to shake.
        </li>
        <li>
          <code>fxShake2</code> - causes emotes to shake differently.
        </li>
        <li>
          <code>fxShake3</code> - causes emotes to shake violently.
        </li>
        <li>
          <code>fxJam</code> - gives emotes a jam animation effect.
        </li>
        <li>
          <code>fxJam2</code> - gives emotes a different jam animation effect.
        </li>
        <li>
          <code>fxFadeout</code> - causes emotes to slowly fade out.
        </li>
        <li>
          <code>fxHop</code> - makes emotes hop in place.
        </li>
        <li>
          <code>fxHop2</code> - makes emotes hop left to right.
        </li>
        <li>
          <code>fxHop3</code> - makes emotes rapidly hop left to right.
        </li>
        <li>
          <code>fxFall</code> - makes emotes slowly spin and shrink, as if they're falling.
        </li>
        <li>
          <code>fxNod</code> - <i>*nods respectfully towards you*</i>
        </li>
        <li>
          <code>fx3dspin</code> - makes emotes rotate around in 3d, kinda like rare's logo.
        </li>
        <li>
          <code>fxSwing</code> - makes emotes swing left to right.
        </li>
        <li>
          <code>fxSwing2</code> - makes emotes swing up and down.
        </li>
        <li>
          <code>fxLeave</code> - flips emotes, and makes them walk away.
        </li>
        <li>
          <code>fxArrive</code> - fxLeave, but in reverse.
        </li>
      </ul>
      
    <h4>Color Effects</h4>
      <ul>
        <li>
          <code>fxGlow</code> - gives emotes a green glow.
        </li>
        <li>
          <code>fxBw</code> - makes emotes black & white.
        </li>
        <li>
          <code>fxRed</code> - makes emotes red.
        </li>
        <li>
          <code>fxGreen</code> - makes emotes green.
        </li>
        <li>
          <code>fxBlue</code> - makes emotes blue.
        </li>
        <li>
          <code>fxDespair</code> - D E S P A I R (black and white, very high contrast)
        </li>
        <li>
          <code>fxNeon</code> - saturates emotes and shifts the color a bit.
        </li>
        <li>
          <code>fxMexico</code> - gives emotes a saturated orange color.
        </li>
      </ul>
      
    <h4>Transform Effects</h4>
      <ul>
        <li>
          <code>fxWide</code> - makes emotes  w i d e
        </li>
        <li>
          <code>fxPov</code> - gives emotes a perspective effect.
        </li>
      </ul>
      
    <h4>Overlay Emotes (experimental)</h4>
    These emotes take up no space, essentially acting as "overlays" - be aware that these can be pretty janky at the moment.
    <div class="overlays">
      <span>
        <img src="https://cdn.7tv.app/emote/01FSNFW5R00007E5TN8YT2BJMM/2x.webp">ovGun
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01GG3004QR0003GBJS3G4T6W38/2x.webp">ovLive
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01FF4NRKKR000FF5VVCKV49JZ2/2x.webp">ovChip
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01FECNYCHG000CZZNZB30AN3SE/2x.webp">ovBoom
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01FEHA6XQR0009M56EQESKKC8K/2x.webp">ovSteer
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01FZ23Z4MR000063WVYFWX90DM/2x.webp">ovBlab
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01GCN0JF60000D8ZK13J8KVD8A/2x.webp">ovRave
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01FF8AAYPR000EJAN8SN7D20H7/2x.webp">ovNo
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01FWMJG56R0003G26ZWQ26BF2A/2x.webp">ovAlert
      </span>
      <span>
        <img src="https://cdn.7tv.app/emote/01GRF0MN6R0005TJPDXZA4EMK4/2x.webp">ovSpeed
      </span>
    </div>
    
`);
  fxmodal.modal();
}
    
    
(function() {
    $(".emotefx-list-css").remove();
    
    $("<style/>", {class:"emotefx-list-css", html:`

#chat_fx_list .overlays > span {
  display: inline-block;
  text-align: center;
}
#chat_fx_list .overlays > span img {
    display: block;
    border: 1px solid #bdbdbd17;
    width: 64px;
}

    `}).appendTo('head');
  
    if ($("#chat-fx-btn").length <= 0) {
        let btn = $("<button/>", {
          class: "chatbtn",
          id: "chat-fx-btn",
          "data-tooltip": "Emote FX",
          "data-tooltip-pos": "up",
          click: function() {
            showEmoteFxModal();
          }
        });
        
        btn.append($("<i/>", {
          class: "material-icons",
          text: "auto_fix_high"
        }));
        btn.appendTo($("#chat-controls"));
    }
})();
