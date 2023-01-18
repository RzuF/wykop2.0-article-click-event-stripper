// ==UserScript==
// @name         Wykop 2.0 fixing scripts
// @namespace    http://rzuf.pro
// @version      1
// @description  Removes annoying click event from each entry that cause redirect by missclick
// @author       RzuF
// @match        https://wykop.pl/mikroblog*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wykop.pl
// @grant    GM_addStyle
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';

    waitForKeyElements("article:not(.entry-block-skeleton)", stripEventFromArticle, true);

    function stripEventFromArticle(node) {
        const article = node[0];
        const cleanArticle = article.cloneNode(false);
        article.childNodes.forEach(childNode => {
            cleanArticle.appendChild(childNode);
        });
        article.parentNode.replaceChild(cleanArticle, article);
        console.log("Stripped article from annoying click event for: " + cleanArticle.parentElement.id);
    };
})();