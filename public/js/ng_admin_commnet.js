/**
 * Created by Jack on 2017/5/11.
 */
angular.module('comment',['ServiceModule'])
    .controller('commentAdminCtrl',function($scope,$http,localstorage,host,dateChange){
        $scope.shopPlace = function (num) {
            var tempplace = '';
            switch (num)
            {
                case 1:
                    tempplace="南区第一食堂";
                    break;
                case 2:
                    tempplace="南区第二食堂";
                    break;
                case 3:
                    tempplace="南区第三食堂";
                    break;
                case 4:
                    tempplace="南区第四食堂";
                    break;
                case 5:
                    tempplace="北区第一食堂";
                    break;
                case 6:
                    tempplace="北区第二食堂";
                    break;
                case 7:
                    tempplace="北区第三食堂";
                    break;
                case 8:
                    tempplace="北区第四食堂";
                    break;
            }
            return tempplace
        };
        $scope.commentData = [];
        $scope.usernamessss = 'admin';
        var param = {
            'classid' :localstorage.getObject('ecjtuA_auth').classid,
            'permission':localstorage.getObject('ecjtuA_auth').permission
        };
        console.log(localstorage.getObject('ecjtuA_auth').classid);
        $http({
            method: 'POST',
            url: host.localhost+'/commentAdmin',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data:param
        }).then(function successCallback(res) {
            var tempCommentData = {};
            console.log(res);
            tempCommentData = res.data;
            for(var i = 0;i<tempCommentData.length;i++){
                $scope.commentData.push({
                    commentImg:tempCommentData[i].images,
                    commentStar:tempCommentData[i].cgrade,
                    commentNickname:tempCommentData[i].g_nickname,
                    commentShopPlace:$scope.shopPlace(tempCommentData[i].sf_id),
                    commentText:tempCommentData[i].ccomment,
                    commentTime:dateChange.formatTime(tempCommentData[i].ctime)
                })
            }
            $scope.commentFn = $scope.commentData;
            console.log($scope);
            console.log($scope.commentFn);
            temps = $scope.commentFn;
            for(var j = 0; j < temps.length; j++){
                jQuery('#ios').append('<tr><th>'+temps[j].commentNickname+'</th> <td>'+temps[j].commentTime+'</td> <td>'+temps[j].commentStar+'/5</td> <td>'+temps[j].commentText+'</td> </tr>');
            }

        }, function errorCallback(response) {

        });
        console.log($scope.commentFn);
    });
