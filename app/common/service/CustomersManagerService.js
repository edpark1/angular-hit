angular.module('homesInternalToolsApp.salestool').factory('customersManager', ['$http', '$q', 'Customer', function($http, $q, Customer) {  
    var customersManager = {
        _pool: {},
        _retrieveInstance: function(customerId, customerData) {
            var instance = this._pool[customerId];

            if (instance) {
                instance.setData(customerData);
            } else {
                instance = new Customer(customerData);
                this._pool[customerId] = instance;
            }

            return instance;
        },
        _search: function(customerId) {
            return this._pool[customerId];
        },
        _load: function(customerId, deferred) {
            var scope = this;

            $http.get('http://jsonplaceholder.typicode.com/users/' + customerId)
                .success(function(customerData) {
                    var customer = scope._retrieveInstance(customerData.id, customerData);
                    deferred.resolve(customer);
                })
                .error(function() {
                    deferred.reject();
                });
        },
        /* Public Methods */
        /* Use this function in order to get a customer instance by it's id */
        getCustomer: function(customerId) {
            var deferred = $q.defer();
            var customer = this._search(customerId);
            if (customer) {
                deferred.resolve(customer);
            } else {
                this._load(customerId, deferred);
            }
            return deferred.promise;
        },
        /* Use this function in order to get instances of all the customers */
        loadAllCustomers: function() {
            var deferred = $q.defer();
            var scope = this;
            $http.get('http://jsonplaceholder.typicode.com/users')
                .success(function(customersArray) {
                    var customers = [];
                    customersArray.forEach(function(customerData) {
                        var customer = scope._retrieveInstance(customerData.id, customerData);
                        customers.push(customer);
                    });

                    deferred.resolve(customers);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        },
        /*  This function is useful when we got somehow the customer data and we wish to store it or update the pool and get a customer instance in return */
        setCustomer: function(customerData) {
            var scope = this;
            var customer = this._search(customerData.id);
            if (customer) {
                customer.setData(customerData);
            } else {
                customer = scope._retrieveInstance(customerData);
            }
            return customer;
        },

    };
    return customersManager;
}]);