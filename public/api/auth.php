<?php
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($action === 'register') {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE phone = ? OR email = ?");
    $stmt->execute([$data['phone'], $data['email']]);
    if ($stmt->fetch()) {
        echo json_encode(["error" => "User already exists"]);
        exit;
    }

    $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['name'], $data['email'], $data['phone'], $hashed_password]);
    
    echo json_encode(["success" => true, "user" => [
        "id" => $pdo->lastInsertId(),
        "name" => $data['name'],
        "email" => $data['email'],
        "phone" => $data['phone']
    ]]);
}

if ($action === 'login') {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE phone = ? OR email = ?");
    $stmt->execute([$data['identifier'], $data['identifier']]);
    $user = $stmt->fetch();

    if ($user && password_verify($data['password'], $user['password'])) {
        unset($user['password']);
        echo json_encode(["success" => true, "user" => $user]);
    } else {
        echo json_encode(["error" => "Invalid credentials"]);
    }
}
?>
