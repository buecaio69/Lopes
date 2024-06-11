<?php
include '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    if (createUser($email, $password)) {
        echo json_encode(['success' => true, 'message' => 'Usuário criado com sucesso!']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao criar usuário!']);
        exit;
    }
}
?>
