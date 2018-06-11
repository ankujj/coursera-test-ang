/* defining the IFFE below */
(function() {

	'use strict';

	angular.module('QuestionnaireApp',[])
	.controller('QuestionnaireController',QuestionnaireController)
	.service('QuestionnaireService',QuestionnaireService)
	.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});

	
	
	QuestionnaireController.$inject = ['QuestionnaireService'];

	function QuestionnaireController(QuestionnaireService){
		
		this.index=QuestionnaireService.getIndex();
		this.next = function(){

			this.index=QuestionnaireService.getNextIndex();
		}

		this.previous=function(){

			this.index=QuestionnaireService.getPreviousIndex();
		}

		//this.Dialogues = QuestionnaireService.getDialogues();

		this.getContent = function($fileContent){

				this.Dialogues=QuestionnaireService.getFileContentAsJSON($fileContent);
			}

	}


		function QuestionnaireService(){
			
			var index = 0;
			/*
			var Dialogues = [
						{Question:"Hello, we are planning to modernize our Client and Product Onboarding Systems" ,
								  					
						 Answer:"You have come to the right person and we have just the right framework to satisfy all your needs"},
						{Question:"Wow, thats great, whats the framework called",
						  Answer:"Its our CLM (Client LifeCycle Management) Framework "},
						{Question:"What does the framework provide",
						 Answer:"The framework has KYC capabilities which include KYC, CRS, AML etc. It allows you to design your"},
						 {Question:"Thank you for your time",
						 Answer:"You are most Welcome"}
			];
			*/
			this.getIndex = function(){
				return index; 
			}
			this.getNextIndex=function(){

				return ++index;

			}
			this.getPreviousIndex=function(){

				return --index;
			}

			this.getDialogues = function(){
				return Dialogues;
				
			}
			this.getFileContentAsJSON = function($fileContent){

				var allRows = $fileContent.split(/\r?\n|\r/);
				var Dialogues = [];
				for(var singleRow=0;singleRow<allRows.length;singleRow++){
					var rowCells = allRows[singleRow].split(',');
					console.log(rowCells[0]);
					if(rowCells[0] && rowCells[1] ){

						Dialogues.push({Question:rowCells[0],Answer:rowCells[1]});
					}
					
				}
				//console.log(Dialogues);
				return Dialogues;

			}

			
		}

		
	



	

	
})();