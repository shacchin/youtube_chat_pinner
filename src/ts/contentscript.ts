// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const $ = require("jquery");

const MAX_RETRY = 10;
let observeCount = 0;

// コメント欄読み込み待ち
const setIntervalId = setInterval(startObserve, 1000);

/**
 * DOM監視オブジェクトの設定
 */
function startObserve() {
  console.log("load!!");
  observeCount++;
  if (observeCount > MAX_RETRY) {
    clearInterval(setIntervalId);
  }

  if ($("#chatframe").length) {
    // setInterval解除
    clearInterval(setIntervalId);

    $("#chatframe").on("load", () => {
      const chatFrame = document.getElementById(
        "chatframe"
      ) as HTMLIFrameElement;

      const chatFrameDocument =
        chatFrame &&
        chatFrame.contentWindow &&
        chatFrame.contentWindow.document; // iframe内文書の document

      // チャット一覧取得
      const chats =
        chatFrameDocument && chatFrameDocument.getElementById("item-offset");

      if (!chats) {
        return;
      }

      // DOM監視オブジェクト定義
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          pinComment();
          if (chatFrameDocument) {
            restartChatScroll(chatFrameDocument);
            addDeletePinnedCommentEvent(chatFrameDocument);
          }
        });
      });

      // DOM監視オブジェクトコンフィグ
      const observerConfig = {
        childList: true,
        attributes: true,
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
  const commentFrame = $("iframe").contents();

  const modelatorComments = commentFrame
    .find("[aria-label=モデレーター]")
    .closest("yt-live-chat-text-message-renderer");

  // 他のコメントと固定したコメントをidで区別化
  modelatorComments.attr("id", "pinned-comment");

  // モデレータコメントをコメント欄上部に表示
  commentFrame.find("yt-live-chat-ticker-renderer").after(modelatorComments);
}

/**
 * チャット欄スクロールの再開
 */
function restartChatScroll(document: Document) {
  const showMore = document.getElementById("show-more");
  const showMoreElement =
    showMore && (showMore.firstElementChild as HTMLElement);
  if (showMoreElement) {
    showMoreElement.click();
  }
}

/**
 * 固定コメント削除イベントの追加
 *  */
function addDeletePinnedCommentEvent(document: Document) {
  $(document).on("click", "#pinned-comment", () => {
    if (event) {
      $(event.target).closest("#pinned-comment").remove();
    }
  });
}
