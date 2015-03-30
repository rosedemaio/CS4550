var app = angular.module("OnlineUniversity", []);

app.controller("OnlineUniversityController", 
function ($scope, $http)
{

    $scope.remove = function(index)
    {
        $http.delete("/api/course/" + index)
        .success(function(response) {
            $scope.courses = response;
        });
    }

    $scope.openUpdateCourseModal = function(index)
    {
        $scope.createOrUpdate = $scope.updateCourse
        $scope.editingIndex = index
        $scope.courseToCreateOrUpdate = $scope.courses[index]
        $scope.courseToCreateOrUpdate.dateCreated = new Date($scope.courseToCreateOrUpdate.dateCreated)
        $("#courseModal").modal('show')
    }

    $scope.updateCourse = function(updateCourse)
    {
        $http.put("/api/course/" + $scope.editingIndex, updateCourse)
        .success( function(res) {
            $scope.courses = res;
            $("#courseModal").modal('hide')
        })
    }

    $scope.openNewCourseModal = function()
    {

        $scope.createOrUpdate = $scope.createNewCourse;
        $scope.courseForm.$setPristine();
        var today = new Date()
        $scope.courseToCreateOrUpdate = {name: "", category:"", dateCreated: today, description:""}
        $("#courseModal").modal('show')
        
    }

    $scope.createNewCourse = function(newCourse)
    {
        $http.post("/api/course", newCourse)
        .success( function(res) {
            $scope.courses = res;
            $("#courseModal").modal('hide')
        })
    }

    $scope.formatReadableDate = function(date)
    {
        var date = new Date(date)
        return  (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    }

    // fetch courses
    $http.get("/api/course")
    .success( function(res) {
        $scope.courses = res;
    });
});

