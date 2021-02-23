define(['knockout'],
    function(ko){
        function FormDetailModel()
        {
            var self=this;

            self.formDetail={
                name:'',
                selectChanel:'SI',
                selectBasicInfoType:'SI',
                radioClass:'',
                addressLine1:'',
                addressLine2:'',
                selectCountry:'',
                selectCity:'',
                selectAddressType:'',
                radioAddress:'',
                lattitude:'',
                longitude:'',
                selectContactType:'',
                selectPrefix:'',
                selectContactRole:'',
                selectTelephone:'',
                telephone:'',
                firstName:'',
                lastName:'',
                email:'',
                radioContact:'',
                selectSegmentType:'',
                selectPSegmentType:'',
                selectSSegmentType:''
            }
        }

        return new FormDetailModel;
});