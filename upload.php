<?php
$upload_path = __DIR__ . '/upload';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = [];
    $errors = 0;
    foreach ($_FILES['files']['tmp_name'] as $idx => $tmp_path) {

        $filepath = $upload_path . '/' . $_FILES['files']['name'][$idx];

        if (!move_uploaded_file($tmp_path, $filepath)) {
            $errors++;
        }

        $response['files'][] = $_FILES['files']['name'][$idx];
    }

    $response['ok'] = ($errors === 0);

    echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $res = @unlink($upload_path . '/' . $_GET['name']);
    echo json_encode(['ok' => $res]);
}