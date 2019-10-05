/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

 Ext.Loader.setConfig({
 	enabled: true,
 	disableCaching: false,
 	paths: {}
 });

Ext.application({ 
    name: 'GDPR',

    extend: 'GDPR.Application',

    requires:[
      'Ext.layout.container.Border',
      'GDPR.common.Constants', 
      "GDPR.view.common.UtilFx", 
      "GDPR.view.main.Main"
    ],

    //autoCreateViewport: 'GDPR.view.main.Main',

    models:['GDPR.model.TddrstatusModel', 'GDPR.model.TStatusTypeModel'],
    stores:['GDPR.store.TddrstatusStore'],

    //autoCreateViewport : true,
    //modals:['GDPR.model.TddrstatusModel', 'GDPR.model.TStatusTypeModel'],
    //stores:['GDPR.store.TddrstatusStore'],
    ////controllers:['DemoController'], 
   

    init: function(){

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
      var _scope = me;
      Ext.Ajax.request({
        url: GDPR.gbl.constants.URL_MASTER_POTAL_METADATA,
        scope:_scope,
        success: function(resp_){
          var metadata = Ext.JSON.decode(resp_.responseText);          
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
            console.log("Calling from controller");
          }else{
            _scope.postLaunch();
          }          
        }
      });
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
