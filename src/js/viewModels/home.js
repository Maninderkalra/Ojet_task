define(['accUtils','knockout','appController','ojs/ojarraydataprovider','../models/services',
'ojs/ojmodule-element-utils', 'ojs/ojcontext',"ojs/ojanimation","ojs/ojlistdataproviderview",
'ojs/ojlistitemlayout','ojs/ojlistview',"ojs/ojknockout","ojs/ojcheckboxset", "ojs/ojselectsingle",
'ojs/ojinputtext','ojs/ojinputsearch','ojs/ojbutton',"ojs/ojpopup",'ojs/ojcheckboxset','ojs/ojinputsearch',
'ojs/ojprogress','accountlist-detail/loader'],
    function(accUtils,ko,app,ArrayListDataProvider,service,moduleUtils,Context,AnimationUtils,ListDataProviderView,filterData){
        function HomeViewModel(params)
        {
            var self=this;
            self.dataProvider=ko.observable();
            self.selectVal=ko.observableArray([]);
            self.searchValue=ko.observable('');
            self.dataProviderFilterPopup=ko.observableArray([]);
            self.filterText=ko.observable();
            self.selectedItems =ko.observable();
            self.router = params.parentRouter;

            self.handleValueChanged = () => {
                //console.log(self.searchValue());
                if(self.searchValue().length > 0)
                {
                    const filterCharacters=self.data.filter((character)=>{
                        //console.log(character);
                        return(
                            character.OrganizationName.includes(self.searchValue())||
                            character.SalesProfileStatus.includes(self.searchValue())||
                            character.SalesProfileStatus.includes(self.searchValue())
                            );
                    });
                    self.filterText(filterCharacters.length);
                    self.dataProvider(new ArrayListDataProvider(filterCharacters,{keyAttributes:"SyncLocalId"}));
                }
                else
                {
                    self.filterText(self.data.length);
                    self.dataProvider(new ArrayListDataProvider(self.data,{keyAttributes:"SyncLocalId"}));
                }
            };

            // Wait until header show up to resolve
            var resolve = Context.getPageContext().getBusyContext().addBusyState({description: "wait for header"});
            // Header Config
            self.headerConfig = ko.observable({'view':[], 'viewModel':null});
            moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
                self.headerConfig({'view':view, 'viewModel': app.getHeaderModel()});
                resolve();
            });

            //filter config
            self.filterConfig = ko.observable({'view':[], 'viewModel':null});
            moduleUtils.createView({'viewPath':'views/filter.html'}).then(function(view) {
                self.filterConfig({'view':view, 'viewModel': self.getFilterModel()});
            });

            // Used by modules to get the data, selected value and event
            self.getFilterModel = function() {
                // Return an object containing the data and selected value and event filter
                // and callback handlers
                return {
                dataProviderFilterPopup:self.dataProviderFilterPopup,
                selectVal: self.selectVal,
                applyFilter: self.applyFilter
                };
            };

            //lifecycle hooks
            self.connected=()=>
            {
                //for bind the list view
                //console.log(navigator.connection.type);
                localStorage.clear();
                self.data=ko.observable(null);
                self.dataProvider=ko.observable();
                // console.log(self.dataProvider());
                service.getAccountList().then((response)=>{
                    self.filterText(response.length);
                    self.dataProvider(new ArrayListDataProvider(response,{keyAttributes:"id"}));
                    self.data=response;
                    // console.log("1: " |+ self.dataProvider());
                });
                // $.get("http://demo6785834.mockable.io/accounts").then(function(response){
                //     self.filterText(response.length);
                //     self.dataProvider(new ArrayListDataProvider(response,{keyAttributes:"id"}));
                //     self.data=response;
                //     console.log("1: " |+ self.dataProvider());
                // });
                // self.dataP=service.getAccountData();
                //self.dataProvider=new ArrayListDataProvider(self.dataP,{keyAttributes:"id"});
            }

            self.transitionCompleted=()=>
            {
                
            }


            //filter popup animation
            self.startAnimationListener = (event) => {
                let ui = event.detail;
                if (event.target.id !== "filterPopup") {
                    return;
                }
                if (ui.action === "open") {
                    event.preventDefault();
                    let options = { direction: "top" };
                    AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
                }
                else if (ui.action === "close") {
                    event.preventDefault();
                    ui.endCallback();
                }
            };

            //bind the filter value and open the filter popup
            self.openFilter=()=> {
                self.dataProviderFilterPopup(new ArrayListDataProvider(service.getFilterDataForPopup()[0],{keyAttributes:"value"}))
                
                let popup = document.getElementById("filterPopup");
                popup.open("#btnFilter");
            }

            //filter the data as per the requirment
            self.applyFilter=()=> {
                if(self.selectVal().length > 0)
                {
                    var res = self.data.filter(function(v) {
                        return self.selectVal().indexOf(v.SalesProfileStatus) > -1;
                    });
                    self.filterText(res.length);
                    self.dataProvider(new ArrayListDataProvider(res,{keyAttributes:"SyncLocalId"}));
                }
                else
                {
                    self.filterText(self.data.length);
                    self.dataProvider(new ArrayListDataProvider(self.data,{keyAttributes:"SyncLocalId"}));
                }
                let popup = document.getElementById("filterPopup");
                popup.close();
            }

            //next button function to navigate for next page.
            self.accountAction=()=>{
                app.router.go({path:"basicInfo"});
            }


            self.accountDetail=function(id,partyNumber,orgName,salesStatus,orgStatus,nVisit,lVisit)
            {
                var item={};
                item.id=id;
                item.partyNumber=partyNumber;
                item.orgName=orgName;
                item.salesStatus=salesStatus;
                item.orgStatus=orgStatus;
                item.nVisit=nVisit;
                item.lVisit=lVisit;
                self.router.go({path:'accountDetail',params:{"detail":JSON.stringify(item)}});                
            }
        }

        return HomeViewModel;
});