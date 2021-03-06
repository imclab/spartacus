var helpers = require('../helpers');

helpers.startCasper('/mozpay', function(){
  helpers.fakePinData({pin: false});
});


casper.test.begin('Login test no pin', {

  test: function(test) {

    helpers.doLogin();

    casper.waitForUrl('/mozpay/create-pin', function() {
      test.assertVisible('.pinbox', 'Pin entry widget should be displayed');
      test.assertDoesntExist('.forgot-pin', 'No forgot-pin should be present for pin creation');
    });

    casper.run(function() {
      test.done();
    });
  },
});
