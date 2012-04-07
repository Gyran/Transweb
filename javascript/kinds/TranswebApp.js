function injectScript(fname,initFunc) 
{
        var h = document.getElementsByTagName("head").item(0);
        s = document.createElement("script");
        if(initFunc)
        {       
                if(browser.isIE)
                        s.onreadystatechange = function()
                        {
                                if((this.readyState == 'loaded') || (this.readyState == 'complete')) 
                                        initFunc();
                        }
                else
                        s.onload = initFunc;
        }
//      fname = fname + "?time=" + (new Date()).getTime();
        if(s.setAttribute)
                s.setAttribute('src', fname);
        else
                s.src = fname;
        s.type = "text/javascript";
        void (h.appendChild(s));
}
enyo.kind({
	name: "TranswebApp",
	kind: enyo.Control,
	tag: "div",

	published: {
		plugins: []
	},

	components: [
		{ name: "toolbar", kind: "Toolbar" },
		{ name: "torrentsList", kind: "TorrentTable" },
		{ name: "preferenceHolder", kind: "PreferenceHolder", showing: false }
		//{ name: "bigLoading", kind: "BigLoading" },
		//{ name: "smallLoading", kind: "SmallLoading" },
		//{ name: "inspector", kind: "Inspector" }

	],

	updateTimer: null,

	create: function(){
		this.inherited(arguments);
		this.initPlugins();
		t = this;
		//this.updateTimer = setInterval(enyo.bind(this, "waterfall", "onUpdate"), 1000);
	},

	update: function(){

	},

	initPlugins: function(){
		enyo.forEach(this.plugins, this.initPlugin, this);
	},

	initPlugin: function(plugin){

	},

	handlers: {
		onShowPref: "showPref",
		onUpdate: "update"
	},

	showPref: function(sender, prefKind){
		this.$.preferenceHolder.destroyClientControls();
		this.createComponent({
			kind: prefKind,
			container: this.$.preferenceHolder,
			classes: "TranswebApp"
		});
		this.$.preferenceHolder.render();
		this.$.preferenceHolder.show();
	}
});
