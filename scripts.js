'use strict';

console.log('heeeeerree\'s Johnny!');

var typewriter = {
    string: 'All work and no play makes Johnny a dull boy. ',
    // a paragraph is the string * [1-8]
    writeParagraph: function() {
        var numberOfSentences   = typewriter.util.randomNumber(8),
            paragraphElement    = document.createElement('p'),
            paragraphText       = '',
            textNode;

        // generate the paragraph content
        for (var i = 0; i < numberOfSentences; i++) {
            paragraphText += typewriter.string;
        }

        // create a textNode with the string
        textNode = document.createTextNode(paragraphText);

        // append text node
        paragraphElement.appendChild(textNode);

        return paragraphElement;
    },
    write: function() {
        var fragment            = document.createDocumentFragment(),
            numberOfParagraphs  = typewriter.util.randomNumber(12);

        // write some paragraphs
        for (var i = 0; i < numberOfParagraphs; i++) {
            fragment.appendChild(typewriter.writeParagraph());
        }

        // add them to the page
        typewriter.target.appendChild(fragment);
    },
    util: {
        randomNumber: function(max) {
            return Math.floor(Math.random() * (max - 1)) + 1;
        }
    }
};


window.addEventListener('load', function() {

    typewriter.target = document.querySelector('#main-content');

    typewriter.write();
    typewriter.write();
    typewriter.write();
});
