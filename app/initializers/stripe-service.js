/* global Stripe */
import Ember from 'ember';
import config from '../config/environment';
var debug = config.LOG_STRIPE_SERVICE;

// we check for undefined so that we keep backwards compatibility
// since the ENABLE_STRIPE flag was introduced post 1.0
var enableStripe = config.ENABLE_STRIPE === undefined || config.ENABLE_STRIPE;

export function initialize(container, application) {
  if (debug) {
    Ember.Logger.info('StripeService: initialize');
  }

  if (!config.stripe.publishableKey) {
    throw new Ember.Error('StripeService: Missing Stripe key, please set `ENV.stripe.publishableKey` in config.environment.js');
  }

  // inject either the 'real' stripe service of the stub service
  // based on the app config
  if (enableStripe) {
    Stripe.setPublishableKey(config.stripe.publishableKey);
    application.inject('controller', 'stripeService', 'service:stripe');
    application.inject('route', 'stripeService', 'service:stripe');
  }
  else {
    application.inject('controller', 'stripeService', 'service:stripe-stub');
    application.inject('route', 'stripeService', 'service:stripe-stub');
  }
}

export default {
  name: 'stripe-service',
  initialize: initialize
};
