/**
 * README: https://github.com/KaiXD/XD/blob/master/JavaScript/subs_convert/README.md
 */

"use strict";

let hashtag = '123#tfo=1&udp=1';
let content = 'c3M6Ly9ZV1Z6TFRFeU9DMWpabUk2TkRVd09RQHNoLWhrLnBjY3cuYmVzdDo4MDkwI1YzLUhLJTIwSVBMQzQlMjAlNUJTSEElNUQtR0FNSU5HT0stNXgKc3M6Ly9ZV1Z6TFRFeU9DMWpabUk2TkRVd09RQHN6LWhrLnBjY3cuYmVzdDo4MDkwI1YzLUhLJTIwSVBMQzYlMjAlNUJTWlglNUQtR0FNSU5HT0stNXgKc3M6Ly9ZV1Z6TFRFeU9DMWpabUk2TkRVd09RQGRsaW5lMy5zdGFycy5ydW46ODA5MCNWMy1KUCUyMElQTEMxJTIwJTVCU0hBJTVELUdBTUlOR09OTFktMTB4CnNzOi8vWVdWekxURXlPQzFqWm1JNk5EVXdPUUBzaC1rci5wY2N3LmJlc3Q6MTgwOTAjVjMtS1IlMjBJUExDMSUyMCU1QlBWRyU1RC1HQU1JTkdPTkxZLTEweA=='

let shadowsocks_parser = {
  hashtag = $resource.link.split('#')[1]
  content = $resource.content
  method: [
    'none',
    'rc4-md5',
    'rc4-md5-6',
    'aes-128-cfb',
    'aes-192-cfb',
    'aes-256-cfb', 
    'aes-128-ctr',
    'aes-192-ctr',
    'aes-256-ctr',
    'bf-cfb',
    'cast5-cfb',
    'des-cfb',
    'rc2-cfb',
    'salsa20',
    'chacha20',
    'chacha20-ietf',
    'aes-128-gcm',
    'aes-192-gcm',
    'aes-256-gcm',
    'chacha20-ietf-poly1305',
    'xchacha20-ietf-poly1305'
  ],
  
  plugin: {
    'simple-obfs': [
      'http',
      'tls'
    ],
    'obfs-local': [
      'http',
      'tls'
    ]
  },
  
  re: {
    uri: /^ss:\/\/(.+)@(.+):(\d+)\/?(?=\?|#|$)(?:\?([^?#]*))?(?:#([^#]*))?$/,
    host: /^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$/,
    port: /^([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/,
    user_info: /^(.+?):(.+)$/,
    obfs: /obfs%3D([^%#]+)/,
    obfs_host: /obfs-host%3D([^%#]+)/,
    obfs_uri: /obfs-uri%3D([^%#]+)/
  },
  
  settings: {
    tfo: /tfo=(?:1|true|yes)/.test(hashtag) ? true : false,
    udp: /udp=(?:1|true|yes)/.test(hashtag) ? true : false,
    mptcp: /mptcp=(?:1|true|yes)/.test(hashtag) ? true : false,
    default_http_obfs_host: 'static.ess.apple.com',
    http_obfs_host: /http=([^&]+)/.test(hashtag) ? RegExp.$1 : undefined,
    default_tls_obfs_host: 'gateway.icloud.com',
    tls_obfs_host: /tls=([^&]+)/.test(hashtag) ? RegExp.$1 : undefined,
    force_http: /force-http=(?:1|true|yes)/.test(hashtag) ? true : false,
    force_tls: /force-tls=(?:1|true|yes)/.test(hashtag) ? true : false,
    force_uri: /force-uri=(?:1|true|yes)/.test(hashtag) ? true : false,
    custom_obfs_uri: /uri=([^&]+)/.test(hashtag) ? decodeURIComponent(RegExp.$1) : undefined,
    filter: /filter=([^&]+)/.test(hashtag) ? new RegExp('^'+decodeURIComponent(RegExp.$1)+'$') : undefined
  },
  
    genConf: function (uri) {
    if (uri === '\s' || uri === '') {
      return null;
    }

    ssp = shadowsocks_parser

    let node = {};

    if (ssp.re.uri.test(uri)) {
      [node.user_info, node.host, node.port, node.plugin, node.tag] = [RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, decodeURIComponent(RegExp.$5)];
    } else {
      console.log('uri not matched\n');
      return null;
    }

    if (ssp.re.filter && !ssp.re.filterRe.test(node.tag)) {
      console.log(`Node ${node.tag} is abandoned by user-defined filter.\n`);
      return null;
    }

    if (!ssp.re.host.test(node.host)) {
      console.log(`node: ${node.tag}\nhost: ${node.host}\nhost error\n`);
      return null;
    }

    if (!ssp.re.port.test(node.port)) {
      console.log(`node: ${node.tag}\nport: ${node.port}\nport error\n`);
      return null;
    }
    node.dec_user_info = base64_decode(node.user_info.replace('-', '+').replace('_', '/'));
    if (ssp.re.user_info.test(node.dec_user_info)) {
      [node.method, node.password] = [RegExp.$1, RegExp.$2];
    } else {
      console.log(`node: ${node.tag}\nuserinfo: ${node.user_info}\nuser information error\n`);
      return null;
    }

    if (ssp.method.indexOf(node.method) === -1) {
      console.log(`node: ${node.tag}\nmethod: ${node.method}\nmethod not supported\n`);
      return null;
    }

    if (node.plugin && node.plugin in ssp.plugin) {
      node.obfs = ssp.re.obfs.test(node.plugin) ? RegExp.$1 : undefined;
      node.obfs_host = ssp.re.obfs_host.test(node.plugin) ? RegExp.$1 : undefined;
      node.obfs_uri = ssp.re.obfs_uri.test(node.plugin) ? RegExp.$1 : undefined;
    }

    if (node.plugin && !node.obfs) {
      node.plugin = undefined;
      node.obfs = undefined;
      node.obfs_host = undefined;
      node.obfs_uri = undefined;
      console.log(`node: ${node.tag}\nplugin: ${plugin}\nplugin cannot be identified by parser and plugin has been removed, which may cause node unavailable\n`);
      //return null;
    }

    if (node.obfs && !ssp.plugin[node.plugin][node.obfs]) {
      console.log(`node: ${node.tag}\nobfs: ${node.obfs}\nobfs mode error\n`);
      return null;
    }

    if (node.obfs_host && !ssp.re.host.test(obfs_host)) {
      node.plugin = undefined;
      node.obfs = undefined;
      node.obfs_host = undefined;
      node.obfs_uri = undefined;
      console.log(`node: ${node.tag}\nobfs-host: ${obfsHost}\nobfs-host error and plugin has been removed, which may cause node unavailable\n`);
      //return null;
    }

    // 服务端 SS 有 obfs 有混淆参数，客户端更改混淆参数将导致节点不可用。
    // 服务端 SS 有 obfs 无混淆参数，客户端混淆参数可以随意更改。
    // 服务端 SSD 非 origin 协议 + 协议参数 + 有obfs，客户端混淆参数可以随意更改。
    // 服务端 SSR 非 origin 协议 + 协议参数 + 有obfs，客户端混淆参数可以随意更改。
    if (node.obfs && (!node.obfs_host || ssp.settings.force_http || ssp.settings.force_tls)) {
      if (node.obfs === 'http') {
          node.obfs_host = (ssp.settings.http_obfs_host && ssp.re.host.test(ssp.settings.http_obfs_host)) ? ssp.settings.http_obfs_host : node.obfs_host || ssp.settings.default_http_obfs_host;
      }
      if (node.obfs === 'tls') {
          ssp.settings.http_obfs_host = (ssp.settings.tls_obfs_host && ssp.re.host.test(ssp.settings.tls_obfs_host)) ? ssp.settings.tls_obfs_host : node.obfs_host || ssp.settings.default_tls_obfs_host;
      }
    }

    if (node.obfs === 'http' && (!node.obfs_uri || ssp.settings.custom_obfs_uri)) {
      if (ssp.settings.custom_obfs_uri) {
          ssp.settings.custom_obfs_uri = (ssp.settings.custom_obfs_uri[0] === '/') ? ssp.settings.custom_obfs_uri : '/'+ssp.settings.custom_obfs_uri;
      }
      node.obfs_uri = ssp.settings.custom_obfs_uri || node.obfs_uri;
    }

    return `shadowsocks=${node.host}:${node.port}, method=${node.method}, password=${node.password}` + (node.obfs ? `, obfs=${node.obfs}` + (node.obfs_host ? `, obfs-host=${node.obfs_host}` + (node.obfs_uri ? `, obfs-uri=${node.obfs_uri}` : '') : '') : '') + `, fast-open=${ssp.settings.tfo}, udp-relay=${ssp.settings.udp}, tag=` + (node.tag || node.host);
  },

  genList: function () {
    try {
      if (this.content.indexOf('ss://') === -1) this.content = base64_decode(this.content);
      this.content = this.content.split(/\s+/).map(this.genConf).filter(s => s).join('\n');
      this.content = {content: this.content};
    } catch (err) {
      console.log(err);
    };
  }
}

content = shadowsocks_parser.genList()
$done(content);

function base64_decode(data) {
    function decode_utf8_string(str) {
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
    let tmp = [];

    if (!data) {
        return data;
    }

    data += '';

    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 === 64) {
            tmp[ac++] = String.fromCharCode(o1);
        } else if (h4 === 64) {
            tmp[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    
    dec = tmp.join('');

    return decode_utf8_string(dec.replace(/\0+$/, ''));
};
