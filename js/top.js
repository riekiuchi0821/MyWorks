/* Contact Form の送信ボタン処理 */

//Enterキーなどあらゆるsubmitイベントを監視するため、送信ボタンではなくFormで取得する
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", validation);

//送信ボタン押下後のバリデーション
function validation(event) {

  //エラーフラグ
  let hasError = false;

  //submitでのデフォルト処理（ブラウザがフォーム送信、ページ再読み込み）をキャンセルする
  event.preventDefault();

  const name = document.getElementById("yourname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  //バリデーション処理
  //初期化
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function(message){
    message.textContent = ""; //再入力で問題なくなったときのエラーを消すため
  });

  //名前チェック
  if(name.value.trim() ===""){
    const errorText = name.nextElementSibling;
    errorText.textContent = "お名前を入力してください";
    hasError = true;    
  }

  //メールアドレスチェック
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(email.value)){
    const errorText = email.nextElementSibling;
    errorText.textContent = "メールアドレスの入力形式が正しくありません";
    hasError = true;    
  }
 
  //メッセージチェック
  if(message.value.trim() === ""){
    const errorText = message.nextElementSibling;
    errorText.textContent = "お問合せ内容を入力してください";
    hasError = true;    
  }

  //問題なければ、thank youページへ移動
  //TODO:フォーム送信処理はPHPなど学習した後に実装する
  if(!hasError){
    window.location.href = "./thankyou/index.html";
  }

}
