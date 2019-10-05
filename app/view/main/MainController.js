/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('GDPR.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',

    onTreeItemClick: function (s, r) {
        //Ext.getCmp("centercontents").down('component#iframe').el.dom.src = 'google.com'
        //Ext.get("centercontents").load({ url: "/adduser" })

        var cp = Ext.getCmp("centercontents").down('view_centralPanel_centerpanel');      
        /*s.store.data.items.forEach(function(item){
            //console.log(item.data.text)
            cp.items.items.push({id: item.data.id, xtype: 'panel', html: item.data.text})
        })*/
        if(!r.data.expanded){
            if(r.data.active){ 
                cp.setActiveItem(r.data.id);

                var cardPanel = cp.down('panel[id='+r.data.id+']');
                var _width = cardPanel.width || '700';
                
                cardPanel.setTitle('');
                cardPanel.setTitle(r.data.text);

                /*if(r.data.id !== 'tDdrStatus'){
                    cardPanel.setTitle('');
                    cardPanel.setTitle(r.data.text);
                }else{
                    cardPanel.setTitle('DDR Status')
                }*/
                cardPanel.setWidth(_width)
            }else{
                Ext.Msg.alert('Alert!','Coming soon...')
            }
        }        
    },

    showErrorLog: function(_grid, msg){
            var pnrWarRef = _grid.down('displayfield[ref=df_warninglabel]');
            pnrWarRef.setHidden(false);
            pnrWarRef.el.addCls('dspFormFld');
            pnrWarRef.el.dom.innerText = "Warning : "+msg;

            var task = new Ext.util.DelayedTask(function(){
                pnrWarRef.setHidden(true);
            });
            
            // Wait 500ms before calling our function. If the user presses another key
            // during that 500ms, it will be cancelled and we'll wait another 500ms.
            task.delay(5000);
            
    },

    updateDatabaseOnDelete: function(btn){
        var _this = this;
        var btnRef = btn;
        Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete this record ?', function(btn){
            if(btn === 'yes'){
                _this.updateDatabase(btnRef);
            }
          });
    },

    updateDatabase: function(btn){ 
        var _this = this;
        var _grid = btn.up('grid');
        var type = btn.type;
        var _gridID = _grid.id;
        var _gridTitle = _grid.title;

        var method = 'POST';
        var readyForDB = false;
        var params = null;

        if(type === 'refresh')  { 
            _grid.loadStore(_grid, {_scope: _grid});
            readyForDB === false;
            return true;
        }

        console.log("Start execution");

        var selectedNode = _grid.getSelectionModel().getSelected();         
        if(selectedNode.length === 0){
            var msg = "Please select a record";
            this.showErrorLog(_grid, msg);
        }else{  
            
            if(type === 'saveRecord')  { 
                if(_grid.getStore().getUpdatedRecords().length > 0){
                    var url = GDPR.gbl.constants.URL_MASTER_PANEL_SUCCESS_MSG;
                    
                    var handlerReturn = function(json){
                        if(json.success === true){
                            _this.showErrorLog(_grid, json.message);
                        }
                        _grid.loadStore(_grid, {_scope: _grid});
                        //reload metadata again, since tables are getting updated.                    
                        _this.loadMetaDataAgain();
                    }
                    params = {
                        "reqjson" : Ext.encode(_grid.getStore().getUpdatedRecords()[0].data),
                        "type" : type
                    };                    
                    readyForDB = true;
                    console.log("Save this record")
                } 
                else if(_grid.getStore().getModifiedRecords().length > 0){
                    var url = GDPR.gbl.constants.URL_MASTER_PANEL_SUCCESS_MSG;
                    
                    var handlerReturn = function(json){
                        if(json.success === true){ 
                            _this.showErrorLog(_grid, json.message);
                        }else{
                            _this.showErrorLog(_grid, json.message);
                        }
                        _grid.loadStore(_grid, {_scope: _grid});

                        //reload metadata again, since tables are getting updated.                    
                        _this.loadMetaDataAgain();
                    }
                    params = {
                        "reqjson" : Ext.encode(_grid.getStore().getModifiedRecords()[0].data),
                        "type" : "addRecord"
                    };
                    
                    readyForDB = true;
                }
            }
            else if(type === 'deleteRecord')  { 
                //console.log("Delete this record - "+Ext.encode(selectedNode.items[0].data));
                var url = GDPR.gbl.constants.URL_MASTER_PANEL_SUCCESS_MSG;                
                var handlerReturn = function(json){ 
                    if(json.success === true){
                        _this.showErrorLog(_grid, json.message);
                    }
                    _grid.loadStore(_grid, {_scope: _grid});

                    //reload metadata again, since tables are getting updated.                    
                    _this.loadMetaDataAgain();
                }
                params = {
                    "reqjson" : Ext.encode(selectedNode.items[0].data),
                    "type" : type
                };

                readyForDB = true;   
            } 

            
            if(readyForDB === true){
                params.masterTableId = _gridID;
                params.gridTitle = _gridTitle;
                
                //delete unnecessary values
                delete params.reqjson.id;
                //console.log("ALL IS WELL - ");
                
                if(type === 'deleteRecord')  { 
                    var isValidationValidFlag = true;
                }else{
                    var isValidationValidFlag = _this.isEmptyValuesValidation(params, _this, _grid);
                }
                
                if(isValidationValidFlag){
                   // console.log("READY to send req ====> ");
                    
                    _grid.utilityFx().sendAjaxRequest(url, method, handlerReturn, params);                    
                }else{
                    //_this.showErrorLog(_grid, "Validation failed, something went wrong.");
                    console.log("Validation failed, something went wrong.");
                }                
            }            
        }
    },

    loadMetaDataAgain: function(){
        var AppRoot = GDPR.getApplication();
        console.log("Load metadata store again");
        AppRoot.loadMetaData(AppRoot, {"fireFrom" : "MainController"})
    },
    
    isEmptyValuesValidation: function(params, _this, _grid){ 
        var myObj = Ext.decode(params.reqjson);
        console.log("OBJ to validate - "+params.reqjson);

        var propertyArray = [];
        //var propertyString = 'Mandatory fields are empty';
        for (x in myObj) {            
            //console.log(x +" ---- isEmpty ----- "+Ext.isEmpty(myObj[x]))
            if(Ext.isEmpty(myObj[x])){
                //propertyString += ' '+x+', ';
                propertyArray.push(x);
            }
        }
        
        if(propertyArray.length > 0) {
            _this.showErrorLog(_grid, "Mandatory fields are empty. - ["+propertyArray.toString()+']');
            return false;
        }else{
            return true;
        }        
    },

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            Ext.Msg.alert('Alert!',choice)
        }else{
            Ext.Msg.alert('Alert!',choice)
        }
    },

    formatDate: function(value){
        return value ? Ext.Date.dateFormat(value, 'M d, Y') : '';
    }
});
