// get config
function getParameter(parameters, name) {
  const param = parameters.find(p => {
    return p.Name === name;
  });
  return param.Value;
}

const SSM = require('aws-sdk/clients/ssm');
const ssm = new SSM({ region: 'us-east-2' });
ssm.getParameters({
  Names: ['GG_RDS_HOST', 'GG_RDS_PORT', 'GG_RDS_PASS', 'GG_RDS_USER'],
  WithDecryption: true
}, (err, data) => {
  if (err) {
    console.log('error', err)
    return;
  }

  const connection = {
    host: getParameter(data.Parameters, 'GG_RDS_HOST'),
    port: getParameter(data.Parameters, 'GG_RDS_PORT'),
    user: getParameter(data.Parameters, 'GG_RDS_USER'),
    password: getParameter(data.Parameters, 'GG_RDS_PASS'),
    database : 'gathergamers',
    charset  : 'utf8'
  };
  // get db connection
  const knex = require('knex')({
    client: 'pg',
    connection
  });

  const bookshelf = require('bookshelf')(knex);

  const Foo = bookshelf.Model.extend({
    tableName: 'foo'
  });

  Foo.fetchAll().then((a, b) => {
    console.log("thing a", a)
    console.log("thing b", b)
  }, err => console.log(err));
});

// start server
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('The start of something great\n');
}).listen(3000);
console.log('Server running at localhost:3000');
