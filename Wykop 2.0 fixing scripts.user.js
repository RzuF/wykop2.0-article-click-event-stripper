// ==UserScript==
// @name         Wykop 2.0 fixing scripts
// @namespace    http://rzuf.pro
// @version      2.0
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

    const strippedClass = "stripped-from-annoying-event";

    function stripEventFromArticle(article) {
        const cleanArticle = article.cloneNode(false);
        cleanArticle.style = "cursor: initial;";
        cleanArticle.classList.add(strippedClass);
        article.childNodes.forEach(childNode => {
            cleanArticle.appendChild(childNode);
        });
        article.parentNode.replaceChild(cleanArticle, article);
        console.log("Stripped article from annoying click event for: " + cleanArticle.parentElement.id);
    };

    const config = { attributes: false, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                observer.disconnect();
                const articles = document.querySelectorAll("article:not(."+ strippedClass +")");
                articles.forEach(article => {
                    stripEventFromArticle(article);
                });
                observer.observe(document.body, config);
            }
        }
    };
    const observer = new MutationObserver(callback);
    let observerLoaded = false;

    waitForKeyElements("section.from-pagination-microblog>div.content", () => {
        if(!observerLoaded) {
            observerLoaded = true;
            const contentDiv = document.querySelectorAll("section.from-pagination-microblog>div.content")[0];
            console.log(contentDiv);
            observer.observe(contentDiv, config);
        }
    }, true);
})();