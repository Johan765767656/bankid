<?php

require_once __DIR__ . '/vendor/autoload.php';

use Dimafe6\BankID\Service\BankIDService;

echo "<h1>BankID Library</h1>";
echo "<p>Status: <strong style='color:green'>Running ✅</strong></p>";
echo "<p>PHP Version: " . phpversion() . "</p>";

// Check if the BankIDService class is available
if (class_exists('Dimafe6\BankID\Service\BankIDService')) {
    echo "<p>BankIDService: <strong style='color:green'>Loaded ✅</strong></p>";
} else {
    echo "<p>BankIDService: <strong style='color:red'>Not Found ❌</strong></p>";
}
