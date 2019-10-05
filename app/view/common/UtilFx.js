//var _utilFx = Ext.create('widget.gdpr_common_utility_functions');
Ext.define("GDPR.view.common.UtilFx", {
  //extend:"Object"
  alias:"widget.gdpr_common_utility_functions"
  ,border:false
  ,layout:"fit"
  ,autoScroll:true

  ,initComponent: function() {
    this.callParent(arguments);
  },

  formatDate: function(value){
    return value ? Ext.Date.dateFormat(value, 'M d, Y') : '';
  }

  ,sayHello: function(val){
    console.info('Say Hello, '+val)
  }
  ,createJsonStoreForGrids: function(modelName, url, rootNodeProperty, extraParams){
    var storeURL = url;
    //console.log("URL - "+storeURL)
    var myStore = Ext.create('Ext.data.JsonStore', {
      autoDestroy: true,
      autoLoad: false,
      model: modelName,
      useDefaultXhrHeader: false,
      cors: true,
      proxy: {
        type: 'ajax',
        url: storeURL,
        extraParams: extraParams || {},
        reader: {
            type: 'json',
            rootProperty: rootNodeProperty 
        }
      }
      ,listeners: {
        "scope":this
        ,"metachange_": function(store, meta) {
          //this.fields = [meta.fields];				    
        }
        ,load:function(){
          //_localScope.fillCombos(_refElement, me);
        }
      },
      sorters: [{
        property: 'ID',
        direction: 'asc'
      }]
    });

    return myStore;
  }

  ,createToolbar: function(modelName, dummyRecord, rEditor, me){
    var toolbar = [{
        xtype:'container',
        layout : {type: 'vbox',align: 'stretch'},
        items:[{
            xtype:'container',
            items:[{
                xtype:"button",hidden:false, height:"30px", style:"margin:10px 0px 0px 5px;",
                tooltip:"Add Record", text:'Add Record', icon:"./images/add.gif", itemId:"addRecordId",                     
                handler: function () { 
                   /*
                    var newDummyRec = {};
                    for(val in dummyRecord){
                      newDummyRec[val] = "";
                    }*/
                    var newRow = Ext.create(modelName, {});
                    //store.remove(store.findRecord('id', 50, 0, false, true, true));//exact match
                    //me.getStore().add(newRow);
                    me.getStore().insert(0, {});
                    me.getSelectionModel().select(newRow);
                    rEditor.startEdit(newRow, 0);
                }
            },
            {
                xtype:"button",hidden:false, height:"30px", style:"margin:10px 0px 0px 5px;",
                tooltip:"Save Record", text:'Save Record', itemId:"saveRecordId", type:"saveRecord", icon: './images/save.gif',
                listeners: {
                    'click': 'updateDatabase'
                },
                scope: this
            },
            {
                xtype:"button",hidden:false, height:"30px", style:"margin:10px 0px 0px 5px;",
                tooltip:"Delete Record", text:'Delete Record', itemId:"deleteRecordId", type:"deleteRecord", icon: './images/delete.gif',
                                    
                listeners: {
                    'click': 'updateDatabaseOnDelete'
                },
                scope: this
            },
            //{ xtype: 'tbfill' },
            {
              xtype:"button",hidden:false, height:"30px", style:"margin:10px 0px 0px 5px;",
              tooltip:"Refresh", text:'Refresh', itemId:"refreshGrid", type:"refresh", icon: './images/refresh.gif',
                                  
              listeners: {
                  'click': 'updateDatabase'
              },
              scope: this
          }]
        },{
            xtype:'container', 
            style:"margin:5px 0px 0px 5px;",
            html:'<b>Note:</b>- Single selection of the record for updating/deleting <br />'+GDPR.gbl.constants.errorMessages.invalidText,
            items:[{
              xtype: 'displayfield',
              ref:'df_warninglabel',
              padding: '7 0 5 0',
              hidden:true,
              //labelSeparator: '',
              //labelWidth: 230,
              //labelCls: 'fldLabLJust',
              fieldCls: 'dspFormFld',
              //width: 400,
              value: ''
            }]
        }]
    }]

    return toolbar;
  }

  ,recreateColumnRenderer: function(value, metaData, record, row, col, store, gridView, columnObject){
    metaData.tdCls = 'fake-testing-combo'
    var data = record.getData();

    if(value != ''){
        var returnResult = null;
        var lObj = columnObject.url;
        if(columnObject.returnProperty === "tcompany") { 
          lObj = lObj.tcompany;
        }
        lObj.forEach(function(item){
          if(value == item.ID){
            returnResult = item[columnObject.returnProperty];
          }
        })
        return returnResult;
    }else{                        
        //metaData.record.data.statusType = metaData.record.modified.statusType
        //console.log("modified - "+metaData.record.data.statusType);
        
        return value
    }
  }

  ,validateTextField: function(){
    return {
      xtype: 'textfield',
      allowBlank: false,
      blankText: 'Mandatory',
      msgTarget: 'side',
      regex: /^[a-zA-Z0-9 ,\d\-_\s]+$/i, //alphanumeric (big/small, space, comma, underscore)
      regexText: 'The value in this field is invalid, '+GDPR.gbl.constants.errorMessages.invalidText,
      listeners_: {
          keyup: function(field) {
              var value = field.getValue();
              if (value.length && !value.match(field.config.regex)) {
                  field.setStyle('border: 1px solid red;');
              } else {
                  field.setStyle('border: 0;');
              }
          }
      }
    }
  }
  ,createJsonStore:function(_refElement, _url, me){
    var _localScope = this;
    return Ext.create("Ext.data.Store", {
      fields:_refElement
      ,autoLoad:true
      ,proxy: {
        type:"ajax"
        ,url:_url
        ,extraParams:me.extraParams
        ,reader: {
          type:"json"
          ,root:"myroot[0]"
          ,successProperty:"success"
        }
      }
      ,listeners: {
        "scope":this
        ,"metachange_": function(store, meta) {
          this.fields = [meta.fields];				    
        }
        ,load:function(){
          _localScope.fillCombos(_refElement, me);
        }
      }
    });
  }
  
  ,fillCombos:function(_typeAryLst, me){
    for(var m=0;m<_typeAryLst.length;m++){
      var mStore = me.store.getAt(0).get(_typeAryLst[m]).data;
      var aryLst = []
      for(var i=0;i<mStore.length;i++){
            var _dsRt = me.store.getAt(0).get(_typeAryLst[m]).data[i]
            var ms = [];
            ms.push(_dsRt.CODE);
            ms.push(_dsRt.NAME);
            aryLst.push(ms);
            delete ms;
      }
      var _elRef = 'ref'+_typeAryLst[m].toLowerCase();
      var _cmbBox = me.down('combobox[ref='+_elRef+']');
      if(me.store.getAt(0).get(_typeAryLst[m]).label != undefined){
        _cmbBox.setFieldLabel(me.store.getAt(0).get(_typeAryLst[m]).label);
      }
      var disabledProperty = me.store.getAt(0).get(_typeAryLst[m]).disabled;
      _cmbBox.select(me.store.getAt(0).get(_typeAryLst[m]).data[0].NAME);
      _cmbBox.store.loadData(aryLst);
      _cmbBox.setDisabled(disabledProperty);	
    }	  	
  }
  
  ,generateCombo: function(_ref, _fieldLabel){
     var _elObject = {
      xtype: 'combobox',
      ref: 'ref'+_ref.toLowerCase(),
      queryMode: 'local',                
      displayField: 'NAME',
      valueField: 'CODE',
      fieldLabel :_fieldLabel,
      mode:'local',
      hiddenName:'CODE',
      //labelWidth:50,
      typeAhead: true,
      //forceSelection: true,
      //allowBlank: false,
      //triggerAction: 'query',
      selectOnFocus: true,
      emptyText: 'Select ...',			
      editable: true,
      store : new Ext.data.SimpleStore({fields: [{name: 'CODE'},{name: 'NAME'}]})
    }
    return _elObject;
  }

  ,getXType:function(_repNo){
    var _type;	 
    //var _repNo = FBB.gbl.displayreportno.no;
    if( (_repNo).toLowerCase() == 'ux1'){
      _type = 'fbb_reports_charts_filters_filterux1';
    }else if( (_repNo).toLowerCase() == 'ux2'){
      _type = 'fbb_reports_charts_filters_filterux2';
    }else if( (_repNo).toLowerCase() == 'ux3' || (_repNo).toLowerCase() == 'ux4'){
      _type = 'fbb_reports_charts_filters_filterux3';
    }else if( (_repNo).toLowerCase() == 'ux5' || (_repNo).toLowerCase() == 'ux6'){
      _type = 'fbb_reports_charts_filters_filterux5';
    }else if( (_repNo).toLowerCase() == 'ux7'){
      _type = 'fbb_reports_charts_filters_filterux7';
    }else if( (_repNo).toLowerCase() == 'ux8'){
      _type = 'fbb_reports_charts_filters_filterux8';
    }else{
      _type = 'panel'
    }
    return _type;
  }
 
  //this.showNotification({success: false,  failMsg:"Few elements are missing to add a clause."});
  //this.showNotification({success: true, msg: action_.result.userMessage});
  ,showNotification: function(o_) {
		if(o_.success){
			Ext.get("_div-rptform-notification-bar").update("<img src='./img/exclamation.gif' style='width:16px;height:16px;'> <span style='color:#00FF00;'>"+o_.msg+"</span>");
		}
		else{
			Ext.get("_div-rptform-notification-bar").update("<img src='./img/exclamation.gif' style='width:16px;height:16px;'> <span style='color:#FF0000;'>"+o_.failMsg+"</span>");
		}
		Ext.Function.defer(function(){
			Ext.get("_div-rptform-notification-bar").update("");
		}, 10000);
	}
  
  /*
  me.sendAjaxRequest(_URL, "POST", function(jsonData){
	   me.getGridRef().getStore().loadRawData(jsonData.data);
	},_o.itemClickedRow.data);
  */
  ,sendAjaxRequest : function(url, method, handlerReturn, params){
		var _this = this;
		Ext.Ajax.request({
			method: method || 'POST',
      url: url,
      useDefaultXhrHeader: false,
      cors: true,
			waitTitle: 'Connecting',
			waitMsg: 'Sending data...',
			success: function (result, request) { 
				var jsonData = Ext.decode(result.responseText);
				return handlerReturn(jsonData);
			},
			failure: function (result, request) {
				var jsonData = Ext.decode(result.responseText);
				 return handlerReturn(jsonData);
			},
			headers: {
				'head': 'yajnas'
			},
			params: params
		});
  }
});
