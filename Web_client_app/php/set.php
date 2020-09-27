<?php
echo "dziala";
$settings = array();
$settingsFile = fopen('settings.json');

$settings['url'] = $_POST['url'];
$settings['port'] = $_POST['port'];
$settings['sampleTime'] = $_POST['sampleTime'];
$settings['maxSampleNum'] = $_POST['maxSampleNum'];

$settingsJson = json_encode($settings);
fwrite($settingsFile, $settingsJson);
fclose($settingsFile);

?>