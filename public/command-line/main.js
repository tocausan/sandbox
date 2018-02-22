var app = angular.module('tocausan', []);
app.controller('mainController', function($scope, $http, $filter) {


    $scope.commandText = '';
    $scope.commands = [
        { text: "coucou ! (for help: type \"help\")"}
    ];



    /*
     * Check key press
     * */
    $scope.handleKeyPress = function(e){

        // enter key
        if (e.keyCode == 13) {

            // Push command
            $scope.commands.push({ text: $scope.commandText});


            // Find command in bash
            var response = $filter('command')($scope.bash, $scope.commandText.toLowerCase());
            if (response) { $scope.commands.push({ text: response}) }


            // Set default command
            $scope.commandText = '';
        }


    };




    /*
    * Bash array
    * */
    $scope.bash = [
        {id: 0, command: 'coucou', info: "Say hi", response: "coucou :)"},
        {id: 1, command: 'man', info: "Sort all commands", response: ''},
        {id: 2, command: 'help', info: "Help you a bit", response: "This is a virtual command-line, if need help type \"man\", it will show you some commands."},
        {id: 3, command: 'info', info: "Info about it", response: "Hi, I'm your here to tell you beautiful stories ;)"},
    ]


    /*
    * Man
    * */
    $scope.man = [];
    var object = $scope.bash;
    for (var i = 0; i < object.length; i++) {
        $scope.man.push( object[i].command.toUpperCase() +': '+ object[i].info )
    }
    $scope.bash[1].response = $scope.man;


});






app.filter('command', function() {
    return function(object, command) {

        for (var i=0; i<object.length; i++) {

            if (object[i].command == command) {
                return object[i].response;
            }
        }
        return null;
    }
});