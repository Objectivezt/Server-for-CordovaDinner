/**
 * Created by Jack on 2017/5/13.
 */
angular.module('greensAdd',['ServiceModule'])
    .controller('greensAddAdminCtrl',function($scope,$http,localstorage){
        var param = {
            goodsname :$scope.goodsname,
            goodsprice : $scope.goodsprice,
            goodsdescription : $scope.goodsdescription,
            goodsStore:  localstorage.getObject('ecjtuA_auth').classid
        };
        console.log(localstorage.getObject('ecjtuA_auth').classid);
        jQuery('#submit').click(function () {
            jQuery('button').addClass('disabled');
            $http({
                method: 'POST',
                url: 'http://localhost:8198/insertGoods',
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                data:param
            }).then(function successCallback(res) {
                console.log(res);
            }, function errorCallback(response) {
            });
})
});
