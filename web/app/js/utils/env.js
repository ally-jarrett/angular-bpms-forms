/**
 * Assign __env to the root window object.
 *
 * The goal of this file is to allow the deployment
 * process to pass in environment values into the application.
 *
 * The deployment process can overwrite this file to pass in
 * custom values:
 *
 * window.__env = window.__env || {};
 * window.__env.url = 'some-url';
 * window.__env.key = 'some-key';
 *
 * Keep the structure flat (one level of properties only) so
 * the deployment process can easily map environment keys to
 * properties.
 */

(function (window) {
  window.__env = window.__env || {};
    
    window.__env.hostname = location.hostname;
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1'){
        window.__env.hostname = 'localhost'
        window.__env.port = '8080';
    } else {
        window.__env.port = location.port;
    }

  // Produces : 'http://' or 'https://'
  window.__env.protocol = location.protocol + '//';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));
