<?php
header('Content-Type: application/json');

$url = "https://api.baubuddy.de/index.php/login";

$headers = [
    "Authorization: Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz",
    "Content-Type: application/json"
];

$data = json_encode([
    "username" => "365",
    "password" => "1"
]);

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_CAINFO => __DIR__ . "/cacert-2024-11-26.pem"
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

$responseData = json_decode($response, true);
$accessToken = $responseData["oauth"]["access_token"] ?? null;

if (!$accessToken) {
    http_response_code(401);
    echo json_encode(["error" => "Failed to authenticate"]);
    exit;
}

$tasksUrl = "https://api.baubuddy.de/dev/index.php/v1/tasks/select";

$tasksHeaders = [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
];

$tasksCurl = curl_init();
curl_setopt_array($tasksCurl, [
    CURLOPT_URL => $tasksUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => $tasksHeaders,
    CURLOPT_CAINFO => __DIR__ . "/cacert-2024-11-26.pem"
]);

$tasksResponse = curl_exec($tasksCurl);
$tasksHttpCode = curl_getinfo($tasksCurl, CURLINFO_HTTP_CODE);
curl_close($tasksCurl);

if ($tasksHttpCode !== 200) {
    http_response_code($tasksHttpCode);
    echo $tasksResponse;
    exit;
}

echo $tasksResponse;
?>
