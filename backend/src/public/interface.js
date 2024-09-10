$(window).on('load', function() {
    console.log("loaded")
    // preloader
    $('.preloader').hide();
    $('#header').css('position', 'relative');
    $('.nav__user .material-icons').addClass('show--icons');

    // hide the feature window
    if ($('.feature__switcher').data('switch') == "hidden") {
        $('.feature > *').hide();
        $('.feature__list_item').hide();
        
        $('.feature__list').show();
        $('.show__always').show();
        $('.feature__switcher').show();
    }
});

$(function () {
    // //#### WARNING WINDOW
    // if (GetCookies('warning') == '1') {
    //     $('#modalWarning').css('display', 'none');
    //     $('#overlayWarning').css('display', 'none');
    // }
    // $('#overlayWarning').on('click', function() {
    //     document.cookie = 'warning=1;path=/;max-age=86400';
    // });

    // //#### SESSION
    // var cookieSession = 'ss';
    // var getFullCookieJSON = document.cookie.match(new RegExp("(?:^|; )"+cookieSession.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    
    // if (getFullCookieJSON == null) {
    //     // do some code for first time on website

    //     document.cookie = 'ss=1;path=/;max-age='+(365*24*60*60*1000);
    // }

    //#### Feature
    $('.feature__advice_question').on('click', function() {
        $(this).closest('.feature__advice').find('.feature__advice_img').show();
        $('#overlayFeature').show();
    });
    $('.feature__switcher').on('click', function() {
        if ($(this).data('switch') == 'hidden') {
            $(this).data('switch', '');

            $('.feature > *').show();
            $('.feature__list_item').show();
        }
        else {
            $(this).data('switch', 'hidden');

            $('.feature > *').hide();
            $('.feature__list_item').hide();
            
            $('.feature__list').show();
            $('.show__always').show();
            $(this).show();
        }
    });

    //#### Is bid?
    var isBid;
    if ($('meta[name=bid]').length > 0) isBid = true;
    else isBid = false;

    //#### Focus on #SearchBy input
    $('#SearchBy').focus();
    // Focus function
    $('#SearchBy').focus(function() {
        $(this).select();
    });
    // Send form after a paste
    $('#SearchBy').on('paste', function(e) {
        e.preventDefault();
        var data = (e.originalEvent || e).clipboardData.getData('text/plain');
        $(this).val(data);

        $('#SearchForm').trigger('submit');
    });
    
    //#########################################################
    //#### Submit the #SearchForm and Launch loading on checker
    $('#SearchForm').submit(function(e) {
        e.preventDefault();
        var search_by = $('#SearchBy');

        if (search_by.val()) {
            if ((search_by.val().indexOf('http') == 0)) {
                if ((search_by.val().indexOf('https://www.youtube.com/') == -1) && (search_by.val().indexOf('https://youtu.be/') == -1) && (search_by.val().indexOf('https://m.youtube.com/') == -1) && (search_by.val().indexOf('https://music.youtube.com/') == -1) && (search_by.val().indexOf('https://youtube.com/') == -1)) {
                    if (GetLanguage('en')) {
                        search_by.val('').attr('placeholder', 'we only check from youtube');
                    }
                    else if (GetLanguage('ru')) {
                        search_by.val('').attr('placeholder', 'проверяем только с youtube');
                    }
                    else if (GetLanguage('uk')) {
                        search_by.val('').attr('placeholder', 'перевіряємо лише з youtube');
                    }

                    return false;
                }
            }

            $('.search__result').removeClass('hidden');
            $('.search__animation').css('display', 'block');
            $('#SearchForm').unbind('submit').submit();

            if (GetLanguage('en')) {
                $('#SearchSubmit').val('CHECKING').css('cursor', 'not-allowed').attr('disabled', 'disabled');
            }
            else if (GetLanguage('ru')) {
                $('#SearchSubmit').val('ПРОВЕРЯЕМ').css('cursor', 'not-allowed').attr('disabled', 'disabled');
            }
            else if (GetLanguage('uk')) {
                $('#SearchSubmit').val('ПЕРЕВІРЯЄМО').css('cursor', 'not-allowed').attr('disabled', 'disabled');
            }

            $('.first').removeClass('active-block');
            $('.wait').addClass('active-block');

            // Scroll to the #SearchTitle after click to check
            var destination = $('#SearchTitle').offset().top - 30;
            $('html').animate({ scrollTop: destination }, 1000);

            if ($('.search__list').length) {
                $('.search__list_item:not(#share-to-social)').remove();                
            }
            else {
                $('.search__result').append('<div class="search__list"><div class="search__animation"><img src="images/icons/logotype_loading.png" alt="eproves logotype animation"></div></div>');                
            }
            $('.result--hidden').hide();
        }
        else {
            if (GetLanguage('en')) {
                search_by.attr('placeholder', 'enter the title of the song');
            }
            else if (GetLanguage('ru')) {
                search_by.attr('placeholder', 'укажите название песни');
            }
            else if (GetLanguage('uk')) {
                search_by.attr('placeholder', 'вкажіть назву пісні');
            }
        }
    });
    
    //#### Search topics
    $('.topic__list_item').click(function() {        
        var youtubeId = $(this).attr('data-id');

        $('#SearchBy').val('https://www.youtube.com/watch?v=' +youtubeId);
        $('#SearchForm').trigger('submit');
    });

    //#### Toggle the #overlayReport and #modalReport
    var isClickedReport = false;
    $('#Report').click(function() {
        //## refresh input content
        var feedbackForm = $('#FeedbackOfIndex, #FeedbackOfMusicList');
        feedbackForm.find('input[type="submit"]').css('background-color', '#129ae9');
        if (GetLanguage('en')) {
            feedbackForm.find('input[type="submit"]').val('SUBMIT');
        }
        else if (GetLanguage('ru')) {
            feedbackForm.find('input[type="submit"]').val('ОТПРАВИТЬ');
        }
        else if (GetLanguage('uk')) {
            feedbackForm.find('input[type="submit"]').val('ВІДПРАВИТИ');
        }
        feedbackForm.trigger('reset');

        //## show the feedback modal window
        $('#overlayReport').show();
        $('#modalReport').show();
        $(this).css({'box-shadow': '0 0 0 4px #dbbcbc', 'color': '#f44336'});

        if ($('form').is('#FeedbackOfMusicList')) {
            var formFeedbackMusic = $('#FeedbackOfMusicList');

            formFeedbackMusic.find('input[name=video_searchBy]').val(musicItemSongName);
            formFeedbackMusic.find('input[name=video_href]').val(musicItemYouTubeLink);
        }

        isClickedReport = true;
    });
    $('#overlayReport, #overlayAlert, #overlayWarning').click(function() {
        $(this).hide();
        $('.modalWindow').hide();
    });
    $('#overlayFeature').click(function() {
        $(this).hide();
        $('.feature__advice_img').hide();
    });
    $('.modalAlert .button').click(function() {
        $('#overlayAlert').hide();
        $('.modalAlert').hide();
    });
    $('#FeedbackOfIndex input[type=submit], #FeedbackOfMusicList input[type=submit]').click(function(e) {
        e.preventDefault();

        if (GetLanguage('en')) {
            $(this).find('input[type="submit"]').val('SUBMITTED!').css('background-color', '#339933');
        }
        else if (GetLanguage('ru')) {
            $(this).find('input[type="submit"]').val('ОТПРАВЛЕНО!').css('background-color', '#339933');
        }
        else if (GetLanguage('uk')) {
            $(this).find('input[type="submit"]').val('ВІДПРАВЛЕНО!').css('background-color', '#339933');
        }

        // AJAX
        if (isClickedReport) {
            var $form = $('#FeedbackOfIndex, #FeedbackOfMusicList');
                $.ajax({
                    type: $form.attr('method'),
                    url: $form.attr('action'),
                    data: $form.serialize()
                }).done(function() {
                    console.log('success');
                }).fail(function() {
                    console.log('fail');
            });
        } 

        setTimeout(function() {
            $('#modalReport').fadeOut();
            $('#overlayReport').fadeOut();
        }, 1000);
    });


    // ## Lock for Like
    $('.lock__like').click(function() {
        flagLike = 1;

        $('#modalLike').show();
        $('#overlayAlert').show();
    });

    //#### Send data of "Like"
    var flagLike = 0;
    var iframeId = $('#iframeYoutube').attr('data-youtube-id');
    //#### Music to Check
    $('#Check').click(function() {
        $('#CheckForm input[name=searchBy]').val(iframeId);
        $('#CheckForm').submit();
    });
    //### Likes
    var likeTitle = $('#iframeYoutube').attr('data-youtube-title');
    $('#Like').click(function() {
        if (flagLike != 0) return false;

        $('#LikeForm').find('input[name=likeID]').val(iframeId);
        $('#LikeForm').find('input[name=likeTitle]').val(likeTitle);
        $(this).css({'box-shadow': '0 0 0 4px #bcdbbd', 'color': '#4caf50'});

        // AJAX
        var $form = $('#LikeForm');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize()
            }).done(function() {
                console.log('success');
            }).fail(function() {
                console.log('fail');
        });

        flagLike = 1;
    });
    //#### Send data of "Download"
    var flagDownload = 0;
    $('#Download').click(function() {
        if (flagDownload != 0) return false;

        $('#DownloadForm').find('input[name=downloadID]').val(iframeId);
        $(this).css({'box-shadow': '0 0 0 4px #d1c4a7', 'color': '#129ae9'});
        // AJAX
        var $form = $('#DownloadForm');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize()
            }).done(function() {
                console.log('success');
            }).fail(function() {
                console.log('fail');
        });

        if (GetLanguage('en')) {
            window.open('https://tomp3.cc/youtube-to-mp3/'+iframeId);
        }
        else if (GetLanguage('uk')) {
            window.open('https://tomp3.cc/ru/youtube-to-mp3/'+iframeId);
        }
        else if (GetLanguage('ru')) {
            window.open('https://tomp3.cc/ru/youtube-to-mp3/'+iframeId);
        }
    });


    //#### Toggle for search input line
    $('.option__toggle').on('click', function() {
        $('.option__toggle').toggleClass('hidden');

        if ($('.option__toggle[data-search="name"]').hasClass('hidden')) {
            $('#SearchBy').attr('placeholder', 'https://www.youtube.com/watch?v=kdmBTTAFlk0');
        }
        else if ($('.option__toggle[data-search="link"]').hasClass('hidden')) {
            $('#SearchBy').attr('placeholder', 'James Brown - The Boss');
        }
        $('#SearchBy').val('');
    });
    //#### Toggle for topic items
    var tabIndex = 0;
    $('.topic__tab_item').click(function() {
        $('.topic__tab_item').removeClass('tab__current');
        $(this).addClass('tab__current');

        if ($('.search__topic').hasClass('topic__locked')) return false; 
        tabIndex = $(this).index();

        $('.topic__list').addClass('hidden');
        $('.topic__list').eq(tabIndex).removeClass('hidden');
    });

    //#### Going from Music to Tariffs
    $('.lock__content').click(function() {
        window.open($(this).attr('data-link'));
    });

    //#### GET AND SET COOKIE's
    if($('iframe').is('#iframeYoutube')) {
        var arrSongs = GetCookies('sv');    // sv = 'song visited'
        var currentSongId = $('#iframeYoutube').attr('data-youtube-id');

        SetCookies(arrSongs, currentSongId, 1);
    }
    //#### SET COOKIE and Submit the #SimilarForm
    $('.similar__videos_item').on('click', function() {
        var songId = $(this).attr('data-youtube-id');
        SetCookies(arrSongs, songId, 1);

        // Scroll to the #SearchAnimation
        $('.search__animation').css('display', 'block');
        var destination = $('#SearchAnimation').offset().top - 30;
        $('html').animate({ scrollTop: destination }, 1000);
        
        $('#SimilarForm input[name=clickedSimilarId]').val(songId);
        $('#SimilarForm').submit();
    });
    $('.similar__search_query').on('click', function() {
        // Scroll to the #SearchAnimation
        $('.search__animation').css('display', 'block');
        var destination = $('#SearchAnimation').offset().top - 30;
        $('html').animate({ scrollTop: destination }, 1000);

        $('#SimilarForm input[name=clickedWizardId]').val($(this).attr('data-title-id'));
        $('#SimilarForm').submit();
    });
    //#### Scroll to Similar
    $('.money__off').on('click', function() {
        var destination = $('#scroll-to-similar').offset().top - 115;
        $('html').animate({ scrollTop: destination }, 1000);
        $('#overlaySimilar').fadeIn(500);
        setTimeout(function() {
            $('#overlaySimilar').fadeOut(500);
        }, 3000);
    });

    function GetCookies(key) {
        // Get cookie by key
        var getFullCookieJSON = document.cookie.match(new RegExp("(?:^|; )"+key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        if (getFullCookieJSON == null) {    // if null, then we create an empty array
            var arrSongs = [];
        }
        else {                              // if available, then convert JSON to array
            var arrSongsJSON = getFullCookieJSON[1];
            var arrSongs = JSON.parse(arrSongsJSON);
        }
        // console.log('получили: ' +arrSongs);

        return arrSongs;
    }
    function SetCookies(arrSongs, youtubeID, days) {
        // Set cookie's
        if (arrSongs.indexOf(youtubeID) == -1) {   // if not matched
            // console.log(youtubeID+ ' - нет совпадения');
            arrSongs.unshift(youtubeID);           // add the Id to top of array
            var setCookie = JSON.stringify(arrSongs);   // convert the array to JSON
            document.cookie = 'sv='+setCookie+';path=/;max-age=86400';  // set Cookie's for X days
            // console.log('установили: ' +setCookie);
        }
        // else {                                  // if matched
        //     console.log(youtubeID+ ' - совпадение');
        // }
    }

    //#### GET COOKIE and check for match
    var arrSongs = GetCookies('sv');
    $.each(arrSongs, function name(i, val) {    // going for every item of array
        // console.log('('+i+') '+val);
        // finding data-youtube-id, whitch has cookie match and set style 
        $('.similar__videos_item[data-youtube-id='+val+']').addClass('song__visited').append('<span class="material-icons ">visibility</span>');
    });

    //#### SHARE SOCIAL
    $('.share__social').on('click', function() {
        $('#ShareSocialForm input[name=social]').val($(this).attr('data-social'));
        var $form = $('#ShareSocialForm');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize()
            }).done(function() {
                console.log('success');
            }).fail(function() {
                console.log('fail');
        });

        // Change progress bar value
        var progress = $('.feature__list .progress__bar');
        var valueState = parseInt($('.feature__list .value--state').first().text());
        var valueAfter = valueState +1;
        
        var socialInterval = setInterval(function() {
            if (valueState >= valueAfter) {
                clearInterval(socialInterval);
            } else {
                valueState += 0.01;
                progress.val(valueState);
            }
        }, 10);

        // Change value of content value
        $('.feature__list .value--state').text(valueAfter);
        $(this).css('pointer-events', 'none').css('opacity', '0.5');

        // Open the social share link
        window.open($(this).attr('data-link'), 'myWindowName', 'width=650, height=500');
    });

    //#### Modal window social network
    $('.modalWindow .social__item div').on('click', function() {
        window.open($(this).attr('data-link'));
    });

    // Modal window
    $('.cancel-form').on('click', function() {
        $('.modal-language').hide();
    });

    //#### Get the language settings
    function GetLanguage(lang) {
        return lang == $('.lang--current a').attr('data-lang');
    }
    // Setup the language cookies
    var preflang = 'en';
    $('.language a, .form-question > *').on('click', function() {
        preflang = $(this).attr('data-lang');
        document.cookie = 'preflang='+preflang+'; path=/; max-age='+(60*60*24*365*5)
    });

    //#### Calc the revenue of YouTube ads
    $('#CalcRevenue').submit(function(e) {
        e.preventDefault();

        var views = $('.calc__input_views');
        var revenue = (views.val() / 1000) * views.attr('data-scale');
        $('.calc__result').css('display', 'block');
        $('.calc__title--revenue').text(revenue/2 +'-'+ revenue +'$');

        // Submit the form by AJAX
        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });

    //#### Open links without weight
    $('.advice__link').click(function() {
        window.open($(this).attr('data-link'));
    });

    //#### Open tags
    $('.open--tags').on('click', function() {
        $(this).remove();
        $('.tags__list_item').css('display', 'inline-block');
    });

    
    //#### Login submit
    $('#LoginForm').submit('click', function() {
        if (GetLanguage('en')) {
            $('#loginSubmit').val('GOING').css('cursor', 'not-allowed').attr('disabled', 'disabled');
        }
        else if (GetLanguage('ru')) {
            $('#loginSubmit').val('ВХОДИМ').css('cursor', 'not-allowed').attr('disabled', 'disabled');
        }
        else if (GetLanguage('uk')) {
            $('#loginSubmit').val('ВХОДИМО').css('cursor', 'not-allowed').attr('disabled', 'disabled');
        }
    });    

    
    var setOrder = 1;   //#### Get Adaptive items for the .music__list block
    var musicListId = [];
    $('.music__list_item').each(function() {
        $(this).css('order', setOrder);
        musicListId.push($(this).attr('data-youtube-id'));
        
        setOrder++;
    });

    AdaptiveCards();
    $( window ).resize(function() {
        AdaptiveCards();
    });

    var rowWidth;
    var rowItems;
    
    function AdaptiveCards() {
        rowWidth = $(".music__list").width();
        rowItems = Math.floor(rowWidth / 270);
    }

    //########## Music list items
    var musicItemYouTubeLink = '';
    var musicItemSongName = '';
    var playlist = [];

    $('.music__list_item').on('click', function() {
        // ################################### LOCK #############
        if ($('.music__list').hasClass('locked')) {
            return false;
        }

        //## refresh all iframe blocks
        $('.music__result').css('display', 'none');
        $('.youtube__code_iframe').remove();
        //## check for the similar
        if ($(this).hasClass('active-item')) {
            $('.active-item').removeClass('active-item');
            return false;
        }
        //## refresh Like style
        flagLike = 0;
        flagDownload = 0;
        $('.search__tools_item').css({'box-shadow': '0 0 0 4px #dddddd', 'color': '#ffffff'});
        
        //## set up the styles
        $('.active-item').removeClass('active-item');
        $(this).addClass('active-item');

        //## set up the parameters
        var youtubeID = $(this).attr('data-youtube-id');
        var youtubeTitle = $(this).find('.music__name').text();
        var orderItem = $(this).css('order');
        var youtubeOrder = Math.ceil(orderItem / rowItems) * rowItems;

        iframeId = youtubeID;
        likeTitle = youtubeTitle;

        //## set up the playlist
        var index = $.inArray(youtubeID, musicListId);
        var musicListIdCopy = musicListId.slice();

        if (index !== -1) {
            var extractedItems = musicListIdCopy.slice(index);
            musicListIdCopy.splice(index, extractedItems.length);
            playlist = extractedItems.concat(musicListIdCopy);
            playlist = playlist.join(',');
        }

        //## add the iframe block
        $('.music__result').css('display', 'block').css('order', youtubeOrder);
        $('.youtube__code').html('<iframe width="100%" height="300" class="youtube__code_iframe" src="https://www.youtube.com/embed/'+youtubeID+'?playlist='+playlist+'&autoplay=1" data-youtube-id="'+youtubeID+'" data-youtube-title="'+youtubeTitle+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        
        //## save the youtube ID and song Name
        musicItemYouTubeLink = 'https://www.youtube.com/watch?v=' +youtubeID;
        musicItemSongName = '[!!!] ' +$(this).find('.music__name').text();

        //## AJAX Form
        $('#MusicListForm input[name=youtubeId]').val($(this).attr('data-youtube-id'));
        var $form = $('#MusicListForm');
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize()
            }).done(function() {
                console.log('success');
            }).fail(function() {
                console.log('fail');
        });
    });

    //######## Likes to Check
    $('#PageLike .table__content_item').on('click', function() {
        var youtubeId = $(this).attr('data-youtube-id');
        $('#CheckForm input[name=searchBy]').val(youtubeId);

        $('#CheckForm').submit();
    });

    //#### Modal Page
    $('.modal__line_success').animate({width: '100%'}, 5000, function() {
        var theEmail = $('.login--input').html();
        var emailService = theEmail.split(",")[0];
        location.href = 'https://'+emailService;
    });
    $('.modal__line_go').animate({ width: '100%' }, 5000, function () {
        if (window.location.href.indexOf("thanks") !== -1) {
            location.href = document.location.origin;
        }
        else if (isBid) location.href = document.location.origin + '/studio/settings/';
        else location.href = document.location.origin + '/pricing/';
    });
    
    //#### Replace span to image
    $('.replace-to-image').each(function() {
        var imgSrc = $(this).attr('data-src');
        var imgAlt = $(this).attr('data-alt');

        $(this).replaceWith('<img src="'+imgSrc+'" alt="'+imgAlt+'" />');
    });

    function progressView() {
        var diagramBox = document.querySelectorAll('.progress__circle');
        diagramBox.forEach((box) => {
            var deg = (360 * box.dataset.current / box.dataset.limit) + 180;
            if (box.dataset.current >= (box.dataset.limit / 2)) {
                box.classList.add('over__half');
            }
            else {
                box.classList.remove('over__half');
            }

            box.querySelector('.circle.circle__right').style.transform = 'rotate('+deg+'deg)';
        });
    }
    progressView();
});