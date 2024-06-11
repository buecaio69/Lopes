<?php
include '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    if (updateUser($id, $email, $password)) {
        echo json_encode(['success' => true, 'message' => 'Usuário atualizado com sucesso!']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao atualizar usuário!']);
        exit;
    }
}
?>
