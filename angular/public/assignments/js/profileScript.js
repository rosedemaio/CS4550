var app = angular.module("OnlineUniversity", []);

app.controller("OnlineUniversityController", 
function ($scope, $http)
{
    // fetch courses for initial pageload
    $http.get("/api/course")
    .success( function(res) {
        $scope.courses = res;
    });

    $scope.openRemoveModal = function(index)
    {
        $scope.removeIndex = index
        $scope.remove = $scope.remove
        $scope.courseToRemove = $scope.courses[index]
        $("#removeModal").modal('show')
    }

    // hit delete endpoint to remove a course
    $scope.remove = function()
    {
        $http.delete("/api/course/" + $scope.removeIndex)
        .success(function(res) {
            $scope.courses = res;
            $("#removeModal").modal('hide')
        });
    }

    // prepare course to open "edit" modal, show modal
    $scope.openUpdateCourseModal = function(index)
    {
        // since tihs is update, assign updateCourse to createOrUpdate button
        $scope.createOrUpdate = $scope.updateCourse
        $scope.editingIndex = index
        $scope.courseToCreateOrUpdate = $scope.courses[index]
        $scope.courseToCreateOrUpdate.dateCreated = new Date($scope.courseToCreateOrUpdate.dateCreated)
        $("#courseModal").modal('show')
    }

    // hit PUT endpoint to update existing course, close modal
    $scope.updateCourse = function(updateCourse)
    {
        $http.put("/api/course/" + $scope.editingIndex, updateCourse)
        .success( function(res) {
            $scope.courses = res;
            $("#courseModal").modal('hide')
        })
    }

    // prepare new course to create, show modal
    $scope.openNewCourseModal = function()
    {
        // since this is create, assign createNewCourse to createOrUpdate button
        $scope.createOrUpdate = $scope.createNewCourse;
        $scope.courseForm.$setPristine();
        // initialize javascript Date for bootstrap modal (otherwise it will blow up)
        var today = new Date()
        $scope.courseToCreateOrUpdate = {name: "", category:"", dateCreated: today, description:""}
        $("#courseModal").modal('show')
        
    }

    // hit POST endpoint to create new course, hide modal
    $scope.createNewCourse = function(newCourse)
    {
        $http.post("/api/course", newCourse)
        .success( function(res) {
            $scope.courses = res;
            $("#courseModal").modal('hide')
        })
    }

    // format a readable date for the table, ex "1/2/2015"
    $scope.formatReadableDate = function(date)
    {
        var date = new Date(date)
        return  (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    }

});

