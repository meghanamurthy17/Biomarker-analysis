var app = angular.module('products', []);

app.controller('productCTRL', function ($scope, $http) {
    
    $scope.loader = {
        loading: false
    };
	$scope.display = true
	
	$scope.predict = function () {
		$scope.loader.loading = true;
        $scope.response = {};
        $http.put('/predict', {
            'input1' : $scope.input1,
			'input2' : $scope.input2,
			'input3' : $scope.input3,
			'input4' : $scope.input4,
			'input5' : $scope.input5,
			'input6' : $scope.input6
        })
            .success(function (response) {
				
				$scope.result = false;
				$scope.display = false;
                angular.copy(response, $scope.response);
            })
            .error(function (data, status, headers, config) {
		console.log('ERROR');
                $scope.result = false;
                $scope.modalstatustext = "Unable to pass input!";
            });
		
	};

    //Read all entries
    $scope.getAllreg = function () {
        
        $scope.loader.loading = true;
        
        $http.get("biomarkers")
            .success(function (response) {
                if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "There are currently no added accounts.";
					$scope.loader.loading = false;
				} else {
					$scope.user=response.user;
					$scope.names = response.owner;
					$scope.forsale=response.status;
					//Turn off spinner
					$scope.loader.loading = false;
					$scope.statustext = "";
				}
            })
            .error(function (data, status, headers, config) {
                $scope.loader.loading = false;
                $scope.statustext = "There was an error fetching data, please check database connection.";
            });
    };

});
