<?php

header('Content-Type: text/html; charset=UTF-8');

//送信ボタン以外でsend.phpにアクセスされた場合は、トップへ戻す
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    header('Location: index.html');
    exit;
}

//フォームの値を受け取る
$name = isset($_POST['yourname']) ? trim($_POST['yourname']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';


//バリデーション(javascriptだと書き換えの心配があるため、php側でも処理する)
$errors = [];
if($name ==='') $errors[] = 'お名前を入力してください。';
if($email ==='' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = '正しいメールアドレスを入力してください。';
if($message ==='') $errors[] = 'メッセージを入力してください。';

if(!empty($errors)) {
    echo '<h3>入力内容を確認してください。</h3>';

    echo '<ul>';
    //エラーメッセージを表示する
    foreach( $errors as $error ) {
        echo '<li>' . htmlspecialchars($error, ENT_QUOTES, 'UTF-8') . '</li>';
    }
    echo '</ul>';

    exit;
}

//問い合わせ内容
$subject = 'ポートフォリオサイトからお問合せがありました';
$body = "お名前：{$name}\nメールアドレス：{$email}\n\nお問合せ内容：\n{$message}";
$to = 'rie.kiuchi.studio@gmail.com';

//ヘッダ
$headers = "From: contact@k-tsunagu-design.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mb_language('uni'); // UTF-8のまま送信する（'Japanese'だと本文がISO-2022-JPに変換され、上のCharset=UTF-8指定と食い違って文字化けする）
mb_internal_encoding('UTF-8');

$sent = mb_send_mail($to, $subject, $body, $headers);

if($sent) {
    header('Location: thankyou/index.html');
    exit;
}else{
    echo '<h3>送信に失敗しました</h3>';
    exit;
}

?>