Ext.define('GDPR.view.centralPanel.CenterPanel', {
  xtype:'view_centralPanel_centerpanel',

  extend: 'Ext.panel.Panel',

  requires: [
    'Ext.layout.container.Card',

    'GDPR.view.masterPages.TddrstatusGrid',
    'GDPR.view.masterPages.TdivisionGrid',
    'GDPR.view.masterPages.TscopeGrid',
    'GDPR.view.masterPages.TcompanyGrid',
    'GDPR.view.masterPages.TcompanySystemGrid',
    'GDPR.view.masterPages.TscopecosystemGrid',
    'GDPR.view.masterPages.TsystemGrid',
    'GDPR.view.masterPages.TStatusTypeGrid',
    'GDPR.view.masterPages.TuserGrid'
  ],

  margin: '1 1 1 1',
  padding: '5 5 5 5',
  cls: 'blackList',
  padding: 1,
  border:true,
  flex:1,
  _activeItem: 0,
  layout: {
    type: 'card', deferredRender: true , align: 'stretch'
  },

  initComponent: function() {
    var _panelHeight = 680; //680
    this.style_1 = {
      backgroundColor: '_red', backgroundImage: 'none', _width: '98%', _border:'1px solid black'
    };
    
    this.items = [{
      id: 'tDdrStatus',
      xtype: 'view_masterpages_tddrstatusgrid', title:'DDR Status', height: _panelHeight
    },{
      id: 'tStatusType', 
      xtype: 'view_masterpages_tstatustypegrid', html:'Panel 2', title:'', height: _panelHeight
    },/*{
      id: 'tDdRequest', 
      xtype: 'panel', html:'Panel 3', title:'', height: _panelHeight
    },{
      id: 'tDdrTask', 
      xtype: 'panel', html:'Panel 5', title:'', height: _panelHeight
    },{
      id: 'tLog', 
      xtype: 'panel', html:'Panel 10', title:'', height: _panelHeight
    },*/{
      id: 'tUser', 
      xtype: 'view_masterpages_tusergrid', html:'Panel 4', title:'', height: _panelHeight
    },{
      id: 'tDivision',
      xtype: 'view_masterpages_tdivisiongrid', title:'', height: _panelHeight
    },{
      id: 'tCompany', 
      xtype: 'view_masterpages_tcompanygrid', html:'Panel 7', title:'', height: _panelHeight
    },{
      id: 'tCompanySystem', 
      xtype: 'view_masterpages_tcompanysystemgrid', html:'Panel 8', title:'', height: _panelHeight
    },{
      id: 'tScopeCoSystem', 
      xtype: 'view_masterpages_tscopecosystemGrid', html:'Panel 9', title:'', height: _panelHeight
    },{
      id: 'tSystem',
      xtype: 'view_masterpages_tsystemgrid', html:'Panel 11', title:'', height: _panelHeight
    },{
      id: 'tScope',
      xtype: 'view_masterpages_tscopegrid', html:'Panel 12', title:'', height: _panelHeight
    }]

    /*
    this.items = [{
      xtype: "component",
      itemId: "iframe",  
      _bodyStyle:'border:1px solid red;',      
      autoEl: {
        tag: "iframe",
        id:'iframeWin',
        name: "portal_center_frame",
        src: GDPR.gbl.constants.REFERRER_URLS.defaultPage,
        style: "height:100%;width:100%;border:1px;",
        frameborder: "yes"
      }
    }]
    */
    this.callParent(arguments);
  }
});
