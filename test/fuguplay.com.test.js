const request = require('./testRequest');
const headers = require('./headers');
const skip = require('./skip');

test('fuguplay.com');
test('fuguplay.it');
test('fuguplay.sml-server.com');

function test(host) {
  describe(host, function() {

    shouldBe200(host, '/');
    shouldBe200(host, '/companies/');
    shouldBe200(host, '/profilo/campaigns/');
    shouldBe200(host, '/admin/campagne/nuova/');
    shouldBe200(host, '/admin/campagne/modifica/');
    shouldBe200(host, '/condividi/campaign/');
    shouldBe200(host, '/admin/campaigns/');
    shouldBe200(host, '/admin/campagne/insights/');
    shouldBe200(host, '/landing/favicon.ico');
    shouldBe200(host, '/restyling/profilo/pagamenti/');

    it('/login/aglogin/', function() {
      skip(this).onStage();
      return request.frontend({
          url: '/login/aglogin/',
          host
        })
        .then(response => response.redirects[0])
        .then(redirect => expect(redirect).to.match(/\/companies\//));
    });

    it('/landing routes headers should be obfuscated', function() {
      return request.frontend({
          url: '/landing/it/',
          host
        })
        .expect(headers.noneFromAmazon);
    });
    it('/landing/it/', function() {
      return request.frontend({
          url: '/landing/it/',
          host
        })
        .expect(/Fuguplay/);
    });
    it('/landing/not_existing_resource/', function() {
      return request.notFound({
        url: '/landing/not_existing_resource/',
        host
      });
    });

    it('/downloads/notula.docx should be a file to download', function(){
      return request.frontend({
        url: '/downloads/notula.docx',
        host
      })
      .expect(headers.isADocument)
    });
  });
}

function shouldBe200(host, url) {
  it(url, function() {
    skip(this).onStage();
    return request.frontend({
      url,
      host
    });
  });
}
