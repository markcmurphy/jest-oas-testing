const jestOpenAPI = require('jest-openapi').default;
const axios = require('axios');
const path = require('path');
require('dotenv').config();

// Load an OpenAPI file (YAML or JSON) into this plugin
const absolutePath = path.resolve('./api-specs/pages.v3.yml');
jestOpenAPI(absolutePath);

// Write your test
describe('GET https://api.bigcommerce.com/stores/29iql3rwa6/v3/content/pages', () => {
  it('should satisfy OpenAPI spec', async () => {
    // Axios config object
    const config = {
      method: 'get',
      url: `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v3/content/pages`,
      headers: {
        Accept: 'application/json',
        'X-Auth-Token': process.env.X_AUTH_TOKEN,
      },
    };

    // Get an HTTP response from your server (e.g. using axios)
    const res = await axios(config);

    expect(res.status).toEqual(200);

    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });
});
