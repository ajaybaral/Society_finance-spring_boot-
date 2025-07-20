<!-- navbar.php -->
<div class="navbar">
    <style>
        /* CSS styles for the navbar */
        .navbar {
            background-color: #333;
            color: #fff;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo img {
            width: 100px; /* Adjust size as needed */
            height: auto;
        }

        .nav-items {
            display: flex;
            align-items: center; /* Add this line to vertically center items */
        }

        .nav-item {
            margin-right: 20px;
        }

        .nav-item a {
            text-decoration: none;
            color: #fff;
            transition: color 0.3s ease;
        }

        .nav-item a:hover {
            color: #ffcc00;
        }
    </style>

    <div class="logo">
        <img src="ani1.png" alt="Logo">
    </div>
    
    <div class="nav-items">
        <?php
        // Check if the user is logged in
        if(isset($_SESSION['username'])) {
            // If logged in, display welcome message with username
            echo "<p class='nav-item'>Welcome, {$_SESSION['username']}!</p>";
        }
        ?>
        <p class="nav-item"><a href="/">HOME</a></p>
        <p class="nav-item"><a href="ABOUT-US">ABOUT US</a></p>
        <p class="nav-item"><a href="#section1">SERVICES</a></p>
        <p class="nav-item"><a href="logout.php">LOGOUT</a></p>
        <p class="nav-item"><a href="CONTACT">CONTACT</a></p>
    </div>
</div>
