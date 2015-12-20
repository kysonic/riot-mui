# riot-mui
##Welcome!
[Riot JS](http://riotjs.com/) is tiniest (by size) library allowing to create user interfaces. Riot is robust, fast and has enjoyable syntax. Unfortunately Riot doesn't have library of material UI components. This project aims to fix this problem.

Any person who loves Riot and material UI willing to be a part of this project - welcome! We have great chance to create set of components which will provide basic features of [Material UI](https://www.google.com/design/spec/material-design/introduction.html) for Riot.

## WARNING! 
Currently Riot mui uses "double curly brackets" syntax for html markup. Don't forget setup special riot settings before tag mounting: 

```
riot.settings.brackets = '{{ }}'; 
```

###[DEMO](http://kysonic.github.io/riot-mui/)

### Source code of demo pages is placed here: 

[https://github.com/kysonic/riot-mui-page](https://github.com/kysonic/riot-mui-page)

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


If you don't use some build system like webpack or gulp (+broserify) you can just include riot-mui.js, riot-mui-mixins.js and riot-mui.css on your project. 

```
 <link href="build/styles/riot-mui.min.css" rel="stylesheet">
        ....
 <script src="build/js/riot-mui-mixins-min.js"></script>
 <script src="build/js/riot-mui.js"></script> 
```

Add material ui component: 

```
<material-button>
    <div class="text">Button</div>
</material-button>    
``` 
And mount it: 
```
riot.mount('material-button');
```
In another case you can use source files of this project: 

```
require('material-elements/material-checkbox/material-checkbox.scss');
require('material-elements/material-checkbox/material-checkbox.tag');
```
Don't forget that some components have dependency of another components, for example material-button include material-waves. In this case you should to include it at first: 

```
require('material-elements/material-waves/material-waves.scss');
require('material-elements/material-waves/material-waves.tag');
require('material-elements/material-button/material-button.scss');
require('material-elements/material-button/material-button.tag');
```

Learn more about riot-mui [here](https://github.com/kysonic/riot-mui/tree/master/examples).

##A few words about styling

All components styles located in Sass file which has same name like a component file.
All components styles encapsulated using tag name like a name space of component. 
All components styles has special section - "Variables for quick styling" which will help you to style main features of components really quickly. Also you have possibility to override it whatever you want.

## Bugs, enhancements, suggestions

If you want to help make this project better you can add your suggestions [here](https://github.com/kysonic/riot-mui/issues). This also applies to bugs and enhancements. 

## Contributing 

1. Fork the repo. 
2. Write your code. 
3. Submit your pull request to dev branch of this project. 



