<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/logo mejorado.jpg" type="image/jpeg">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="reseña.css">
    <title>Reseñas | Noether Nova</title>

    <style>
        /* MODAL FLOTANTE */
        .success-modal {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            background: linear-gradient(135deg, #1e3a2f, #2a5c4a);
            padding: 2.5rem 3rem;
            border-radius: 1.5rem;
            text-align: center;
            max-width: 420px;
            box-shadow: 0 15px 40px rgba(44, 168, 90, 0.5);
            border: 2px solid #4ade80;
            color: white;
            animation: modalPop 0.4s ease;
        }
        @keyframes modalPop {
            from { transform: scale(0.7); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .modal-content h2 {
            color: #7fffa0;
            margin-bottom: 1rem;
        }
        .close-modal {
            margin-top: 1.5rem;
            padding: 0.8rem 2rem;
            background: #4ade80;
            color: #1e3a2f;
            border: none;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <!-- CANVAS FOR STARS -->
    <canvas id="starsCanvas"></canvas>

    <!-- NAV -->
    <nav class="navbar" id="navbar">
        <div class="nav-inner">
            <a href="./index.html" class="logo">
                <img src="img/logo mejorado.jpg" alt="Logo Noether Nova" />
                <span>Noether <em>Nova</em></span>
            </a>
            <ul class="nav-links" id="navLinks"></ul>
            <button class="hamburger" id="hamburger" aria-label="Menú">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- MODAL FLOTANTE -->
    <div class="success-modal" id="successModal">
        <div class="modal-content">
            <h2>✅ ¡Comentario Publicado!</h2>
            <p>Gracias <strong id="modalNombre"></strong> por compartir tu experiencia.<br>
            Tu reseña ya es visible para todos.</p>
            <button class="close-modal" onclick="closeModal()">Cerrar</button>
        </div>
    </div>

    <!-- RESEÑAS -->
    <section class="section" id="reseñas" style="padding-top: 140px;">

        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <a href="./index.html" class="btn-regresar">← Regresar al Inicio</a>
        </div>

        <div class="section-header">
            <span class="section-tag">◈ Testimonios reales</span>
            <h2>Lo que dicen nuestros estudiantes</h2>
            <p>Califica tu experiencia y ayuda a otros a tomar la mejor decisión.</p>
        </div>

        <div class="container-reviews">

            <!-- Formulario -->
            <div class="review-form-card">
                <h3 class="section-title">✍️ Escribe tu reseña</h3>
                <form action="./php/procesar_comentario.php" method="POST" id="review-form">
                    <!-- ... tu formulario completo ... -->
                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label style="display:block; margin-bottom: .5rem; color: var(--muted); font-size: .85rem;">Nombre Completo</label>
                        <input type="text" name="nombre" required placeholder="Ej. María González" style="width:100%; padding: .9rem 1rem; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.15); border-radius: .75rem; color: white;">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label style="display:block; margin-bottom: .5rem; color: var(--muted); font-size: .85rem;">Correo Electrónico</label>
                        <input type="email" name="correo" required placeholder="tu@email.com" style="width:100%; padding: .9rem 1rem; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.15); border-radius: .75rem; color: white;">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label style="display:block; margin-bottom: .5rem; color: var(--muted); font-size: .85rem;">¿A qué universidad presentaste examen?</label>
                        <input type="text" name="universidad" placeholder="Ej. UAEM, UNAM..." style="width:100%; padding: .9rem 1rem; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.15); border-radius: .75rem; color: white;">
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label style="display:block; margin-bottom: .5rem; color: var(--muted); font-size: .85rem;">Curso</label>
                        <select name="curso" required style="width:100%; padding: .9rem 1rem; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.15); border-radius: .75rem; color: white;">
                            <option value="">-- Selecciona tu curso --</option>
                            <option value="curso-a">Curso A - Matemáticas para Ingeniería</option>
                            <option value="curso-b">Curso B - General a Diferentes Carreras</option>
                        </select>
                    </div>

                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label style="display:block; margin-bottom: .5rem; color: var(--muted); font-size: .85rem;">Calificación</label>
                        <div id="star-container" style="display: flex; gap: 8px; font-size: 2.6rem; color: #ffd700; cursor: pointer;">
                            <span class="star" data-value="1">★</span>
                            <span class="star" data-value="2">★</span>
                            <span class="star" data-value="3">★</span>
                            <span class="star" data-value="4">★</span>
                            <span class="star" data-value="5">★</span>
                        </div>
                        <input type="hidden" id="calificacion" name="calificacion" value="5">
                        <small id="rating-text" style="color: var(--gold2); font-weight: 500;">Excelente (5/5)</small>
                    </div>

                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label style="display:block; margin-bottom: .5rem; color: var(--muted); font-size: .85rem;">Tu opinión / Comentario</label>
                        <textarea name="comentario" rows="5" required placeholder="¿Qué te pareció el curso?" style="width:100%; padding: 1rem; background: rgba(0,0,0,.3); border: 1px solid rgba(255,255,255,.15); border-radius: .75rem; color: white;"></textarea>
                    </div>

                    <button type="submit" style="width:100%; padding: 1.1rem; background: var(--gold); color: var(--space-dark); border: none; border-radius: 2rem; font-weight: 700;">Enviar Reseña →</button>
                </form>
            </div>

            <!-- RESEÑAS DE LA BD -->
            <div class="reviews-list">
                <h3 class="section-title">📖 Reseñas Recientes</h3>
                <div id="reviews-container">
                    <?php
                    $host = 'mysql-webfusion.alwaysdata.net';
                    $db   = 'webfusion_noethernova';   // Asegúrate que coincida con tu base de datos
                    $user = 'webfusion';
                    $pass = 'yisusXD4545';

                    try {
                        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
                        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                        $stmt = $pdo->query("SELECT * FROM reseñas ORDER BY fecha DESC LIMIT 10");
                        $hayResenas = false;

                        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            $hayResenas = true;
                            $estrellas = str_repeat('★', (int)$row['calificacion']);
                            echo '
                            <div class="review-item">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem;">
                                    <strong>' . htmlspecialchars($row['nombre']) . '</strong>
                                    <span style="color: #ffd700;">' . $estrellas . '</span>
                                </div>
                                <small style="color: var(--muted);">' . htmlspecialchars($row['curso']) . ' • ' . htmlspecialchars($row['universidad']) . '</small>
                                <p style="margin-top: .8rem; line-height: 1.6;">' . nl2br(htmlspecialchars($row['comentario'])) . '</p>
                            </div>';
                        }

                        if (!$hayResenas) {
                            echo '<div class="empty-state"><p>🌟 Aún no hay reseñas.</p><p>¡Sé el primero!</p></div>';
                        }
                    } catch (Exception $e) {
                        echo '<p style="color:red;">Error: ' . $e->getMessage() . '</p>';
                    }
                    ?>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Mostrar modal si viene con success
        if (window.location.search.includes('success=1')) {
            const modal = document.getElementById('successModal');
            const nombre = new URLSearchParams(window.location.search).get('nombre') || '';
            document.getElementById('modalNombre').textContent = nombre;
            modal.style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('successModal').style.display = 'none';
            // Limpiar URL
            history.replaceState(null, '', window.location.pathname);
        }

        // Estrellas
        const stars = document.querySelectorAll('.star');
        let currentRating = 5;
        const calificacionInput = document.getElementById('calificacion');
        const ratingText = document.getElementById('rating-text');

        function highlightStars(rating) {
            stars.forEach(star => {
                const value = parseInt(star.getAttribute('data-value'));
                star.style.color = value <= rating ? '#ffd700' : '#555';
            });
            calificacionInput.value = rating;
            const texts = ["Muy Malo", "Malo", "Regular", "Bueno", "Excelente"];
            ratingText.textContent = `${texts[rating - 1]} (${rating}/5)`;
        }

        stars.forEach(star => {
            star.addEventListener('click', () => { currentRating = parseInt(star.getAttribute('data-value')); highlightStars(currentRating); });
            star.addEventListener('mouseover', () => highlightStars(parseInt(star.getAttribute('data-value'))));
        });

        document.getElementById('star-container').addEventListener('mouseleave', () => highlightStars(currentRating));
        highlightStars(5);
    </script>

    <script src="app.js"></script>
</body>
</html>