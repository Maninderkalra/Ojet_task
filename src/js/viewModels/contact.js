/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
7 */
/*
 * Your customer ViewModel code goes here
 */
define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils', 'ojs/ojcontext',"ojs/ojasyncvalidator-regexp",'../models/conf','ojs/ojarraydataprovider',
'ojs/ojformlayout','ojs/ojinputtext','ojs/ojvalidationgroup','ojs/ojbutton','ojs/ojselectsingle','ojs/ojradioset',"ojs/ojswitch"],
 function(ko, app, moduleUtils, accUtils, Context,AsyncRegExpValidator,conf,ArrayDataProvider) {

    function CustomerViewModel() {
      var self = this;

      self.formDetail=ko.observable();
      self.dataContactTypeProvider = ko.observable();
      self.dataPrefixProvider = ko.observable();
      self.dataContactRoleProvider = ko.observable();
      self.dataTelephoneProvider = ko.observable();
      self.radioContact = ko.observable();

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

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Customers page loaded.', 'assertive');
        document.title = "Customers";
        var tempData=localStorage.getItem('formDetail');
        let data=JSON.parse(tempData);
        data.selectContactType='';
        data.selectPrefix='';
        data.selectContactRole='';
        data.selectTelephone='';
        data.telephone='';
        data.firstName='';
        data.lastName='';
        data.email='';
        data.status=true;
        self.radioContact=data;

        self.dataContactTypeProvider = new ArrayDataProvider(contactType, {keyAttributes: "value"});
        self.dataPrefixProvider = new ArrayDataProvider(prefixType, {keyAttributes: "value"});
        self.dataContactRoleProvider = new ArrayDataProvider(contactRole, {keyAttributes: "value"});
        self.dataTelephoneProvider = new ArrayDataProvider(telephoneList, {keyAttributes: "value"});
      };

      self.emailValidate = [
        new AsyncRegExpValidator({
            pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
            messageDetail: "Please enter a valid email id"
        })
      ];

      self.goBack=function(){app.goBack();}
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
        localStorage.setItem("formDetail",JSON.stringify(self.formDetail));
        app.router.go({path:"additionalInfo"});
      }
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return CustomerViewModel;
  }
);
