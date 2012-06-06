enyo.kind({
    name: "CookiesSettings",
    kind: enyo.Control,
    tag: "div",
    classes: "cookiesSettings",

    components: [
        { name: "cookiesStr", kind: enyo.TextArea, disabled: true, content: "Loading..." },
        { tag: "div", content: "Format: host|cookie1=value1;cooke2=value2;" },
        { name: "saveCookies", kind: "Button", content: "Save cookies", ontap: "saveCookies" }
    ],

    create: function(){
        this.inherited(arguments);
        this.getCookies();
    },

    getCookies: function () {
        new enyo.Ajax({url: "plugins/Cookies/cookies.php", method: "post" }).
            response(this, "gotCookies").
            go({ method: "getCookies" });
    },

    gotCookies: function ( sender, response ) {
        this.$.cookiesStr.setValue( response );
        this.$.cookiesStr.setDisabled( false );
    },

    saveCookies: function ( sender, response ) {
        var cookiesStr = this.$.cookiesStr.getValue();

        new enyo.Ajax({url: "plugins/cookies/cookies.php", method: "post" }).
            response(this, "cookiesSaved").
            go({ method: "saveCookies",
                cookies: cookiesStr });


    },

    cookiesSaved: function ( sender, response ) {
        var event = { title: "Cookies saved", message: "The cookies has been saved to file" };
        this.bubble( "onDoNotify", event );
    }

});