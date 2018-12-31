// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

var $ = require("jQuery");



$(function() {
  console.log("read youtube_extract Extention!!");

  function testOutput() {

    var iframe = $("iframe").contents();
    var length = iframe.find("[id=author-name]").length;
    console.log("全体コメント数："+length)

    var modelatorList = iframe.find("[aria-label=モデレーター]").length;
    console.log("モデレータ数"+modelatorList);

    var modelator = iframe.find("[aria-label=モデレーター]").closest("yt-live-chat-text-message-renderer");

    iframe.find("yt-live-chat-ticker-renderer").after(modelator)

  }

  setInterval(testOutput,1000);

  console.log("script end!!")

});
