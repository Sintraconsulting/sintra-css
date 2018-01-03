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
            if ( $('.oms-edit').length !== 1 ) {
              $( '#contact_6' ).insertAfter( '.top-image-content' );
              $( '#contact_6 .row' ).removeClass('row');
              $( '#contact_6' ).removeClass('div_central div_contact');
              $( '#contact_6' ).addClass('form-box');
              $( '#contact_6' ).attr('style', '');
           }
        });
    }
})();
