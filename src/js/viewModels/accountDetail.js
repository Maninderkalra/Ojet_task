define(['accUtils',
    'knockout',
    'ojs/ojmodule-element-utils',
    'appController',
    'ojs/ojcontext',
    '../models/services',
    'accountlist-detail/loader'
],
    function(accUtil,ko,moduleUtils,app,Context,services){
        function AccountDetailViewModel(args)
        {
            var self=this;
            // Wait until header show up to resolve
            var resolve = Context.getPageContext().getBusyContext().addBusyState({description: "wait for header"});
            // Header Config
            self.headerConfig = ko.observable({'view':[], 'viewModel':null});
            moduleUtils.createView({'viewPath':'views/header.html'}).then(function(view) {
                self.headerConfig({'view':view, 'viewModel': app.getHeaderModel()});
                resolve();
            });

            self.connected=()=>
            {

                // self.detail=args.params.item;
                self.itemDetail=JSON.parse(args.params.detail);

                self.item=ko.observable();
                services.getAccountList().then((result)=>{
                    self.item=result.filter((x)=>x.SyncLocalId === self.itemDetail.id);
                    //console.log(self.item);
                });

            }
        }

        return AccountDetailViewModel;
});