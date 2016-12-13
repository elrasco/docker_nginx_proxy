const fs = require('fs');
const glob = require("glob");
const del = require("del");
const argv = require('yargs').argv;

const DIST_DIR = 'dist';

const proccessEnv = env => env === 'prod' ? '' : env + '.';
const env = proccessEnv(argv.env);
const name = path => DIST_DIR + '/' + path.split('/')[1].replace('.js', '.conf');
const flush = (file, template) => fs.writeFile(file, template, function(err) {
  if (err) {
    return console.log(err);
  }
});

del.sync(DIST_DIR, {force: true});
fs.mkdirSync(DIST_DIR);

glob("templates/*.js", function(er, files) {
  files.forEach(file => {

    const template = require('./' + file);
    flush(name(file), template(env));
  });
});
