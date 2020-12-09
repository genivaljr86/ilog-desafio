(function () {
    'use strict';

    angular.module('app')
        .factory('SweetAlert2', ['$rootScope', '$q',
            function ($rootScope, $q) {
                const emptyVariable = variable => !angular.isDefined(variable) || variable == '';

                return {
                    fire: params => {
                        if(emptyVariable(params.title) && emptyVariable(params.text) ){
                            console.log("Title or Text are obligatory fields");
                            return
                        }
                        return Swal.fire(params)
                    },
                    success: text => Swal.fire({
                            icon: 'success',
                            title: text,
                            showConfirmButton: true
                          }),
                    error: text => Swal.fire({
                            icon: 'error',
                            title: text,
                            showConfirmButton: true
                          }),
                    remove: text => Swal.fire({
                        icon: 'warning',
                        title: text,
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Sim, eu quero deletar',
                        cancelButtonText: 'Cancelar'
                      })
                    // fire: function (args1, args2, args3) {
                    //     var deferred = $q.defer();
                    //     $rootScope.$evalAsync(function () {
                    //         if (args1 != null && args2 == null && args3 == null) {
                    //             let opened = Swal.fire(args1);
                    //             deferred.resolve(opened);
                    //         }
                    //         else if (typeof args1 === 'string' && typeof args2 === 'string' && typeof args3 === 'string') {
                    //             let opened = Swal.fire(args1, args1, args3);
                    //             deferred.resolve(opened);
                    //         }
                    //     });
                    //     return deferred.promise;
                    // }
                };
            }]);
})();