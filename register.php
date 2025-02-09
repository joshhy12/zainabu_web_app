<?php
require_once './config/database.php';
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Rest of your registration logic

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $fullName = htmlspecialchars(trim($_POST['full_name']), ENT_QUOTES, 'UTF-8');
        $regNumber = htmlspecialchars(trim($_POST['reg_number']), ENT_QUOTES, 'UTF-8');
        $sex = htmlspecialchars(trim($_POST['sex']), ENT_QUOTES, 'UTF-8');
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $region = htmlspecialchars(trim($_POST['region']), ENT_QUOTES, 'UTF-8');
        $district = htmlspecialchars(trim($_POST['district']), ENT_QUOTES, 'UTF-8');
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO users (full_name, reg_number, sex, email, region, district, password) 
                              VALUES (:fullName, :regNumber, :sex, :email, :region, :district, :password)");

        $stmt->execute([
            ':fullName' => $fullName,
            ':regNumber' => $regNumber,
            ':sex' => $sex,
            ':email' => $email,
            ':region' => $region,
            ':district' => $district,
            ':password' => $password
        ]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Registration successful'
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}
?>
