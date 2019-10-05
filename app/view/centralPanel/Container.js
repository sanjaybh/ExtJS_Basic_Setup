
Ext.define('GDPR.view.centralPanel.Container', {
  xtype:'view_centralPanel_container',

  extend: 'Ext.container.Container',

  requires: ['GDPR.view.centralPanel.CenterPanel', 'GDPR.view.centralPanel.LeftTree'],
  /*
  controller: 'main',
  viewModel: {
  type: 'main'
  },
  */
  initComponent: function() { 
    //console.log('central panel - container')
    this.layout = "border";
    this.cls = "portal";

    this.items = [
      {
        region: 'west',
        split: true,

        margins:'35 0 5 5',
        cmargins:'35 5 5 5',
        autoScroll:true,
        animate:true,
        enableDD:false, 
        containerScroll: true, 

        width:250,         
        items:[{
          xtype:'view_centralPanel_lefttree'
        }]
      },{
        region: 'center',
        flex:1,
        items:[{
          xtype:'view_centralPanel_centerpanel', flex:1
        }]
      }
    ];
    this.callParent(arguments);
  }
});
