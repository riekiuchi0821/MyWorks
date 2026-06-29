const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", validation);

function validation(event) {
  event.preventDefault();

  const name = document.getElementById("yourname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  //名前チェック
  const errorName = name.parentElement.querySelector('.error-message');
  errorName.textContent('');

  if(name.value.trim() ===''){
    console.log('test');
    errorName.textContent('お名前を入力してください');
  } 

//   //メールアドレスチェック
//   const emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
//   if(!emailPattern.test(email))
//     //errors.push('メールアドレスの入力形式が正しくありません');

//   //メッセージチェック
//   if(message.trim() === '')
//     //errors.push('お問合せ内容を入力してください');


}
