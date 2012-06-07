enyo.kind({
	name: "App",
	kind: enyo.Control,
	tag: "div",

	classes: "app floatcontainer",

	components: [
		{ name: "leftColumn", tag: "div", classes: "leftColumn",
			components: [
				{ name: "panel", kind: "Panel" }
			] 
		},
		{ name: "rightColumn", tag: "div", classes: "rightColumn",
			components: [
				{ name: "smallLoading", kind: "SmallLoading", showing: false },
				{ name: "toolbar", kind: "Toolbar" },
				{ name: "torrentTable", kind: "TorrentTableHolder" },
				{ name: "preferenceHolder", kind: "PreferenceHolder", showing: false },
				{ name: "detailsHolder", kind: "DetailsHolder" }
			]
		//{ kind: enyo.Signals, onkeydown: "keydown", onkeyup: "keyup" }
		},
		{ name: "notification", kind: "Notification" }
	],

	updaters: [ ],

    handlers: {
        onUpdate: "update",
        onStartLoading: "startLoading",
        onStopLoading: "stopLoading",
        onForceUpdate: "forceUpdate",
        onAnnounceEvent: "announceEvent",
        onDoNotify: "doNotify",
        onresize: "resize"
    },

	updateTimer: null,

	create: function(){
		this.inherited(arguments);
		this.initPlugins();

		this.addUpdater( new TorrentsUpdater( enyo.bind( this, "updatersCallback" ) ) );
		this.addUpdater( new TransmissionSessionUpdater( enyo.bind( this, "updatersCallback" ) ) );

		this.update();

		//this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 5000);
	},

	rendered: function () {
		this.inherited( arguments );
		this.resize();
	},

	addUpdater: function ( updater ) {
		this.updaters.push( updater );
	},

	runUpdaters: function ( ) {
		this.startLoading();
		for ( i = 0 ; i < this.updaters.length ; ++i ) {
			this.updaters[i].update();
		}
	},

	forceUpdate: function( ) {
		this.waterfall( "onUpdate" );
	},

	update: function(){
        this.runUpdaters();
	},

	initPlugins: function(){
		enyo.forEach(this.plugins, this.initPlugin, this);
	},

	initPlugin: function(plugin){

	},

	announceEvent: function( sender, obj ) {
		this.waterfall( obj.event, obj.arguments );
	},

	startLoading: function( sender ) {
		this.$.smallLoading.show();
	},

	stopLoading: function( sender ) {
		this.$.smallLoading.hide();
	},

	updatersCallback: function ( event ) {
		this.stopLoading();
		this.waterfall( event );
	},

	resize: function ( sender,event ) {
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;

		// leftColumn
		var leftColumnWidth = Math.floor( windowWidth * 0.15 );
		var leftColumnHeight = windowHeight;

		this.$.leftColumn.applyStyle( "width", leftColumnWidth + "px" );
		this.$.leftColumn.applyStyle( "height", leftColumnHeight + "px" );

		// Right Column
		var rightColumnWidth = windowWidth - leftColumnWidth;
		var rightColumnHeight = windowHeight;

		this.$.rightColumn.applyStyle( "width", rightColumnWidth + "px" );
		this.$.rightColumn.applyStyle( "height", rightColumnHeight + "px" );

		var h = rightColumnHeight;
		var toolbarHeight = 24;
		this.$.toolbar.applyStyle( "height", toolbarHeight + "px" );
		h -= this.$.toolbar.getNodeProperty("offsetHeight", toolbarHeight);

		h -= getDeadHeight(this.$.torrentTable.hasNode());
		var torrentTableHeight = Math.floor( h * 0.6 );
		this.$.torrentTable.applyStyle( "height", torrentTableHeight + "px" );
		h -= this.$.torrentTable.getNodeProperty("offsetHeight", torrentTableHeight);

		h -= getDeadHeight(this.$.detailsHolder.hasNode());
		detailsHolderHeight = h;
		this.$.detailsHolder.applyStyle( "height", detailsHolderHeight + "px" );
	},

	doNotify: function ( sender, event ) {
		this.$.notification.sendNotification({
			title: event.title,
			message: event.message,
			theme: notification.MessageBar,
			icon: event.icon,
			stay: false,
			duration: 1
		}, null);
	}

});

