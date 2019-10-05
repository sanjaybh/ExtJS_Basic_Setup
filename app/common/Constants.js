//import Connection from '../../resources/Connection.js';

//function Constants(){

Ext.define('GDPR.common.Constants', {
  alternateClassName: 'constant',
  singleton: true,

  constructor: function(config){ 
    var isStubbed = false;

    this.URL_SERVER_ROOT = "./";
    //this.URL_SERVER_BASE_ROOT = "./app/";
    
    this.errorMessages = {
      "invalidText" : 'only alphanumeric characters, comma, space and an underscore is allowed while editing.'
    }

    //this.URL_STUBBED_FILES = this.URL_SERVER_BASE_ROOT+"/stubbed/";
    this.URL_STUBBED_FILES = this.URL_SERVER_ROOT+"stubbed/";

    //this.URL_SERVER_BASEURL = "http://localhost:8081/GDPR";
    this.URL_SERVER_BASEURL = new Connection().URL_SERVER_BASEURL;

    this.URL_WEST_PANEL = this.URL_STUBBED_FILES+"/treeData.json";
    

    this.SERVER_OR_JSON = "SERVER"; //ie:- SERVER, JSON
    //==========[Dynamic URL contents]===========\\

    if(this.SERVER_OR_JSON == "JSON")
    {
      this.URL_MASTER_PANEL_TDDRSTATUS = this.URL_STUBBED_FILES+"/Tddrstatus.json";      
      this.URL_MASTER_PANEL_TDIVISION = this.URL_STUBBED_FILES+"/tdivision.json";
      this.URL_MASTER_PANEL_TCOMPANY_SYSTEM = this.URL_STUBBED_FILES+"/tcompanysystem.json";

      this.URL_MASTER_PANEL_TSCOPE_COCOMPANY = this.URL_STUBBED_FILES+"/tscopecosystem.json";      
      this.URL_MASTER_PANEL_TSYSTEM = this.URL_STUBBED_FILES+"/tsystem.json"; 
      this.URL_MASTER_PANEL_TUSER = this.URL_STUBBED_FILES+"/tuser.json";      

      this.URL_MASTER_PANEL_TCOMPANY = this.URL_STUBBED_FILES+"/tcompany.json";
      this.URL_MASTER_PANEL_TSCOPE = this.URL_STUBBED_FILES+"/tscope.json";
      this.URL_MASTER_PANEL_TSTATUSTYPE = this.URL_STUBBED_FILES+"/tstatusType.json"; 
      
      this.URL_MASTER_POTAL_METADATA = this.URL_STUBBED_FILES+"/metadata.json";
      this.URL_MASTER_PANEL_SUCCESS_MSG = this.URL_STUBBED_FILES+"/success.json";
    }
    else if(this.SERVER_OR_JSON == "SERVER")
    {
      this.URL_MASTER_PANEL_TDDRSTATUS = this.URL_SERVER_BASEURL+"/tddrstatus";      
      this.URL_MASTER_PANEL_TDIVISION = this.URL_SERVER_BASEURL+"/tdivision";
      this.URL_MASTER_PANEL_TCOMPANY_SYSTEM = this.URL_SERVER_BASEURL+"/tcompanysystem";

      this.URL_MASTER_PANEL_TSCOPE_COCOMPANY = this.URL_SERVER_BASEURL+"/tscopecosystem";      
      this.URL_MASTER_PANEL_TSYSTEM = this.URL_SERVER_BASEURL+"/tsystem"; 
      this.URL_MASTER_PANEL_TUSER = this.URL_SERVER_BASEURL+"/tuser";      

      this.URL_MASTER_PANEL_TCOMPANY = this.URL_SERVER_BASEURL+"/tcompany";
      this.URL_MASTER_PANEL_TSCOPE = this.URL_SERVER_BASEURL+"/tscope";
      this.URL_MASTER_PANEL_TSTATUSTYPE = this.URL_SERVER_BASEURL+"/tstatustype";
      
      this.URL_MASTER_POTAL_METADATA = this.URL_SERVER_BASEURL+"/metadata";
      this.URL_MASTER_PANEL_SUCCESS_MSG = this.URL_SERVER_BASEURL+"/postdata";
    }
    
    
    
    this.REFERRER_URLS = {"inquiry":"../home.html", "defaultPage":'Default.html' };


    this.callParent(arguments);
  }
});