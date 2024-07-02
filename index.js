const parseUrl = require("parse-url");

console.log(parseUrl("https://jfrog.com/"))

/*
{
  protocols: [ 'https' ],
  protocol: 'https',
  port: null,
  resource: 'jfrog.com',
  user: '',
  pathname: '',
  hash: '',
  search: '',
  href: 'https://jfrog.com',
  query: [Object: null prototype] {}
}
*/