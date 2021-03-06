var helpers = require('../helpers');

helpers.startCasper('/mozpay', function(){
  // Make pinStateCheck return true for pin.
  helpers.fakePinData({pin: true});
  // Make enter-pin API call return 200
  helpers.fakePinData({pin: true}, 'POST', 200, '/mozpay/v1/api/pin/check/');
});

casper.test.begin('Enter Pin API call returns 200', {
  test: function(test) {

    helpers.doLogin();

    casper.waitForUrl('/mozpay/enter-pin', function() {
      test.assertVisible('.pinbox', 'Pin entry widget should be displayed');
      this.sendKeys('.pinbox', '1234');
      test.assertExists('.cta:enabled', 'Submit button is enabled');
      this.click('.cta');
    });

    casper.waitForUrl('/mozpay/wait-for-tx', function() {
      test.assertVisible('progress');
    });

    casper.run(function() {
      test.done();
    });
  },
});
