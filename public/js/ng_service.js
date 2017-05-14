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