/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('GDPR.view.centralPanel.CenterPanelController', { //not in use
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.centerpanelcontroller',

    onTreeItemClick: function (s,r) {
        alert(r.data.text);
        //Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            Ext.Msg.alert('Alert!',choice)
        }else{
            Ext.Msg.alert('Alert!',choice)
        }
    }
});
