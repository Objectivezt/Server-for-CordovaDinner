/**
 * Created by Jack on 2017/5/11.
 */
angular.module('greens',['ServiceModule'])
    .controller('greensAdminCtrl',function($scope,$http,localstorage){
        $scope.greensData = [];
        var param = {
            'shopid' :localstorage.getObject('ecjtuA_auth').classid
        };
        console.log(localstorage.getObject('ecjtuA_auth').classid);
        $http({
            method: 'POST',
            url: 'http://localhost:8198/greensAdminData',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data:param
        }).then(function successCallback(res) {
            var temps = {};
            console.log(res.data);

            for(var i = 0;i<res.data.length;i++){
                $scope.greensData.push({
                    gid : res.data[i].gid,
                    nickname: res.data[i].g_nickname,
                    description: res.data[i].g_desciption,
                    price: res.data[i].price
                })
            }
            console.log($scope.greensData);
            temps = $scope.greensData;
            for(var j = 0; j < temps.length; j++){
                jQuery('#ios').append(' <tr><th scope="row">'+temps[j].gid+'</th> <td>'+temps[j].nickname+'</td> <td>'+temps[j].description+'</td> <td>'+temps[j].price+'</td> <td><button  class="btn btn-primary nogoods" buttonid="'+temps[j].gid+'">无货</button></td> </tr>');
            }
        }, function errorCallback(response) {
        });

        var nogoodsId = 0,
            goodsParam = {
                'goodsid' : 0
            };
        jQuery(function(){
            jQuery('.nogoods').click(function () {
                console.log(this);
                jQuery(this).attr('buttonid');
                console.log(jQuery(this).attr('buttonid'));
                nogoodsId = parseInt(jQuery(this).attr('buttonid'));
                console.log(typeof (nogoodsId));
                goodsParam.goodsid = nogoodsId;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8198/greensStatus',
                    headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    data:goodsParam
                }).then(function successCallback(res) {
                }, function errorCallback(res) {
                });
            });

        });
    });

