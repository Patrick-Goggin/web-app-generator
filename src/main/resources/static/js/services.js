angular.module('app.services',[])
    .factory('$global',['$http', '$rootScope', function($http, $rootScope){
        return {
            getFullProject: function(){
            if(!$rootScope.currentProject){return null}
            if($rootScope.currentProject){
                                var id = $rootScope.currentProject.id;
                                $http.get("/assemble/"+id)
                                    .then(function(response){
                                    $rootScope.currentProject=response.data;
                                    //$rootScope.entities = $rootScope.currentProject.entities;
                                    return $rootScope.currentProject;
                                });
                            }
            },

            // getProjects
            getProjects : function(){
                var li;
                $http.get('/projects')
                    .then(function (response) {
                    if(response.data.length > 0){
                        $rootScope.projects = response.data;
                        return $rootScope.projects;
                    }
                    if(response.data.length < 1){
                        $rootScope.projects = null;
                        return $rootScope.projects;
                    }
                });
            },

            // setProjects
            setProjects : function(data){
                $rootScope.projects = data;
                return $rootScope.projects;
            },

            // getCurrentProject
            getCurrentProject : function(){
                return $rootScope.currentProject;
            },

            // setCurrentProject
            setCurrentProject : function(data){
                $rootScope.currentProject = data;
                return $rootScope.currentProject;
            },

            // getCurrentEntity
            getCurrentEntity : function(){
                return $rootScope.currentEntity;
            },

            // setCurrentEntity
            setCurrentEntity : function(data){
                $rootScope.currentEntity = data;
                return $rootScope.currentEntity;
            },

            // getEntities
            getEntities: function(){
                if($rootScope.currentProject){
                    var id = $rootScope.currentProject.id;
                    $http.get('/entities/'+id)
                        .then(function (response) {
                        if(response.data.length > 0){
                            $rootScope.entities = response.data;
                            return $rootScope.entities;
                        }
                        if(response.data.length < 1){
                            $rootScope.entities = [];
                            return $rootScope.entities;
                        }
                    });
                }
            },

            // setEntities
            setEntities: function(data){
                $rootScope.entities = data;
                return $rootScope.entities;
            },

            // getNewEntities
            getNewEntities: function(){
                if($rootScope.newEntities){
                    return $rootScope.newEntities;
                }
                else
                    return [];
            },

            // setNewEntities
            setNewEntities : function(data){
                $rootScope.newEntities = data;
                return $rootScope.newEntities;
            },

            // getProperties
            getProperties: function(){
                var id = $rootScope.currentEntity.id;
                $http.get('/properties/'+id).then(function(response){
//                    if(response.data.length>0){
                        $rootScope.properties = response.data;
                        return $rootScope.properties;
//                    }
//                    if(response.data.length < 1){
//                        $rootScope.properties = null;
//                        return $rootScope.properties;
//                    }
                });
            },

            // setProperties
            setProperties : function(data){
                $rootScope.properties = data;
                return $rootScope.properties;
            },

            // getNewProperties
            getNewProperties: function(){
                if($rootScope.newProperties){
                    return $rootScope.newProperties;}
                else
                    $rootScope.newProperties = [];
                return $rootScope.newProperties;
            },

            // setNewProperties
            setNewProperties : function(data){
                $rootScope.newProperties = data;
                return $rootScope.newProperties;
            },

            // getCurrentProperty
            getCurrentProperty: function(){
                return $rootScope.currentProperty;
            },

            // setCurrentProperty
            setCurrentProperty : function(data){
                $rootScope.currentProperty = data;
                return $rootScope.currentProperty;
            },

            // getEntity
            getEntity: function(){
                return $rootScope.entity;
            },

            // setEntity
            setEntity : function(data){
                $rootScope.entity = data;
                return $rootScope.entity;
            },

            // getProject
                        getProject: function(){
                            return $rootScope.project;
                        },

                        // setProject
                        setProject : function(data){
                            $rootScope.project = data;
                            return $rootScope.project;
                        },

            // getSummary
            getSummary: function(){
                return $rootScope.summary;
            },

            // setSummary
            setSummary : function(data){
                $rootScope.summary = data;
                return $rootScope.summary;
            }

        };
    }]);
