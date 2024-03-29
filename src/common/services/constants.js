var constantsService = angular.module('services.constants', []);

constantsService.constant('CONSTANT', {
    templateURL: 'src/app/',
    appName: 'New Job',
    firebaseURL: 'https://newjob.firebaseio.com',
    imgPath: 'src/assets/images'
});

constantsService.constant('I18N.MESSAGES', {
    'errors.route.changeError': 'Route change error',
    'login.reason.notAuthorized': "You do not have the necessary access permissions.  Do you want to login as someone else?",
    'login.reason.notAuthenticated': "You must be logged in to access this part of the application.",
    'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
    'login.error.serverError': "There was a problem with authenticating: {{exception}}.",
    'user.saveSuccess': "User saved successfully",
    'user.saveError': "There was a problem with saving user.",
});

