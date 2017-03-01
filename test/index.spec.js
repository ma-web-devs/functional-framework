const index = require('build/bundle.js')
const jQuery = require('build/bower_components/jquery/dist/jquery')

describe("firebase app setup", function() {

  describe("Just a test to test the tests", function() {

    it("is none of your beez-wax", function() {
      expect(jQuery).to.be.function
    });

  });

});
