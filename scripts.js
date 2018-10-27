'use strict';

console.log('heeeeerree\'s Johnny!');

// console.log('All work and no play makes Johnny a dull boy.\u00A0\u00A0'.length);

var typewriter = {
    sentence: 'All work and no play makes Johnny a dull boy.\u00A0\u00A0',
    writeSentence: function() {
        var sentenceString = '';
        // 80% of the time we just write the regular sentence
        if (Math.random() < 0.8) {
            sentenceString = typewriter.sentence;
        } else {
            sentenceString = typewriter.writeNewSentence();
        }

        return sentenceString;
    },
    writeNewSentence: function() {
        // build a whole new string
        var sentence = typewriter.sentence.replace('ll', 'adlk');
        return sentence
    },
    // a paragraph is the string * [1-8]
    writeParagraph: function() {
        var numberOfSentences   = typewriter.util.randomNumber(8),
            paragraphElement    = document.createElement('p'),
            paragraphText       = '',
            textNode;

        // generate the paragraph content
        for (var i = 0; i < numberOfSentences; i++) {
            paragraphText += typewriter.writeSentence();
        }

        // create a textNode with the string
        textNode = document.createTextNode(paragraphText);

        // append text node
        paragraphElement.appendChild(textNode);

        // mess with the style
        // ----------------------------------------
        var random = Math.random();
        if (random < 0.3) {
            // line-height:
            paragraphElement.style.lineHeight = Math.random() + 0.5;

        }

        return paragraphElement;
    },
    // write a page (multiple paragraphs)
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

var lastScrollPosition = 0;
var ticking = false;

// add this to the scrollPosition value
var innerHeight = window.innerHeight;

function scrollEventHandler(scrollPosition) {
    var position = Math.ceil(scrollPosition + innerHeight);

    if (position + (innerHeight / 4) >= document.body.scrollHeight) {
        typewriter.write();
    }
}


window.addEventListener('load', function() {

    typewriter.target = document.querySelector('#main-content');

    typewriter.write();
    typewriter.write();
    typewriter.write();
});


window.addEventListener('scroll', function(event) {

    lastScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function() {
            scrollEventHandler(lastScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});
