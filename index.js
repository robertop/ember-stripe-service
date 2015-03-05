/* jshint node: true */
'use strict';

module.exports = {
  name: 'stripe-service',
  contentFor: function(type) {

    // conditionally add the script tag, depending on whether the
    // app wants to include stripe or not
    //
    // an app may want to not include stripr during integration tests
    // so that the integration tests do not require an internet connection
    // plus so that they do not depend on the stripe service being up
    //
    // we check for undefined so that we keep backwards compatibility
    // since the ENABLE_STRIPE flag was introduced post 1.0
    var enableStripe = this.app.ENABLE_STRIPE === undefined || this.app.ENABLE_STRIPE;

    // we use body since Stripe must be available before
    if (type === 'body' && enableStripe) {
      return '<script type="text/javascript" src="https://js.stripe.com/v2/"></script>';
    }
  }
};
