/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('GDPR.view.main.Main', {
    xtype:'view_main_containerView',

    //extend: 'Ext.container.Container',
    extend:"Ext.container.Viewport",

    requires: [
        //'GDPR.view.main.MainController',
        //'GDPR.view.main.MainModel',
        'GDPR.view.centralPanel.Container'
    ],

    xtype: 'app-main',

    controller: 'main',
    _viewModel: {
        type: 'main'
    },

    //modals:['GDPR.model.TddrstatusModel', 'GDPR.model.TStatusTypeModel'],
	  //stores:['GDPR.store.TddrstatusStore'],
	  //controllers:['GDPR.controller.TddrstatusController', 'main'],

    initComponent: function() {
      var me = this;      
      me.layout = "border";
      me.cls = "portal";
      me.items = [{
          region: 'north',
          xtype:'panel',
          title:'GDPR - Data Deletion Request 1.0'
        },{
          region: 'center',
          id: 'centercontents',
          xtype: 'view_centralPanel_container'
        }];

      this.callParent(arguments);
    }
});
