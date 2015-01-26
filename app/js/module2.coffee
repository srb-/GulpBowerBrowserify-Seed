# /* @flow */
# function foo(x) {
#   return x * 10;
# }
# foo('Hello, world!');

console.log 'WE are in module2.coffee'


module.exports.hello = () ->
  console.log 'hello from a module yua!'

#foo('Hello, world! aa')