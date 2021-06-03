<?php
    $emailErr = $nameErr = $messageErr = "";
    $reportedErrors = array();
    $email = $name = $message = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Email Validation
        if (empty($_POST['inputEmail'])) {
            $emailErr = "Email is required.";
        } else {
            $email = $_POST['inputEmail'];

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $emailErr = "Invalid email format."; 
              }
        }

        if (!empty($emailErr)) {
            array_push($reportedErrors, $emailErr);
        }

        // Name Validation
        if (empty($_POST['inputName'])) {
            $nameErr = "Name is required.";
        } else {
            $name = $_POST['inputName'];

            if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
                $nameErr = "Only letters and white space allowed in name field."; 
              }
        }

        if (!empty($nameErr)) {
            array_push($reportedErrors, $nameErr);
        }

        // Message Validation
        if (empty($_POST['inputMessage'])) {
            $messageErr = "Message is required.";
        } else {
            $message = $_POST['inputMessage'];
        }

        if (!empty($messageErr)) {
            array_push($reportedErrors, $messageErr);
        }
        
        // Error Reporting
        if (!empty($reportedErrors)) {
            header('HTTP/1.1 400 Bad Request Error');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode($reportedErrors));
        } else {
            // Mail Variables
            $m_to = "contact@chadnapper.ca";
            $m_subject = "Message from $name at chadnapper.ca";
            $m_message = $message;
            $m_headers = "From: $email";
            if (mail($m_to, $m_subject, $m_message, $m_headers)) {
                echo "Message successfully sent!";
            }
        }

    }
?>