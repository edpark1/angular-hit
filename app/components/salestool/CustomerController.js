angular.module('homesInternalToolsApp.salestool') 
    .controller('EditableCustomerController', ['$scope', 'customersManager', function($scope, customersManager) {
        customersManager.getCustomer(1).then(function(customer) {
            $scope.customer = customer
        });
    }])
    .controller('CustomersListController', ['$scope', 'customersManager', function($scope, customersManager) {
        customersManager.loadAllCustomers().then(function(customers) {
            $scope.customers = customers
        });
    }]);