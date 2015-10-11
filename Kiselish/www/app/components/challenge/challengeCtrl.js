angular.module('teglanje').controller('challengeCtrl', ['$scope', 'challenge', 'participants', 'parseService', 'NavigationService', function ($scope, challenge, participants, parseService, NavigationService) {
    $scope.Challenge = challenge;
    $scope.Participants = participants;
    $scope.IsClosed = challenge.get('isClosed');
    $scope.ApplyToChallenge = function (challenge) {
        if (parseService.IsLogedIn())
        {
            parseService.applyToChallenge(challenge.id).then(function () {
                NavigationService.navigateTo('home.challenges', null, null);
            }, function () {
            });
        } else {
            NavigationService.navigateTo('login', null, null);
        }
    };
}]);

