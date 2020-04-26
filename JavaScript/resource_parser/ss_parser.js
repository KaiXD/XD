/**
 * README: https://github.com/KaiXD/XD/blob/master/JavaScript/resource_parser/README.md
 */

// $resource, $notify(title, subtitle, message)
// HTTP reqeust and persistent storage related APIs are not supported in resource parser.

// $resource.link contains the original URL of the resource or the path if the resource is local.
// $resource.content contains the response(UTF8) from the URL .

// $done({error : "error description"});
// $done({content : "the modified content"});

"use strict";

function shadowsocks_parser () {
  this.hashtag = $resource.link.split('#')[1];
  this.content = $resource.content;
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

    if (this.settings.filter && !this.settings.filter.test(node.tag)) {
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
    }
  };
}

function shadowsocksr_parser(uri) {
  this.hashtag = $resource.link.split('#')[1];
  this.content = $resource.content;

  this.settings = {
    tfo: /tfo=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    udp: /udp=(?:1|true|yes)/.test(this.hashtag) ? true : false,
    obfs_host: /obfs-host=([^&]+)/.test(this.hashtag) ? RegExp.$1 : undefined,
    filter: /filter=([^&]+)/.test(this.hashtag) ? new RegExp('^'+decodeURIComponent(RegExp.$1)+'$') : undefined
  };
  
  this.normal_b64 = function (str) {
    return str.replace('-', '+').replace('_', '/');
  };
  
  this.genConf = function (uri) {
    try {
      const str = uri.replace('ssr://', '');
      const str_dec = base64_decode(this.normal_b64(str));
      const [ssr_str, params_str] = str_dec.split('/?');
      
      const ssr_arr = ssr_str.split(':');
      const ssr = {
        server: ssr_arr[0],
        port: ssr_arr[1],
        protocol: ssr_arr[2],
        method: ssr_arr[3],
        obfs: ssr_arr[4],
        password: base64_decode(this.normal_b64(ssr_arr[5]))
        };
    
      const params_arr = params_str.split('&');
      params_arr.forEach(params => {
        if (params.indexOf('obfsparam') > -1) ssr.obfs_param = this.settings.obfs_host || base64_decode(this.normal_b64(params.split('=')[1]));
        if (params.indexOf('protoparam') > -1) ssr.proto_param = base64_decode(this.normal_b64(params.split('=')[1]));
        if (params.indexOf('remarks') > -1) ssr.remarks = base64_decode(this.normal_b64(params.split('=')[1]));
        if (params.indexOf('group') > -1) ssr.group = base64_decode(this.normal_b64(params.split('=')[1]));
      });
      
      if (this.settings.filter && !this.settings.filter.test(ssr.remarks)) {
        console.log(`Node ${ssr.remarks} is abandoned by user-defined filter.\n`);
        return null;
      }
        return `shadowsocks=${ssr['server']}:${ssr['port']}, method=${ssr['method']}, password=${ssr['password']}, ssr-protocol=${ssr['protocol']}, ssr-protocol-param=${ssr['proto_param']}, obfs=${ssr['obfs']}, obfs-host=${ssr['obfs_param']}, fast-open=${this.settings.tfo}, udp-relay=${this.settings.udp}, tag=${ssr['remarks']}`;
    } catch (err) {
        console.log(err);
        return null;
    }
  };
  
  this.genList = function (text) {
    try {

      if (text.indexOf('ssr://') === -1) text = base64_decode(text);

      let content = text.split(/\s+/).filter(s => s);

      for(var i = 0, len = content.length; i < len; i++){
      	content[i] = this.genConf(content[i]);

			}
      return {content: content.filter(s => s).join('\n')}
    } catch (err) {
      return {error: err};
    }
  };
}

let rp = $resource.content.slice(0, 4) === 'c3Ny' ? new shadowsocksr_parser() : new shadowsocks_parser();
let content = rp.genList(rp.content);
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
