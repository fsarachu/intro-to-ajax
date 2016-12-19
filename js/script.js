function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview
  var $bgImg = $('<img src="" alt="" width="100%" class="bgimg">');
  $body.append($bgImg);

  var street = $('#street').val();
  var city = $('#city').val();

  if (city && street) {
    $bgImg.attr('src', 'http://maps.googleapis.com/maps/api/streetview?key=AIzaSyB3PKBgLPyYLiMm1lgRBlxz59fNkxcaHrw&size=600x400&location=' + street + ', ' + city);
  }

  return false;
}

$('#form-container').submit(loadData).submit();
