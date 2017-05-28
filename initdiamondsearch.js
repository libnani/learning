!(function(win, doc) {
    var iframe_url = '//technet.rapaport.com/services/retailfeed/index.html', // main.js
        assets_url = '//www.diamondselections.com/Embed/client_assets/';
    loadAssets('diamondsearch.css', 'css');
    win.onload = function() {
        var d = document.getElementById("diamondsearch");
        d.className = d.className + " ds-loading";
        var i = doc.createElement('iframe');
        i.style.display = 'none';
        i.id = 'rapnet';
        i.src = iframe_url;
        i.setAttribute('assets-url', assets_url);
        doc.body.appendChild(i);
        i.onload = function() {
            if (!win.jQuery) {
                loadAssets('jquery.min.js', 'js', addAngular);
            } else {
                if (!!jQuery.fn.on) {
                    addAngular();
                } else {
                    alert('Rapnet: You are using an outdated version of jQuery. Please upgrade to version 1.7.0 or higher.');
                }
            }
        };
        function addAngular() {
            if (!win.angular) {
                loadAssets('angular.min.js', 'js', function() {
                    loadAssets('diamondsearch.min.js', 'js');
                });
            } else {
                loadAssets('diamondsearch.min.js', 'js');
            }
        }
    };
    function loadAssets(filename, filetype, cb) {
        var cacheVersion = '?v=10008';
        if (filetype === 'js') {
            var f = doc.createElement('script');
            f.setAttribute('type', 'text/javascript');
            f.setAttribute('src', assets_url + filename + cacheVersion);
        } else if (filetype == 'css') {
            var f = doc.createElement('link');
            f.setAttribute('rel', 'stylesheet');
            f.setAttribute('type', 'text/css');
            f.setAttribute('href', assets_url + filename + cacheVersion);
        }
        if (doc.addEventListener) {
            f.onload = function() { cb && cb(); };
        } else {
            f.onreadystatechange = function() {
                if (this.readyState === 'loaded' || this.readyState === 'complete') {
                    cb && cb();
                    this.onreadystatechange = null;
                }
            };
        }
        if (typeof f !== 'undefined') {
            doc.getElementsByTagName('head')[0].appendChild(f);
        }
    }
})(window, document);
