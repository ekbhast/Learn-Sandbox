<?php 

$name = $_POST['name'];//в переменную name помещаем то, что пападает в инпт с атрибутом name=name
$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers. Сервер который мы будем использовать
$mail->SMTPAuth = true;                               // Enable SMTP authentication. Тут мы говорим, что мы будем входить в почту с этого аккаунта.
$mail->Username = 'ekbhast@gmail.com';                 // Наш логин 
$mail->Password = 'rybmxhopfrhhrtvj';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('ekbhast@gmail.com', 'Pulse');   // От кого письмо, такой же как наш логин. Второй части указыввается от какого ресурса или от кого письмо.
$mail->addAddress('ekbhast@yandex.ru');     // Add a recipient. тут указываем куда непосредсвенно будет приходить письмо.
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
//в пхп точка это знак конкатинации
$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br> 
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>