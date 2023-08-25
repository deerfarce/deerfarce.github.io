if (!this[CHANNEL.name]) this[CHANNEL.name] = {};

if (!window.CustomPollSound) window.CustomPollSound = "//dl.dropbox.com/s/9c8f4deo5vu7llc/Falling.mp3";

/*!
 **|  Cytube Playlist Enhancements
 **|  Written by Xaekai except where noted
 **|  Version 2016.01.31.0056
 **|  Copyright 2014-2016
 **|
 **@preserve
 */
/*!
/*!
**|
**|  Audio File Library for CyTube Scripts
**|  Written by Xaekai
**|
**@preserve
*/
if (!this[CHANNEL.name].audioLibrary) {
    this[CHANNEL.name].audioLibrary = {};
}
this[CHANNEL.name].audioLibrary.sounds = {
    beep: { url: "https://dl.dropbox.com/s/neu0qkmvr0suo54/146717_2437358-lq.mp3", emote: false, squee: true },
    blop: { url: "https://dl.dropbox.com/s/brz0kddnbcniles/146718_2437358-lq.mp3", emote: false, squee: true },
    beepbop: { url: "https://dl.dropbox.com/s/5q9gt7micaboccd/264447_4322723-lq.mp3", emote: true, squee: true },
    nya: { url: "https://dl.dropbox.com/s/06mccqqpy513osw/336012_5953264-lq.mp3", emote: true, squee: true },
    knock: { url: "https://dl.dropbox.com/s/bb7e71v5ylp1zqc/383757_7146007-lq.mp3", emote: false, squee: true },
    zing: { url: "https://dl.dropbox.com/s/372gs0e8gmbycyp/419673_1904290-lq.mp3", emote: true, squee: true },
    pong: { url: "https://dl.dropbox.com/s/r0cadovvqw6d661/506052_10991815-lq.mp3", emote: true, squee: false },
    votingpoll: { url: window.CustomPollSound, emote: true, squee: true },
    squee: { url: "//dl.dropbox.com/s/oa4ew11lwcnvao6/Knock.mp3", emote: true, squee: true },
};
this[CHANNEL.name].audioLibrary.squees = (function () {
    var keys = Object.keys(this[CHANNEL.name].audioLibrary.sounds);
    var squees = {};
    for (var i = keys.length - 1; i >= 0; i--) {
        var soundObj = this[CHANNEL.name].audioLibrary.sounds[keys[i]];
        if (soundObj.squee) {
            squees[keys[i]] = soundObj.url;
        }
    }
    return squees;
})();
this[CHANNEL.name].audioLibrary.emotes = (function () {
    var keys = Object.keys(this[CHANNEL.name].audioLibrary.sounds);
    var emotes = {};
    for (var i = keys.length - 1; i >= 0; i--) {
        var soundObj = this[CHANNEL.name].audioLibrary.sounds[keys[i]];
        if (soundObj.emote) {
            emotes[keys[i]] = new Audio(soundObj.url);
        }
    }
    return emotes;
})();

/*|  CyTube Custom Channel Settings Modal
 **|  Version: 2015-02-05
 **|  Written by Xaekai. Copyright 2014-2015.
 **@preserve
 */
if (!$("#customSettingsStaging").length) {
    $("<div/>").prop("id", "customSettingsStaging").prop("class", "row section fade in").hide().insertAfter("#navtabs");
}
if ($("#customSettingsModal").length) {
    $("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
    $("#customSettingsModal").remove();
}
if ($("#customSettingsModalTrigger").length) {
    $("#customSettingsModalTrigger").unbind().remove();
}
function createModal(data) {
    var title = data.title || "Empty Modal";
    var title_m = !!data.titleIsMarkup;
    var wrap = $("<div/>").addClass("modal fade").attr("tabindex", "-1");
    var dialog = $("<div/>").addClass("modal-dialog").appendTo(wrap);
    var content = $("<div/>").addClass("modal-content").appendTo(dialog);
    var head = $("<div/>").addClass("modal-header").appendTo(content);
    var body = $("<div/>").addClass("modal-body").appendTo(content);
    var foot = $("<div/>").addClass("modal-footer");
    $("<button/>").addClass("close").attr("data-dismiss", "modal").attr("data-hidden", "true").html("&times;").appendTo(head);
    $("<button/>").addClass("btn btn-default").attr("data-dismiss", "modal").prop("type", "button").html("Close").appendTo(foot);
    if (title_m) {
        $("<h4/>").addClass("modal-title").html(title).appendTo(head);
    } else {
        $("<h4/>").addClass("modal-title").text(title).appendTo(head);
    }
    if (data.wrap_id) {
        wrap.prop("id", data.wrap_id);
    }
    if (data.body_id) {
        body.prop("id", data.body_id);
    }
    if (data.footer) {
        foot.appendTo(content);
    }
    if (data.destroy) {
        wrap.on("hidden.bs.modal", function () {
            wrap.remove();
        });
    }
    if (data.attach) {
        wrap.appendTo(data.attach);
    }
    return wrap;
}
$("<button/>")
    .prop("id", "customSettingsModalTrigger")
    .attr("title", "Channel Control")
    .addClass("btn btn-sm btn-default")
    .html('<span class="glyphicon glyphicon-tasks"></span> Channel Control')
    .button()
    .appendTo("#customSettingsStaging")
    .attr("data-toggle", "modal")
    .click(function (event) {
        createModal({ title: "Personal Channel Settings: " + CHANNEL.name, wrap_id: "customSettingsModal", body_id: "customSettingsWrap", footer: true })
            .on("show.bs.modal", function (event) {
                $("#customSettingsStaging .customSettings").each(function () {
                    var panel = $("<div/>").addClass("panel panel-primary");
                    var heading = $("<div/>").addClass("panel-heading").appendTo(panel);
                    var body = $("<div/>").addClass("panel-body").appendTo(panel);
                    panel.appendTo($("#customSettingsWrap"));
                    heading.text($(this).data().title);
                    $(this).detach().appendTo(body);
                });
            })
            .on("hidden.bs.modal", function (event) {
                $("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
                $("#customSettingsModal").remove();
            })
            .insertAfter("#useroptions")
            .modal();
    });
if (USEROPTS.layout.match(/synchtube/)) {
    $("#customSettingsModalTrigger").detach().appendTo("#leftcontrols");
} else {
    $("#customSettingsModalTrigger").detach().prependTo("#leftcontrols");
}
var ul = document.querySelector("ul.navbar-nav");
lis = ul.querySelectorAll(".dropdown");
var li = document.createElement("li");
li.innerHTML = '<button id="Notif"  data-tooltip="Sound notifications" data-tooltip-pos="left" class="fas fa-bell" style="background:none;border:0;top:16px;font-size:1.5rem;"></button>';
ul.insertBefore(li, lis[3]);

$("#Notif").click(function () {
    $(this).toggleClass("active notifon");
    $("#customSettingsStaging").toggleClass("show");
	$('html, body').animate({
        scrollTop: $("#customSettingsStaging").offset().top
    }, 2000);
	
	
});


/*!
 **|  CyTube Audio Notifications System
 **|  Copyright 2013-2015 Xaekai
 **|
 **@preserve
 */
if (!window[CHANNEL.name]) window[CHANNEL.name] = {};
if (!$("#customSettingsStaging").length) {
    $("<div/>").prop("id", "customSettingsStaging").appendTo("#customSettingsStaging");
}
if (!window[CHANNEL.name].audioNotice) {
    window[CHANNEL.name].audioNotice = {};
    window[CHANNEL.name].audioNotice.Squee = { timeSinceLast: 0 };
    window[CHANNEL.name].audioNotice.Poll = { timeSinceLast: 0 };
    window[CHANNEL.name].audioNotice.Priv = { timeSinceLast: 0 };
    window[CHANNEL.name].audioNotice.Video = { timeSinceLast: 0 };
}
window[CHANNEL.name].audioNotice.typeNames = { Squee: "Username", Poll: "Poll", Priv: "Private Message", Video: "Queued Video" };
window[CHANNEL.name].audioNotice.pushNoticeChange = function (change) {
    var type, id, silent;
    type = change.type;
    id = change.id;
    silent = change.silent;
    window[CHANNEL.name].audioNotice[type].id = id;
    window[CHANNEL.name].audioNotice[type].file = window[CHANNEL.name].audioNotice.choices[id];
    localStorage[CHANNEL.name + "_AudioNotice" + type + "ID"] = id;
    $("#AudioNotice" + this.typeNames[type].split(" ")[0]).remove();
    window[CHANNEL.name].audioNotice[type].audio = $("<audio>")
        .prop("id", "AudioNotice" + this.typeNames[type].split(" ")[0])
        .appendTo("body")
        .attr("preload", "auto")
        .prop("volume", window[CHANNEL.name].audioNotice[type].volume)
        .append($("<source>").attr("src", window[CHANNEL.name].audioNotice[type].file).attr("type", "audio/ogg"));
    if (!silent) {
        window[CHANNEL.name].audioNotice[type].audio[0].play();
        $("div.chat-msg-\\\\\\$server\\\\\\$:contains(" + this.typeNames[type] + " Notification)").remove();
    }
};
window[CHANNEL.name].audioNotice.pushVolume = function (change) {
    var type, volume;
    type = change.type;
    volume = change.volume;
    if (volume == "up") {
        volume = (window[CHANNEL.name].audioNotice[type].volume * 100 + 5) / 100;
    } else if (volume == "down") {
        volume = (window[CHANNEL.name].audioNotice[type].volume * 100 - 5) / 100;
    } else {
        return console.error("ERROR: AudioNotice System: Volume must be 'up' or 'down'");
    }
    volume = Math.min(Math.max(volume, 0.05), 1) || 0.6;
    window[CHANNEL.name].audioNotice[type].volume = volume;
    localStorage[CHANNEL.name + "_AudioNotice" + type + "Volume"] = Math.floor(volume * 100);
    window[CHANNEL.name].audioNotice[type].audio.prop("volume", volume)[0].play();
    if (window[CHANNEL.name].audioNotice[type].indicator) window[CHANNEL.name].audioNotice[type].indicator.html(Math.floor(volume * 100));
};
window[CHANNEL.name].audioNotice.toggle = function (type) {
    window[CHANNEL.name].audioNotice[type].toggleState = !window[CHANNEL.name].audioNotice[type].toggleState;
    localStorage[CHANNEL.name + "_AudioNotice" + type + "Toggle"] = +window[CHANNEL.name].audioNotice[type].toggleState;
    if (window[CHANNEL.name].audioNotice[type].toggleButton) window[CHANNEL.name].audioNotice[type].toggleButton.toggleClass("label-default label-info activemute");
    window[CHANNEL.name].audioNotice[type].panel.toggleClass("btn-danger btn-success");
};
window[CHANNEL.name].audioNotice.handler = {
    Squee: function (data) {
        var squee;
        if (!window[CHANNEL.name].audioNotice.Squee.toggleState) {
            return;
        }
        if (!CHANNEL.opts.chat_antiflood) {
            console.info();
            return;
        }
        if (Date.now() - window[CHANNEL.name].audioNotice.Squee.timeSinceLast < 7e3) return;
        squee = $(".nick-highlight:not( .parsed )");
        if (!squee.length) return;
        squee.addClass("parsed");
        var start = Date.parse("2015-10-31T04:00:00Z"),
            end = Date.parse("2015-11-01T04:00:00Z"),
            current = Date.now();
        current > start && end > current
            ? (function () {
                  toot = new Audio("/skulltrumpet.wav");
                  toot.volume = 0.33;
                  toot.play();
              })()
            : window[CHANNEL.name].audioNotice.Squee.audio[0].play();
        window[CHANNEL.name].audioNotice.Squee.timeSinceLast = Date.now();
    },
    Poll: function (data) {
        if (!window[CHANNEL.name].audioNotice.Poll.toggleState) return;
        if (CLIENT.rank < CHANNEL.perms.pollvote) return;
        if (Date.now() - window[CHANNEL.name].audioNotice.Poll.timeSinceLast < 36e4) return;
        window[CHANNEL.name].audioNotice.Poll.audio[0].play();
        window[CHANNEL.name].audioNotice.Poll.timeSinceLast = Date.now();
    },
    Priv: function (data) {
        if (!window[CHANNEL.name].audioNotice.Priv.toggleState) return;
        if (data.username == CLIENT.name) return;
        if ($(document.activeElement).hasClass("pm-input")) return;
        if (Date.now() - window[CHANNEL.name].audioNotice.Priv.timeSinceLast < 18e4) return;
        window[CHANNEL.name].audioNotice.Priv.audio[0].play();
        window[CHANNEL.name].audioNotice.Priv.timeSinceLast = Date.now();
        $("div.chat-msg-\\\\\\$server\\\\\\$:contains(Private Message Notification)").remove();
        window[CHANNEL.name].VirtualWhisper("Private Message Notification");
    },
    Video: function (data) {
        var addedby;
        if (!window[CHANNEL.name].audioNotice.Video.toggleState) return;
        if (CLIENT.rank < CHANNEL.perms.seeplaylist) return;
        addedby = playlist(false).addedby == CLIENT.name;
        if (addedby && window[CHANNEL.name].audioNotice.Video.last) {
            window[CHANNEL.name].audioNotice.Video.timeSinceLast = Date.now();
            return;
        }
        window[CHANNEL.name].audioNotice.Video.last = false;
        if (!addedby) return;
        if (Date.now() - window[CHANNEL.name].audioNotice.Video.timeSinceLast < 6e5) return;
        window[CHANNEL.name].audioNotice.Video.audio[0].play();
        window[CHANNEL.name].audioNotice.Video.timeSinceLast = Date.now();
        window[CHANNEL.name].audioNotice.Video.last = true;
        $("div.chat-msg-\\\\\\$server\\\\\\$:contains(Video Notification)").remove();
        window[CHANNEL.name].VirtualWhisper("Video Notification: Your video is now playing!");
    },
};
(function () {
    if (window[CHANNEL.name].audioNotice.initialized) return;
    window[CHANNEL.name].audioNotice.initialized = true;
    window[CHANNEL.name].audioNotice["Squee"].toggleState = false;
    window[CHANNEL.name].audioNotice["Poll"].toggleState = true;
    window[CHANNEL.name].audioNotice["Priv"].toggleState = true;
    window[CHANNEL.name].audioNotice["Video"].toggleState = true;
    window[CHANNEL.name].audioNotice["Squee"].id = "squee";
    window[CHANNEL.name].audioNotice["Poll"].id = "votingpoll";
    window[CHANNEL.name].audioNotice["Priv"].id = "beep";
    window[CHANNEL.name].audioNotice["Video"].id = "bloop";
    window[CHANNEL.name].audioNotice["Squee"].volume = 0.6;
    window[CHANNEL.name].audioNotice["Poll"].volume = 0.7;
    window[CHANNEL.name].audioNotice["Priv"].volume = 0.35;
    window[CHANNEL.name].audioNotice["Video"].volume = 0.35;
    if (!!window[CHANNEL.name].audioLibrary) {
        window[CHANNEL.name].audioNotice.choices = window[CHANNEL.name].audioLibrary.squees;
    }
    if (window[CHANNEL.name] && window[CHANNEL.name].modulesOptions && window[CHANNEL.name].modulesOptions.audioNotice) {
        var choices = Object.keys(window[CHANNEL.name].modulesOptions.audioNotice.choices);
        var notices = Object.keys(window[CHANNEL.name].modulesOptions.audioNotice.notices);
        for (var i = choices.length - 1; i >= 0; i--) {
            window[CHANNEL.name].audioNotice["choices"][choices[i]] = window[CHANNEL.name].modulesOptions.audioNotice.choices[choices[i]];
        }
        for (var i = notices.length - 1; i >= 0; i--) {
            window[CHANNEL.name].audioNotice[notices[i]]["id"] = window[CHANNEL.name].modulesOptions.audioNotice.notices[notices[i]];
        }
    }
    var types = Object.keys(window[CHANNEL.name].audioNotice.typeNames);
    if (typeof Storage !== "undefined") {
        for (var i = types.length - 1; i >= 0; i--) {
            if (localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Toggle"] != undefined) {
                window[CHANNEL.name].audioNotice[types[i]].toggleState = parseInt(localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Toggle"]);
            }
            if (localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "ID"] != undefined) {
                window[CHANNEL.name].audioNotice[types[i]].id = localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "ID"];
            }
            if (localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Volume"] != undefined) {
                window[CHANNEL.name].audioNotice[types[i]].volume = parseInt(localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Volume"]) / 100 || 0.6;
            }
            window[CHANNEL.name].audioNotice.pushNoticeChange({ type: types[i], id: window[CHANNEL.name].audioNotice[types[i]].id, silent: true });
        }
    } else {
        console.log("ERROR: AudioNotice System: Local storage not supported by this browser.");
    }
    window[CHANNEL.name].audioNotice.Squee.toggleButton = $("<span/>")
        .html("")
        .prop("id", "AudioNoticeSqueeToggle")
        .attr("title", "Toggle Username Audio Notices")
        .addClass("pointer fa fa-bell hidden")
        .click(function () {
            window[CHANNEL.name].audioNotice.toggle("Squee");
        })
        .appendTo($("#chatwrap"));
    if (!window[CHANNEL.name].audioNotice.Squee.toggleState) {
        window[CHANNEL.name].audioNotice.Squee.toggleButton.removeClass("label-info").addClass("");
    }
    socket.on("chatMsg", function (data) {
        return window[CHANNEL.name].audioNotice.handler["Squee"](data);
    });
    socket.on("newPoll", function (data) {
        return window[CHANNEL.name].audioNotice.handler["Poll"](data);
    });
    socket.on("pm", function (data) {
        return window[CHANNEL.name].audioNotice.handler["Priv"](data);
    });
    socket.on("changeMedia", function (data) {
        return window[CHANNEL.name].audioNotice.handler["Video"](data);
    });
    console.log("INFO: AudioNotice System Initialized");
    window[CHANNEL.name].audioNotice.controls = $('<div id="AudioNoticeControls" class="customSettings" data-title="Audio Notifications Settings"/>').appendTo("#customSettingsStaging");
    for (var i = 0; i < types.length; i++) {
        var TYPE = types[i];
        (function () {
            var form = $("<form>").prop("action", "javascript:void(0)").addClass("form-horizontal");
            var wrapper = $("<div>")
                .addClass("form-group")
                .prop("id", "AudioNoticeControls" + TYPE)
                .appendTo(form);
            window[CHANNEL.name].audioNotice.controls.append(form);
            $("<span>")
                .addClass("label label-info col-sm-3")
                .text(window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Notice")
                .appendTo(wrapper);
            var buttongroup = $("<div>").addClass("btn-groupnotif col-sm-8").attr("data-control", TYPE).appendTo(wrapper);
            var toggle = $("<button/>")
                .prop("id", "AudioNoticeControls" + TYPE + "Toggle")
                .addClass("btn btn-sm btn-success")
                .attr("title", "Toggle " + window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Notices")
                .html('<span class="glyphicon glyphicon-bell"></span>')
                .click(function () {
                    window[CHANNEL.name].audioNotice.toggle($(this).parent().data().control);
                })
                .prependTo(buttongroup);
            window[CHANNEL.name].audioNotice[TYPE].panel = toggle;
            if (!window[CHANNEL.name].audioNotice[TYPE].toggleState) toggle.toggleClass("btn-success btn-danger");
            var sounds = $("<div/>")
                .addClass("btn-group")
                .prop("id", "AudioNoticeControls" + TYPE + "Sounds")
                .appendTo(buttongroup);
            $("<button/>")
                .prop("id", "AudioNoticeControls" + TYPE + "VolumeDown")
                .addClass("btn btn-sm btn-default")
                .attr("title", window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Volume Down")
                .click(function () {
                    window[CHANNEL.name].audioNotice.pushVolume({ type: $(this).parent().data().control, volume: "down" });
                })
                .html('<span class="glyphicon glyphicon-volume-down"></span>')
                .appendTo(buttongroup);
            window[CHANNEL.name].audioNotice[TYPE].indicator = $("<button/>")
                .prop("id", "AudioNoticeControls" + TYPE + "Indicator")
                .addClass("btn btn-sm btn-default")
                .attr("title", window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Volume")
                .html(window[CHANNEL.name].audioNotice[TYPE].volume * 100)
                .appendTo(buttongroup);
            $("<button/>")
                .prop("id", "AudioNoticeControls" + TYPE + "VolumeUp")
                .addClass("btn btn-sm btn-default")
                .attr("title", window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Volume Up")
                .click(function () {
                    window[CHANNEL.name].audioNotice.pushVolume({ type: $(this).parent().data().control, volume: "up" });
                })
                .html('<span class="glyphicon glyphicon-volume-up"></span>')
                .appendTo(buttongroup);
            $("<button/>")
                .prop("id", "AudioNoticeControls" + TYPE + "Play")
                .addClass("btn btn-sm btn-default")
                .attr("title", "Play Notification")
                .click(function () {
                    window[CHANNEL.name].audioNotice[$(this).parent().data().control].audio[0].play();
                })
                .html('<span class="glyphicon glyphicon-play"></span>')
                .appendTo(buttongroup);
            $("<button/>")
                .addClass("btn btn-default btn-sm dropdown-toggle")
                .attr("type", "button")
                .attr("href", "javascript:void(0)")
                .attr("data-toggle", "dropdown")
                .html("<span class='glyphicon glyphicon-music'></span> Sound <span class='caret'></span>")
                .appendTo(sounds);
            var sound_content = $("<ul/>").addClass("dropdown-menu").addClass("columns").attr("role", "menu").appendTo(sounds);
            var keys = Object.keys(window[CHANNEL.name].audioNotice.choices);
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                var populate_list = $("<li/>").appendTo(sound_content);
                (function (i) {
                    $("<a/>")
                        .text(key)
                        .attr("href", "javascript:void(0)")
                        .attr("data-notice", key)
                        .attr("data-type", TYPE)
                        .click(function () {
                            console.log($(this).data().type, $(this).data().notice);
                            window[CHANNEL.name].audioNotice.pushNoticeChange({ type: $(this).data().type, id: $(this).data().notice, silent: false });
                        })
                        .appendTo(populate_list);
                })(i);
            }
        })();
    }
})();
$("#Notif").after("<li id='videocontrols'></li>");



/*!
 **|   Cytube Playlist Enhancements
 **|   Copyright Xaekai 2014 - 2016
 **|   Version 2018.01.21.2200
 **|
 **@optional whispers
 **@preserve
 */
"use strict";
function playlist(active) {
    var queue = [];
    var selector = `#queue > .queue_entry${active ? ".queue_active" : ""}`;
    $(selector).each(function () {
        var data = $(this).data();
        var addedby;
        if ($(this).attr("data-original-title")) {
            addedby = $(this)
                .attr("data-original-title")
                .match(/: ([-\w\u00c0-\u00ff]{1,20})$/)[1];
        } else {
            addedby = $(this)
                .attr("title")
                .match(/: ([-\w\u00c0-\u00ff]{1,20})$/)[1];
        }
        queue.push({ uid: data.uid, media: data.media, temp: data.temp, active: $(this).hasClass("queue_active"), addedby: addedby });
    });
    return active ? queue[0] : queue;
}
(function (CyTube_Playlist) {
    return CyTube_Playlist(window, document, window.jQuery);
})(function (window, document, $, undefined) {
    if (typeof Storage === "undefined") {
        console.error("[XaeTube: Enhanced Playlist]", "localStorage not supported. Aborting load.");
        return;
    } else {
        console.info("[XaeTube: Enhanced Playlist]", "Loading Module.");
    }
    if (!window[CHANNEL.name]) {
        window[CHANNEL.name] = {};
    }
    const options = Object.assign(
        {},
        {
            collapse: true,
            hidePlaylist: true,
            inlineBlame: false,
            moveReporting: false,
            quickQuality: false,
            quickShuffle: true,
            recentMedia: true,
            simpleLeader: true,
            syncCheck: false,
            thumbnails: false,
            markAlert: true,
            timeEstimates: false,
            volumeControl: false,
        },
        window[CHANNEL.name].modulesOptions ? window[CHANNEL.name].modulesOptions.playlist : undefined
    );
    ({
        start: function () {
            if (!options.syncCheck) {
                return;
            }
            if (CLIENT.psync) {
                return;
            } else {
                CLIENT.psync = this;
            }
            socket.on("setPlaylistMeta", (data) => {
                this.syncCheck(data);
            });
            socket.on("queue", (data) => {
                this.resetTimer(data);
            });
        },
        syncCheck: function (data) {
            if (CHANNEL.perms.seeplaylist > CLIENT.rank) {
                return;
            }
            if (Math.abs(this.sinceLast - Date.now()) < this.cooldown) {
                return;
            }
            var playlistCount = $("ul#queue li.queue_entry").length;
            if (Math.abs(playlistCount - data.count) > 1) {
                this.setTimer();
            }
        },
        setTimer: function () {
            if (this.state.activeTimer) {
                this.sinceLast = Date.now();
                clearTimeout(this.state.tock);
            } else {
                this.state.activeTimer = true;
            }
            this.state.tock = setTimeout(this.syncFix.bind(this), this.delay);
        },
        resetTimer: function (data) {
            if (this.state.activeTimer) {
                this.setTimer();
            }
        },
        syncFix: function () {
            this.state.activeTimer = false;
            socket.emit("requestPlaylist");
            this.sinceLast = Date.now();
        },
        state: { active: false, tock: 0 },
        sinceLast: Date.now(),
        cooldown: 120 * 1e3,
        delay: 5 * 1e3,
    }.start());
    ({
        start: function () {
            if (!options.thumbnails) {
                return;
            }
            if (CLIENT.thumbnailer) {
                return;
            } else {
                CLIENT.thumbnailer = this;
            }
            $("<style>").prop("id", "thumbnailer").text(".playlist-thumbnail { max-height: 180px; max-width: 240px; border-radius: 4px; }").appendTo("head");
            $("#queue").on("mouseleave", () => {
                this.trimOrphans();
            });
            socket.on("delete", () => {
                this.trimOrphans();
            });
            socket.on("queue", () => {
                this.playlistScan();
            });
            socket.on("playlist", () => {
                this.playlistScan();
            });
            this.playlistScan();
        },
        playlistScan: function () {
            if (CHANNEL.perms.seeplaylist > CLIENT.rank) {
                return;
            }
            var self = this;
            $("#queue > .queue_entry:not(.thumbed)").each(function () {
                self.getThumbnail($(this));
            });
        },
        trimOrphans: function () {
            $("#queue .popover").remove();
        },
        getThumbnail: function (target) {
            var type = target.data().media.type;
            var id = target.data().media.id;
            var url;
            switch (type) {
                case "vi":
                    url = "https://vimeo.com/api/v2/video/__id.json".replace(/__id/, id);
                    $.getJSON(url, (data) => {
                        var url = data[0].thumbnail_medium;
                        this.applyThumbnail(target, url);
                    });
                    target.addClass("thumbed");
                    return;
                case "yt":
                    url = "https://img.youtube.com/vi/__id/0.jpg".replace(/__id/, id);
                    break;
                case "dm":
                    url = "https://www.dailymotion.com/thumbnail/video/__id".replace(/__id/, id);
                    break;
                case "gd":
                    url = "https://thumbs.pink.horse/drive/__id".replace(/__id/, id);
                    break;
                case "gp":
                    url = "https://thumbs.pink.horse/picasa/__id".replace(/__id/, id);
                    break;
                default:
                    target.addClass("thumbed");
                    return;
            }
            this.applyThumbnail(target, url);
            target.addClass("thumbed");
        },
        applyThumbnail: function (target, url) {
            target.popover({
                html: true,
                placement: function () {
                    return !USEROPTS.layout.match(/synchtube/) ? "left" : "right";
                },
                trigger: "hover",
                content: '<img src="__url" class="__class">'.replace(/__class/, this.klass).replace(/__url/, url),
            });
        },
        klass: "playlist-thumbnail",
    }.start());
    void (() => {
        if (!options.inlineBlame) {
            return;
        }
        window.makeQueueEntry = function (item, addbtns) {
            var video = item.media;
            var li = $("<li/>");
            li.addClass("queue_entry");
            li.addClass("pluid-" + item.uid);
            li.data("uid", item.uid);
            li.data("media", video);
            li.data("temp", item.temp);
            li.data("blame", item.queueby);
            if (video.thumb) {
                $("<img/>").attr("src", video.thumb.url).css("float", "left").css("clear", "both").appendTo(li);
            }
            var title = $("<a/>").addClass("qe_title").appendTo(li).text(video.title).attr("href", formatURL(video)).attr("target", "_blank");
            var time = $("<span/>").addClass("qe_time").appendTo(li);
            time.text(video.duration);
            var blame = $("<span/>").addClass("qe_blame").appendTo(li);
            blame.text("\u00A0| " + item.queueby);
            var clear = $("<div/>").addClass("qe_clear").appendTo(li);
            if (item.temp) {
                li.addClass("queue_temp");
            }
            if (addbtns) {
                addQueueButtons(li);
            }
            return li;
        };
        setTimeout(function () {
            socket.emit("requestPlaylist");
        }, 61e3);
    })();
    void (() => {
        if (!options.markAlert) {
            return;
        }
        var _aQB = window.addQueueButtons;
        window.addQueueButtonsOld = _aQB;
        $("#queue").data("marked", []);
        window.addQueueButtons = function (li) {
            li.find(".qbtn-mark").remove();
            window.addQueueButtonsOld(li);
            const usingGroup = hasPermission("playlistjump") || hasPermission("playlistmove") || hasPermission("settemp") || hasPermission("playlistdelete");
            var uid = li.data("uid");
            var blame = li.data("blame");
            var menu = li.find(".btn-group");
            var title = li.find(".qe_title");
            var mark = $("#queue").data("marked").includes(uid);
            var marker = $("<button/>")
                .addClass("btn btn-xs qbtn-mark")
                .addClass(`${mark ? "btn-warning" : "btn-default"}`)
                .html("<span class='glyphicon glyphicon-bell'></span>")
                .click(function () {
                    var marked = $("#queue").data("marked");
                    var isMarked = marked.includes(uid);
                    $(this)
                        .removeClass("btn-default btn-warning")
                        .addClass(`${isMarked ? "btn-default" : "btn-warning"}`);
                    if (isMarked) {
                        marked.splice(marked.indexOf(uid), 1);
                    } else {
                        marked.push(uid);
                        $("#messagebuffer").trigger("whisper", `You have marked a video for playing notification.`);
                    }
                });
            if (usingGroup) {
                marker.prependTo(menu);
            } else {
                marker.html("<span class='glyphicon glyphicon-bell'></span>").css("margin-right", "2px").addClass("pull-left").insertBefore(title);
            }
        };
        rebuildPlaylist();
    })();
    void (() => {
        if (!options.timeEstimates) {
            return;
        }
        HTMLCollection.prototype.each = Array.prototype.each = NodeList.prototype.each = function (func, _this) {
            var i = -1,
                bindeach = _this === undefined;
            while (++i < this.length) {
                if (bindeach) {
                    _this = this[i];
                }
                func.bind(_this)(this[i], i, this);
            }
        };
        document.head.insertAdjacentHTML("beforeEnd", "<style>#queue li:hover .qe_time:before { content: attr(data-timeleft); }</style>");
        var _mQE = window.makeQueueEntry;
        window.makeQueueEntry = function (item, addbtns) {
            var li = _mQE(item, addbtns);
            li[0].dataset.seconds = item.media.seconds;
            return li;
        };
        function calculateRemainingTime() {
            function secondsToTimeStr(d) {
                d = Number(d);
                var h = Math.floor(d / 3600);
                var m = Math.floor((d % 3600) / 60);
                var s = Math.floor((d % 3600) % 60);
                return (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s;
            }
            var q = document.querySelectorAll("#queue li");
            var m = document.querySelector("#plmeta");
            var active,
                cycle = [],
                total = 0;
            var currentTime = m && "playtime" in m.dataset && m.dataset["playtime"] >= 0 ? m.dataset["playtime"] : 0;
            if (q.length == 0) return;
            q.each(function injectDOM() {
                if (!this.querySelector(".qe_time")) return;
                if (!active) {
                    if (this.classList.contains("queue_active")) {
                        active = this;
                        total += parseInt(this.dataset.seconds) - currentTime;
                        this.querySelector(".qe_time").dataset.timeleft = "Time left: " + secondsToTimeStr(total) + " | ";
                    } else cycle.push(this);
                    return;
                } else {
                    this.querySelector(".qe_time").dataset.timeleft = "Time till: " + secondsToTimeStr(total) + " | ";
                    total += parseInt(this.dataset.seconds);
                }
            });
            cycle.each(function () {
                this.querySelector(".qe_time").dataset.timeleft = "Time till: " + secondsToTimeStr(total) + " | ";
                total += parseInt(this.dataset.seconds);
            });
        }
        socket.on("mediaUpdate", function (data) {
            var meta = document.querySelector("#plmeta");
            if (meta && (!meta.dataset["playtime"] || !data.paused)) {
                meta.dataset["playtime"] = Math.abs(Math.ceil(data.currentTime));
            }
            if (!data.paused) {
                calculateRemainingTime();
            }
        });
        socket.emit("requestPlaylist");
    })();
    ({
        maxhist: 10,
        history: [],
        synch: function () {
            localStorage.setItem(`${CHANNEL.name}_RecentMedia`, JSON.stringify(this.history));
        },
        view: function () {
            function createEntry(media) {
                var li = $("<li>").addClass("recent_entry queue_entry");
                var a = $("<a>").addClass("recent_link qe_title").attr("target", "_blank").attr("href", media.link).text(media.title).appendTo(li);
                var time = $("<span>").addClass("qe_time").text(media.duration).appendTo(li);
                var blame = $("<span>")
                    .addClass("qe_blame")
                    .text(media.blame + " | ")
                    .appendTo(li);
                return li;
            }
            $("#recentmedia-list").empty();
            if (this.history.length) {
                for (var i = this.history.length - 1; i >= 0; i--) {
                    createEntry(this.history[i]).appendTo("#recentmedia-list");
                }
            }
        },
        update: function (data) {
            var newEntry = { title: data["title"], link: formatURL(data), duration: data["duration"], blame: $(".pluid-" + PL_CURRENT).data("blame") };
            if (newEntry.link === "#") {
                return;
            }
            if (this.history.length && newEntry.link === this.history[this.history.length - 1]["link"]) {
                return;
            }
            this.history.push(newEntry);
            this.history = this.history.slice(this.history.length > this.maxhist ? this.history.length - this.maxhist : 0, this.history.length);
            this.synch();
        },
        start: function () {
            if (CHANNEL.perms.seeplaylist > CLIENT.rank) {
                return;
            }
            if (!options.recentMedia) {
                return;
            } else {
                window[CHANNEL.name]["RecentMedia"] = this;
            }
            if (localStorage.getItem(`${CHANNEL.name}_RecentMedia`) === null) {
                localStorage.setItem(`${CHANNEL.name}_RecentMedia`, JSON.stringify([]));
            }
            this.history = JSON.parse(localStorage.getItem(`${CHANNEL.name}_RecentMedia`));
            var self = this;
            var pane = $("<div>")
                .attr("id", "recentmedia")
                .addClass("plcontrol-collapse col-lg-12 col-md-12 collapse in")
                .prependTo("#rightpane-inner")
                .append($("<div>").addClass("vertical-spacer"))
                .append($("<ol>").attr("id", "recentmedia-list").text("Initializing."))
                .attr("aria-expanded", "true")
                .css("height", "0");
            var button = $("<button>")
                .attr("id", "showrecent")
                .attr("title", "Recently shown videos")
                .attr("data-toggle", "collapse")
                .attr("data-target", "#recentmedia")
                .addClass("btn btn-sm btn-default collapsed")
                .append($("<span>").addClass("glyphicon glyphicon-time"))
                .on("click", function () {
                    var wasActive = $(this).hasClass("active");
                    $(".plcontrol-collapse").collapse("hide");
                    $("#plcontrol button.active").button("toggle");
                    if (!wasActive) {
                        $(this).button("toggle");
                    }
                    self.view();
                })
                .appendTo("#plcontrol")
                .click();
            var style = $("<style>").text("#recentmedia-list>li:first-child { border-top-width: 1px }").prependTo($("head"));
            socket.on("changeMedia", (data) => {
                this.update(data);
                this.view();
            });
        },
    }.start());
    void (() => {
        if (!options.moveReporting) {
            return;
        }
        Callbacks.moveVideo = function (data) {
            console.log($(".pluid-" + data["from"]).data());
            console.log($(".pluid-" + data["after"]).data());
            PL_ACTION_QUEUE.queue((plq) => {
                $("#messagebuffer").trigger(
                    "whisper",
                    String().concat(
                        "[MoveMedia] ",
                        '<span class="text-info">',
                        $(".pluid-" + data["from"]).data()["media"]["title"],
                        "</span>",
                        " ",
                        '<span class="text-info">',
                        "(Pos: ",
                        $(".pluid-" + data["from"]).index() + 1,
                        ")",
                        "</span>",
                        " after ",
                        '<span class="text-info">',
                        $(".pluid-" + data["after"]).data()["media"]["title"],
                        "</span>",
                        " ",
                        $(".pluid-" + data["after"]).index() + 1,
                        "."
                    )
                );
                playlistMove(data.from, data.after, () => {
                    plq.release();
                });
            });
        };
    })();
    void (() => {
        if (!options.simpleLeader) {
            return;
        }
        if (CHANNEL.perms.leaderctl > CLIENT.rank) {
            return;
        }
        $("<button>")
            .prop("id", "leader")
            .attr("title", "Control current time of media")
            .addClass("btn btn-sm btn-default")
            .append($("<span>").addClass("glyphicon glyphicon-transfer"))
            .insertAfter($("#video-contributors-btn"))
            .on("click", function () {
                if (CLIENT.leader) {
                    socket.emit("assignLeader", { name: "" });
                } else {
                    socket.emit("assignLeader", { name: CLIENT.name });
                }
            });
        socket.on("setLeader", function (name) {
            if (name === CLIENT.name) {
                $("#leader").removeClass("btn-default").addClass("btn-warning");
            } else {
                $("#leader").addClass("btn-default").removeClass("btn-warning");
            }
        });
    })();
    void (() => {
        if (!options.hidePlaylist) {
            return;
        }
        if (!hasPermission("seeplaylist")) {
            return;
        }
        if (localStorage.getItem(`${CHANNEL.name}_HidePlaylist`) === "on") {
            $("#queue").data().hide = true;
            $("#queue").toggle();
        } else {
            $("#queue").data().hide = false;
        }
        $("<button>")
            .prop("id", "hidePlaylist")
            .attr("title", "Hide/Show playlist")
            .addClass("btn btn-sm")
            .addClass(localStorage.getItem(`${CHANNEL.name}_HidePlaylist`) === "on" ? "btn-warning" : "btn-default")
            .append($("<span>").addClass("glyphicon glyphicon-list-alt"))
            .insertAfter($("#shuffleplaylist"))
            .on("click", function () {
                if (!$("#queue").data().hide) {
                    $("#queue").data().hide = true;
                    localStorage.setItem(`${CHANNEL.name}_HidePlaylist`, "on");
                } else {
                    $("#queue").data().hide = false;
                    localStorage.setItem(`${CHANNEL.name}_HidePlaylist`, "off");
                }
                $("#queue").toggle();
                $(this).toggleClass("btn-default btn-warning");
            });
        return;
    })();
    void (() => {
        if (!options.collapse) {
            return;
        }
        const minrank = Math.min(CHANNEL.perms.oplaylistdelete, CHANNEL.perms.playlistdelete, CHANNEL.perms.oplaylistjump, CHANNEL.perms.playlistjump, CHANNEL.perms.oplaylistnext, CHANNEL.perms.playlistnext);
        if (minrank > CLIENT.rank) {
            return;
        }
        if (localStorage.getItem(`${CHANNEL.name}_CollapsePlaylist`) === "on") {
            $("#queue").data().shrink = true;
            $("<style>").prop("id", "playlistStyle").text("#queue div.btn-group { display: none!important; }").appendTo($("head"));
        } else {
            $("#queue").data().shrink = false;
        }
        $("<button>")
            .prop("id", "shrinkplaylist")
            .attr("title", "Toggle playlist collapse")
            .addClass("btn btn-sm")
            .addClass(localStorage.getItem(`${CHANNEL.name}_CollapsePlaylist`) === "on" ? "btn-warning" : "btn-default")
            .append($("<span>").addClass("glyphicon glyphicon-compressed"))
            .insertAfter($("#shuffleplaylist"))
            .on("click", function () {
                if (!$("#queue").data().shrink) {
                    $("#queue").data().shrink = true;
                    $("<style>").prop("id", "playlistStyle").text("#queue div.btn-group { display: none!important; }").appendTo($("head"));
                    localStorage.setItem(`${CHANNEL.name}_CollapsePlaylist`, "on");
                } else {
                    $("#queue").data().shrink = false;
                    $("#playlistStyle").remove();
                    localStorage.setItem(`${CHANNEL.name}_CollapsePlaylist`, "off");
                }
                $(this).toggleClass("btn-default btn-warning");
            });
    })();
    ({
        currData: {},
        handleOctopus: function (subTrack, fonts = []) {
            CLIENT.octopus = new SubtitlesOctopus({
                video: document.querySelector("#ytapiplayer > video"),
                subUrl: subTrack,
                fonts: fonts,
                renderMode: "wasm-blend",
                targetFps: "60",
                workerUrl: "/js/octopus/subtitles-octopus-worker.js",
                legacyWorkerUrl: "/js/octopus/subtitles-octopus-worker-legacy.js",
            });
        },
        createOctopusDropdown: function () {
            let wrapper = '<div class="btn-group dropdown" id="octopusSelector"></div>';
            let button = '<button class="btn btn-default btn-sm dropdown-toggle" type="button" title="Select Subtrack" href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false"></button>';
            let list = '<ul class="dropdown-menu ul-double"></ul>';
            wrapper = $(wrapper);
            button = $(button).appendTo(wrapper);
            list = $(list).appendTo(wrapper);
            wrapper.prependTo("#videocontrols");
            const self = this;
            list.on("click", "li a", function () {
                if ($(this).data("url") == null) {
                    CLIENT.octopus.freeTrack();
                } else {
                    CLIENT.octopus.setTrackByUrl($(this).data("url"));
                }
                self.octopus.button.empty().append(`<strong>Subtitles: ${$(this).text()}</strong>`);
            });
            wrapper.hide();
            return { wrapper: wrapper, list: list, button: button };
        },
        updateOctoList: function () {
            this.octopus.wrapper.show();
            this.octopus.list.empty();
            this.octopus.button.empty().append(`<strong>Subtitles: ${this.octopus.current}</strong>`);
            let entries = this.octopus.tracks.slice();
            entries.push({ label: "off", url: null });
            while (entries.length) {
                const li = $('<li class="li-double">').appendTo(this.octopus.list);
                const a = $("<a>").appendTo(li);
                const entry = entries.shift();
                a.text(entry.label);
                a.data("url", entry.url);
            }
        },
        checkExtras: function ({ type, id, title, seconds, currentTime, duration, paused, meta }) {
            if (type !== "cm") {
                this.octopus.wrapper.hide();
                return;
            }
            $.ajax({
                dataType: "json",
                url: id,
                success: (manifest) => {
                    if (manifest.subTracks !== undefined && Array.isArray(manifest.subTracks)) {
                        this.octopus.tracks = manifest.subTracks;
                        this.handleOctopus(manifest.subTracks[0].url, manifest.fonts || null);
                        this.octopus.current = manifest.subTracks[0].label;
                        this.updateOctoList();
                    } else {
                        this.octopus.wrapper.hide();
                    }
                },
            });
        },
        start: function () {
            if (CLIENT.radmedExtras) {
                return;
            } else {
                CLIENT.radmedExtras = this;
            }
            Object.assign(this, { sibling: {}, octopus: {} });
            Object.assign(this.octopus, this.createOctopusDropdown());
            socket.on("changeMedia", (data) => {
                $(".libassjs-canvas-parent").remove();
                this.checkExtras(data);
            });
        },
    }.start());
    void (() => {
        if (!options.quickQuality) {
            return;
        }
        var qualityChoices = [
            { code: "auto", text: "Auto" },
            { code: "240", text: "240p" },
            { code: "360", text: "360p" },
            { code: "480", text: "480p" },
            { code: "720", text: "720p" },
            { code: "1080", text: "1080p" },
            { code: "best", text: "Highest" },
        ];
        var current = qualityChoices.filter((cv) => {
            return cv.code == USEROPTS.default_quality;
        })[0]["text"];
        var quickQuality = $("<div/>").addClass("btn-group dropdown").prop("id", "quickQuality").prependTo("#videocontrols");
        $("<button/>")
            .addClass("btn btn-default btn-sm dropdown-toggle")
            .attr("type", "button")
            .attr("title", "Preferred Quality")
            .attr("href", "javascript:void(0)")
            .attr("data-toggle", "dropdown")
            .html("<span class='glyphicon glyphicon-hd-video'></span><strong> " + current + " </strong><span class='caret'></span>")
            .appendTo(quickQuality);
        var quickChoices = $("<ul/>").addClass("dropdown-menu ul-double").appendTo(quickQuality);
        qualityChoices.forEach((cv) => {
            var link = $("<li/>").addClass("li-double").appendTo(quickChoices);
            $("<a/>")
                .text(cv.text)
                .attr("quality", cv.code)
                .appendTo(link)
                .click(function () {
                    $("#quickQuality strong").text(" " + $(this).text());
                    USEROPTS.default_quality = $(this).attr("quality");
                    $("#us-default-quality").val(USEROPTS.default_quality);
                    storeOpts();
                    $("#mediarefresh").click();
                });
        });
    })();
    ({
        start: function () {
            if (!options.volumeControl) {
                return;
            }
            if (CLIENT.volumeControl) {
                return;
            } else {
                CLIENT.volumeControl = this;
            }
            this.deployButtons();
            socket.on("mediaUpdate", function () {
                PLAYER.getVolume(function (currentVolume) {
                    if (currentVolume == null) {
                        return;
                    }
                    $("#volumeButtonIndicator").html(currentVolume.toFixed(2));
                });
            });
            socket.on("changeMedia", function () {
                setTimeout(function () {
                    PLAYER.getVolume(function (currentVolume) {
                        $("#volumeButtonIndicator").html(currentVolume.toFixed(2));
                    });
                }, 250);
            });
        },
        deployButtons: function () {
            this.up.prependTo("#videocontrols");
            this.indicator.prependTo("#videocontrols");
            this.down.prependTo("#videocontrols");
        },
        up: $("<button/>")
            .prop("id", "volumeButtonUp")
            .addClass("btn btn-default btn-sm")
            .attr("type", "button")
            .attr("title", "Volume Up")
            .html("<span class='glyphicon glyphicon-volume-up'></span>")
            .on("click", function () {
                PLAYER.getVolume((currentVolume) => {
                    var newVolume = Math.min(1, Math.max(0, Math.round((currentVolume + (currentVolume >= 0.1 ? (currentVolume >= 0.2 ? 0.05 : 0.02) : 0.01)) / 0.01) * 0.01)).toFixed(2);
                    PLAYER.setVolume(newVolume);
                    $("#volumeButtonIndicator").html(newVolume);
                });
            }),
        indicator: $("<button/>")
            .prop("id", "volumeButtonIndicator")
            .addClass("btn btn-success btn-sm")
            .attr("type", "button")
            .attr("title", "Volume Indicator / Mute")
            .html("???")
            .data("mutedState", false)
            .on("click", function () {
                if ($(this).data()["mutedState"]) {
                    PLAYER.setVolume($(this).data()["preMutedVolume"]);
                    $(this).data()["mutedState"] = false;
                    $(this).toggleClass("btn-success btn-warning");
                } else {
                    PLAYER.getVolume((currentVolume) => {
                        console.info("Muting player. Restore Volume:", currentVolume);
                        $("#volumeButtonIndicator").data()["preMutedVolume"] = currentVolume;
                        $("#volumeButtonIndicator").data()["mutedState"] = true;
                        $("#volumeButtonIndicator").toggleClass("btn-success btn-warning");
                        PLAYER.setVolume(0);
                    });
                }
            }),
        down: $("<button/>")
            .prop("id", "volumeButtonDown")
            .addClass("btn btn-default btn-sm")
            .attr("type", "button")
            .attr("title", "Volume Down")
            .html("<span class='glyphicon glyphicon-volume-down'></span>")
            .on("click", function () {
                PLAYER.getVolume((currentVolume) => {
                    var newVolume = Math.min(1, Math.max(0, Math.round((currentVolume - (currentVolume <= 0.2 ? (currentVolume <= 0.1 ? 0.01 : 0.02) : 0.05)) / 0.01) * 0.01)).toFixed(2);
                    PLAYER.setVolume(newVolume);
                    $("#volumeButtonIndicator").html(newVolume);
                });
            }),
    }.start());
    void (() => {
        if (!options.quickShuffle) {
            return;
        }
        $("#shuffleplaylist").unbind("click");
        $("#shuffleplaylist").click(function (event) {
            if (event.shiftKey) {
                return socket.emit("shufflePlaylist");
            }
            var shuffle = confirm("Are you sure you want to shuffle the playlist?");
            if (shuffle) {
                socket.emit("shufflePlaylist");
            }
        });
    })();
    socket.emit("playerReady");
});

var urls  = [
'https://cytu.be/r/copstube' 
,'https://cytu.be/r/southparkhd' 
,'https://cytu.be/r/SEINFELDHD'  
,'https://cytu.be/r/Simpsons'
,'https://cytu.be/r/KOTH'
,'https://cytu.be/r/futuramaSD'
];

if (urls.indexOf(window.location.href) > -1) {
    var css = `
.navbar-inverse .navbar-brand {
background: url('https://i.ibb.co/89Cf3dm/text-bg.png') no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: moveBg 190s linear infinite;
  -webkit-animation: moveBg 190s linear infinite;
}
/* Text Background Animation */
@keyframes moveBg {
  0% {
    background-position: 0% 30%;
  }

  100% {
    background-position: 100% 50%;
  }
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
}