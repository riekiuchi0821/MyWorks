/* 糸とリボンの表示　スクロールしてセクションに入ったらクラスを追加する */
const mainVisual = document.getElementById('main-visual');
const threadLineTop = document.getElementById('thread-line-top');
const threadSections = document.querySelectorAll('.thread-sections');

// メインビジュアルが表示されたら、糸が伸びる
const observer = new IntersectionObserver((entries) => {

  entries.forEach(function(entry){
    if(entry.isIntersecting){
      //main-visualならthread-line-topをのばす
      if(entry.target === mainVisual){
        threadLineTop.classList.add('scroll');
      }else{
        //各セクションに対応する糸を伸ばす
        const ribbon = entry.target.querySelector('.ribbon-pc');
        ribbon.classList.add('scroll');
        const threadLine = entry.target.querySelector('.thread-line');
        threadLine.classList.add('scroll');
      }
    }
  });
},{
    //worksはデバイス高さによっては最初から下に表示されているため、セクションに入ったと判定する閾値を調整する
    rootMargin: '0px 0px -50% 0px'
});

// 各セクションの監視を開始する TODO:mainVisualだけ分ける必要はない気もするがいったんこのままで
observer.observe(mainVisual);
threadSections.forEach(function(value){
  observer.observe(value);
});


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
