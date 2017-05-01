$(document).ready(function(){
	var playSong = function (song) {
		var player = $("#player")[0];
		var songSource = $("<source/>", {
			src: song.src
		});

		$(player)
		.empty()
		.append(songSource);
		player.load();
		player.play();
	}

	var onSongClick = function (clickEvent) {
		var element = clickEvent.target;
		var song = $(element).data()

		$("#song-name").html(song.name);
		$("#song-artist").html(song.artist);
		$("#song-url").html(song.src);
		$("#song-description").html(song.info);
		playSong(song)
	}

	var displaySongs = function (songs) {
		var list = $("#song-list");

		$.each(songs, function (key, song) {
			var element = $('<a/>')
			.html(song.name)
			.attr('id', key)
			.addClass("list-group-item")
			.data(song)
			.click(onSongClick)
			.appendTo(list);
		});
	}

	$.ajax({
		url: 'songs.json',
		dataType: 'json',
		method: 'GET'
	}).done(function (data) {
		displaySongs(data)
		console.log('consume data', data);
	});
});