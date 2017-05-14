/**
 * Created by Jack on 2017/5/12.
 */
angular.module('detail',['ServiceModule'])
    .controller('detailAdminCtrl',function($scope,$http,localstorage){
        $scope.detailData = [];
        var param = {
            'classid' :localstorage.getObject('ecjtuA_auth').classid
        };
        console.log(localstorage.getObject('ecjtuA_auth').classid);
        $http({
            method: 'POST',
            url: 'http://localhost:8198/detailAdmin',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data:param
        }).then(function successCallback(res) {
            console.log(res);
            var temps = {};
            for(var i = 0;i<res.data.length;i++){
                $scope.detailData.push({
                    did:res.data[i].did,
                    dtid:res.data[i].odid,
                    dtime:res.data[i].order_time,
                    dgcode:res.data[i].getcode,
                    duser:res.data[i].username
                })
            }
            temps = $scope.detailData;
            for(var j = 0; j < temps.length; j++){
                jQuery('#ios').append('<tr><th>'+temps[j].dtid+'</th><td>'+temps[j].did+'</td><td>'+temps[j].dtime+'</td><td>'+temps[j].dgcode+'</td> <td>'+temps[j].duser+'</td></tr>');
            }
        }, function errorCallback(res) {
        });
    });