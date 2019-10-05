/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

Ext.Loader.setConfig({
  enabled: true,
  disableCaching: true,
  paths: {}
});

Ext.application({ 
    name: 'GDPR',

    extend: 'GDPR.Application',

    requires:[
      //'GDPR.override.DataConnection',
      //'GDPR.override.AjaxProxy',

      'Ext.layout.container.Border',
      'GDPR.common.Constants', 
      "GDPR.view.common.UtilFx", 
      "GDPR.view.main.Main"
    ],

    //autoCreateViewport: 'GDPR.view.main.Main',

    //models:['GDPR.model.TddrstatusModel', 'GDPR.model.TStatusTypeModel'],
    //stores:['GDPR.store.TddrstatusStore'],

    //autoCreateViewport : true,
    //modals:['GDPR.model.TddrstatusModel', 'GDPR.model.TStatusTypeModel'],
    //stores:['GDPR.store.TddrstatusStore'],
    ////controllers:['DemoController'], 
   

    init: function(){
        Ext.QuickTips.init();
        GDPR.gbl = {
          //constants: new GDPR.common.Constants(),
          //constants: new Constants(),
          constants: constant,
          cdnPath:Ext.CDN_URL,
          metadata:{},
          userAccess:{}
        };        
        this.loadMetaData(this, {"fireFrom" : null})
    },
    
    loadMetaData: function(me, obj){ 
      //console.log("load meta data")
      var _scope = me;
      Ext.Ajax.request({
        url: GDPR.gbl.constants.URL_MASTER_POTAL_METADATA,
        autoLoad: true,
        scope:_scope,
        useDefaultXhrHeader: false,
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(resp_){
          var metadata = {};
          var resJson = Ext.JSON.decode(resp_.responseText);
          if(resJson.success === true || resJson.success === "true"){
            metadata = resJson;          
            GDPR.gbl.metadata["requestType"] = {"tstatusType": metadata.tstatusType || [] }; 
            GDPR.gbl.metadata["divisionData"] = {"tdivision": metadata.tdivision || [] };
            GDPR.gbl.metadata["systemData"] = {"tsystem": metadata.tsystem || [] };
            GDPR.gbl.metadata["userData"] = {"tuser": metadata.tuser || [] };
            GDPR.gbl.metadata["scopeData"] = {"tscope": metadata.tscope || [] }; 
            GDPR.gbl.metadata["scopecosystem"] = {"scopecosystem": metadata.tscopecosystem || [] };
            GDPR.gbl.metadata["companyData"] = {"tcompany": metadata.tcompany || [] };
            GDPR.gbl.metadata["companySystemData"] = {"tcompanysystem": metadata.tcompanysystem || [] }; 
            GDPR.gbl.metadata["ddrstatusData"] = metadata.ddrstatusData || [];

            if(obj.fireFrom === "MainController"){
              //console.log("Calling from controller");
              //reload all the grid view again
              _scope.reloadAllGridStoresAgain(_scope);
            }else{
              _scope.postLaunch();
            }
          }else{
            Ext.Msg.alert("Alert!","Failed to load data, please connect administrator.");
          }
                    
        },
        failure: function(){
          console.log('failure');
        }
      });
    },

    reloadAllGridStoresAgain: function(_scope){ 
      //console.log("reload All Grid Stores Again");
      //This is for testing purpose, will have to reload dependent combos with data
      var mainPanel = Ext.ComponentQuery.query('view_centralPanel_centerpanel')[0];
      var noOfGrids = mainPanel.items.items.length;
      for(var m=0; m < noOfGrids; m++){
        mainPanel.items.items[m].getView().refresh();
        mainPanel.items.items[m].doLayout();
      }
    },
    
    launch : function(){
      //console.log('Your application launched with ExtJS MVC..!');
      //Ext.add(Ext.create('GDPR.store.TddrstatusStore'));
    },

    postLaunch: function() {
      Ext.create("GDPR.view.main.Main");
    },

    log:function() {
        var arg = Array.prototype.slice.call(arguments);
        if (console && console.log) {
          console.log.apply(console, arg);
        } else {
          for (var i = 0; i < arg.length; i++){
            alert(arg[i]);
          }
        }
      }
    //-------------------------------------------------------------------------
    // Most customizations should be made to GDPR.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
