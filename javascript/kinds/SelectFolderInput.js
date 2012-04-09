enyo.kind({
	name: "SelectFolderInput",
	kind: enyo.Control,

	publish: {
		value: ""
	},

	components: [
		{ name: "path", kind: enyo.Input },
		{ name: "browse", kind: enyo.Button, content: "...", ontap: "browseTap" },
		{ name: "browser", tag: "ul", content: "loading", showing: false }
	],

	getValue: function( ) {
		return this.value;
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
			new enyo.Ajax({url: "php/getDirs.php" }).response(this, "doBrowse").go({path: this.$.path.getValue() });
		}
	},

	doBrowse: function ( sender, response ) {
		if( !response ) {
			this.$.browser.setContent("Something went wrong");
			return;
		}
		this.$.browser.destroyClientControls();
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
		switch( sender.content ) {
			case ".":
				this.$.browser.hide();
				return;
				break;
			case "..":
				path = this.getValue().replace( /([^\/]+?)\/[^\/]+?$/ , "$1" );
				break;
			default:
				path = this.getValue() + "/" + sender.content;
				break;
		}

		this.setValue( path );
		new enyo.Ajax({url: "php/getDirs.php" }).response(this, "doBrowse").go({path: this.getValue() });
	}
});