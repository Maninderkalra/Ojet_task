define(['accUtils','knockout','appController','ojs/ojmodule-element-utils','ojs/ojcontext'],
    function(accUtils,ko,app,moduleUtils,Context){
        function TestViewModel(args)
        {
            var self=this;
            self.data=ko.observable();
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
                console.log("test: " + JSON.stringify(args.params));
                if(args.params.detail)
                {
                    self.data=args.params.detail;
                }
            }
            

        }
        
        return TestViewModel;
});