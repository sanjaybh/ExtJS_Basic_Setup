Ext.define('GDPR.view.masterPages.TuserGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.view_masterpages_tusergrid',

    requires: [
        'GDPR.view.main.MainController'
    ],
    controller: 'main',
        
    selType: 'rowmodel',

    autoScroll: true,
    
    initComponent: function() { 
        var me = this;
        me.gridURL = GDPR.gbl.constants.URL_MASTER_PANEL_TUSER;

        var rEditor = Ext.create('Ext.grid.plugin.CellEditing', { licksToEdit: 2 });
        me.plugins = [rEditor];

        me.buildItems(me, me.gridURL, rEditor);
        this.callParent(arguments);

        me.on('render', me.loadStore, me, {_scope:me})
    },

    buildItems: function (me, gridURL, rEditor) {  
        var modelConfig = { 
            "modelName" : 'TUser',
            "modelRoot" : 'tuser'
        }
        //Creating a dummy record for grids new entry
        var createRecordDummy = {ID: '0',userName: '',userDisplayName: '',userPassword: '', userIsAdmin:'0', userIsActive:'0'}
                
        me.TScope = Ext.define(modelConfig.modelName, {
            extend: 'Ext.data.Model',
            fields: [ 
                {name: 'ID',                type: 'int'},
                {name: 'userName',          type: 'string'},
                {name: 'userDisplayName',   type: 'string'},
                {name: 'userPassword',      type: 'string'},
                {name: 'userIsAdmin',       type: 'string'},
                {name: 'userIsActive',      type: 'string'}
            ]
        });
        
        //All the config changes above only    
        me.columns = [{ 
            header: 'ID', dataIndex: 'ID', flex: 1, hidden:false
        },{
            header: 'User Name', dataIndex: 'userName', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'User DisplayName', dataIndex: 'userDisplayName', flex: 1,
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'User Password', dataIndex: 'userPassword', flex: 1, 
            editor: {
                xtype: 'textfield', allowBlank: false
            }
        },{
            header: 'User Salt', dataIndex: 'userSalt', flex: 1, hidden:true
        },{
            header: 'User Is-Admin', dataIndex: 'userIsAdmin', flex: 1,
            editor: {
                xtype: 'combobox',
                store: new Ext.data.ArrayStore({
                    fields: ['ID', 'value'],
                    data : [['0', 'Inactive'],['1', 'Active']]
                 }),

                mode: 'local',
                _emptyText:'Select...',

                displayField: 'value',
                valueField: 'ID',
                allowBlank: false,
                
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer_: function(value, metaData, record, row, col, store, gridView){
                if(value == true || value == 1){
                    return 1;
                }else if(value == false || value == 0){
                    return 1;
                }else { 
                    return ""; 
                }      
            }
        },{
            header: 'User Is-Active', dataIndex: 'userIsActive', flex: 1,
            editor: {
                xtype: 'combobox',
                store: new Ext.data.ArrayStore({
                    fields: ['ID', 'value'],
                    data : [['0', 'Inactive'],['1', 'Active']]
                 }),

                mode: 'local',
                _emptyText:'Select...',

                displayField: 'value',
                valueField: 'ID',
                allowBlank: false,
                
                editable: false,
                forceSelection: true,
                triggerAction: 'all'
            },
            renderer_: function(value, metaData, record, row, col, store, gridView){
                if(value == true || value == 1){
                    return 1;
                }else if(value == false || value == 0){
                    return 1;
                }else { 
                    return ""; 
                }    
            }
        }];
        this.store = me.utilityFx().createJsonStoreForGrids(modelConfig.modelName, gridURL, modelConfig.modelRoot)
        //Create a new record to the grid
        var newRecord = createRecordDummy;
        me.tbar = me.utilityFx().createToolbar(modelConfig.modelName, newRecord, rEditor, me)
    },

    loadStore: function(obj, _ref){         
        //obj.store = Ext.data.StoreManager.lookup('GDPR.store.TddrstatusStore')
        obj.getStore().getProxy().url = _ref._scope.gridURL;         
        obj.getStore().load();
    },

    utilityFx: function(){
        return Ext.create('widget.gdpr_common_utility_functions');
    }
});