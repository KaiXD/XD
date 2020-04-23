/**
 * README: https://github.com/KaiXD/XD/blob/master/JavaScript/resource_parser/README.md
 */

"use strict";

function shadowsocks_parser () {
  this.hashtag = '1#tfo=1'.split('#')[1];
  this.content = 'c3M6Ly9ZV1Z6TFRFeU9DMWpabUk2TkRVd09RQHNoLWhrLnBjY3cuYmVzdDo4MDkwI1YzLUhLJTIwSVBMQzQlMjAlNUJTSEElNUQtR0FNSU5HT0stNXgKc3M6Ly9ZV1Z6TFRFeU9DMWpabUk2TkRVd09RQHN6LWhrLnBjY3cuYmVzdDo4MDkwI1YzLUhLJTIwSVBMQzYlMjAlNUJTWlglNUQtR0FNSU5HT0stNXgKc3M6Ly9ZV1Z6TFRFeU9DMWpabUk2TkRVd09RQGRsaW5lMy5zdGFycy5ydW46ODA5MCNWMy1KUCUyMElQTEMxJTIwJTVCU0hBJTVELUdBTUlOR09OTFktMTB4CnNzOi8vWVdWekxURXlPQzFqWm1JNk5EVXdPUUBzaC1rci5wY2N3LmJlc3Q6MTgwOTAjVjMtS1IlMjBJUExDMSUyMCU1QlBWRyU1RC1HQU1JTkdPTkxZLTEweApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUA0LWhrLXN1MXguc3RhcnMucnVuOjMxNzc3P3BsdWdpbj1zaW1wbGUtb2JmcyUzQm9iZnMlM0RodHRwJTNCb2Jmcy1ob3N0JTNEZTQ5MTE0NTA5LnVwZGF0ZS5taWNyb3NvZnQuY29tI1YzLUhLJTIwQzElMjAlNUJGVU8lNUQtMXgKc3M6Ly9ZMmhoWTJoaE1qQXRhV1YwWmkxd2IyeDVNVE13TlRwWmREVkpPRkZWTVFAMy1oay1pbWNpLnN0YXJzLnJ1bjoyMTc3Nz9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1ISyUyMEMyJTIwJTVCQ0dPJTVELTF4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQDMtaGstc3Vpbi5zd2lzaC50ZWNoOjIxNzc3P3BsdWdpbj1zaW1wbGUtb2JmcyUzQm9iZnMlM0RodHRwJTNCb2Jmcy1ob3N0JTNEZTQ5MTE0NTA5LnVwZGF0ZS5taWNyb3NvZnQuY29tI1YzLUhLJTIwQzIlMjAlNUJQRUslNUQtMXgKc3M6Ly9ZMmhoWTJoaE1qQXRhV1YwWmkxd2IyeDVNVE13TlRwWmREVkpPRkZWTVFANC1oay1wdm5xLnN0YXJzLnJ1bjoxMTc3Nz9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1ISyUyMEMzJTIwJTVCSkpOJTVELTF4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQDEtaGstd2ZiYy5zdGFycy5ydW46MjE3Nzc/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtSEslMjBDNCUyMCU1QkZVTyU1RC0xeApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUAzLWhrLXdnYWMuc3RhcnMucnVuOjExNzc3P3BsdWdpbj1zaW1wbGUtb2JmcyUzQm9iZnMlM0RodHRwJTNCb2Jmcy1ob3N0JTNEZTQ5MTE0NTA5LnVwZGF0ZS5taWNyb3NvZnQuY29tI1YzLUhLJTIwQzUlMjAlNUJOTlklNUQtMXgKc3M6Ly9ZMmhoWTJoaE1qQXRhV1YwWmkxd2IyeDVNVE13TlRwWmREVkpPRkZWTVFAMy1oay1nd2FzLnN3aXNoLnRlY2g6MTE3Nzc/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtSEslMjBDNyUyMCU1QlBFSyU1RC0xeApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUBsYWsuaWlqYm9vbS5zdGFycy5ydW46MjI3Nzc/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtSEslMjBJUExDMiUyMCU1QlNaWCU1RC01eApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUA0LWpwLW9jdXEuc3dpc2gudGVjaDoxMTE3NT9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1KUCUyMEMxJTIwJTVCVEFPJTVELTF4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQDQtanAtb3hidS5zdGFycy5ydW46MTE3Nzc/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtSlAlMjBDMiUyMCU1QkNHTyU1RC0xeApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUAzLWpwLWluc28uc3RhcnMucnVuOjIxNzc3P3BsdWdpbj1zaW1wbGUtb2JmcyUzQm9iZnMlM0RodHRwJTNCb2Jmcy1ob3N0JTNEZTQ5MTE0NTA5LnVwZGF0ZS5taWNyb3NvZnQuY29tI1YzLUpQJTIwQzMlMjAlNUJKSk4lNUQtMXgKc3M6Ly9ZMmhoWTJoaE1qQXRhV1YwWmkxd2IyeDVNVE13TlRwWmREVkpPRkZWTVFAMy1qcC10bWpyLnN0YXJzLnJ1bjo0MTc3Nz9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1KUCUyMEM0JTIwJTVCU0hBJTVELTF4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQGpzYS5zb2Z0Yi5zdGFycy5ydW46MTE3Nzc/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtSlAlMjBJUExDMiUyMCU1QlNIQSU1RC01eApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUAzLWtyLWxoZnEuc3dpc2gudGVjaDo1MTMxNz9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1LUiUyMEMxJTIwJTVCSkpOJTVELTJ4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQDMtc2ctYXpzay5zdGFycy5ydW46MTExNzM/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtU0clMjBDMSUyMCU1QlBFSyU1RC0xeApzczovL1kyaGhZMmhoTWpBdGFXVjBaaTF3YjJ4NU1UTXdOVHBaZERWSk9GRlZNUUAzLXNnLXVjbWUuc3dpc2gudGVjaDoxMTc3Nz9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1TRyUyMEMyJTIwJTVCRlVPJTVELTF4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQDMtdHctZnVrbi5zd2lzaC50ZWNoOjQxNzc3P3BsdWdpbj1zaW1wbGUtb2JmcyUzQm9iZnMlM0RodHRwJTNCb2Jmcy1ob3N0JTNEZTQ5MTE0NTA5LnVwZGF0ZS5taWNyb3NvZnQuY29tI1YzLVRXJTIwQzElMjAlNUJQRUslNUQtMXgKc3M6Ly9ZMmhoWTJoaE1qQXRhV1YwWmkxd2IyeDVNVE13TlRwWmREVkpPRkZWTVFAMy1kZS1zY3BkLnN0YXJzLnJ1bjozMTc3Nz9wbHVnaW49c2ltcGxlLW9iZnMlM0JvYmZzJTNEaHR0cCUzQm9iZnMtaG9zdCUzRGU0OTExNDUwOS51cGRhdGUubWljcm9zb2Z0LmNvbSNWMy1VSyUyMEMxJTIwJTVCU0hBJTVELTF4CnNzOi8vWTJoaFkyaGhNakF0YVdWMFppMXdiMng1TVRNd05UcFpkRFZKT0ZGVk1RQDQtdXMtYXN2bi5zd2lzaC50ZWNoOjQxNzc3P3BsdWdpbj1zaW1wbGUtb2JmcyUzQm9iZnMlM0RodHRwJTNCb2Jmcy1ob3N0JTNEZTQ5MTE0NTA5LnVwZGF0ZS5taWNyb3NvZnQuY29tI1YzLVVTJTIwQzIlMjAlNUJYVVolNUQtMXgKc3M6Ly9ZMmhoWTJoaE1qQXRhV1YwWmkxd2IyeDVNVE13TlRwWmREVkpPRkZWTVFANC11cy13b25jLnN3aXNoLnRlY2g6NTE3ODc/cGx1Z2luPXNpbXBsZS1vYmZzJTNCb2JmcyUzRGh0dHAlM0JvYmZzLWhvc3QlM0RlNDkxMTQ1MDkudXBkYXRlLm1pY3Jvc29mdC5jb20jVjMtVVMlMjBDMyUyMCU1QlNIQSU1RC0xeAoK';
  this.method = [
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
  
  this.plugin = {
    'simple-obfs': [
      'http',
      'tls'
    ],
    'obfs-local': [
      'http',
      'tls'
    ]
  },
  
  this.re = {
    uri: /^ss:\/\/(.+)@(.+):(\d+)\/?(?=\?|#|$)(?:\?([^?#]*))?(?:#([^#]*))?$/,
    host: /^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$/,
    port: /^([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/,
    user_info: /^(.+?):(.+)$/,
    obfs: /obfs%3D([^%#]+)/,
    obfs_host: /obfs-host%3D([^%#]+)/,
    obfs_uri: /obfs-uri%3D([^%#]+)/
  },
  
  this.settings = {
    tfo: /tfo=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    udp: /udp=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    mptcp: /mptcp=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    default_http_obfs_host: 'static.ess.apple.com',
    http_obfs_host: /http=([^&]+)/.test(this.hashtag) ? RegExp.$1 : undefined,
    default_tls_obfs_host: 'gateway.icloud.com',
    tls_obfs_host: /tls=([^&]+)/.test(this.hashtag) ? RegExp.$1 : undefined,
    force_http: /force-http=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    force_tls: /force-tls=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    force_uri: /force-uri=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    custom_obfs_uri: /uri=([^&]+)/.test(this.hashtag) ? decodeURIComponent(RegExp.$1) : undefined,
    filter: /filter=([^&]+)/.test(this.hashtag) ? new RegExp('^'+decodeURIComponent(RegExp.$1)+'$') : undefined
  },
  
  this.genConf = function (uri) {
    if (uri === '\s' || uri === '') {
      return null;
    }

    let node = {};

    if (this.re.uri.test(uri)) {
      [node.user_info, node.host, node.port, node.plugin, node.tag] = [RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, decodeURIComponent(RegExp.$5)];
    } else {
      console.log('uri not matched\n');
      return null;
    }

    if (this.re.filter && !this.re.filterRe.test(node.tag)) {
      console.log(`Node ${node.tag} is abandoned by user-defined filter.\n`);
      return null;
    }

    if (!this.re.host.test(node.host)) {
      console.log(`node: ${node.tag}\nhost: ${node.host}\nhost error\n`);
      return null;
    }

    if (!this.re.port.test(node.port)) {
      console.log(`node: ${node.tag}\nport: ${node.port}\nport error\n`);
      return null;
    }
    node.dec_user_info = base64_decode(node.user_info.replace('-', '+').replace('_', '/'));
    if (this.re.user_info.test(node.dec_user_info)) {
      [node.method, node.password] = [RegExp.$1, RegExp.$2];
    } else {
      console.log(`node: ${node.tag}\nuserinfo: ${node.user_info}\nuser information error\n`);
      return null;
    }

    if (this.method.indexOf(node.method) === -1) {
      console.log(`node: ${node.tag}\nmethod: ${node.method}\nmethod not supported\n`);
      return null;
    }
    
    if (node.plugin) {
      for (let i in this.plugin) {
        if (node.plugin.indexOf(i) !== -1) {
          node.plugin_type = i
     		 	node.obfs = this.re.obfs.test(node.plugin) ? RegExp.$1 : undefined;
      		node.obfs_host = this.re.obfs_host.test(node.plugin) ? RegExp.$1 : undefined;
      		node.obfs_uri = this.re.obfs_uri.test(node.plugin) ? RegExp.$1 : undefined;
          break;
        }
      }
    }

    if (node.plugin && !node.obfs) {
      node.plugin = undefined;
      node.obfs = undefined;
      node.obfs_host = undefined;
      node.obfs_uri = undefined;
      console.log(`node: ${node.tag}\nplugin: ${plugin}\nplugin cannot be identified by parser and plugin has been removed, which may cause node unavailable\n`);
      //return null;
    }

    if (node.obfs) {
      let flag = false;
      for (let i of this.plugin[node.plugin_type]) {
        if (i === node.obfs) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        console.log(`node: ${node.tag}\nobfs: ${node.obfs}\nobfs mode error\n`);
      	return null;
      }
    }

    if (node.obfs_host && !this.re.host.test(node.obfs_host)) {
      
      node.plugin = undefined;
      node.obfs = undefined;
      node.obfs_host = undefined;
      node.obfs_uri = undefined;
      console.log(`node: ${node.tag}\nobfs-host: ${node.obfs_host}\nobfs-host error and plugin has been removed, which may cause node unavailable\n`);
      //return null;
    }

    // 服务端 SS 有 obfs 有混淆参数，客户端更改混淆参数将导致节点不可用。
    // 服务端 SS 有 obfs 无混淆参数，客户端混淆参数可以随意更改。
    // 服务端 SSD 非 origin 协议 + 协议参数 + 有obfs，客户端混淆参数可以随意更改。
    // 服务端 SSR 非 origin 协议 + 协议参数 + 有obfs，客户端混淆参数可以随意更改。
    if (node.obfs && (!node.obfs_host || this.settings.force_http || this.settings.force_tls)) {
      if (node.obfs === 'http') {
          node.obfs_host = (this.settings.http_obfs_host && this.re.host.test(this.settings.http_obfs_host)) ? this.settings.http_obfs_host : node.obfs_host || this.settings.default_http_obfs_host;
      }
      if (node.obfs === 'tls') {
          this.settings.http_obfs_host = (this.settings.tls_obfs_host && this.re.host.test(this.settings.tls_obfs_host)) ? this.settings.tls_obfs_host : node.obfs_host || this.settings.default_tls_obfs_host;
      }
    }

    if (node.obfs === 'http' && (!node.obfs_uri || this.settings.custom_obfs_uri)) {
      if (this.settings.custom_obfs_uri) {
          this.settings.custom_obfs_uri = (this.settings.custom_obfs_uri[0] === '/') ? this.settings.custom_obfs_uri : '/'+this.settings.custom_obfs_uri;
      }
      node.obfs_uri = this.settings.custom_obfs_uri || node.obfs_uri;
    }

    return `shadowsocks=${node.host}:${node.port}, method=${node.method}, password=${node.password}` + (node.obfs ? `, obfs=${node.obfs}` + (node.obfs_host ? `, obfs-host=${node.obfs_host}` + (node.obfs_uri ? `, obfs-uri=${node.obfs_uri}` : '') : '') : '') + `, fast-open=${this.settings.tfo}, udp-relay=${this.settings.udp}, tag=` + (node.tag || node.host);
  },

  this.genList = function (text) {
    try {
      if (text.indexOf('ss://') === -1) text = base64_decode(text);
      let content = text.split(/\s+/);
      for(var i = 0, len = content.length; i < len; i++){
      	content[i] = this.genConf(content[i]);
			}
      return {content: content.filter(s => s).join('\n')}
    } catch (err) {
      return {error: err};
    };
  }
}

let ssp = new shadowsocks_parser()
let content = ssp.genList(ssp.content)
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
