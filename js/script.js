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

                $nytHeaderElem.text("NY Times articles about " + city[0].toUpperCase() + city.slice(1).toLowerCase());

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
                $nytHeaderElem.text("NY Times articles couldn't be loaded");
            });
    }

    return false;
}

$('#form-container').submit(loadData).submit();
