# Script for converting subscription to list.

## 1. Setup

### Surge
```
[MITM]
tcp-connection = true // Optional for Quantumult X. Notice that this may cause errors.
hostname = example.com // Hostname of subscription URL.

[Script]
# Replace urlRegex with subscription URL regular expression.
htttp-request urlRegex script-path=subs_convert.js
htttp-response urlRegex requires-body=1,max-size=0,script-path=subs_convert.js
```

### Quantumult X
```
[rewrite_local]
# Replace urlRegex with subscription URL regular expression.
urlRegex url script-request-header subs_convert.js
urlRegex url script-response-body subs_convert.js

[mitm]
hostname = example.com // Hostname of subscription URL.
```

## 2. Usage
Add arguments using `&` in subscribtion URL.  
The URL must contain shadowsocks URI(s) which may be base64 encoded.  
The arguments supported are listed below:
- `&tfo=(1|true|yes)`: turn on TCP Fast Open.
- `&udp=(1|true|yes)`: turn on UDP relay.
- `&http=example.com`: set `obfs-host` for http obfs proxy with no `obfs-host `field.
- `&tls=example.com`: set `obfs-host` for tls obfs proxy with no `obfs-host` field.
- `&force-http=(1|true|yes)`: set `obfs-host` defined in `http` for all http obfs proxy.
- `&force-tls=(1|true|yes)`: set `obfs-host` defined in `tls` for all tls obfs proxy.
- `&force-uri=(1|true|yes)`: set `obfs-uri` defined in `uri` for all http obfs proxy.
- `&uri=/uri/file`: set `obfs-uri` for http obfs proxy with `obfs-host` field but no `obfs-uri`. This argument must be put in the end.