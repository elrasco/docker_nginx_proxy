const services = ["set_status_pagina", "set_cat_pagina", "set_camp_status", "loginfb", "new_login_fb"].join("|");
const pages = [
  "/admin/campagne/nuova/",
  "/admin/campagne/modifica/",
  "/admin/campaigns/",
  "/admin/campagne/insights/",
  "/condividi/campaign/",
  "/profilo/campaigns/",
  "/companies/",
  "/profilo/pagamenti/",
  "/admin/?.*/pagamenti/",
  "/admin/users/",
  "/admin/overview/"
].join("|");

module.exports = (env, raw_env) => {
  const prefix = env === "" ? "www." : env;
  return `server {
          listen 80;
          server_name ${prefix}fuguplay.com;
          server_name ${prefix}fuguplay.it;
          server_name ${env}fuguplay.sml-server.com;

          fastcgi_connect_timeout 75s;
          proxy_ignore_client_abort   on;            

          location / {
            set $backend "http://${env}legacy.fuguplay.com";
            proxy_connect_timeout       600s;
            proxy_send_timeout          600s;
            proxy_read_timeout          600s;
            send_timeout                600s;
            
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location = / {
            set $backend "http://website-fuguplay-homepage-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ $1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location /homepage {
            set $backend "http://website-fuguplay-homepage-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ /v2/$1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location /home/ {
            return 301 $scheme://${env}fuguplay.com;
          }

          location /login/aglogin/ {
            return 301 $scheme://${env}fuguplay.com/companies/;
          }

          location /pagamenti/ {
            return 301 $scheme://${env}fuguplay.com/profilo/pagamenti/;
          }

          location /downloads {
            set $backend "http://website-fuguplay-fe-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location ~ ^${pages} {
            set $backend "http://website-fuguplay-fe-${raw_env}.s3-website-eu-west-1.amazonaws.com/";
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location ~ ^/inc/service/(${services})\.php$ {
              set $backend "http://${env}services.sml-server.com:86/services/$1";
              proxy_pass  $backend;
              proxy_redirect		off;
          }

          location /v2 {
            set $backend "http://website-fuguplay-fe-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite /(?!.*js|.*ico|.*css) / break;
            rewrite ^/(.*)/$ /v2/$1 break;
            proxy_pass  $backend;
            proxy_redirect		off;
          }

          location ~ ^/fuguplay-be/insights/(reactions|comments|audience|shares|stories|reach|retention|details|global)/([0-9]*)$ {
            set $backend "http://${env}services.sml-server.com:86/insights/$1/$2";
            proxy_pass  $backend;

            proxy_cache fuguplay;
            proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
            
            proxy_redirect		off;
          }

          location ~ ^/fuguplay-be/campaign/(adminAll|all)$ {
            set $backend "http://${env}services.sml-server.com:86/campaign/$1";
            proxy_pass  $backend;

            proxy_cache fuguplay;
            proxy_cache_revalidate on;
            
            proxy_redirect		off;
          }

          location /fuguplay-be {
              set $backend "http://${env}services.sml-server.com:86";
              rewrite ^/fuguplay-be(.*) /$1 break;
              proxy_pass  $backend;
        			proxy_redirect		off;
          }

          location /landing {
            set $backend "http://website-fugu-landing-${raw_env}.s3-website-eu-west-1.amazonaws.com";
            rewrite ^/landing(.*js|.*ico) $1 break;
            rewrite ^/landing(.*)/$ $1/ break;
            rewrite ^/landing(.*)$ /landing$1/ permanent;
            proxy_pass  $backend;
      			proxy_redirect		off;
          }
  }`;
};
