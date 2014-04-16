var app = angular.module('myApp', [
  'ngRoute',
  "firebase",
  'ngTable'
  ]);

//var myDataRef = new Firebase('https://truckdat1.firebaseio.com');
var myDataRef = new Firebase('https://freightload1.firebaseio.com/');
//var myQuotesRef = new Firebase('https://qoutes.firebaseio.com/');

var auth = new FirebaseSimpleLogin(myDataRef, function(error, user){

});

/* GLOBAL VARIABLES */
var curr_contactID = '';

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/save_new', {
      templateUrl: 'partial/partial_saveContact.html',
      controller: "ContactSaveCtrl"
    });

    $routeProvider.when('/edit', {
      templateUrl: 'partial/partial_edit.html',
      controller: "ContactEditCtrl"
    });

    $routeProvider.when('/edit/:contactId', {
      templateUrl: 'partial/partial_edit.html',
      controller: "ContactEditCtrl"
    });

    $routeProvider.when('/list', {
      templateUrl: 'partial/partial_list.html',
      controller: "ContactListCtrl"
    });

    $routeProvider.when('/details/:contactId', {
      templateUrl: 'partial/partial_details.html',
      controller: "ContactDetailsCtrl"
    });
  
    /*$routeProvider.when('/order/:orderId', {
      templateUrl: 'partial/partial_order.html',
      controller: "OrderEditCtrl"
    });*/

    
    $routeProvider.when('/order/:contactId', {
      templateUrl: 'partial/partial_order.html',
      controller: "OrderEditCtrl"
    });

    $routeProvider.when('/quotes/:contactId', {
      templateUrl: 'partial/partial_quotes.html',
      controller: "ViewQuotesCtrl"
    });

    $routeProvider.when('/table/', {
      templateUrl: 'partial/partial_table.html',
      controller: "DemoCtrl"
    });

    $routeProvider.when('/signup/', {
      templateUrl: 'partial/partial_signup.html',
      controller: "CreateUserCtrl"
    });

    $routeProvider.when('/login/', {
      templateUrl: 'partial/partial_login.html',
      controller: "LoginCtrl"
    });

    $routeProvider.otherwise({
      redirectTo: '/list'
    });
  }
]);

app.directive('contactWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'template_contact.html',
    scope: {
      contact: '='
    }
  };
});

app.directive('orderWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'template_order.html',
    scope: {
      order: '='
    }
  };
});


app.factory("bidFactory", function() {
  var factory = {};

  factory.orders = [];

  factory.getOrders = function() {
    return factory.orders;
  };

  factory.getOrder = function(orderId) {
    for (var i = 0; i < factory.orders.length; i++) {
      if (factory.order[i].id === orderId) {
        return factory.order[i];
      }
    }
  };

  factory.addOrder = function(order) {
    factory.orders.push(order);
  }

  return factory;
});

/*$scope.bidQuote = function(contactId) {

          console.log("contact Id : "+contactId);
}*/
