angular.module('homesInternalToolsApp.salestool').factory('Customer', ['$http', function($http) {  
    function Customer(customerData) {
        if (customerData) {
            this.setData(customerData);
        }
        // Some other initializations related to customer
    };
    Customer.prototype = {
        setData: function(customerData) {
            angular.extend(this, customerData);
        },
        delete: function() {
            $http.delete('ourserver/customers/' + customerId);
        },
        update: function() {
            $http.put('ourserver/customers/' + customerId, this);
        },
        getImageUrl: function(width, height) {
            return 'our/image/service/' + this.customer.id + '/width/height';
        },
        isAvailable: function() {
            if (!this.customer.stores || this.customer.stores.length === 0) {
                return false;
            }
            return this.customer.stores.some(function(store) {
                return store.quantity > 0;
            });
        }
    };
    return Customer;
}]);