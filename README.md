# Repository for webpack issue with web, es5 target using webworker and promise

IE 11 throws a "'Promise' is undefined" exception if there is a promise or async in the code, even with babel-loader.
