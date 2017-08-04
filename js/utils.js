// UTILS

// sort array by numerics in string
function sortByNumerics(array) {
    var re = /\D/g;

    array.sort(function(a, b) {
        return(parseInt(a.replace(re, ""), 10) - parseInt(b.replace(re, ""), 10));
    });
    return(array);
}


// adds commas to numerical values
function commaSeparateNumber(val) {
    if (typeof val !== 'undefined' && val != '') {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
    }
    return val;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/* replaceAll */
function replaceAll(txt, toReplace, withThis) {
    var returnValue								= '';
    if (typeof (txt) !== 'undefined' && txt != '') {
        returnValue = txt.replace(new RegExp(toReplace, 'g'), withThis);
    }
    return returnValue;
}


/* strpos | search string for value & return index	*/
function strpos (haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}


function getFileExtension(filename) {
    var a = filename.split('.');
    if ( a.length === 1 || ( a[0] === '' && a.length === 2 )) {
        return '';
    }
    return a.pop();
}


/* qsLookup | passed key, returns value */
function qsLookup(qs_label) {
    var qs;
    var arr_qs;
    var qs_value;

    qs = window.location.search.substring(1);
    arr_qs = qs.split('&');

    for (i = 0; i < arr_qs.length; i++) {
        qs_value = arr_qs[i].split('=');
        if (qs_value[0] == qs_label) {
            return qs_value[1];
        }
    }
}


/* qsLookup | passed key, returns value */
function qsStringLookup(qsString, qs_label) {
    var qs;
    var arr_qs;
    var qs_value;

    qs = qsString.split('?');
    if (qs.length > 1) {
        arr_qs = qs[1].split('&');
        for (i = 0; i < arr_qs.length; i++) {
            qs_value = arr_qs[i].split('=');
            if (qs_value[0] == qs_label) {
                return qs_value[1];
            }
        }
    }
}

function htmlEncode(value) {
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value) {
  return $('<div/>').html(value).text();
}


function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}


/* extended functions */


Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};


/* dump | print_r equivalent */
function dump(arr, level) {
    var dumped_text = "";
    if(!level) level = 0;

    //The padding given at the beginning of the line.
    var level_padding = "";
    for (var j=0; j<level+1; j++) level_padding	+= "    ";

    if (typeof(arr) == 'object') { //Array/Hashes/Objects
        for(var item in arr)
        {
            var value = arr[item];

            if (typeof(value) == 'object') { // array
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value, level + 1);
            }
            else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    }
    else { //Stings/Chars/Numbers etc.
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}


function getTodaysDate(format)
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    switch (format) {
        case 'utc':
            today = yyyy + '-' + mm + '-' + dd;
            break;

        default:
            today = dd + '/' + mm + '/' + yyyy;
            break;
    }
    return today;
}


function getTimestamp() {
    var date = new Date();
    if ( ! Date.now) { // ie8
        date = new Date().getTime();
    }

    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // format time (10:30:23)
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}