enyo.application = {
	transmissionSession: null,
	torrents: null,
	plugins: null
}

enyo.kind({
	name: "Init",
	kind: enyo.Control,

	plugins: null,
	pluginsLoaded: false,


	tag: "div",
	content: "loading!",

	create: function(){
		this.inherited(arguments);
		// Is transmission running?
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response(this, "getTransmissionSession").go({method: "TransmissionSession"});

		path = "/users/gyran/tv/glass";
		n = path.replace( /([^\/]+?)\/[^\/]+?$/ , "$1" );
		console.log(n);

	},

	init: function(){
		this.waitUntilReady();
	},

	getTransmissionSession: function(inSender, inResponse){
		if(!inResponse){
			this.setContent("Transmission is not running");
		}else{
			enyo.application.transmissionSession = inResponse.arguments;
			this.init();
		}
	},

	waitUntilReady: function(){
		if( true ){
			this.initApp();
		}else{
			setTimeout(enyo.bind(this, "waitUntilReady"), 10);	
		}
	},

	initApp: function(){
		app = new App();
		
		app.renderInto(document.body);
		this.destroy();
	}

});