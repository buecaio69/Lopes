<?php
include '../includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    if (deleteUser($id)) {
        echo json_encode(['success' => true, 'message' => 'Usuário excluído com sucesso!']);
        exit;
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao excluir usuário!']);
        exit;
    }
}
?>
