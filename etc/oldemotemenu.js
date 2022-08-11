(function() {
    if ($("#smiles-btn-legacy").length <= 0) {
        let oldEmoteBtn = $("<button/>", {
          class: "chatbtn",
          id: "smiles-btn-legacy",
          "data-tooltip": "Legacy Emote Menu",
          "data-tooltip-pos": "up",
          click: function() {
            $("#emotelist").modal();
          }
        });
        
        oldEmoteBtn.append($("<i/>", {
          class: "material-icons",
          style: "filter: hue-rotate(60deg);",
          text: "emoji_emotions"
        }));
        oldEmoteBtn.insertAfter($("#smiles-btn"));
    }
})();