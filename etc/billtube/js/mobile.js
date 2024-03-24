(function(){
$(`<style>`).appendTo('head').text(`
@media (max-width: 992px){/*html{overflow-x: hidden}*/#videocontrols{float: right !important;padding-right:0px;}#wrap{padding: 0 0 0px;}#pmbar,#motdrow, #playlistrow{display: none;z-index: 1029!important;}#motdrow, #playlistrow{position: fixed;top:50px;overflow-y: auto;padding-bottom: 50px}.pm-panel, .pm-panel-placeholder{width: 97vw;}.pm-panel > .panel-body > .pm-buffer {height: calc(100vh - 252px);max-height: calc(100vh - 252px);}@-moz-document url-prefix(){.pm-panel > .panel-body > .pm-buffer {max-height: calc(100vh - 146px);height:calc(100vh - 146px)}}.close {font-size: 50px;line-height: 0.5;}.btn-default.pmchatbtnmenu.new-pm{background-color: #2f6f6f !important;}.pm-num{position: relative;left: -22px;top: 10px;padding: 1px;border-radius: 7px;background-color: red;padding-left: 5px; padding-right: 5px}.pmchatbtnmenu{width: 60px;}
}`);



$('#motdrow').insertBefore('#playlistrow');
$('#playlistrow').insertAfter('#mainpage');
$('#leftcontrols').insertAfter('#chatwrap');
$('#leftpane').insertAfter('#leftcontrols');
$('#plcontrol').prependTo('#rightpane');

document.getElementById("main").classList.remove('row');




$('.motdbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.pm-mobile-style').remove();
$('<style>').addClass('motd-mobile-style').appendTo('head').text('.btn-default.motdbtnmenu.btn-success{background: green !important}#motdrow{display:block !important;pointer-events: painted;height: 100%;max-height: calc(100vh - 50px);background-color: black;}');
} else {
$(this).removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});


$('.playlistbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
$('<style>').addClass('pl-mobile-style').appendTo('head').text('.btn-default.playlistbtnmenu.btn-success{background: green !important}#playlistrow{display:block !important;pointer-events: painted;height: 100%;width: 100vw;max-height: calc(100vh - 50px);background-color: black;}');
} else {
$(this).removeClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});


$('.pmchatbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.motd-mobile-style').remove();
$('.pl-mobile-style').remove();
$('<style>').addClass('pm-mobile-style').appendTo('head').text('.btn-default.pmchatbtnmenu.btn-success{background: green !important}#pmbar{display:block !important;pointer-events: painted;background-color: black;}#mainpage{display: none}');
} else {
$(this).removeClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});
$(`<span class="pm-num"></span>`).insertAfter('#pm-chat');
$('.pm-btn').on('click', function(){if(!$('.pmchatbtnmenu').hasClass('btn-success')){$('.pmchatbtnmenu').click();}});

(function(){
let x = setTimeout(function z() {
var a;
a=function(){
if($('.panel-heading').length > 0){if($('.panel-primary').length>0){$('.btn-default.pmchatbtnmenu').addClass('new-pm');
}else{if($('.btn-default.pmchatbtnmenu').hasClass('new-pm')){$('.btn-default.pmchatbtnmenu').removeClass('new-pm');}}}
if(($('.panel-heading').length == 0) && $('.pmchatbtnmenu').hasClass('btn-success')){$('.pmchatbtnmenu').click();}
$(`.pm-num`).html(`${$('.panel-heading').length}`);
};a();
  x = setTimeout(z, 100); 
}, 2);})();
})();


/*(function(){
var windowWidth = $(window).width();
if (windowWidth <= 991) {
$(`<style>`).appendTo('head').text(`
@media (max-width: 992px){
body{max-height: calc(100% - 50px);}
#videocontrols{float: left !important;padding-right:15px;}
#wrap{padding: 0 0 0px;}
#motdrow{padding-top: 50px;}
#pmbar,#motdrow, #playlistrow{display: none;}
#mobile-menu .btn{height: 45px;margin-left: 5px;padding-right: 15px;}
#showmediaurl,.btn{height: 45px;margin-top: 5px;margin-right: 10px;
padding-left: 15px;padding-right: 15px;
}
#hv-btn i,#hvideo-btn i,#add-mode-btn i{top: 10px;}
#mainpage{padding-bottom: 50px;}
#pmbar {position: fixed;top:60px;bottom: 50px;overflow-y: auto;height: calc(100vh - 110px);max-height: calc(100vh - 110px);}
.videolist {max-height: 100%;}
.btn-default.pmchatbtnmenu.new-pm{background-color: #2f6f6f !important;}
.queue_entry{border: grey 1px solid;margin-top: 5px;margin-bottom: 5px;}
.pm-panel, .pm-panel-placeholder{width: 97vw;}
.pm-panel > .panel-body {height: calc(100vh - 252px);max-height: calc(100vh - 252px);}
.pm-buffer{background-position: bottom;}
.panel.panel-default.pm-panel{position: initial !important;left: 0px !important;bottom: 50px}

@-moz-document url-prefix(){}}
.close {font-size: 50px;line-height: 0.3;}
}

@media (max-width: 768px){
.qbtn-play:after{content: "";}
.qbtn-next:after{content: "";}
.queue_temp > .btn-group > .btn.btn-xs.btn-default.qbtn-tmp:after{content: "Ð—Ð°ÐºÑ€ÐµÐ¿Ð¸Ñ‚ÑŒ";font-size: 12px}
.qbtn-tmp:after{content: "ÐžÑ‚ÐºÑ€ÐµÐ¿Ð¸Ñ‚ÑŒ";font-size: 12px}
.qbtn-delete:after{content: "";}
.btn .glyphicon {
    font-size: 18px;
}
#showmediaurl:before {
    font-size: 18px;
    font-weight: bold !important;
    content: "";
    margin: 0px;
    margin-left: -10px;
}
#stiker-btn > img{height: 24px;}
#smiles-btn > img,#stiker-btn > img{height: 24px !important;width: 24px !important;}
}
@media (max-width: 992px){
#videowrap-header {display: block !important;}
#resize-video-smaller,#resize-video-larger{display: none !important;}
}
`);
$('#mobile-menu').remove();
$(`<div id="mobile-menu" style="text-align:center;position: fixed;top: calc(100% - 50px);background-color: black;max-width: 100vw;width: 100vw;max-height: 50px;height: 50px;z-index:1050">
<button class="btn btn-sm btn-default motdbtnmenu"><img src="https://dl.dropboxusercontent.com/s/dfevd1id7etmg6d/info-btn.png" style="height: 32px"/></button>
<button class="btn btn-sm btn-default playlistbtnmenu"><img src="https://dl.dropboxusercontent.com/s/n4ghlpo0b5y0dyy/video-playlist.png" style="height: 32px"/></button>
<button class="btn btn-sm btn-default pmchatbtnmenu"><img src="https://dl.dropboxusercontent.com/s/fhkl4tqech5o1t1/pm-btn.png" style="height: 32px"/></button>
</div>`).appendTo('body');


$('#motdrow').insertBefore('#mainpage');
$('#playlistrow').insertAfter('#mainpage');
$('#leftcontrols').insertAfter('#chatwrap');
$('#leftpane').insertAfter('#leftcontrols');
$('#plcontrol').prependTo('#rightpane');

$('#fullscreenbtn').remove();$('#getplaylist').remove();$('#minismiles-btn').remove();$('#hvideo-btn').remove();var vhdn;$('<span id="offvideo-btn" class="btn btn-sm btn-default" title="ÐžÑ‚ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ Ð²Ð¸Ð´ÐµÐ¾Ð¿Ð»ÐµÐµÑ€"><i class="glyphicon glyphicon-ban-circle"></span>').insertAfter("#mediarefresh").on("click", function() {if(!$(this).hasClass('btn-success')){$(this).addClass('btn-success').html('<span title="Ð’ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ Ð²Ð¸Ð´ÐµÐ¾Ð¿Ð»ÐµÐµÑ€"><i class="glyphicon glyphicon-film"></i></span>');vhdn = $('#videowrap').detach();$('#titlerow').hide();$('#currenttitle').hide();$('#hv-btn').attr('disabled',true);$('#ce-modal-settings > div.modal-dialog.modal-lg > div > div.modal-footer > div > button.btn.btn-success').attr('disabled',true);} else {$(this).removeClass('btn-success').html('<span title="ÐžÑ‚ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ Ð²Ð¸Ð´ÐµÐ¾Ð¿Ð»ÐµÐµÑ€"><i class="glyphicon glyphicon-ban-circle"></span>');vhdn.prependTo('#main');$('#titlerow').show();$('#currenttitle').show();$('#hv-btn').attr('disabled',false);$('#ce-modal-settings > div.modal-dialog.modal-lg > div > div.modal-footer > div > button.btn.btn-success').attr('disabled',false);$('#mediarefresh').click();}});



$('.motdbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('#mainpage').hide();
$('.pl-mobile-style').remove();
$('.pm-mobile-style').remove();
$('<style>').addClass('motd-mobile-style').appendTo('head').text('.btn-default.motdbtnmenu.btn-success{background: green !important}#motdrow{background-color:black;display: block !important;position: fixed;z-index: 1029!important;top:50px;bottom: 50px;width: 100vw;height: calc(100vh - 100px);overflow-y: auto;padding-bottom: 50px}');
} else {
$(this).removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('#mainpage').show();
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});


$('.playlistbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('#mainpage').hide();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
$('<style>').addClass('pl-mobile-style').appendTo('head').text('.btn-default.playlistbtnmenu.btn-success{background: green !important}#playlistrow{background-color:black;display: block !important;position: fixed;z-index: 1029!important;top:50px;bottom: 50px;height: calc(100vh - 100px);width: 100vw;overflow-y: auto;padding-bottom: 50px}');
} else {
$(this).removeClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.pmchatbtnmenu').removeClass('btn-success');
$('#mainpage').show();
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});


$('.pmchatbtnmenu').on('click', function(){
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('#mainpage').hide();
$('.motd-mobile-style').remove();
$('.pl-mobile-style').remove();
$('<style>').addClass('pm-mobile-style').appendTo('head').text('.btn-default.pmchatbtnmenu.btn-success{background: green !important}#pmbar{background-color:black;display: block !important;position: fixed;z-index: 1029!important;top:50px;bottom: 50px;width: 100vw;height: calc(100vh - 100px);overflow-y: auto;overflow-x: hidden;padding-bottom: 50px}');
} else {
$(this).removeClass('btn-success');
$('.motdbtnmenu').removeClass('btn-success');
$('.playlistbtnmenu').removeClass('btn-success');
$('#mainpage').show();
$('.pl-mobile-style').remove();
$('.motd-mobile-style').remove();
$('.pm-mobile-style').remove();
}
});
$('.pm-btn').on('click', function(){
if(!$('.pmchatbtnmenu').hasClass('btn-success')){
 $('.pmchatbtnmenu').click();   
}});

(function(){
let x = setTimeout(function z() {
var a;
a=function(){
if($('.panel-primary').length>0){
$('.btn-default.pmchatbtnmenu').addClass('new-pm');
}else{
if($('.btn-default.pmchatbtnmenu').hasClass('new-pm')){
$('.btn-default.pmchatbtnmenu').removeClass('new-pm');
}
}
};a();
  x = setTimeout(z, 1000); 
}, 2);})();
   }
})();*/

$('video').attr('playsinline', '');
$('video').attr('loop', '');
$('video').attr('autoplay', '');
//videojs('ytapiplayer', {autoplay: true});

if (UI_ChannelAnnouncement=="1") {
	ChannelAnnouncement_Title=="" ? ChannelAnnouncement_Title='Administration Message' : '';
	ChannelAnnouncement_HTML=="" ? ChannelAnnouncement_HTML='<i>no messages</i>' : '';
	makeAlert(ChannelAnnouncement_Title, ChannelAnnouncement_HTML).insertBefore("#motdrow");
}

if (UI_ChannelName=="1" && ChannelName_Caption!="") {
	$(".navbar-brand").html(ChannelName_Caption);
}