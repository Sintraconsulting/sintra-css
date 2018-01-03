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
            if ( $('body.oms-edit').length !== 1 ) {
                $( '.page_url_index  #contact_form_6' ).insertBefore( '.page_url_index #top_image' );
                $('.contact-header').closest('.div_central').remove();
            }
        });
    }
})();
