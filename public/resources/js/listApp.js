var app = angular.module('lista',[]);

app.controller('listc',function($scope,$http){
	$scope.response = {};
	$scope.display = true
	$scope.listG = function(){
		$http.put('/list',{'input1': $scope.input1 })
		.success(function(response){
			$scope.display = false;
			angular.copy(response,$scope.response);
		})
		.error(function (data, status, headers, config) {
			console.log('ERROR');
		        $scope.result = false;
		        $scope.modalstatustext = "Unable to pass input!";
            	})
}});
