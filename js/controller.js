/* Default Controller */
app.controller("ContactCtrl", function ContactCtrl($scope, $firebase, $location) {

  console.log("ContactCtrl--inside");
  $scope.contacts = $firebase(myDataRef);
  $location.path("/list");

});

app.controller("ContactListCtrl", function ContactListCtrl($scope) {
  console.log("ContactListCtrl---inside");
  $scope.mode = 'vignette';
});

app.controller("ContactSaveCtrl", function ContactEditCtrl($scope, $location) {

  console.log("inside save new contact controller");

  $scope.saveContact = function() {
    console.log("scope name : "+$scope.name);
    myDataRef.push({
     name: $scope.name, description: $scope.description, pickuplocation: $scope.pickuplocation, dropofflocation: $scope.dropofflocation, time: $scope.time, date: $scope.date
    });

    console.log("rendering path : list/details");
    $location.path("/list");
  };
});

app.controller("ContactEditCtrl", function ContactEditCtrl($scope, $routeParams, $location) {
  
  var newContact = false;
  if ($routeParams.contactId) {
    console.log("inside existing contact, ContactId : "+$routeParams.contactId);
    console.log("clicked contact details : "+$scope.contacts[$routeParams.contactId]);
    var res = JSON.stringify($scope.contacts[$routeParams.contactId]);
    console.log("values : "+res);
    var obj = JSON.parse(res);
    console.log("contact name : "+obj.name);
    $scope.contacts = $scope.contacts[$routeParams.contactId];
  }

  else {
    $scope.contact = {};
    newContact = true;
  }
  
  $scope.saveContact = function() {
    if (newContact) {

      console.log("inside save contact");
      var res = JSON.stringify($scope.contacts);
      console.log("values : "+res);
      var obj = JSON.parse(res);
      console.log("contact name : "+obj.name);
      //$scope.contacts
      //$scope.contacts.$add({name: $scope.name, description: $scope.description, pickuplocation: $scope.pickuplocation, dropofflocation: $scope.dropofflocation, time: $scope.time, date: $scope.date});
      myDataRef.push({
        name: obj.name//, description: $scope.description, pickuplocation: $scope.pickuplocation, dropofflocation: $scope.dropofflocation, time: $scope.time, date: $scope.date
      });

      $scope.name = "";
      $scope.description = "";
      $scope.pickuplocation = "";
      $scope.dropofflocation = "";
      $scope.time = "";
      $scope.date = "";

    }
    console.log("rendering path : list/details");
    $location.path("/list");
  };
});


app.controller("ContactDetailsCtrl", function ContactDetailsCtrl($scope,  $routeParams){

if ($routeParams.contactId) {
    console.log("ContactDetailsCtrl---inside existing contact if loop : "+$routeParams.contactId);
    $scope.contact = $scope.contacts[$routeParams.contactId];
  }

});

/*app.controller("OrderCtrl", function OrderListCtrl($scope) {
  $scope.mode = 'vignette';
});*/

app.controller("OrderEditCtrl", function OrderEditCtrl($scope, $routeParams, $location, bidFactory) {
  var newOrder = false;

  function init() {
    console.log("initializing currect contact id : "+$routeParams.contactId);
    curr_contactID = $routeParams.contactId;
    if ($routeParams.orderId) {
      $scope.order = bidFactory.getOrder($routeParams.orderId);
    } else {
      $scope.order = {};
      newOrder = true;
    }
  }

  init();

  $scope.saveOrder = function(contactId) {
    console.log("saving order to : "+curr_contactID);
    var name = $scope.bidderName;
    var amt = $scope.bidAmount;

    console.log("Order Name : "+name);
    console.log("Order amt : "+amt);

    if (newOrder) {
      
      //bidFactory.addOrder($scope.order);
      
      var loadRef = myDataRef.child(curr_contactID);
      var bidListRef = loadRef.child('bidList');
      bidListRef.push({name: $scope.bidderName, amount: $scope.bidAmount});

      console.log("quotes pushed to firebase");

      curr_contactID = '';
    }
    //$location.path("/qoutes");
    $location.path("/list");
  };
  
});


app.controller("ViewQuotesCtrl", function ViewQuotesCtrl($scope, $routeParams){
  
  console.log("rendering view quotes page");
  console.log("contact id : "+$routeParams.contactId);
  curr_contactID = $routeParams.contactId;

  $scope.bids = [];
  var bidListIdsArr = [];
  var bidListNameArr = [];
  var bidListAmountArr = [];

  //Query to get all children under clicked contact id
  var quotesRef = new Firebase("https://freightload1.firebaseio.com/"+curr_contactID+"/bidList/");
  
  quotesRef.on('child_added', function(snapshot){
    var id = snapshot.name();
    var dataObj = snapshot.val();
    bidListIdsArr.push(id);
    bidListNameArr.push(dataObj.name);
    bidListAmountArr.push(dataObj.amount);
  });

  var data = [];  

   for(var i=0; i<bidListNameArr.length; i++){
    console.log("Id @ "+i+" "+bidListIdsArr[i]);
    console.log("Name @ "+i+" "+bidListNameArr[i]);
    console.log("Amount @ "+i+" "+bidListAmountArr[i]);

    $scope.bids.push({ 
        "name" : bidListNameArr[i],
        "amount"  : bidListAmountArr[i]
    });
   }
});

app.controller("DemoCtrl", function DemoCtrl($scope, $routeParams){

    $scope.users = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
        ];     
});