<?php
include '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $senha = $data['senha'];

    $user = getUser($email);

    if ($user && password_verify($senha, $user['password'])) {
        // Autenticação bem-sucedida
        echo json_encode(['success' => true]);
        exit;
    } else {
        // Autenticação falhou
        echo json_encode(['success' => false]);
        exit;
    }
}
?>
