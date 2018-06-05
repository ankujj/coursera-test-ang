/* defining the IFFE below */
(function() {

	'use strict';

	angular.module('ShoppingListApp',[])
	.controller('ShoppingListController',ShoppingListController)
	.controller('ShoppedListController',ShoppedListController)
	.provider('ShoppingListService',ShoppingListServiceProvider)
	.provider('ShoppedListService',ShoppingListServiceProvider)
	.config(ShoppingListConfig);

	var itemList = [
					{name: "Soda",
					quantity: "10"
					},
					{name: "Apples",
					quantity: "12"
					},
					{name: "Mangoes",
					quantity: "6"
					},
					{name:"Maggi Noodles",
					quantity: "10"
					},
					{name:"popcorn",
					quantity:"2"
					},
					{name:"Body wash",
					quantity:"1"
					}
	];
	

	ShoppingListConfig.$inject = ['ShoppingListServiceProvider'];

	function ShoppingListConfig(ShoppingListServiceProvider){
		
		ShoppingListServiceProvider.defaults.itemList = itemList;
	}
	
		

	ShoppingListController.$inject = ['ShoppingListService','ShoppedListService'];

	function ShoppingListController(ShoppingListService,ShoppedListService){

		var shoppingList = this;

		shoppingList.items = ShoppingListService.getItems();
		shoppingList.buyCount = ShoppingListService.getBuyCount();

		shoppingList.buyItem = function(itemIndex){
			
			shoppingList.buyCount=ShoppingListService.incrementer(shoppingList.buyCount);
			ShoppedListService.addItem(ShoppingListService.getItemAtIndex(itemIndex));
		};

		shoppingList.add = function(){

			ShoppingListService.addItem({name:shoppingList.newItem,
										 quantity:shoppingList.newQuantity
										}
									   );
		}

		
	}

	ShoppedListController.$inject = ['ShoppedListService'];
	
	function ShoppedListController(ShoppedListService){
		
		var shoppedList = this;
		shoppedList.items = ShoppedListService.getItems();
		
	}

	function ShoppingListServiceProvider(){

		this.defaults = {
			itemList:[]
		};		

		this.$get = function(){

			return new ShoppingListService(this.defaults.itemList);
		};		

	}

	function ShoppingListService(itemList){

		var items = itemList || [];
		var buyCount = 0;
		
		this.addItem = function(item){
			items.push(item);
		};

		this.getItemAtIndex = function(itemIndex){
			return items[itemIndex];
		};

		this.removeItem = function(itemIndex){
			items.splice(itemIndex,1);
		};

		this.getItems = function(){

			return items;
		};

		this.incrementer = function(value){
			value+=1;
			return value;
		};
		
		this.getBuyCount = function(){
			return buyCount;
		}
		
	}

	

	
})();