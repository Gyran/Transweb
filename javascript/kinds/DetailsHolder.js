enyo.kind({
	name: "DetailsHolder",
	kind: enyo.Control,
	tag: "div",

	classes: "detailsHolder",

    components: [
        { name: "tabs", tag: "ul", classes: "detailsTabs floatcontainer", ontap: "tabsTap" },
        { name: "holder", tag: "div" }
    ],

	handlers: {
		onShowDetails: "showDetails",
        onUpdate: "update",
        onDetailsTabTap: "tabTap"
	},

    selectedTab: null,

    create: function( ) {
        this.inherited( arguments );

        var addComponent = function( component ) {
            this.$.tabs.createComponent( component );
        }

        enyo.forEach( enyo.application.getDetailsCompoents(), addComponent, this );

        this.selectedTab = this.$.tabs.children[0];
        this.selectedTab.tap();
        this.update();
    },

    update: function( sender, args ) {
        
    },

	showDetails: function( sender, args ) {
        this.$.holder.destroyClientControls();
		detailsKind = args[0];
        
		this.$.holder.createComponent({
			kind: detailsKind,
		});

        this.$.holder.children[0].render();


	},

    tabTap: function( sender, tab ) {
        this.selectedTab.removeClass( "selected" );
        this.selectedTab = tab;
        this.selectedTab.addClass( "selected" );
        this.showDetails( sender, [ this.selectedTab.detailsKind ] );


    }

});