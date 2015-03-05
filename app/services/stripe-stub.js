import Ember from 'ember';
import config from '../config/environment';
var debug = config.LOG_STRIPE_SERVICE;

/**
 * A canned success response
 */
var StripeSuccessResponse = {
  id: 'tok_ud5dg20Gra',
  card: {
    address_city: 'Anytown',
    address_country: 'United States',
    address_line1: '123 main st',
    address_line1_check: null,
    address_line2: null,
    address_state: 'AnyState',
    address_zip: '55555',
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    customer: null,
    cvc_check: null,
    dynamic_last4: null,
    exp_month: 12,
    exp_year: 2015,
    funding: 'credit',
    id: 'card_11aaaAAAAaaAA1AAaAaA11A1',
    last4: '4242',
    name: null,
    object: "card"
  },
  created: 1425513823,
  currency: 'usd',
  livemode: false,
  used: false
};

/**
 * A canned error response
 */
var StripeErrorResponse = {
  status: 402,
  error: {
    code: 'invalid_expiry_year',
    message: "Your card's expiration year is invalid",
    param: 'expr_year',
    type: 'card_error'
  }
};

/**
 * The response that will be used during the test
 * You usually put one of StripeSuccessResponse/StripeErrorResponse
 * from above.
 */
var StripeResponse = StripeSuccessResponse;

/**
 * set the response to be returned by createToken. Usually this would
 * be done in a test before the System Under Test is run
 *
 * @param response
 */
function setResponse(response) {
  StripeResponse = response;
}

/**
 * get the response to be given to the promise that is returned.
 * this function closes over the StripeResponse variable
 * so that we the createToken() function can access the value
 * in case it is changed by a test.
 */
function getResponse() {
  return StripeResponse;
}

function createToken (card) {
  if (debug) {
    Ember.Logger.info('StripeStubService: getStripeToken - card:', card);
  }
  return new Ember.RSVP.Promise(function (resolve, reject) {
    if (debug) {
      Ember.Logger.info('StripeStubService: createToken handler - status %s, response:', status, StripeResponse);
    }

    if (getResponse().error !== undefined) {
      reject(getResponse());
      return;
    }
    resolve(getResponse());
  });
}

export default Ember.Object.extend({
  createToken: createToken,
  successResponse: StripeSuccessResponse,
  errorResponse: StripeErrorResponse,
  setResponse: setResponse
});
