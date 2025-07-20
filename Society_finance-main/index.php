<?php
session_start();



;

// Check if user is not logged in, redirect to login page
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Your existing code for Maintainance.php goes here...



   


$servername = "sql206.infinityfree.com";
$username = "if0_36253564";
$password = "Anita1234Ajay";
$dbname = "if0_36253564_society";

try {
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if it doesn't exist
    $sql_create_db = "CREATE DATABASE IF NOT EXISTS if0_36253564_society";
    $conn->exec($sql_create_db);
    
    // Switch to the created database
    $conn->exec("USE society");
    
    // Create maintenance_records table if it doesn't exist
    $sql_create_maintenance_records = "CREATE TABLE IF NOT EXISTS  `maintenance_records` (
        `id` int(11) NOT NULL,
        `date` date NOT NULL,
        `month_year` varchar(7) NOT NULL,
        `receipt_no` bigint(20) DEFAULT NULL,
        `flat_no` varchar(10) NOT NULL,
        `payment_amount` float NOT NULL,
        `sinking_fees` float NOT NULL,
        `parking_fees` tinyint(1) NOT NULL,
        `non_occupancy_Fees` decimal(10,2) DEFAULT NULL,
        `late_fees` tinyint(1) NOT NULL,
        `final_amount` float NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
    $conn->exec($sql_create_maintenance_records);
    
    // Create voucher_claims table if it doesn't exist
    $sql_create_voucher_claims = "CREATE TABLE IF NOT EXISTS `voucher_claims` (
        `id` int(11) NOT NULL,
        `date` date NOT NULL,
        `name` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `reason` varchar(500) NOT NULL,
        `Description` varchar(400) DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;";
    $conn->exec($sql_create_voucher_claims);

    $sql_create_Flat_Details="CREATE TABLE IF NOT EXISTS flat_details (
        flat_no VARCHAR(10) PRIMARY KEY,
        total_months INT,
        total_payment_amount FLOAT,
        total_sinking_fees FLOAT,
        total_parking_fees INT,
        total_late_fees INT,
        total_non_occupancy_fees DECIMAL(10, 2),
        total_final_amount FLOAT,
        receipt_nos TEXT
    )";
    $conn->exec($sql_create_Flat_Details);  
    
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Society Management</title>
    <style>
        /* Reset some default styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Body styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }

        /* Navbar styles */
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

        .slider {
            position: relative;
            width: 75%;
            height: 500px;
            margin: 30px auto 0;
        }

        .slider ul {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            z-index: 3;
        }

        .slider ul li {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #cccccc;
            list-style: none;
            margin: 0 10px;
            display: inline-block;
            cursor: pointer;
        }

        .slider ul li.active {
            background-color: #b9f;
            opacity: 0.4;
        }

        .slider-img div {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            opacity: 0;
        }

        .slider-img div.active {
            opacity: 1;
        }

        .slider-img img {
            width: 100%;
            height: 100%;
        }

        .slider p {
            position: absolute;
            z-index: 2;
            top: 50%;
            color: #cccccc;
            padding: 20px;
            cursor: pointer;
        }

        .slider .next {
            right: 0;
        }

        /* Section styles */
        body p:hover {
            color: saddlebrown;
        }

        .section1 {
            padding: 20px;
            background-color: #fff;
            margin: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .section1 h2 {
            color: #333;
            margin-bottom: 15px;
        }

        .services-list {
            margin-left: 20px;
            padding-left: 20px;
            border-left: 2px solid #ccc;
            justify-content: center;
            align-items: center;
          
        }

        .services-list p {
            margin-bottom: 20px;
            justify-content: center;
            display: flex ;
            align-items: center;
            list-style-type: disc;
        }

        .services-list p a {
            color: #333; /* Services link color */
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .services-list p a:hover {
            color: green;
            text-decoration-line: underline; /* Services link hover color */
        }

        /* Footer styles */
        .footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            margin-top: 20px;
            border-top: 1px solid #666;
        }

        .footer a {
            color: #fff;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer a:hover {
            color: #ffcc00;
        }

        .container {
            max-width: auto;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            font-weight: bold;
            display: block;
        }

        input[type="text"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        textarea {
            resize: vertical;
            height: 100px;
        }

        input[type="submit"] {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="navbar">
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
           <p class="nav-item"><a href="ABOUT_US.php">ABOUT US</a></p>
            <p class="nav-item"><a href="#section1">SERVICES</a></p>
            <p class="nav-item"><a href="logout.php">LOGOUT</a></p>
            <p class="nav-item"><a href="#contact">CONTACT</a></p>
        </div>
    </div>

    <section class="slider" id="slide-img">
        <ul>
            <li class="dot active" onclick="currentSlide(1)"></li>
            <li class="dot"></li>
            <li class="dot"></li>
            <li class="dot"></li>
        </ul>

        <div class="slider-img">
            <div class="item item1 active">
                <img src="https://wallpapercave.com/wp/wp4222955.jpg"/>
            </div> 
            <div class="item item2">
                <img src="https://wallpapercave.com/wp/N9UTEim.jpg"/>
            </div> 
            <div class="item item3">
                <img src="https://wallpapercave.com/wp/wp4222962.jpg"/>
            </div> 
            <div class="item item4">
                <img src="https://wallpapercave.com/wp/wp4222963.jpg"/>
            </div>             
        </div>  
        <p class="next">
            <i class="fas fa-chevron-right"></i>
        </p>
        <p class="prev">
            <i class="fas fa-chevron-left"></i>
        </p>
    </section>

    <section class="section1" id="section1">
        <div class="content">
            <h2>SERVICES</h2>
            <div class="services-list">
                <p><a href="maintainance.php">PAY MAINTENANCE</a></p>
                <p><a href="Fetchmaintainance.php">MAINTENANCE RECORD</a></p>
                <p><a href="Voucher.php">VOUCHER CLAIM</a></p>
                <p><a href="FetchVoucher.php">VOUCHER RECORDS</a></p>
                <p><a href="balance.php">KNOW FINANCE STATUS</a></p>
                <p><a href="OTHER_FUNDS_CREDIT.php">OTHER FUNDS CREDIT</a></p>
                <p><a href="OTHER_FUNDS_DEBIT.php">OTHER FUNDS DEBIT</a></p>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <h2>Contact Us</h2>
            <form action="#" method="post">
                <div class="form-group">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <div class="form-group">
                    <input type="submit" value="Submit">
                </div>
            </form>
        </div>
    </section>

    <footer class="footer">
        <p>COPYRIGHT - BY DHARMRAJ APT</p>
    </footer>

    <script>
        function check(){
            var currentImg = $('.slider-img .active');
            var imgNum = currentImg.index();
            var dotNum = $('.dot').eq(imgNum);
            dotNum.addClass('active').siblings().removeClass('active');
        }

        //  function to set the slide show automatic
        var slideIndex = 0;

        function mySlider() {
            var imgs = document.getElementsByClassName("item");
            for(var i = 0; i< imgs.length; i++){
                imgs[i].classList.remove('active');
            }
            slideIndex ++;
            if(slideIndex > imgs.length){slideIndex = 1}
            imgs[slideIndex- 1].classList.add("active");

            check()
        }


        let coursel = setInterval(mySlider, 1000);
        let imgHover = document.querySelector('.slider-img') 
        imgHover.addEventListener("mouseover", function(){
            clearInterval(coursel);
        });
        imgHover.addEventListener("mouseleave", function(){
            coursel = setInterval(mySlider, 1000);
        });


        $(document).ready(function(){
            //slide to right
            $('.next').on('click', function(){
                clearInterval(coursel);
                var currentImg = $('.slider-img .active');
                var nextImg = currentImg.next();

                if(currentImg.is(':last-child')){

                    currentImg.delay(1000).removeClass('active');
                    $('.slider-img div').eq(0).addClass('active');
                }else{
                    currentImg.delay(1000).removeClass('active');
                    nextImg.addClass('active');

                }  
                check()

            });

            //Slide to left
            $('.prev').on('click', function(){
                clearInterval(coursel);
                var currentImg = $('.slider-img .active');
                var prevImg = currentImg.prev();

                if(currentImg.is(':first-child')){
                    currentImg.delay(1000).removeClass('active');
                    $('.slider-img div:last-child').addClass('active');
                }else{
                    currentImg.delay(1000).removeClass('active');
                    prevImg.addClass('active');
                }
                check()

            });


            $('.dot').on('click', function(){
                clearInterval(coursel);
                var index = $(this).index();
                var currentSlide = $('.slider-img div').eq(index);
                currentSlide.addClass('active');
                $('.slider-img div').not(currentSlide).removeClass('active');
                $(this).addClass('active').siblings().removeClass('active');
            });

        });
    </script>
</body>
</html>
