function loadData() {
    var street = $('#street').val();
    var city = $('#city').val();

    if (city && street) {
        //Capitalize city and street
        city = city[0].toUpperCase() + city.slice(1).toLowerCase();
        street = street[0].toUpperCase() + street.slice(1).toLowerCase();

        // Grab some DOM elements
        var $body = $('body');
        var $wikiHeader = $('#wikipedia-header');
        var $wikiElem = $('#wikipedia-links');
        var $nytHeaderElem = $('#nytimes-header');
        var $nytElem = $('#nytimes-articles');
        var $greeting = $('#greeting');

        // Add custom message
        $greeting.text("So... You really wanna move to " + city + "? Think it twice!");

        // Clear out old data before new request
        $wikiElem.text("");
        $nytElem.text("");

        // Load streetview
        var $bgImg = $('<img src="" alt="" class="bgimg">');
        $body.append($bgImg);
        $bgImg.attr("src", "http://maps.googleapis.com/maps/api/streetview?key=AIzaSyB3PKBgLPyYLiMm1lgRBlxz59fNkxcaHrw&size=600x400&location=" + street + ", " + city);


        // Load NY Times articles
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += "?" + $.param({
                "api-key": "bc98a12e3c3248cc8dc5fbc172c7daab",
                "q": city,
                "sort": "newest"
            });

        $.getJSON(url, {"q": city})
            .done(function (result) {
                console.log(result);

                $nytHeaderElem.text("NY Times articles about " + city);

                var articles = result.response.docs;

                articles.forEach(function (article) {
                    var $a = $("<a>", {"href": article.web_url, "target": "_blank"});
                    $a.text(article.headline.main);

                    var $li = $("<li>", {"class": "article"});
                    $li.append($a);

                    $nytElem.append($li);
                });
            })
            .fail(function (err) {
                console.log(err);
                $nytHeaderElem.text("NY Times articles couldn't be loaded.");
            });

        // Load wikipedia articles
        var wikiApi = "https://en.wikipedia.org/w/api.php";

        var wikiRequestTimeout = setTimeout(function () {
            $wikiHeader.text("Failed to get wikipedia articles...");
        });

        $.getJSON(wikiApi + "?callback=?", {
            action: "opensearch",
            search: city,
            format: "json"
        }, function (data) {
            $wikiHeader.text("Wikipedia articles about " + city);

            for (var i = 0; i < data[1].length; i++) {
                var $a = $("<a>", {"href": data[3][i], "target": "_blank"});
                $a.text(data[1][i]);

                var $li = $("<li>");
                $li.append($a);

                $wikiElem.append($li);
            }

            clearTimeout(wikiRequestTimeout);
        });
    }

    return false;
}

$('#form-container').submit(loadData).submit();
