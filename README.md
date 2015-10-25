# riot-mui
##Welcome!
[Riot JS](http://riotjs.com/) is tiniest (by size) library allowing to create user interfaces. Riot is robust, fast and has enjoyable syntax. Unfortunately Riot doesn't have library of material UI components. This project aims to fix this problem.

Any person who loves Riot and material UI willing to be a part of this project - welcome! We have great chance to create set of components which will provide basic features of [Material UI](https://www.google.com/design/spec/material-design/introduction.html) for Riot.

###[CHECK THIS OUT]()

##How to get riot-mui?

Github:
```
  git clone https://github.com/kysonic/riot-mui 
```
Npm:
```
  npm install riot-mui 
```
Bower: 
```
  bower install riot-mui 
```
##Getting started

Currently there are exist two approach of working with riot-mui:

1. Using build of riot-mui.
2. Using source files with webpack or browserify.

If you don't wanna work with source code you can just include riot-mui.js and riot-mui.css on your project. For this you should clone repo from github next copy appropriate files to your project.

```
 <link href="build/styles/riot-mui.min.css" rel="stylesheet">
        ....
 <script src="build/js/riot-mui-mixins-min.js"></script>
 <script src="build/js/riot-mui.js"></script> 
``` 

Opposite if you like to use some bundler like webpack or browserify + gulp (grunt) you can use source files in your project. For example if you use webpack for getting riot-mui components you can use bower but in this case don't forget add bower folder in [modulesDirectories](https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories) of webpack:

```
   modulesDirectories: [__dirname + '/node_modules',__dirname + '/bower_components/riot-mui/src']  
```

Learn more about approaches of using riot-mui [HERE](https://github.com/kysonic/riot-mui/tree/master/examples).

##A few words about styling

It's currently used classical approach of components styling.

All components styles located in Sass file which has same name like a component file.
All components styles encapsulated using tag name like a name space of component. For example:
```
  material-checkbox { background-color: transparent; } 
```
All components styles has special section - "Variables for quick styling" which will help you to style main features of components really quickly. Also you have possibility to override it whatever you want.

