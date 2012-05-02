enyo.kind({
    name: "CookiesPref",
    kind: enyo.Control,
    tag: "div",
    classes: "cookiesPref",

    components: [
        { name: "cookiesStr", kind: enyo.TextArea, disabled: true, content: "Loading..." },
        { tag: "br" },
        { name: "saveCookies", kind: "Button", content: "Save cookies", ontap: "saveCookies" }
    ],

    create: function(){
        this.inherited(arguments);
        this.getCookies();
    },

    getCookies: function () {
        new enyo.Ajax({url: "php/cookies.php", method: "post" }).
            response(this, "gotCookies").
            go({ method: "getCookies" });
    },

    gotCookies: function ( sender, response ) {
        this.$.cookiesStr.setValue( response );
        this.$.cookiesStr.setDisabled( false );
    },

    saveCookies: function ( sender, response ) {
        var cookiesStr = this.$.cookiesStr.getValue();

        new enyo.Ajax({url: "php/cookies.php", method: "post" }).
            response(this, "cookiesSaved").
            go({ method: "saveCookies",
                cookies: cookiesStr });


    },

    cookiesSaved: function ( sender, response ) {
        
    }

});