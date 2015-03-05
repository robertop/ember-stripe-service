import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:stripe-stub', 'StripeStubService', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

var cc = {
  number: 4242424242424242,
  exp_year: 2018,
  exp_month: 10,
  cvc: 123,
  address_zip: 12345
};

test('success stub', function() {

  // by default, the stripe service stub should return
  // a success response.
  var service = this.subject();

  return service.createToken(cc)
    .then(function(response) {
      equal(service.successResponse, response);
    }, undefined);
});

test('error  stub', function() {

  // test that we can tell the stripe service stub to
  // return an error response
  var service = this.subject();
  service.setResponse(service.errorResponse);

  return service.createToken(cc)
    .then(undefined, function(response) {
      equal(service.errorResponse, response);
    });
});
