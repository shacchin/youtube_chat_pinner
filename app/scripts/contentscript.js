// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

var $ = require('jQuery');

console.log('comment pinner loaded')

function pinComment() {
  var commentFrame = $('iframe').contents();

  // モデレータコメント(スパナ)を取得
  var modelator = commentFrame
    .find('[aria-label=モデレーター]')
    .closest('yt-live-chat-text-message-renderer');

  modelator.attr('id', 'pinned-comment');

  // モデレータコメントをコメント欄上部に表示
  commentFrame.find('yt-live-chat-ticker-renderer').after(modelator);
}

const setIntervalId = setInterval(setObserver, 1000);

function setObserver() {
  if ($('#chatframe').length) {
    clearInterval(setIntervalId);

    $('#chatframe').on('load', () => {
      // iframeのdocument取得
      var iframe = document.getElementById('chatframe');

      const doc = iframe.contentWindow.document; // iframe内文書の document

      // コメント一覧取得
      const comments = doc.getElementById('item-offset');

      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // console.log('change!!!'); // 変更された時の処理
          pinComment();

          // 削除用クリックイベントの追加
          $(doc).on('click', '#pinned-comment', () => {
            $(event.target).remove();
          });
        });
      });

      const config = {
        childList: true,
        attributes: true
      };
      observer.observe(comments, config); // 対象ノードとオブザーバの設定を渡す
    });
  }
}
