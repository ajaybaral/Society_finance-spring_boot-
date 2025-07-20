<!DOCTYPE html>
<html>
<head>
    <title>Enter Voucher Claim</title>
    <style>
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            max-height: auto; /* Set maximum height */
            overflow-y: auto; /* Make container scrollable */
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            align-items: center;
            min-height: 100vh; /* Use min-height instead of height */
        }

        h2 {
            text-align: center;
            color: #333;
        }

        form {
            max-width: 400px;
            margin: 0 auto;
        }

        label {
            display: block;
            margin-bottom: 10px;
        }

        input[type="date"],
        input[type="number"],
        input[type="text"],
        textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
        }
        select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 16px;
        }

        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table th,
        table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        table th {
            background-color: #f2f2f2;
        }

        .delete-btn {
            background-color: #ff5555;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
        }

        .delete-btn:hover {
            background-color: #cc0000;
        }
    </style>
</head>
<body>
    <div class="container">
    <?php include 'navbar.php'; ?>
        <h2>Enter Voucher Claim</h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required><br><br>

            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>

            <label for="reason">Reason:</label>
 <select id="reason" name="reason" required>
    <option value="">Select Reason</option>
    <optgroup label="Repair & Maint.">
        <option value="Repair & Maint.(Drainage line)">Repair & Maint.(Drainage line)</option>
        <option value="Repair & Maint.(Water line)">Repair & Maint.(Water line)</option>
        <option value="Repair & Maint.(General)">Repair & Maint.(General)</option>
        <option value="Repair & Maint.(Gardening)">Repair & Maint.(Gardening)</option>
        <option value="Repair & Maint.(Construction Work)">Repair & Maint.(Construction Work)</option>
        <option value="Repair & Maint.(Other)">Repair & Maint.(Other)</option>
    </optgroup>
    <optgroup label="Electricity charges">
        <option value="Electricity charges">Electricity charges</option>
        <option value="Electricity charges(Bore well)">Electricity charges(Bore well)</option>
    </optgroup>
    <optgroup label="Water charges"> 
     <option value="Water charges">Water charges</option>
        <option value="Water Tank Cleaning Exps.">Water Tank Cleaning Exps.</option>
    </optgroup> 
    <optgroup label="Salary & Wages">
        <option  value="Salary & Wages (Sweeper)">Salary & Wages (Sweeper)</option>
        <option  value="Salary & Wages (Waterman)">Salary & Wages (Waterman)</option>
    </optgroup>       
    <optgroup label="Professional Fees">
        <option  value="Auditor Fees">Auditor Fees</option>
        <option  value="Account Writing Fees">Account Writing Fees</option>
        <option  value="Professional Charges">professional Charges</option>
        <option  value="Legal Fees"> Legal Fees</option>
    </optgroup>
    <optgroup label="General Expenses">
        <option  value="Diwali Gift">Diwali Gift</option>
        <option  value="AGM/Meeting Expenses">AGM/Meeting Expenses</option>
        <option  value="Conveyance">Conveyance</option>
    </optgroup>
    <optgroup label="Insurance ">
        <option  value="Insurance Premium">Insurance Premium</option>
    </optgroup>

</optgroup>
 </select>
            <label for="amount">Amount:</label>
            <input type="number" step="5" id="amount" name="amount" required><br><br>

            <label for="Description">Description:</label><br>
            <textarea id="Description" name="Description" rows="4" cols="50" required></textarea><br><br>

            <input type="submit" value="Submit" name="submit">
        </form>
    

<?php
// Establish database connection (replace with your credentials)
include "connect.php";


// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["submit"])) {
    // Prepare data for insertion
    $date = $_POST["date"];
    $name = $_POST["name"];
    $amount = $_POST["amount"];
    $reason = $_POST["reason"];
    $Description = $_POST["Description"];

    // SQL query to insert data into the database
    $sql = "INSERT INTO voucher_claims (`date`, `name`, `amount`, `reason`,`Description`)
            VALUES ('$date', '$name', '$amount', '$reason', '$Description')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Check if id parameter is set for deletion
if (isset($_POST['id'])) {
    // Escape user inputs for security
    $id = $conn->real_escape_string($_POST['id']);

    // Delete record from the table
    $sql = "DELETE FROM voucher_claims WHERE id = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
}

// Fetch recent voucher claims records
$sql = "SELECT * FROM voucher_claims ORDER BY id DESC LIMIT 5"; // Change the LIMIT as per your requirement
$result = $conn->query($sql);

// Display records in a table
if ($result->num_rows > 0) {
    echo "<table id='voucher-claims-table'>";
    echo "<tr><th>Date</th><th>Name</th><th>Amount</th><th>Reason</th><th>Description</th><th>Action</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr id='row-" . $row['id'] . "'>";
        echo "<td>" . $row["date"] . "</td>";
        echo "<td>" . $row["name"] . "</td>";
        echo "<td>" . $row["amount"] . "</td>";
        echo "<td>" . $row["reason"] . "</td>";
        echo "<td>" . $row["Description"] . "</td>";
        echo "<td><button class='delete-btn' data-id='" . $row["id"] . "'>Delete</button></td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "No recent voucher claims records found.";
}

// Close database connection
$conn->close();
?>

<script>
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle record deletion
    function deleteRecord(event) {
        // Prompt user for confirmation
        const confirmation = confirm("Are you sure you want to delete this record?");
        
        // Proceed with deletion if user confirms
        if (confirmation) {
            const id = event.target.dataset.id;

            // Send an AJAX request to delete the record from the database
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Remove the row from the table upon successful deletion
                    const row = document.getElementById('row-' + id);
                    if (row) {
                        row.remove();
                    }
                } else {
                    console.error('Error deleting record');
                }
            };
            xhr.send('id=' + id);
        }
    }

    // Add event listeners to all delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteRecord);
    });
});
</script>


</body>
</html>
