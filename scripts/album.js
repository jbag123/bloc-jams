
// update all the variables that are keeping track of the current song
var setSong = function(songNumber) {
        if (currentSoundFile) {
            currentSoundFile.stop();
        }

        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        // create a buzz object to hold the song playback functionality
        currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
                formats: [ 'mp3' ],
                preload: true
        });
        console.log(currentSoundFile);

        setVolume(currentVolume);
};

var setVolume = function(volume) {
        if (currentSoundFile) {
            currentSoundFile.setVolume(volume);
        }
};

 var getSongNumberCell = function(number) {
         return  $('.song-item-number[data-song-number="' + number + '"]');
 }

var createSongRow = function(songNumber, songName, songLength) {
        var template =
                  '<tr class="album-view-song-item">'
                +'      <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
                +'      <td class="song-item-title">' + songName + '</td>'
                +'      <td class="song-item-duration">' + songLength + '</td>'
                +'</tr>'
                ;

                // when we click on a song in the table, this function figured out what to do about it
                var clickHandler = function() {
                        // calculate which song number we clicked on
                        var songNumber = parseInt($(this).attr('data-song-number'));

                	if (currentlyPlayingSongNumber !== null) {
                                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                                currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                                currentlyPlayingCell.html(currentlyPlayingSongNumber);
                	}
                        // if the song we clicked on is not the currently playing song
                        if (currentlyPlayingSongNumber !== songNumber) {
                                // run setSong to set the new song
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
                };
                var $row = $(template);

                $row.find('.song-item-number').click(clickHandler);
                // #2
                $row.hover(onHover, offHover);
                // #3
                return $row;
};

// inject templated imformation into the album.html

var setCurrentAlbum = function(album) {

    currentAlbum = album;
    // store album info into variables
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    // replace the empty elements with information stored in objects in fixtures.js
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    // empty the parent album-view-song-list' element
    $albumSongList.empty();

    // loop over the number of album songs and append album songs and titles to the parent album-view-song-list' element
        for (var i = 0; i < album.songs.length; i++) {
                var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
                $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
                    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
                    $('.currently-playing .artist-name').text(currentAlbum.artist);
                    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

                    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var togglePlayFromPlayerBar = function() {
        // if (currentSoundFile = null) {
        //     currentSoundFile.play();
        // }
        if (currentSoundFile.isPaused()) {
                var currentSongCell = getSongNumberCell(currentlyPlayingSongNumber);
                currentSongCell.html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
        } else if (currentSoundFile) {
                var currentSongCell = getSongNumberCell(currentlyPlayingSongNumber);
                currentSongCell.html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                 currentSoundFile.pause();
        }
}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
// when the page loads currentSoundFile is empty
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
                // when the page loads, setCurrentAlbum displays the  album data on the page and sets up event listeners for click and hover
                setCurrentAlbum(albumPicasso);
                $previousButton.click(previousSong);
                $nextButton.click(nextSong);
                $('.main-controls .play-pause').click(togglePlayFromPlayerBar);
        });
