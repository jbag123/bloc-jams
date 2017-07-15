var setSong = function(songNumber) {
        if (currentSoundFile) {
            currentSoundFile.stop();
        }

        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

        currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
                formats: [ 'mp3' ],
                preload: true
            });
        setVolume(currentVolume);
};

var setVolume = function(volume) {
        if (currentSoundFile) {
                currentSoundFile.setVolume(volume);
        }
};

 var getSongNumberCell = function(number) {
         return  $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
 }

var createSongRow = function(songNumber, songName, songLength) {
        // store a template to pass in song inforamtion
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
                                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                                currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                                currentlyPlayingCell.html(setSong());
                	}
                        if (currentlyPlayingSongNumber !== songNumber) {
                                setSong(songNumber);
                                currentSoundFile.play();
                		$(this).html(pauseButtonTemplate);
                                updatePlayerBarSong();
                	} else if (currentlyPlayingSongNumber === songNumber) {
                		$(this).html(playButtonTemplate);
                                $('.main-controls .play-pause').html(playerBarPlayButton);
                                if (currentSoundFile.isPaused()) {
                                        $(this).html(pauseButtonTemplate);
                                        $('.main-controls .play-pause').html(playerBarPauseButton);
                                        currentSoundFile.play();
                                } else {
                                        $(this).html(playButtonTemplate);
                                        $('.main-controls .play-pause').html(playerBarPlayButton);
                                        currentSoundFile.pause();
                                }
                        }
        };

                var onHover = function(event) {
                    var songNumberCell = $(this).find('.song-item-number');
                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

                    if (songNumber !== setSong()) {
                        songNumberCell.html(playButtonTemplate);
                    }
                };

                var offHover = function(event) {
                    var songNumberCell = $(this).find('.song-item-number');
                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

                    if (songNumber !== setSong()) {
                        songNumberCell.html(songNumber);
                    }
                    console.log("songNumber type is " + typeof songNumber + "\n and setSong() type is " + typeof setSong());
                };
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    // store the album information on album.html page in variablels
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    // set the information as album object properties
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    // clear the album-view-song-list element
    $albumSongList.empty();
        // loop over the length of the album songs property and append a call to createSongRow in the album-view-song-list element
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
    var lastSongNumber = setSong();

    // Set a new current song
    setSong(currentSong + 1);
    currentSoundFile.play();
    setSong(currentAlbum.songs[currentSong]);

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + setSong() + '"]');
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

    var lastSongNumber = setSong();

    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + setSong() + '"]');
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

// templates for play/pause button in the song rows
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// templates for play/pause button in the player
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentVolume = 80;
var currentlyPlayingSongNumber = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
        setCurrentAlbum(albumPicasso);
});
