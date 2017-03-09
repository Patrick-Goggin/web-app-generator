var Controllers = angular.module('Controllers', ['app.services']);

Controllers.controller('ProjectController', ['$scope', '$http', '$rootScope','$global', function ($scope, $http, $rootScope, $global) {
//    $global.setProperties('');
//    $global.setEntities('');
$scope.showServices = false;
  $scope.toggleServices = function() {
       $scope.showServices = $scope.showServices === false ? true : false;
  }

$rootScope.currentProject = '';
$rootScope.showProjects = true;
$global.getProjects();
    $scope.preview = function(){
        if($rootScope.currentProject){
            var id = $global.getCurrentProject().id;
            $http.get("/assemble/"+id)
                .then(function(response){
                $global.setSummary(response.data);
            });
        }
    }

$scope.getProjects = function(){
    $global.getProjects();
//    $global.setCurrentEntity(null);
    $global.setCurrentProject(null);
    $global.setEntities(null);
    $rootScope.showProjects = true;
}

    $scope.showDetails = false;

    $scope.newProject = {
        name: '',
    };

    $scope.getBreadCrumbs = function(){
        var s = '';
        if($global.getCurrentProject()){
            s += $global.getCurrentProject().name
            if($global.getCurrentEntity()){
                s += $global.getCurrentProject().name + '>' +$global.getCurrentEntity().name;
                if($global.getCurrentProperty()){
                    s += $global.getCurrentProject().name + '>' +$global.getCurrentEntity().name+'>'+$global.getCurrentProperty().name;
                }
            }
        }
        return s;
    }



    $scope.create = function(newProject){
        $global.setCurrentProject(null);
        var toPost = {
            name: newProject.name,
            basePackage: newProject.basePackage
        };
        $http.post("/project", toPost)
            .then(function(response){
            $global.getProjects();
            //$global.setCurrentProject(response.data);
            $global.setEntities([]);
        });
    }


    $scope.edit = function(project){
            $global.setProject(project);
        }

        $scope.update = function(project){
            var projectId = project.projectId;
            var toPatch = {
                id: project.id,
                name: project.name,
                basePackage: project.basePackage
            };
            $http.patch("/project", toPatch)
                .then(function(response){
                if (response.data == null) {
                    $scope.project = null;
                }
                $global.getProjects();
                $scope.newProjects = [];
            });
        }

    $scope.remove = function(oneProject){
        var id = oneProject.id;
        $http.delete('/project/'+id)
            .then(function (response) {
            $global.setProjects(response.data);
            $scope.oneProject = null;
            $global.getProjects();
            $scope.toggleDetails();
        });
    }

    function resetForm(){
        $scope.newProject = {
            name: '',
        };
    }

    $scope.set_color = function (oneProject) {
        var projects = $scope.projects;
        var c = '';
        for(i=0; i < projects.length; i++){
            var project = projects[i];
            if(oneProject.id == project.id){
                if(4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 !== 0){
                    c = 'info';
                    $scope.projects[i].c = c;
                    return c;
                }
                if(i == 0){
                    c = 'info';
                    $scope.projects[i].c = c;
                    return c;
                }
                if(i%5 == 0){
                    c = 'info';
                    $scope.projects[i].c = c;
                    return c;
                }
                if(i%4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 == 0){
                    c = 'success';
                    $scope.projects[i].c = c;
                    return c;
                }
                if(i%4 !== 0 && i%2 == 0){
                    c = 'danger';
                    $scope.projects[i].c = c;
                    return c;
                }
                if(i%3 == 0){
                    c = 'warning';
                    $scope.projects[i].c = c;
                    return c;
                }
                if(i%4 == 0 ){
                    c = 'active';
                    $scope.projects[i].c = c;
                    return c;
                }
            }
        }
    }

    $scope.button_color = function (oneProject) {
        var projects = $scope.projects;
        for(i=0; i < projects.length; i++){
            var project = projects[i];
            if(oneProject.id == project.id){
                if(4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 !== 0){
                    return 'btn-info';
                }
                if(i == 0){
                    return 'btn-info';
                }
                if(i%5 == 0){
                    return 'btn-info';
                }
                if(i%4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 == 0){
                    return 'btn-success';
                }
                if(i%4 !== 0 && i%2 == 0){
                    return 'btn-danger';
                }
                if(i%3 == 0){
                    return 'btn-warning';
                }
                if(i%4 == 0 ){
                    return 'btn-active';
                }
            }
        }
    }

    $scope.selectedIndex = -1;

    $scope.itemClicked = function ($index, oneProject) {
        $global.setCurrentProject(oneProject);
        if($rootScope.currentProject){
                    var id = $global.getCurrentProject().id;
                    $http.get("/assemble/"+id)
                        .then(function(response){
                        $global.setCurrentProject(response.data);
                    });
                }
        $global.getEntities();
        $scope.selectedIndex = $index;
    }

    //    $scope.updateProject = function(themeDetails){
    //        var toPatch = {
    //            id: $scope.themeToEdit.id,
    //            name: $scope.themeToEdit.name,
    //            description: $scope.themeToEdit.description,
    //            cdn: $scope.themeToEdit.cdn,
    //            price: $scope.themeToEdit.price,
    //            provider: $scope.themeToEdit.provider,
    //            website: $scope.themeToEdit.website,
    //        };
    //
    //        $http.patch("/project", toPatch)
    //            .then(function(response){
    //            $scope.theme = null;
    //            if (response.data == null) {
    //                $scope.theme = null;
    //            }
    //              $global.setDetails(response.data);
    //            var li = $global.getList();
    //            $global.setList(li);
    //        });
    //    }

    $scope.details = function(oneProject){
//        $scope.showDetails = true;
//        $global.setCurrentProperty(null);
        $rootScope.showProjects = false;
        $global.setCurrentProject(oneProject);
        $global.setProjects(null);
        $global.setProperties(null);
        $scope.oneProject = oneProject;
//        $global.getEntities();
        if($rootScope.currentProject){
                            var id = $global.getCurrentProject().id;
                            $http.get("/assemble/"+id)
                                .then(function(response){
                                $global.setCurrentProject(response.data);
                            });
                        }
        $global.setProperties(null);
    }

    $scope.toggleDetails = function(){
        $scope.showDetails = !$scope.showDetails;
    }

}]);

Controllers.controller('EntityController', ['$scope', '$http', '$rootScope','$global', function ($scope, $http, $rootScope, $global) {

    console.log('entityController');

    $scope.newEntity = {
        name: '',
        projectId: ''
    };
//    $scope.properties = null;
    $scope.newEntities = null;
    $scope.addEntity = function(){
        var id = $global.getCurrentProject().id;
        if(!$global.getNewEntities()){
            $scope.newEntities = [{
                name: '',
                projectId: id
            }];
            $global.setNewEntities(newEntities);
            $scope.newEntities = $global.getNewEntities();
        }
//        $scope.getEntities = function(){
//            $global.getEntities();
//            $global.setProperties(null);
//        }

        var entity = {
            name: '',
            projectId: id
        };

        var newEntities = $global.getNewEntities();
        newEntities.push(entity);
        $global.setNewEntities(newEntities);
        $scope.newEntities = $global.getNewEntities();
    }

    $scope.createMultiple = function(newEntities){
        var id = $global.getCurrentProject().id;
        var toPost = $scope.newEntities;
        $http.post("/entities", toPost)
            .then(function(response){
            $global.getEntities();
            $global.setNewEntities([])
            $scope.newEntities = null;
            $global.getFullProject();
        });
    }


    $scope.create = function(newEntity){
        var projectId = $global.getCurrentProject().id;
        var toPost = {
            name: newEntity.name,
            projectId: projectId
        };
        $http.post("/entity", toPost)
            .then(function(response){
            $global.getEntities();
        });
    }

    $scope.edit = function(entity){
        $global.setEntity(entity);
    }

    $scope.update = function(entity){
        var projectId = entity.projectId;
        var toPatch = {
            id: entity.id,
            name: $scope.entity.name,
            projectId: projectId,
        };
        $http.patch("/entity", toPatch)
            .then(function(response){
            //$scope.entity = null;
            if (response.data == null) {
                $scope.entity = null;
            }
            $global.getEntities();
            $scope.newEntities = [];
            $global.getFullProject();
        });
    }

    $scope.remove = function(entity){
        var id = entity.id;
        $http.delete('/entity/'+id)
            .then(function (response) {
            $global.getFullProject();
            $global.setEntities(response.data);
            $scope.entity = null;
            $global.getEntities();
            $scope.toggleDetails();
        });
    }

    function resetForm(){
        $scope.newEntity = {
            name: '',
        };
    }

    //    $scope.set_color = function (entity) {
    //        var entities = $scope.entities;
    //        var c = '';
    //        for(i=0; i < entities.length; i++){
    //            var entity = entities[i];
    //            if(entity.id == entity.id){
    //                if(4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 !== 0){
    //                    c = 'info';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //                if(i == 0){
    //                    c = 'info';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //                if(i%5 == 0){
    //                    c = 'info';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //                if(i%4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 == 0){
    //                    c = 'success';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //                if(i%4 !== 0 && i%2 == 0){
    //                    c = 'danger';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //                if(i%3 == 0){
    //                    c = 'warning';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //                if(i%4 == 0 ){
    //                    c = 'active';
    //                    $scope.entities[i].c = c;
    //                    return c;
    //                }
    //            }
    //        }
    //    }
    //
    //    $scope.button_color = function (entity) {
    //        var entities = $scope.entities;
    //        for(i=0; i < entities.length; i++){
    //            var entity = entities[i];
    //            if(entity.id == entity.id){
    //                if(4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 !== 0){
    //                    return 'btn-info';
    //                }
    //                if(i == 0){
    //                    return 'btn-info';
    //                }
    //                if(i%5 == 0){
    //                    return 'btn-info';
    //                }
    //                if(i%4 !== 0 && i%3 !== 0 && i%2 !== 0 && i%1 == 0){
    //                    return 'btn-success';
    //                }
    //                if(i%4 !== 0 && i%2 == 0){
    //                    return 'btn-danger';
    //                }
    //                if(i%3 == 0){
    //                    return 'btn-warning';
    //                }
    //                if(i%4 == 0 ){
    //                    return 'btn-active';
    //                }
    //            }
    //        }
    //    }

    $scope.selectedIndex = -1;

    $scope.itemClicked = function ($index, entity) {
    $global.setCurrentEntity(entity);
//    $global.getProperties();
        $scope.selectedIndex = $index;
    }

//
//    $scope.itemClicked = function ($index, oneProject) {
//            $global.setCurrentProject(oneProject);
//            $global.getEntities();
//            $scope.selectedIndex = $index;
//        }
    $scope.details = function(entity){
        $global.setCurrentEntity(entity);
        $global.getProperties();
//        $global.getProperties(entity);
        $scope.showDetails = true;
        $scope.entity = entity;
    }

    $scope.toggleDetails = function(){
        $scope.showDetails = !$scope.showDetails;
    }

}]);

Controllers.controller('PropertyController', ['$scope', '$http', '$rootScope','$global', function ($scope, $http, $rootScope, $global) {
//    $scope.properties = null;
    $scope.tableTitle = function(){
        if($scope.currentEntity){
            $scope.tableTitle = 'Properties of '+$global.getCurrentEntity().name;
            return 'Properties of '+$global.getCurrentEntity().name;
        }

        else
            return '';
    }

    $scope.newProperties = null;
    $scope.addProperty = function(){
        var id = $global.getCurrentEntity().id;
        var projectId = $global.getCurrentProject().id;
        if(!$global.getNewProperties()){
            $scope.newProperties = [];
            $global.setNewProperties(newProperties);
            $scope.newProperties = $global.getNewProperties();
        }

        var property = {
            name: '',
            type: '',
            entityId: id,
            projectId: projectId

        };

        var newProperties = $global.getNewProperties();
        newProperties.push(property);
        $global.setNewProperties(newProperties);
        $scope.newProperties = $global.getNewProperties();
    }

    $scope.createMultiple = function(newProperties){
        var id = $global.getCurrentEntity().id;
        var projectId = $global.getCurrentProject().id;
        var toPost = $scope.newProperties;
        $http.post("/properties", toPost)
            .then(function(response){
            $global.getProperties();
            $global.setNewProperties([]);
            $scope.newProperties = null;
            $global.getFullProject();
        });
    }

    $scope.newProperty = {
        name: '',
        type: '',
        entityId: ''
    };

    $scope.create = function(newProperty){
        var entityId = $global.getCurrentEntity().id;
        var toPost = {
            name: newProperty.name,
            type: newProperty.type,
            entityId: entityId
        };
        $http.post("/property", toPost)
            .then(function(response){
            $global.getProperties();
        });
    }

    $scope.edit = function(property){
        $global.setCurrentProperty (property);
    }

    $scope.update = function(property){
        var entityId = property.entityId;
        var projectId = $global.getCurrentProject().id;
        var toPatch = {
            id: property.id,
            name: $scope.currentProperty.name,
            type: $scope.currentProperty.type,
            entityId: entityId,
            projectId: projectId
        };
        $http.patch("/property", toPatch)
            .then(function(response){
            $scope.property = null;
            if (response.data == null) {
                $scope.property = null;
            }
            $global.getProperties();
            $scope.newProperties = [];
            $global.getFullProject();
        });
    }

    $scope.remove = function(property){
        var id = property.id;
        $http.delete('/property/'+id)
            .then(function (response) {
            $global.setProperties(response.data);
            $scope.property = null;
            $global.getProperties();
            $scope.toggleDetails();
        });
    }

    function resetForm(){
        $scope.newProperty = {
            name: '',
        };
    }

    $scope.selectedIndex = -1;

    $scope.itemClicked = function ($index, property) {
        $scope.selectedIndex = $index;
    }

    $scope.details = function(property){
        $global.setCurrentProperty(property);
        $scope.currentProperty = $global.getCurrentProperty();
        $scope.showDetails = true;
        $scope.property = property;
    }

    $scope.toggleDetails = function(){
        $scope.showDetails = !$scope.showDetails;
    }

    $scope.clearProperties = function(){
        $global.setProperties(null);
    }

}]);

