<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll();
    echo json_encode($products);
}

if ($method === 'POST') {
    // Admin functionality to add products
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['name'], $data['price'])) {
        echo json_encode(["error" => "Invalid data"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO products (name, description, price, category, image_url, is_featured, is_bestseller, is_new, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['description'] ?? '',
        $data['price'],
        $data['category'] ?? 'Cookies',
        $data['image_url'] ?? '',
        $data['is_featured'] ?? 0,
        $data['is_bestseller'] ?? 0,
        $data['is_new'] ?? 0,
        $data['stock'] ?? 100
    ]);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
}
?>
