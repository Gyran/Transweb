enyo.kind({
	name: "Init",
	kind: enyo.Control,

	plugins: null,
	pluginsLoaded: false,
	transmissionRunningChecked: false,


	tag: "div",
	content: "loading!",

	create: function(){
		this.inherited(arguments);
		// Is transmission running?
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" }).response(this, "isTransmissionRunning").go({method: "isRunning"});
	},

	init: function(){
		this.waitUntilReady();
	},

	isTransmissionRunning: function(inSender, inResponse){
		if(inResponse){
			this.init();
		}else{
			this.setContent("Transmission is not running");
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
		app = new TranswebApp();
		
		app.renderInto(document.body);
		this.destroy();
	}

});