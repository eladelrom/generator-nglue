'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NglueGenerator = module.exports = function NglueGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.hookFor('nglue:module', {
      args: args
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NglueGenerator, yeoman.generators.Base);

NglueGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'moduleName',
    name: 'projectName',
    message: 'What\'s your project\'s name?',
  }];

  this.prompt(prompts, function (props) {

    if (props.hasOwnProperty('moduleName')) {
      this.moduleName = props.moduleName;
    }

    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

NglueGenerator.prototype.app = function app() {
  console.log('1');
  this.mkdir('code_base');
  this.mkdir('code_base/apps');
  this.mkdir('code_base/apps/mobile');
  this.mkdir('code_base/apps/web');
  this.mkdir('code_base/assets');
  this.mkdir('code_base/assets/bower_components');
  this.mkdir('code_base/assets/components');
  this.mkdir('code_base/assets/css');
  this.mkdir('code_base/assets/fonts');
  this.mkdir('code_base/assets/images');
  this.mkdir('code_base/modules');
  this.mkdir('compile');
  this.mkdir('code_base/dist');
  this.mkdir('dist');

  this.copy('_.bowerrc', '.bowerrc');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'code_base/assets/config.json');
};

NglueGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
