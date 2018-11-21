// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

var $ = require('jQuery');

$(function() {
  console.log('read youtube_extract Extention!!');

  var length = $('span[id=author-name]').length;
  console.log(length)

  var userNameList = $('span[id=author-name]').text();
  console.log(userNameList);

});
