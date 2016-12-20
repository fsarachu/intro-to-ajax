function loadData() {
    var street = $('#street').val();
    var city = $('#city').val();

    if (city && street) {
        var $body = $('body');
        var $wikiElem = $('#wikipedia-links');
        var $nytHeaderElem = $('#nytimes-header');
        var $nytElem = $('#nytimes-articles');
        var $greeting = $('#greeting');

        // clear out old data before new request
        $wikiElem.text("");
        $nytElem.text("");

        // Load streetview
        var $bgImg = $('<img src="" alt="" class="bgimg">');
        $body.append($bgImg);


        $bgImg.attr('src', 'http://maps.googleapis.com/maps/api/streetview?key=AIzaSyB3PKBgLPyYLiMm1lgRBlxz59fNkxcaHrw&size=600x400&location=' + street + ', ' + city);


        // Load NY Times articles
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
                'api-key': "bc98a12e3c3248cc8dc5fbc172c7daab",
                'q': city
            });
        $.getJSON(url, {'api-key': "bc98a12e3c3248cc8dc5fbc172c7daab", 'q': city})
            .done(function (result) {
                console.log(result);
            })
            .fail(function (err) {
                throw err;
            });

    }

    return false;
}

$('#form-container').submit(loadData).submit();
