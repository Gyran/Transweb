enyo.kind({
	name: "SelectFolderInput",
	kind: enyo.Control,

	publish: {
		value: ""
	},

	components: [
		{ name: "path", kind: enyo.Input, type: "text" },
		{ name: "browse", kind: enyo.Button, content: "...", ontap: "browseTap" },
		{ tag: "br" },
		{ name: "browser", tag: "ul", content: "loading", showing: false, classes: "browser" }
	],

	create: function( ) {
		this.inherited( arguments );
		this.setValue( this.value );
	},

	getValue: function( ) {
		return this.$.path.getValue( );
	},

	setValue: function( value ) {
		this.value = value;
		this.$.path.setValue( value );
	},

	browseTap: function( sender, e ) {
		if( this.$.browser.showing ) {
			this.$.browser.hide();
		} else {
			this.$.browser.show();
			this.bubble( "onStartLoading" );
			new enyo.Ajax({url: "php/getDirs.php" }).response(this, "doBrowse").go({path: this.$.path.getValue() });
		}
	},

	doBrowse: function ( sender, response ) {
		this.bubble( "onStopLoading" );
		this.$.browser.destroyClientControls();
		if( !response ) {
			this.$.browser.setContent("Something went wrong");
			return;
		}
		enyo.forEach(response, this.addFolder, this);
		this.$.browser.render();
	},

	addFolder: function( folder ) {
		this.createComponent({
			tag: "li",
			container: this.$.browser,
			content: folder,
			ontap: "folderTap"
		});
	},

	folderTap: function( sender, e ) {
		path = this.getValue().replace(/\/$/, "");
		switch( sender.content ) {
			case ".":
				this.$.browser.hide();
				return;
				break;
			case "..":
				path = path.replace( /([^\/]+?)\/[^\/]+?$/ , "$1" );
				break;
			default:
				path = path + "/" + sender.getContent( );
				break;
		}

		this.setValue( path );
		this.bubble( "onStartLoading" );
		new enyo.Ajax({url: "php/getDirs.php" }).response(this, "doBrowse").go({path: this.getValue() });
	}
});