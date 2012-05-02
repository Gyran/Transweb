enyo.kind({
    name: "CookiesToolbarButton",
    kind: enyo.Button,
    content: "Cookies",

    tap: function(inSender, inEvent){
        this.bubble( "onAnnounceEvent", { event: "onShowPref", arguments: [ "CookiesPref" ] } );
    },

    pref: function(){

    }



});