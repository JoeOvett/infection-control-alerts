<?php
require __DIR__ . "/database.php"; // Your existing database connection

$sql = "SELECT * FROM acknowledged_records";
$result = $mysqli->query($sql);

$records = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    echo json_encode($records);
} else {
    echo json_encode(['error' => $mysqli->error]);
}
?>
