jQuery.validator.addMethod("defaultInvalid", function(value, element)
{
    return !(element.value == element.defaultValue);
});

$(document).ready(function()
{

	$('.honeypot').each(function(){
		$(this).hide();
	});
    $('.hpas').each(function(){
        $(this).hide();
    });

	$('.searchoptions').click(function() {
		$('.searchfilter').slideToggle();
	});

    $('div.stars').raty({
        readOnly: true,
        noRatedMsg: "",
        starOff: 'images/offstar.png',
        starOn : 'images/fullstar.png',
        starHalf : 'images/halfstar.png',
        width: 133,
        half: true,
        score: function() {
            return $(this).attr('data-score');
        }
    });

    $('.allReviews').click(function(e){
        $('.meer').css("display", "block");
        $('.lessReviews').css("display", "block");
        $('.allReviews').css("display", "none");
    });

    $('.lessReviews').click(function(e){
        $('.meer').css("display", "none");
        $('.lessReviews').css("display", "none");
        $('.allReviews').css("display", "block");
    });

    $('.citysearch').change(function(e){
        var city = $(this).val();
        var firstoption = $('.areasearch').find('option').first().html();
        $('.areasearch').find('option').remove();
        $('.areasearch').append($("<option></option>").attr("value",'').text(firstoption));
        $.get('includes/getArea.php?city=' + city, function(data)
        {
            if(data != '')
            {
                $.each(data, function(key, value){
                    $('.areasearch').append($("<option></option>").attr("value",value).text(value));
                })
            }
        },'json').complete(function (data) {
            $('.loadgif').hide();
        });
    });

    $(".auto_submit_item").change(function() {
        if($(this).hasClass('areasearch')){
           $('.districtsearch').val('');
        }
        $(".searchform").submit();
    });

    var $selector = $('#toggleMobileMenu');
    if ($selector.length > 0) {
        $selector.on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('active');
            $('.logo').toggle('50');
        });
    }

    $(".changeorder").change(function() {
        $(".orderform").submit();
    });

    $('.serviced').click(function(e){
       $(this).addClass('active');
       $('.recent').removeClass('active');
       $('.servicedhouses').show();
       $('.newhouses').hide();
    });

    $('.recent').click(function(e){
        $(this).addClass('active');
        $('.serviced').removeClass('active');
        $('.newhouses').show();
        $('.servicedhouses').hide();
    });

    $('.fancybox').fancybox();

    $('.bxslider').bxSlider({
        pagerCustom: '#bx-pager',
        adaptiveHeight: true,
    });


    $(".validateForm").validate({
        errorPlacement: function(error, element) {
			error.prependTo( element.parent().next() );
		},
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		}
    });

    if ($("#map_canvas").length > 0){
        var map;
        var elevator;
        var myOptions = {
            zoom: 7,
            center: new google.maps.LatLng(0, 0)
        };
        map = new google.maps.Map($('#map_canvas')[0], myOptions);
        var addresses = new Array();
        var images = new Array();
        var status = new Array();
        var prices = new Array();
        var link = new Array();
        var readmore = new Array();
        var $i=0;
        $('.mapobject').each(function() {
            addresses[$i] = $(this).children('.address').html();
            images[$i] = $(this).children('.houseimage').html();
            status[$i] = $(this).children('.housestatus').html();
            link[$i] = $(this).children('.link').html();
            prices[$i] = $(this).children('.price').html();
            readmore[$i] = $(this).children('.readmore').html();
            $i++;
        });
        var image = 'images/markerGoeth.png';
        var bounds = new google.maps.LatLngBounds();
        var $i = 0;
        var focus = $('#focus');
        for (var x = 0; x < addresses.length; x++) {
            (function (x) {
                focus.queue('apicalls', function (next) {
                    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', function (data) {
                        console.log(x);
                        var contentString =
                            '<div id="content">'+
                                '<h2 id="firstHeading" class="firstHeading"><a style="color: rgb(50, 127, 208);font-size: 15px;font-weight:bold;text-decoration:none;" href="'+link[x]+'">'+addresses[x]+'</a></h2>'+
                                '<div id="bodyContent" style="width:auto;">'+
                                '<div id="imageContent" style="width:155px;;float:left;margin-top:5px;">'+
                                '<a href="'+link[x]+'"><img style="max-width:100%; padding-right:15px;" src="' + images[x] +'"/></a>'+
                                '</div>'+
                                '<div id="textConent" style="width:100px;margin-top:5px;float:left;">'+
                                '<p style="color: #003661;font-size: 14px;margin:0;">'+prices[x]+'</p>'+
                                '<p style="font-size: 14px;margin:0;">'+status[x]+'</p>'+
                                '<p><a style="font-size: 14px;padding-top:5px;color:#003661;text-decoration: underline;" href="'+link[x]+'">'+readmore[x]+'</a></p>'+
                                '</div>'+
                                '</div>'+
                                '</div>';

                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        console.log(data.results[0]);
                        if(data.results[0]){
                            var p = data.results[0].geometry.location
                            var latlng = new google.maps.LatLng(p.lat, p.lng);
                            var marker = new google.maps.Marker({
                                position: latlng,
                                map: map
                            });
                            bounds.extend(marker.position);
                            google.maps.event.addListener(marker, 'click', function() {
                                infowindow.open(map,marker);
                            });

                            map.fitBounds(bounds);
                        }
                        next();
                    });
                });
            })(x);
        }
        focus.dequeue('apicalls');
    }

});

$(window).load(function()
{
    $('.middle').vAlign('middle', 'padding');
    $("#tabs").tabs();

    $("#tabs").on( "tabsactivate", function( event, ui ) {
        onLoadmap();
    } );
});

$('a').each(function(){
    if($(this).attr('href'))
    {
        if($(this).attr('href').indexOf("#") == 0)
        {
           $(this).attr('href',window.location+$(this).attr('href'));
        }
    }
});


function reloadCaptcha()
{
	document.getElementById('captcha').src = document.getElementById('captcha').src+ '?' +new Date();
}

(function ($) {
$.fn.vAlign = function($align, $type)
{
	return this.each(function(i)
    {
    	var ah = $(this).height();
    	var ph = $(this).parent().height();

        switch ($align)
        {
            case 'top':
                var mh = 0;
            break;
            case 'middle':
                var mh = Math.ceil((ph-ah) / 2);
            break;
            case 'bottom':
                var mh = Math.ceil(ph-ah);
            break;
        }
        switch ($type)
        {
            case 'padding':
                $(this).css('padding-top', mh);
            break;
            case 'margin':
            default:
                $(this).css('margin-top', mh);
            break;

        }
	});
};
})(jQuery);
