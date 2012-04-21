console.log(enyo);
enyo.kind({
	name: "DetailsHolder",
	kind: enyo.Control,
	tag: "div",

	classes: "detailsHolder",

    components: [
        /* Maybe add some tabs */
        { name: "holder", tag: "div" }
    ],

    published: {
    	torrent: null
    },

	handlers: {
		onShowDetails: "showDetails",
        onUpdate: "update"
	},

    create: function( ) {
        this.inherited( arguments );
        this.showDetails( null, ["TorrentDetails"] );
        this.update();
    },

    update: function( sender, args ) {

    },

	showDetails: function( sender, args ) {
		detailsKind = args[0];
		this.$.holder.destroyClientControls();
		this.$.holder.createComponent({
			kind: detailsKind,
			container: this.$.holder,
		});
		this.$.holder.render();
        this.show();
	}

});