'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var NglueGenerator = module.exports = function NglueGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  if (this.hasOwnProperty('name')) {
    this.hookFor('nglue:module', {
        args: args
    });
  }

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
  this.mkdir('code_base');
  this.mkdir('code_base/apps');
  this.mkdir('code_base/assets');
  this.mkdir('code_base/assets/bower_components');
  this.mkdir('code_base/assets/components');
  this.mkdir('code_base/assets/components/less');
  this.mkdir('code_base/assets/components/nglue-events');
  this.mkdir('code_base/assets/fonts');
  this.mkdir('code_base/assets/images');
  this.mkdir('code_base/assets/styles');
  this.mkdir('code_base/modules');
  this.mkdir('code_base/dist');
  this.mkdir('dist');

  this.copy('_.bowerrc', '.bowerrc');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('code_base/assets/_nglue.json', 'code_base/assets/nglue.json');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_gitignore', '.gitignore');
  this.copy('code_base/assets/components/less/less-1.3.3.min.js', 'code_base/assets/components/less/less-1.3.3.min.js');
  this.copy('code_base/assets/components/nglue-events/_eventService.js', 'code_base/assets/components/nglue-events/eventService.js');
  this.template('code_base/assets/styles/_base.less', 'code_base/assets/styles/base.less');

  // readme files
  this.template('_README.md', 'README.md');
  this.template('code_base/dist/_README.md', 'code_base/dist/README.md');
  this.template('code_base/dist/_README.md', 'dist/README.md');
};

NglueGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
