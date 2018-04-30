// update all the variables that are keeping track of the current song
var setSong = function(songNumber) {
        // stop currentSoundFile if active
        if (currentSoundFile) {
            currentSoundFile.stop();
        }

        // convert passed in value to number
        currentlyPlayingSongNumber = parseInt(songNumber);

        //
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

        // create a buzz object to hold the song playback functionality
        currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
                formats: [ 'mp3' ],
                preload: true
        });
        console.log(currentSoundFile);

        setVolume(currentVolume);
};

// function to set volume
var setVolume = function(volume) {
        if (currentSoundFile) {
            currentSoundFile.setVolume(volume);
        }
};

//
var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
}

var getSongNumberCell = function(number) {
         return  $('.song-item-number[data-song-number="' + number + '"]');
}

// passes in song info into the song row template
var createSongRow = function(songNumber, songName, songLength) {

        //template to be passed in
        var template =
                 '<tr class="album-view-song-item">'
                +'      <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
                +'      <td class="song-item-title">' + songName + '</td>'
                +'      <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
                +'</tr>'
                ;

                // when we click on a song in the table, this function figured out what to do about it
                var clickHandler = function() {
                        // calculate which song number we clicked on
                        var songNumber = parseInt($(this).attr('data-song-number'));

                        // if currentlyPlayingSongNumber is null (which it is initially) execute code
                	if (currentlyPlayingSongNumber !== null) {
                                // revert to song number for currently playing song because user started playing new song.
                                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                                currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                                currentlyPlayingCell.html(currentlyPlayingSongNumber);
                                $('.player-bar .seek-bar .thumb').css({left: currentVolume})
                        }
                        // if the song we clicked on is not the currently playing song
                        if (currentlyPlayingSongNumber !== songNumber) {
                                // run setSong to set the new song
                                setSong(songNumber);
                                currentSoundFile.play();
                                updateSeekBarWhileSongPlays();

                                var $volumeFill = $('.volume .fill');
                                var $volumeThumb = $('.volume .thumb');
                                $volumeFill.width(currentVolume + '%');
                                $volumeThumb.css({left: currentVolume + '%'});

                		$(this).html(pauseButtonTemplate);
                                updatePlayerBarSong();
                	} else if (currentlyPlayingSongNumber === songNumber) {
                		$(this).html(playButtonTemplate);
                                $('.main-controls .play-pause').html(playerBarPlayButton);
                                 if (currentSoundFile.isPaused()) {
                                                  $(this).html(pauseButtonTemplate);
                                                  $('.main-controls .play-pause').html(playerBarPauseButton);
                                                  updateSeekBarWhileSongPlays();
                                                  currentSoundFile.play();
                                                } else {
                                                  $(this).html(playButtonTemplate);
                                                  $('.main-controls .play-pause').html(playerBarPlayButton);
                                                  currentSoundFile.pause();
                                            }
                        }
                };

                var onHover = function(event) {
                    // store the location of the song-item-number element
                    var songNumberCell = $(this).find('.song-item-number');
                    // store the song number attribute
                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

                    // if the hoveredon item is not the currentlyPlayingSongNumber then change to the play button
                    if (songNumber !== currentlyPlayingSongNumber) {
                        songNumberCell.html(playButtonTemplate);
                    }
                };

                var offHover = function(event) {
                     // store the location of the song-item-number element
                    var songNumberCell = $(this).find('.song-item-number');
                    // store the song number attribute
                    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

                    // if the hoveredoff item is not the currentlyPlayingSongNumber then change to the song number
                    if (songNumber !== currentlyPlayingSongNumber) {
                        songNumberCell.html(songNumber);
                  }
                };
                var $row = $(template);
                // execue clickHandler when we click on song-item-number
                $row.find('.song-item-number').click(clickHandler);
                // execute onHover and offHover with an hover event listener
                $row.hover(onHover, offHover);

                return $row;
};

// inject templated imformation into the album.html
var setCurrentAlbum = function(album) {
    // assign album object to currentAlbum
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

    // empty the parent album-view-song-list element
    $albumSongList.empty();

    // loop over the number of album songs and append album songs and titles to the parent album-view-song-list element
        for (var i = 0; i < album.songs.length; i++) {
                var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
                $albumSongList.append($newRow);
    }
};

//
var setupSeekBars = function() {
     // wrap location of both seek bars in a wrapped array
     var $seekBars = $('.player-bar .seek-bar');

     // set up a click function for the seek-bar selector
    $seekBars.click(function(event) {
        // set the horizontal coordinate minus the offset of the seek bar
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        // divide offsetX by the width of the entire bar to calculate seekBarFillRatio
        var seekBarFillRatio = offsetX / barWidth;
        // check if the parent of the seek-bar is changing the volume or the song position
        if ($(this).parent().attr('class') == 'seek-control') {
            // set the playback position in seconds based on current ratio of bar fill times total duration of song in seconds
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            // set volume of song based on current ratio of bar fill times 100
            setVolume(seekBarFillRatio * 100);
        }
        // pass $(this) as the $seekBar argument and seekBarFillRatio for its eponymous argument to updateSeekBarPercentage()
        updateSeekPercentage($(this), seekBarFillRatio);
    });

    // set a mousedown event listener to the thumb class within the seek-bar class
    $seekBars.find('.thumb').mousedown(function(event) {
            // select parent of thumb class
            var $seekBar = $(this).parent();

            // set a namespace for the mousemove event on the thumb class with the bind event listener
            $(document).bind('mousemove.thumb', function(event) {
                    // set the horizontal coordinate minus the offset of the seek bar
                    var offsetX = event.pageX - $seekBar.offset().left;
                    var barWidth = $seekBar.width();
                    // divide offsetX by the width of the entire bar to calculate seekBarFillRatio
                    var seekBarFillRatio = offsetX / barWidth;
                    // check if the parent of the seek-bar is changing the volume or the song position
                    if ($seekBar.parent().attr('class') == 'seek-control') {
                        seek(seekBarFillRatio * currentSoundFile.getDuration());
                    } else {
                        setVolume(seekBarFillRatio);
                    }
                    // pass $(this) as the $seekBar argument and seekBarFillRatio for its eponymous argument to updateSeekBarPercentage()
                    updateSeekPercentage($seekBar, seekBarFillRatio);
            });
            // bind mouseup to thumb class and unbind previous event listener
            $(document).bind('mouseup.thumb', function() {
                $(document).unbind('mousemove.thumb');
                $(document).unbind('mouseup.thumb');
            });
    });
};

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        // bind timeupdate to currentSoundFile which fires during playback
        currentSoundFile.bind('timeupdate', function(event) {
            // redefine seekBarFillRatio by dividing the current playback time by the song duration
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
            setCurrentTimeInPlayerBar(filterTimeCode(currentSoundFile.getTime()));
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }
};

// turn seek bar ratio to a percentage
var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
        // turn value of width and left values for seek bar into percentage
        var offsetXPercent = seekBarFillRatio * 100;
        // make sure the percentage isn't less than 0 or more than 100
        var offsetXPercent =  Math.max(0, offsetXPercent);
        var offsetXPercent =  Math.min(100, offsetXPercent);

        // create a string for the percentage
        var percentageString = offsetXPercent + '%';
        // convert the values of the fill width and thumb position to that of the percentage
        $seekBar.find('.fill').width(percentageString);
        $seekBar.find('.thumb').css({left: percentageString});
};


//  return the index of a song found in album's songs array
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {
    // store index of song from current album
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // increment that index
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // update the Player Bar information
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
    updateSeekBarWhileSongPlays();
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
                     setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.duration));
};

var setTotalTimeInPlayerBar = function(totalTime) {
        $('.total-time').text(totalTime);
}
var setCurrentTimeInPlayerBar = function(currentTime) {
        $('.current-time').text(currentTime);
}

var filterTimeCode = function(timeInSeconds) {
  var parsedTime = parseFloat(timeInSeconds);
  var minutes = Math.floor(parsedTime / 60);
  var secs = parsedTime - minutes * 60;
  var roundSecs = Math.floor(secs);
  return minutes + ':' + roundSecs;
}
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
                setupSeekBars();
                $previousButton.click(previousSong);
                $nextButton.click(nextSong);
                $('.main-controls .play-pause').click(togglePlayFromPlayerBar);
        });
