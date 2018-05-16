/* defining the IFFE below */
(function() {

	'use strict';

	var StringUtilMod = angular.module('StringUtil',[]); // name of the app , list of dependencies

	

	StringUtilMod.controller('StringUtilController',StringUtilController);

	StringUtilController.$inject = ['$scope'];
	
	function StringUtilController($scope){

	$scope.itemlist="";
	$scope.outMessage="";
	$scope.messageClass="";
	$scope.CheckIfTooMuch = function(){

		if($scope.itemlist.length === 0){
			$scope.outMessage = "Please enter data first";
			$scope.messageClass="red";
		}else{
			var arrayOfStrings =  $scope.itemlist.split(",").filter(function(x){return x.length>0});
			if(arrayOfStrings.length >0 ){

				if(arrayOfStrings.length>3){
					$scope.outMessage = "Too Much!";
					$scope.messageClass="red";
				}else{
					$scope.outMessage = "Enjoy!";
					$scope.messageClass="green";
				}
			}else{

				$scope.outMessage = "Please enter valid data first";
				$scope.messageClass="red";
			}


		}

		

	};

	$scope.clearMessage = function(){

		$scope.outMessage="";
		$scope.messageClass="";

	};	

	}

	
	
})();