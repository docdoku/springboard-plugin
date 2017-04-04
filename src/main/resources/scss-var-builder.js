var through = require('through2');
var glob = require('glob-fs')();


module.exports = function() {
  return through.obj(function(file, encoding, callback) {

      var scssString = file.contents.toString('utf8');
      var langs = [];
      glob.readdir('./mods/**/i18n/*.json', function(err, files) {
        files.forEach((fileName) => {
            var splitName = fileName.split('/');
            var lang = splitName[splitName.length - 1].split('.')[0];
            if(langs.indexOf(lang) === -1){
                langs.push(lang);
            }
        })

        var languages = langs.join(', ');
        scssString = scssString.replace(/__buildLangContent/g, languages);


        file.contents = new Buffer(scssString)
        callback(null, file);

      });

  });
};

/*

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
        ------ DEBUT ---------
        var scssString = file.contents.toString('utf8');
        -------------

      var langs = [];
      glob.readdir('./path.json', function(err, files) {
        files.forEach((fileName) => {
            var splitName = fileName.split('/');
            var lang = splitName[splitName.length - 1].split('.')[0];
            if(langs.indexOf(lang) === -1){
                langs.push(lang);
            }
        })

        var languages = langs.join(', ');

        scssString = scssString.replace(/__buildLangContent/g, languages);

        glob.readdir('./path.json', function(err, files) {
        icons = files.join('test');
          scssString = scssString.replace(/__buildIcons/g, icons);


          ------- PARTIE FINALE -------
          file.contents = new Buffer(scssString);
          callback(null, file);
        --------------
        });
      });

  });
};

*/
