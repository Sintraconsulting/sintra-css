(function() {
    "use strict";

    if (typeof omsOnInit === 'function') {
        omsOnInit(doWork);
    }
    else {
        doWork();
    }

    function doWork() {
        require(['jquery', 'domReady!'], function($) {
            jQuery( ".page_url_index  #contact_form_6 ).insertBefore( ".page_url_index #top_image" );
        });
    }
})();
