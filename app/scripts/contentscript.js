// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const $ = require('jQuery');

// コメント欄読み込み待ち
const setIntervalId = setInterval(startObserve, 1000);

/**
 * DOM監視オブジェクトの設定
 */
function startObserve() {
  if ($('#chatframe').length) {
    // setInterval解除
    clearInterval(setIntervalId);

    $('#chatframe').on('load', () => {
      const chatFrame = document.getElementById('chatframe');

      const chatFrameDocument = chatFrame.contentWindow.document; // iframe内文書の document

      // チャット一覧取得
      const chats = chatFrameDocument.getElementById('item-offset');

      // DOM監視オブジェクト定義
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          pinComment();
          addDeletePinnedCommentEvent(chatFrameDocument);
        });
      });

      // DOM監視オブジェクトコンフィグ
      const observerConfig = {
        childList: true,
        attributes: true
      };

      // 監視スタート
      observer.observe(chats, observerConfig);
    });
  }
}

/**
 * コメントを固定
 */
function pinComment() {
  const commentFrame = $('iframe').contents();

  const modelatorComments = commentFrame
    .find('[aria-label=モデレーター]')
    .closest('yt-live-chat-text-message-renderer');

  // 他のコメントと固定したコメントをidで区別化
  modelatorComments.attr('id', 'pinned-comment');

  // モデレータコメントをコメント欄上部に表示
  commentFrame.find('yt-live-chat-ticker-renderer').after(modelatorComments);
}

/**
 * 固定コメント削除イベントの追加
 *  */
function addDeletePinnedCommentEvent(document) {
  $(document).on('click', '#pinned-comment', () => {
    $(event.target).closest("#pinned-comment").remove();
  });
}

