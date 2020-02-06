/**
 * To keep url safe, change base to 
 * 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_='.
 *
 */

function base64_encode(stringToEncode) {
    function encodeUTF8string(str) {
        return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes (match, p1) {
                return String.fromCharCode('0x' + p1);
            });
    };

    let b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1;
    let o2;
    let o3;
    let h1;
    let h2;
    let h3;
    let h4;
    let bits;
    let i = 0;
    let ac = 0;
    let enc = '';
    let tmpArr = [];

    if (!stringToEncode) {
        return stringToEncode;
    }

    stringToEncode = encodeUTF8string(stringToEncode);

    do {
        o1 = stringToEncode.charCodeAt(i++);
        o2 = stringToEncode.charCodeAt(i++);
        o3 = stringToEncode.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < stringToEncode.length);

    enc = tmpArr.join('');

    let r = stringToEncode.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

function base64_decode(encodedData) {
    function decodeUTF8string(str) {
        return decodeURIComponent(str.split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    let b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1;
    let o2;
    let o3;
    let h1;
    let h2;
    let h3;
    let h4;
    let bits;
    let i = 0;
    let ac = 0;
    let dec = '';
    let tmpArr = [];

    if (!encodedData) {
        return encodedData;
    }

    encodedData += '';

    do {
        h1 = b64.indexOf(encodedData.charAt(i++));
        h2 = b64.indexOf(encodedData.charAt(i++));
        h3 = b64.indexOf(encodedData.charAt(i++));
        h4 = b64.indexOf(encodedData.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1);
        } else if (h4 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < encodedData.length);

    dec = tmpArr.join('');

    return decodeUTF8string(dec.replace(/\0+$/, ''));
};