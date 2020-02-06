/**
 * README: https://github.com/KaiXD/XD/blob/master/JavaScript/subs_convert/README.md
 */
'use strict';
 
let setCache, getCache, isSG, isQTX, body;

if ('$persistentStore' in this) {
    setCache = $persistentStore.write;
    getCache = $persistentStore.read;
} else if ('$prefs' in this) {
    setCache = $prefs.setValueForKey;
    getCache = $prefs.valueForKey;
} else {
    throw new Error('this script requires Surge or Quantumult X');
}

if ($request.headers && !('$response' in this)) {
    isSG = /Surge/.test($request.headers['User-Agent']);
    isQTX = /Quantumult%20X/.test($request.headers['User-Agent']);
    if (isSG) setCache('SG', 'subs2TargetClient');
    if (isQTX) setCache('QTX', 'subs2TargetClient');
    if (!isSG && !isQTX) setCache('other', 'subs2TargetClient');
    body = {};
}

let ssRe, hostRe, portRe, decUserInfoRe, methodArr, obfsRe, simpleObfs, obfsHostRe, obfsURIRe;
let url, tfo, udp, mptcp, httpObfsHost, tlsObfsHost, force_http, force_tls, force_uri, customObfsURI;

if ('$response' in this) {
    if (getCache('subs2TargetClient') === 'other') body = {};
    isSG = (getCache('subs2TargetClient') === 'SG') ? true : false;
    isQTX = (getCache('subs2TargetClient') === 'QTX') ? true : false;

    ssRe = /^ss:\/\/(.+)@(.+):(\d+)\/?(?=\?|#|$)(?:\?([^?#]*))?(?:#([^#]*))?$/;
    hostRe = /^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$/;
    portRe = /^([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/;
    decUserInfoRe = /^(.+?):(.+)$/;
    methodArr = isSG ? ['aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm', 'chacha20-ietf-poly1305', 'xchacha20-ietf-poly1305', 'rc4', 'rc4-md5', 'aes-128-cfb', 'aes-192-cfb', 'aes-256-cfb', 'aes-128-ctr', 'aes-192-ctr', 'aes-256-ctr', 'bf-cfb', 'camellia-128-cfb', 'camellia-192-cfb', 'camellia-256-cfb', 'cast5-cfb', 'des-cfb', 'idea-cfb', 'rc2-cfb', 'seed-cfb', 'salsa20', 'chacha20', 'chacha20-ietf'] : methodArr;
    methodArr = isQTX ? ['none', 'rc4-md5', 'rc4-md5-6', 'aes-128-cfb', 'aes-192-cfb', 'aes-256-cfb', 'aes-128-ctr', 'aes-192-ctr', 'aes-256-ctr', 'bf-cfb', 'cast5-cfb', 'des-cfb', 'rc2-cfb', 'salsa20', 'chacha20', 'chacha20-ietf', 'aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm', 'chacha20-ietf-poly1305', 'xchacha20-ietf-poly1305'] : methodArr;
    obfsRe = /obfs%3D([^%#]+)/;
    simpleObfs = ['http', 'tls'];
    obfsHostRe = /obfs-host%3D([^%#]+)/;
    obfsURIRe = /obfs-uri%3D([^%#]+)/;

    url = $request.url;
    tfo = /&tfo=(?:1|true|yes)/.test(url) ? true : false;
    udp = /&udp=(?:1|true|yes)/.test(url) ? true : false;
    mptcp = /&mptcp=(?:1|true|yes)/.test(url) ? true : false;
    httpObfsHost = /&http=([^&]+)/.test(url) ? RegExp.$1 : undefined;
    tlsObfsHost = /&tls=([^&]+)/.test(url) ? RegExp.$1 : undefined;
    force_http = /&force-http=(?:1|true|yes)/.test(url) ? true : false;
    force_tls = /&force-tls=(?:1|true|yes)/.test(url) ? true : false;
    force_uri = /&force-uri=(?:1|true|yes)/.test(url) ? true : false;
    customObfsURI = /&uri=([\w-.~!*'();:@&=+$,/?#[\]]+)/.test(url) ? RegExp.$1 : undefined;

    try {
        body = $response.body;
        if (body.indexOf('ss://') === -1) body = base64_decode(body);
        body = body.split(/\s+/).map(toText).filter(s => s).join('\n');
        console.log(body);
        body = {body: body};
    } catch (err) {
        console.log(err);
        body = {};
    }
}

$done(body);

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
    
function toText(uri) {
    if (uri === '\s' || uri === '') {
        return null;
    }

    console.log('uri: ' + uri);

    let userInfo, decUserInfo, method, password, host, port, plugin, obfs, obfsHost, obfsURI, tag;

    if (ssRe.test(uri)) {
        [userInfo, host, port, plugin, tag] = [RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5];
    } else {
        console.log('uri not matched\n');
        return null;
    }

    if (!hostRe.test(host)) {
        console.log('host: ' + host + '\nhost error\n');
        return null;
    }

    if (!portRe.test(port)) {
        console.log('port: ' + port + '\nport error\n');
        return null;
    }
    decUserInfo = base64_decode(userInfo.replace('-', '+').replace('_', '/'));
    if (decUserInfoRe.test(decUserInfo)) {
        [method, password] = [RegExp.$1, RegExp.$2];
    } else {
        console.log('userinfo: ' + userinfo + '\nuserinfo format error\n');
        return null;
    }

    if (methodArr.indexOf(method) === -1) {
        console.log('method: ' + method + '\nmethod not supported\n');
        return null;
    }

    if (plugin && /obfs-local/.test(plugin)) {
        obfs = obfsRe.test(plugin) ? RegExp.$1 : undefined;
        obfsHost = obfsHostRe.test(plugin) ? RegExp.$1 : undefined;
        obfsURI = obfsURIRe.test(plugin) ? RegExp.$1  : undefined;
    }

    if (plugin && !obfs) {
        console.log('plugin: ' + plugin + '\nplugin cannot be identified as simple_obfs and is removed, this may cause error');
        //return null;
    }

    if (obfs && simpleObfs.indexOf(obfs) === -1) {
        console.log('obfs: ' + obfs + '\nobfs mode error\n');
        return null;
    }

    if (obfsHost && !hostRe.test(obfsHost)) {
        console.log('obfs-host: ' + obfsHost + '\nobfs-host error and plugin is removed, this may cause error\n');
        //return null;
    }

    // SS 有 obfs 有混淆参数，更改混淆参数将导致无法连接。
    // SS 有 obfs 无混淆参数，此时混淆参数可以随意更改。
    // SSD 非 origin 协议 + 协议参数 + 有obfs，此时混淆参数可以随意更改。
    // SSR 非 origin 协议 + 协议参数 + 有obfs，此时混淆参数可以随意更改。
    if (obfs && (!obfsHost || force_http || force_tls)) {
        if (obfs === 'http') {
            obfsHost = (httpObfsHost && hostRe.test(httpObfsHost)) ? httpObfsHost : obfsHost || 'static.ess.apple.com';
        }
        if (obfs === 'tls') {
            obfsHost = (tlsObfsHost && hostRe.test(tlsObfsHost)) ? tlsObfsHost : obfsHost || 'gateway.icloud.com';
        }
    }

    if (obfs === 'http' && (!obfsURI || customObfsURI)) {
        if (customObfsURI) {
            customObfsURI = (customObfsURI[0] === '/') ? customObfsURI : '/'+customObfsURI;
        }
        obfsURI = customObfsURI || obfsURI;
    }

    console.log('success\n');

    if (isSG) {
        return (tag ? decodeURIComponent(tag) : host) + ' = ss, ' + host + ', ' + port + ', encrypt-method=' + method + ', password=' + password + (obfs ? ', obfs=' + obfs + (obfsHost ? ', obfs-host=' + obfsHost + (obfsURI ? ', obfs-uri=' + obfsURI : '') : '') : '') + ', udp-relay=' + udp + ', tfo=' + tfo + ', mptcp=' + mptcp;
    }

    if (isQTX) {
        return 'shadowsocks=' + host+':'+port + ', method=' + method + ', password=' + password + (obfs ? ', obfs=' + obfs + (obfsHost ? ', obfs-host=' + obfsHost + (obfsURI ? ', obfs-uri=' + obfsURI : '') : '') : '') + ', fast-open=' + tfo + ', udp-relay=' + udp + ', tag=' + (tag ? decodeURIComponent(tag) : host);
    }
}