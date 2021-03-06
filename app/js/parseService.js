'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp').
  value('version', '0.1')
  .service ('api', function($q, $rootScope,secrets) {
  Parse.initialize(secrets.parseKey, secrets.parseSecret);

// Generic functions
// -----------------

  this.saveObj = function (obj) {
    var promise = $q.defer();
    for (var fieldName in obj.attributes) {
      obj.set (fieldName, obj.attributes[fieldName]);
    }
    obj.save({}, {
      success: function (o) {
        console.log (o.attributes);
        promise.resolve(o);
        $rootScope.$digest();
      },
      error: function (model, error) {
        alert('Save Error ' + error.code + ", " + error.message);
        promise.reject(error);
        $rootScope.$digest();
      }
    });
    return promise.promise;
  };


  this.deleteObj = function (obj) {
    obj.destroy({
      success: function (o) {
      },
      error: function (model, error) {
        alert('delete Error ' + error.code + ", " + error.message);
      }
    });
  };


  function query(qry) {
    var promise = $q.defer();
    qry.find({
      success: function (results) {
        promise.resolve(results);
        $rootScope.$digest();
      },
      error: function (error) {
        promise.reject(error);
        $rootScope.$digest();
      }
    });
    return promise.promise;
  }

  // Order
  // -----

  var Order = Parse.Object.extend("Order");

  this.initOrder = function () {
    var order = new Order();
    return order;
  }

   this.queryOrders = function () {
    var orderQuery = new Parse.Query(Order);
    orderQuery.descending("eventDate");
    return query(orderQuery);
  };


  // Customer
  // --------

  var Customer = Parse.Object.extend("Customer");

  this.initCustomer = function () {
    var customer = new Customer();
    return customer;
  }

  this.queryCustomers = function () {
    var customerQuery = new Parse.Query(Customer);
    customerQuery.ascending("firstName");
    return query(customerQuery);
  };



  // EventType
  // -----------

  var EventType = Parse.Object.extend("EventType");

  this.queryEventTypes = function () {
    var eventTypesQuery = new Parse.Query(EventType);
    eventTypesQuery.ascending("tId");
    return query(eventTypesQuery);
  };

  // BidTextType
  // -----------

  var BidTextType = Parse.Object.extend("BidTextType");

  this.queryBidTextTypes = function () {
    var bidTextTypesQuery = new Parse.Query(BidTextType);
    bidTextTypesQuery.ascending("tId");
    return query(bidTextTypesQuery);
  };


});
