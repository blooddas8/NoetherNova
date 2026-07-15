<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $host = 'mysql-webfusion.alwaysdata.net';
    $db   = 'webfusion_noethernova';   // Asegúrate que coincida con tu base de datos
    $user = 'webfusion';
    $pass = 'yisusXD4545';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO reseñas 
            (nombre, correo, universidad, curso, calificacion, comentario, fecha) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())");

        $stmt->execute([
            $_POST['nombre'] ?? '',
            $_POST['correo'] ?? '',
            $_POST['universidad'] ?? '',
            $_POST['curso'] ?? '',
            $_POST['calificacion'] ?? 5,
            $_POST['comentario'] ?? ''
        ]);

        // Redirección con mensaje de éxito bonito
        header("Location: ../reseña.php?success=1&nombre=" . urlencode($_POST['nombre']));
        exit;

    } catch (Exception $e) {
        echo "Error al guardar la reseña: " . $e->getMessage();
    }
} else {
    header("Location: ../reseña.php");
    exit;
}

?>