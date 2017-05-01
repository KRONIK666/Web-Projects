<?php

$song_id = $_REQUEST["song_id"];
$songs = json_decode(file_get_contents("songs.json"), true);

unset($songs[$song_id]);
file_put_contents("songs.json", json_encode($songs));

$output = array(
	"success" => true
	);

echo json_encode($output);
die();