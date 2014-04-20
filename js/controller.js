var auth = null;

/* Default Controller */
app.controller("ContactCtrl", function ContactCtrl($scope, $firebase, $location) {

  console.log("ContactCtrl--inside");
  $scope.contacts = $firebase(myDataRef);
  //$location.path("/list");
  $location.path("/login");
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
    $scope.contact = $scope.contacts[$routeParams.contactId];
    console.log("inside existing contact, ContactId : "+$routeParams.contactId);
    console.log("clicked contact details : "+$scope.contacts[$routeParams.contactId]);
    
    var res = JSON.stringify($scope.contacts[$routeParams.contactId]);
    console.log("values : "+res);
    var obj = JSON.parse(res);
    console.log("contact name : "+obj.name);
    //$scope.contacts = $scope.contacts[$routeParams.contactId];

    var updateContactRef = new Firebase("https://freightload1.firebaseio.com/"+curr_contactID+"/");
  }

  else {
    $scope.contact = {};
    newContact = true;
  }

  var onComplete = function(error) {
        if (error) alert('Synchronization failed.');
        else alert('Synchronization succeeded.');
      };

  $scope.updateContact = function() {

      console.log("inside update contact");
      console.log("Scope : "+$scope);
      
      var re = JSON.stringify($scope.contacts);
      console.log("values : "+re);
      var obj = JSON.parse(re);
      console.log("Updated contact name : "+re.name);

      console.log("scope name : "+$scope.name);
      console.log("scope description : "+$scope.description);
      console.log("scope pickuplocation : "+$scope.pickuplocation);
      console.log("scope dropofflocation : "+$scope.dropofflocation);
      console.log("scope time : "+$scope.time);
      console.log("scope date : "+$scope.date);

      var res = JSON.stringify($scope.contacts);
      console.log("values : "+res);
      var obj = JSON.parse(res);
      console.log("contact name : "+obj.name);
      
      updateContactRef.update({
        name: $scope.name, description: $scope.description, pickuplocation: $scope.pickuplocation, dropofflocation: $scope.dropofflocation, time: $scope.time, date: $scope.date
      }, onComplete);

      $scope.name = "";
      $scope.description = "";
      $scope.pickuplocation = "";
      $scope.dropofflocation = "";
      $scope.time = "";
      $scope.date = "";

    console.log("rendering path : list/details");
    $location.path("/list");
  };
});


app.controller("ContactDetailsCtrl", function ContactDetailsCtrl($scope,  $routeParams){

if ($routeParams.contactId) {
    console.log("ContactDetailsCtrl---inside existing contact if loop : "+$routeParams.contactId);
    $scope.contact = $scope.contacts[$routeParams.contactId];


    //Bid List onto the details page.
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

app.controller("CreateUserCtrl", function CreateUserCtrl($scope, $location){

  console.log("inside Create User Controller..");

  $scope.createUser = function() {
    var email = $scope.signup.email;
    var password = $scope.signup.password;

    console.log("Email : "+email);
    console.log("Password : "+password);

    if(email=="" || password==""){

      alert("Username/Password Cannot be Empty!");
      console.log("empty");
    }

    else{
     auth.createUser(email, password, function(error, user) {
        if (!error) {
          //console.log('User Id: ' + user.uid + ', Email: ' + user.email);
          alert("Account Created Successfully, Please login to continue..");
          $location.path("/login");
          $scope.$apply();        
        }

        else{
          alert("An error has occurred, details - "+error);
        }

      });
    }
  }

});

app.controller("LoginCtrl", function LoginCtrl($scope, $location){

  console.log("inside Login Controller..");

  //auth callback function
  auth = new FirebaseSimpleLogin(myDataRef, function AuthCallback(error, user){

      console.log("inside scope auth");
          
       if (error) {
        // an error occurred while attempting login
          alert(error);
          console.log(JSON.stringify(error));
       } 
       else if(user){ 
       // user authenticated with Firebase
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);

      $("#btn_delivery").removeClass("ng-hide");
      $("#btn_delivery").addClass("ng-show");
       
      $("#btn_home").removeClass("ng-hide");
      $("#btn_home").addClass("ng-show");

      $("#btn_logout").removeClass("ng-hide");
      $("#btn_logout").addClass("ng-show");

      $("#btn_login").removeClass("ng-show");
      $("#btn_login").addClass("ng-hide");

      $("#btn_signup").removeClass("ng-show");
      $("#btn_signup").addClass("ng-hide");

      $location.path("/list");
      $scope.$apply();     

      } 
      else {
            console.log("You are logged out");  // user is logged out
      }

  });


  $scope.authenticate = function() {
    var email = $scope.login.email;
    var password = $scope.login.password;
    var rememberme = $scope.login.rememberMe;

    if(email=="" || password==""){
      alert("Username/Password Cannot be Empty!");
      console.log("empty");
    }
    else{
      //console.log("Email : "+email);
      //console.log("Password : "+password);
      //console.log("Remember Me : "+rememberme);

      if(rememberme==true){
        auth.login('password', {
          email: email,
          password: password,
          rememberMe: true
        });
      }
      else{
        //login for normal provider
        auth.login('password', {
          email: email,
          password: password
        });
      }
    }
  }

});

app.controller("LogoutCtrl", function LogoutCtrl($scope, $location){

  console.log("Logging out..");
  auth.logout();

  $("#btn_delivery").removeClass("ng-show");
  $("#btn_delivery").addClass("ng-hide");
       
  $("#btn_home").removeClass("ng-show");
  $("#btn_home").addClass("ng-hide");

  $("#btn_logout").removeClass("ng-show");
  $("#btn_logout").addClass("ng-hide");

  $("#btn_login").removeClass("ng-hide");
  $("#btn_login").addClass("ng-show");

  $("#btn_signup").removeClass("ng-hide");
  $("#btn_signup").addClass("ng-show");

  $location.path("/login");
});
