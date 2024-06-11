<?php
// includes/functions.php
include 'db_connect.php';

function createUser($email, $password) {
    global $conn;
    $stmt = $conn->prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    if (!$stmt) {
        die('Erro ao preparar a declaração: ' . $conn->error);
    }
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param('ss', $email, $hashedPassword);
    return $stmt->execute();
}

function getUser($email) {
    global $conn;
    $stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        return $user;
    } else {
        return null;
    }
}


function updateUser($id, $email, $password) {
    global $conn;
    $stmt = $conn->prepare('UPDATE users SET email = ?, password = ? WHERE id = ?');
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt->bind_param('ssi', $email, $hashedPassword, $id);
    return $stmt->execute();
}

function deleteUser($id) {
    global $conn;
    $stmt = $conn->prepare('DELETE FROM users WHERE id = ?');
    $stmt->bind_param('i', $id);
    return $stmt->execute();
}

function updateUserPassword($email, $password) {
    global $conn;
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare('UPDATE users SET password = ? WHERE email = ?');
    $stmt->bind_param('ss', $hashedPassword, $email);
    return $stmt->execute();
}

?>
