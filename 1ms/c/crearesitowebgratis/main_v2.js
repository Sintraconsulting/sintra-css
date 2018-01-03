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
              var innerForm = $('.contact-header').closest('.row')[0].innerHTML
              innerForm = `<div class="form-box">${innerForm}</div>`;
              $('.contact-header').closest('.row')[0].innerHTML = innerForm;

              $( '.form-box' ).insertAfter( '.top-image-content' );
              $('.contact-header').closest('.div_central').addClass('toRemove');
              $('.toRemove').remove();
           }
        });
    }
})();
