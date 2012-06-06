enyo.kind({
    name: "SettingsPrefItem",
    kind: enyo.Control,
    tag: "li",
});


enyo.kind({
    name: "SettingsPref",
    kind: enyo.Control,
    tag: "div",

    classes: "settingsPref",

    components: [
        { name: "settingsPrefItems", classes: "leftColumn", tag: "ul" },
        { name: "settingsView", classes: "rightColumn" }
    ],

    create: function () {
        this.inherited( arguments );

        var addComponent = function( component ) {
            component.tap = enyo.bind( this, "showSettingsView" );
            this.$.settingsPrefItems.createComponent( component );
        }

        enyo.forEach( enyo.application.getSettingsComponents(), addComponent, this );
    },

    showSettingsView: function( sender, event ) {
        this.$.settingsView.destroyClientControls();
        this.$.settingsView.createComponent( sender.viewComponent );
        this.$.settingsView.render();
    }
});
