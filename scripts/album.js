var createSongRow = function(songNumber, songName, songLength) {
        var template =
                  '<tr class="album-view-song-item">'
                +'      <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
                +'      <td class="song-item-title">' + songName + '</td>'
                +'      <td class="song-item-duration">' + songLength + '</td>'
                +'</tr>'
                ;

                var $row = $(template);

                $row.find('.song-item-number').click(clickHandler);
                // #2
                $row.hover(onHover, offHover);
                // #3
                return $row;

                var clickHandler = function() {
                        var songNumber = parseInt($(this).attr('data-song-number'));

                	if (currentlyPlayingSongNumber !== null) {
                                var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
                                currentlyPlayingCell.html(currentlyPlayingSongNumber);
                	}
                        if (currentlyPlayingSongNumber !== songNumber) {
                		$(this).html(pauseButtonTemplate);
                                currentlyPlayingSongNumber = songNumber;
                                currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
                                updatePlayerBarSong();
                	} else if (currentlyPlayingSongNumber === songNumber) {
                		$(this).html(playButtonTemplate);
                                $('.main-controls .play-pause').html(playerBarPlayButton);
                		currentlyPlayingSongNumber = null;
                                currentSongFromAlbum = null;
                        }
                };

                var onHover = function(event) {
                    var songNumberCell = $(this).find('.song-item-number');
                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

                    if (songNumber !== currentlyPlayingSongNumber) {
                        songNumberCell.html(playButtonTemplate);
                    }
                };

                var offHover = function(event) {
                    var songNumberCell = $(this).find('.song-item-number');
                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

                    if (songNumber !== currentlyPlayingSongNumber) {
                        songNumberCell.html(songNumber);
                    }
                    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
                };
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

        for (var i = 0; i < album.songs.length; i++) {
                var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
                $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    // create a variable for current song
    var currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSong++;

    if (currentSong >= currentAlbum.songs.length) {
        currentSong = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSong + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSong];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    // create a variable for current song
    var currentSong = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSong--;

    if (currentSong < currentAlbum.songs.length) {
        currentSong = 0;
    }

    var lastSongNumber = currentlyPlayingSongNumber;

    currentlyPlayingSongNumber = currentSong + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSong];

    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
        // create variables for each tag
        var $playerSongName = $('song-name');
        var $playerSongNameMobile = $('artist-song-mobile');
        var $playerArtistName = $('artist-name');

        // update the text of the player bar h2 tags with the song and artist name
        $playerSongName.text(currentSongFromAlbum.title);
        $playerSongNameMobile.text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        $playerArtistName.text(currentAlbum.artist);

        $('.main-controls .play-pause').html(playerBarPauseButton);

}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

        $(document).ready(function() {
                setCurrentAlbum(albumPicasso);
        });
