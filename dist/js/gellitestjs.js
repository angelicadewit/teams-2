'use strict';

var mql = window.matchMedia('(max-width: 640px)');

var h2s = document.querySelectorAll('li h2');
var allLIs = document.querySelectorAll('li');

var removeBodyClasses = function removeBodyClasses() {
    document.body.classList.remove('food');
    document.body.classList.remove('bureau');
    document.body.classList.remove('bar');
    document.body.classList.remove('table');
    document.body.classList.remove('location');
    document.body.classList.remove('hours');
};

var closeOtherOpenLIs = function closeOtherOpenLIs() {
    document.querySelectorAll('li.open').forEach(function (otherOpen) {
        otherOpen.classList.remove('preview');
        otherOpen.classList.remove('open');
    });
};

var hideOtherOpenLIs = function hideOtherOpenLIs() {
    allLIs.forEach(function (allLI) {
        allLIs.style.visibility = 'none';
    });
};

h2s.forEach(function (h2) {

    var small = {
        setup: function setup() {
            console.log('small setup');
            h2.addEventListener('click', small.onClick);
        },
        teardown: function teardown() {
            console.log("small teardown");
            h2.removeEventListener('click', small.onClick);
        },
        onClick: function onClick(e) {
            removeBodyClasses();
            document.body.classList.add(this.getAttribute('data-body-class'));

            if (!h2.classList.contains('preview')) {
                closeOtherOpenLIs();
                h2.parentElement.classList.add('preview');
                h2.parentElement.classList.add('open');

                // description.classList.add(`open`)
                console.log('open');
            } else {
                h2.parentElement.classList.remove('preview');
                h2.parentElement.classList.remove('open');
                console.log('close');
            }
        },
        onlyShowOnePanel: function onlyShowOnePanel(e) {
            h2s.forEach(function (h2) {
                h2.classList.remove("open");
                h2.classList.remove("preview");
            });
        }
    };

    var large = {
        setup: function setup() {
            console.log('large setup');
            h2.addEventListener('mouseover', large.h2MouseOver);
            h2.addEventListener('mouseout', large.h2MouseOut);
            h2.addEventListener('click', large.h2MouseClick);
        },
        teardown: function teardown() {
            console.log('large teardown');
            h2.removeEventListener('mouseover', large.h2MouseOver);
            h2.removeEventListener('mouseout', large.h2MouseOut);
            h2.removeEventListener('click', large.h2MouseClick);
        },
        h2MouseClick: function h2MouseClick() {
            if (!h2.parentElement.classList.contains('open')) {
                closeOtherOpenLIs();
                h2.parentElement.parentElement.classList.add('a-child-is-open'); // the UL
                h2.parentElement.classList.add('open'); // the LI
                h2.removeEventListener('mouseout', large.h2MouseOut);
            } else {
                h2.parentElement.parentElement.classList.remove('a-child-is-open'); // the UL
                h2.parentElement.classList.remove('open');
                h2.parentElement.classList.remove('preview');
                h2.addEventListener('mouseout', large.h2MouseOut);
                document.body.classList.remove(this.getAttribute('data-body-class'));
            }
        },

        h2MouseOver: function h2MouseOver() {
            console.log("hover");
            removeBodyClasses();
            document.body.classList.add(this.getAttribute('data-body-class'));
            this.parentElement.classList.add('preview');
        },
        h2MouseOut: function h2MouseOut() {
            removeBodyClasses();
            document.body.classList.remove(this.getAttribute('data-body-class'));
            this.parentElement.classList.remove('preview');
        }
    };

    mql.addListener(function (data) {
        if (data.matches) {
            console.log('mql changed to small');
            large.teardown();
            small.setup();
        } else {
            console.log('mql changed to large');
            small.teardown();
            large.setup();
        }
    });

    if (mql.matches) {
        small.setup();
    } else {
        large.setup();
    }
});
//# sourceMappingURL=gellitestjs.js.map