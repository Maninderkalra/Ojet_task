/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils', 'ojs/ojcontext','ojs/ojarraydataprovider','ojs/ojlistdataproviderview','../models/services','../models/conf',"ojs/ojasyncvalidator-regexp",
'ojs/ojformlayout','ojs/ojinputtext','ojs/ojinputnumber','ojs/ojvalidationgroup','ojs/ojbutton','ojs/ojselectsingle','ojs/ojselectcombobox','ojs/ojradioset',"ojs/ojtrain"],
 function(ko, app, moduleUtils, accUtils, Context,ArrayDataProvider,ListDataProviderView,service,conf,AsyncRegExpValidator) {

    function AddressViewModel() {
      var self = this;
      self.formDetail={};
      self.radioAddress=ko.observable();
      
      self.dataProviderForLatDir=ko.observableArray([]);
      self.dataProviderForLongDir=ko.observableArray([]);
      self.dataProviderForCountry=ko.observableArray([]);
      self.dataProviderForState=ko.observableArray([]);
      self.dataProviderForCity=ko.observableArray();
      // Wait until header show up to resolve
      var resolve = Context.getPageContext().getBusyContext().addBusyState({description: "wait for header"});
      // Header Config
      self.headerConfig = ko.observable({'view':[], 'viewModel':null});
      moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
        self.headerConfig({'view':view, 'viewModel': app.getHeaderModel()});
        resolve();
      })

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      self.mapFields = (item) => {
        const data = item.data;
        const mappedItem = {
            data: { label: `${data.name}`, value: data.iso2 },
            metadata: { key: data.iso2 },
        };
        return mappedItem;
      };
      self.dataMapping = { mapFields: self.mapFields };

      self.mapFieldsCity = (item) => {
        const data = item.data;
        const mappedItem = {
            data: { label: `${data.name}`, value: data.id },
            metadata: { key: data.id },
        };
        return mappedItem;
      };
      self.dataMappingCity = { mapFields: self.mapFieldsCity };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Address page loaded.', 'assertive');
        document.title = "Address";

        var tempData=localStorage.getItem('formDetail');
        let data=JSON.parse(tempData);
        data.addressLine1='';
        data.addressLine2='';
        data.selectCountry='';
        data.selectState='';
        data.selectCity='';
        data.pinCode=ko.observable(000000);
        data.radioAddress='';
        data.lattitude='';
        data.lattitudeDir='N';
        data.longitude='';
        data.longitudeDir='W';
        self.formDetail=data;

        service.getCountryList().then((result)=>{
            self.arrayDataProvider=new ArrayDataProvider(result,{keyAttributes:'id'});
            self.dataProviderForCountry(new ListDataProviderView(self.arrayDataProvider, {dataMapping: self.dataMapping}));
          //console.log('resu'+JSON.stringify(self.dataProviderForCountry()));
        });        

        self.dataProviderForLatDir=new ArrayDataProvider(latDir,{keyAttributes:'value'});
        self.dataProviderForLongDir=new ArrayDataProvider(longDir,{keyAttributes:'value'});
      };

      self.pinCodeValidate = [
        new AsyncRegExpValidator({
            pattern: "[0-9]{6}$",
            hint: "Please enter a  pincode",
            messageDetail: "Please enter a valid pincode or 6 digit code",
        }),
      ];
      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };

      self.formSubmit=()=>
      {
        var tracker=document.getElementById('validationGroup');
        if(tracker.valid === "valid")
        {
          //console.log('if');
          localStorage.setItem("formDetail",JSON.stringify(self.formDetail));
          app.router.go({path:"contact"});
        }
        else
        {
          tracker.showMessages();
          tracker.focusOn("@firstInvalidShown");
        }
      }

      self.countryValueChange=function(event){
        //console.log(self.formDetail.selectCountry);
        service.getStateForCountry(self.formDetail.selectCountry).then((result)=>{
          self.arrayDataProvider=new ArrayDataProvider(result,{dataMapping: self.dataMapping});
          self.dataProviderForState(new ListDataProviderView(self.arrayDataProvider, {dataMapping: self.dataMapping}));
          //console.log('resu'+JSON.stringify(result));
        });        
      }

      
      self.stateValueChange=function(event){
        service.getCityForState(self.formDetail.selectCountry,self.formDetail.selectState).then((result)=>{
          self.arrayDataProvider=new ArrayDataProvider(result,{dataMapping: self.dataMappingCity});
          self.dataProviderForCity(new ListDataProviderView(self.arrayDataProvider, {dataMapping: self.dataMappingCity}));
          //console.log('resu'+JSON.stringify(result));
        });        
      }

      self.goBack=function(){app.goBack();}

    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return AddressViewModel;
  }
);
