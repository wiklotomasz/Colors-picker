function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

$( "input" )
  .keyup(function() {
    var value = $( this ).val();
    var isHEX  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
    var isRGB = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i.test(value);
    var isHSL = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(value);
    $( ".hex span" ).text( value );
    if (isHEX == true) {
    	$( ".color-box" ).css("background-color", value);
    	var str = value;
    	var res = str.substring(1)
    	var rgb = hexToRgb( res );
    	$( ".hex span" ).text( value );
    	$( ".rgb span" ).text( rgb );
    }
    else if (isRGB == true) {
    	$( ".color-box" ).css("background-color", value);
    	var hex = rgb2hex( value );
    	$( ".hex span" ).text( hex );
    	$( ".rgb span" ).text( value );
    }
	else if (isHSL == true) {
    	$( ".color-box" ).css("background-color", value);
    	var hex = rgb2hex( value );
    	$( ".rgb span" ).text( value );
    	regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g;
    	res = regexp.exec(value).slice(1);
    	var h = ((res[0].slice(0,-1))/360);
    	var s = ((res[1].slice(0,-1))/100);
    	var l = ((res[2].slice(0,-1))/100);
    	var rgb = hslToRgb(h, s, l);
    	$( ".rgb span" ).text(rgb);
    	var hex = rgb2hex( "rgb("+ rgb + ")" );
    	$( ".hex span" ).text(hex);
    }
    else {
    	$( ".hex span" ).text( "invalid HEX" );
    	$( ".rgb span" ).text( "invalid RGB" );
    	$( ".color-box" ).css("background-color", "black");
    }
  })
  .keyup();

