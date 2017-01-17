<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $errors = [];

    if (!preg_match('/[a-z]+$/', $name) {
        array_push($errors, 'Invalid name');
    }
    if (!preg_match('/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/', $email) {
        array_push($errors, 'Invalid email');
    }
    if (trim($message) == '') {
        array_push($errors, 'Invalid message');
    }

    if (empty($errors)) {
        $to = 'ktia.morei@gmail.com';

        if (mail($to, $subject, $message, 'From:' . $email)) {
            http_response_code(200);
        }
        else {
            http_response_code(400);
        }
    }
?>
