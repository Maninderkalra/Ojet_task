/*service js use for communicate the server side like 
connect the beckend services for example rest/web api or web socket.*/
define(['knockout'],
    function(ko){
        function ServiceViewModel()
        {
            this.getAccountData=ko.computed(function()
            {   
                var data;
                $.get("http://demo6785834.mockable.io/accounts").then(function(response){
                    data=response;
                });
                return data;

            },this);

            this.getFilterDataForPopup=ko.computed(function()
            {   
                var data=[];
                $.get("../assets/filterValue.json",function(response){
                    data.push(response);
                    //console.log("data1: " + data);
                });
                return data;
            },this);

            this.getAccountList=async function()
            {   
                return new Promise(function(resolve, reject) {
                    $.ajax({ 
                        type : "GET", 
                        url : "http://demo6785834.mockable.io/accounts", 
                        success : function(result) { 
                            //set your variable to the result 
                            resolve(result);
                        }, 
                        error : function(result) { 
                          //handle the error 
                        } 
                      }); 
                    });
            }

            this.getCountryList=async function()
            {   
                return new Promise(function(resolve, reject) {
                    getAllCountries().then(
                        function(result) 
                        { 
                            /* handle a successful result */
                            resolve(result);
                        },
                        function(error) { /* handle an error */ }
                      );
                });
            }

            this.getStateForCountry=async function(country)
            {   
                return new Promise(function(resolve, reject) {
                    getStateByCountry(country).then(
                        function(result) 
                        { 
                            /* handle a successful result */
                            resolve(result);
                        },
                        function(error) { /* handle an error */ }
                      );
                });
            }

            this.getCityForState=async function(country,state)
            {   
                return new Promise(function(resolve, reject) {
                    getCitiesByState(country,state).then(
                        function(result) 
                        { 
                            /* handle a successful result */
                            resolve(result);
                        },
                        function(error) { /* handle an error */ }
                      );
                });
            }
            
        }

    
        function getAllCountries(url,result)
        {
            return new Promise(function(resolve, reject) {
            $.ajax({ 
                type : "GET", 
                url : "https://api.countrystatecity.in/v1/countries", 
                beforeSend: function(xhr){xhr.setRequestHeader( "X-CSCAPI-KEY","WTNCY3dMNDlKRWRFQzl3eDlDaDA3WUsyelBEczBPZEp1WUFaWFU3cw==")},
                success : function(result) { 
                    //set your variable to the result 
                    resolve(result);
                }, 
                error : function(result) { 
                  //handle the error 
                } 
              }); 
            });
        }

        function getStateByCountry(country)
        {
            // console.log('Country : '+ country);
            var url="https://api.countrystatecity.in/v1/countries/"+country+'/states';
            return new Promise(function(resolve, reject) {
                $.ajax({ 
                    type : "GET", 
                    url : url, 
                    beforeSend: function(xhr){xhr.setRequestHeader( "X-CSCAPI-KEY","WTNCY3dMNDlKRWRFQzl3eDlDaDA3WUsyelBEczBPZEp1WUFaWFU3cw==")},
                    success : function(result) { 
                        //set your variable to the result 
                        resolve(result);
                    }, 
                    error : function(result) { 
                      //handle the error 
                    } 
                  }); 
            }); 
        }

        function getCitiesByState(country,state)
        {
            // console.log('Country : '+ country,state);
            var url="https://api.countrystatecity.in/v1/countries/"+country+'/states/'+state+'/cities';
            return new Promise(function(resolve, reject) {
                $.ajax({ 
                    type : "GET", 
                    url : url, 
                    beforeSend: function(xhr){xhr.setRequestHeader( "X-CSCAPI-KEY","WTNCY3dMNDlKRWRFQzl3eDlDaDA3WUsyelBEczBPZEp1WUFaWFU3cw==")},
                    success : function(result) { 
                        //set your variable to the result 
                        resolve(result);
                    }, 
                    error : function(result) { 
                      //handle the error 
                    } 
                  }); 
            }); 
        }

        return new ServiceViewModel;
});