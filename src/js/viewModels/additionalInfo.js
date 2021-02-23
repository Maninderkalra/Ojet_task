/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils', 'ojs/ojcontext','ojs/ojarraydataprovider','../models/conf',
'ojs/ojformlayout','ojs/ojinputtext','ojs/ojvalidationgroup','ojs/ojbutton','ojs/ojselectsingle','ojs/ojradioset'],
 function(ko, app, moduleUtils, accUtils, Context,ArrayDataProvider) {

    function IncidentsViewModel() {
      var self = this;

      self.formDetail={
        selectSegmentType:'',
        selectPSegmentType:'',
        selectSSegmentType:'',
        bName:''
      };

      self.dataSegmentTypeProvider=ko.observable();
      self.dataPSegmentProvider=ko.observable();
      self.dataSSegmentProvider=ko.observable();

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
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
        // Implement further logic if needed
        self.dataSegmentTypeProvider = new ArrayDataProvider(segmentList, {keyAttributes: "value"});
        self.dataPSegmentProvider = new ArrayDataProvider(pSegmentList, {keyAttributes: "value"});
        self.dataSSegmentProvider = new ArrayDataProvider(sSegmentList, {keyAttributes: "value"});
      };

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
        app.router.go({path:"home"});
      }

      self.goBack=function(){
        app.goBack();
      }
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return IncidentsViewModel;
  }
);
