enyo.kind({
    name: "DetailsTab",
    kind: enyo.Control,
    tag: "li",

    published: {
        detailsKind: ""
    },

    tap: function( sender, event ) {
        this.bubble( "onDetailsTabTap", this );
    }
});
