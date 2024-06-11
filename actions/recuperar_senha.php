<?php
include '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email']; // Adiciona essa linha para obter o email do usuário
    $password = $_POST['password'];
    if (updateUserPassword($email, $password)) { // Chama updateUserPassword com o email
        echo json_encode(['success' => true, 'message' => 'Senha do usuário atualizada com sucesso!']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao atualizar a senha do usuário!']);
        exit;
    }
}
?>
