enyo.kind({
    name: "SettingsPrefItem",
    kind: enyo.Control,
    tag: "li"
});


enyo.kind({
    name: "SettingsPref",
    kind: enyo.Control,
    tag: "div",

    classes: "settingsPref",

    components: [
        { classes: "leftColumn", tag: "ul", components: [

        ]},

        { classes: "RightColumn" }
    ]
});
