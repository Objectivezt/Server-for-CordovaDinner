/**
 * Created by Jack on 2017/5/11.
 */
angular.module('ServiceModule',[])
    .factory('localstorage',['$window',function ($window) {
        return{
            set:function (key,value) {
                $window.localStorage[key] = value;
            },
            get:function (key,defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject:function(key, value){
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject:function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            removeObject:function(key){
                return $window.localStorage.removeItem(key);
            },
            clearLocalStorage:function(){
                return $window.localStorage.clear();
            }
        }
    }])//创建localStorage模型
    .factory('dateChange',function () {
        return{
            formatTime : function(timestamp) {
                // timestamp = parseInt(timestamp / 1000);
                console.log(timestamp);
                timestamp = parseInt(timestamp)
                var date  = new Date(timestamp);
                var times = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                return times;
            }
        }
    }) //创建时间戳转化
    .factory('host',function () {
        return{
            localhost : 'http://localhost:8198'
        }
    });//创建本地连接
