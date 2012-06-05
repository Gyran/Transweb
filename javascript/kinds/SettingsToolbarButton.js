enyo.kind({
    name: "SettingsToolbarButton",
    kind: enyo.Button,

    content: "Settings",

    tap: function( sender, event ) {
        this.bubble( "onAnnounceEvent", { event: "onShowPref", arguments: [ "SettingsPref" ] } );
    }

    

});