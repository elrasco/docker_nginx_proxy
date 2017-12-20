module.exports = () => {
  return `server {
            listen 80;
            server_name shark.smallfish.com;
  
            location / {
              set $backend "http://website-neon-dev.s3-website-eu-west-1.amazonaws.com";
              proxy_pass  $backend;
              proxy_redirect		off;
            }
      }`;
};
