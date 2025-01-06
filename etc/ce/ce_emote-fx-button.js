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
          <code>fxJam</code> - gives emotes a different jam animation effect.
        </li>
        <li>
          <code>fxFadeout</code> - causes emotes to slowly fade out.
        </li>
        <li>
          <code>fxHop</code> - makes emotes hop around.
        </li>
        <li>
          <code>fxFall</code> - makes emotes slowly spin and shrink, as if they're falling.
        </li>
        <li>
          <code>fxNod</code> - *nods respectfully towards you*
        </li>
        <li>
          <code>fx3dspin</code> - makes emotes rotate around in 3d, kinda like rare's logo.
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
      
`);
  fxmodal.modal();
}
    
    
(function() {
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
