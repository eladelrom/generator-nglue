# <%= moduleName %> components folder

This folder will hold all the none bower components that will be used by <%= moduleName %> module.  `nglue` differentiate between libraries that will be used by all the modules and ones that are to be used by the specific module.

In order to have grunt use the bower components you must add that to the `nglue.json` file such as this:

<pre>
{
  "version": "0.0.0",
  "name": "<%= _.slugify(name) %>-module",
  "dependencies": {
    "jquery": "components/lib/lib.js",
  }
}
</pre>

When you are ready to create an app in your <%= projectName %> project that include at least two modules, Grunt will glue together all these bower and non-bower components libraries together to create a file that includes all these libraries from all the modules you includes.