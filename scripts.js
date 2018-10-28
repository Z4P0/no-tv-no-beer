'use strict';

console.log('heeeeerree\'s Johnny!');

// console.log('All work and no play makes Johnny a dull boy.\u00A0\u00A0'.length);

var typewriter = {
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    punctuation: ['.', ',', '!', '?', '...', ''],
    words: ['All', 'work', 'and', 'no', 'play', 'makes', 'Johnny', 'a', 'dull', 'boy', '.', '\u00A0\u00A0'],
    completeSentence: 'All work and no play makes Johnny a dull boy.\u00A0\u00A0',
    writeNewWord: function(startingWord) {
        // multiple letters:         mmakes, pllay, plaay, Alll
        // mixed type case:          PLay, and NO play, JACa
        // missing letters:          ma es
        // replace letters:          dyll, bog, bot
        // blend with next word:     Jaca
        // other:                    ply

        var newWord = startingWord;
        return newWord;
    },
    writeSentence: function() {
        var sentenceString = '';
        // 80% of the time we just write the regular sentence
        if (Math.random() < 0.8) {
            sentenceString = typewriter.completeSentence;
        } else {
            sentenceString = typewriter.writeNewSentence();
        }

        return sentenceString;
    },
    writeNewSentence: function() {
        // build a whole new string
        var sentence = '';
        var currentWord = '';
        var roll = 0;  // var to hold all random values

        // add random letter before the start of the text
        if (Math.random() < 0.1) {
            sentence += typewriter.util.randomLetter() + ' ';
        }

        // go through the words array
        for (var i = 0; i < typewriter.words.length; i++) {
            roll = Math.random();
            currentWord = typewriter.words[i];
            // add typo 40% of the time
            if (roll < 0.4) {
                sentence += typewriter.writeNewWord(currentWord);
            } else {
                sentence += currentWord;
            }

            // add a space after each word 90% of the time
            // unless the word is boy or the double spaces at the end of words array
            // --
            // dullboy, noplay
            if (currentWord !== 'boy') {
                if (roll < 0.95) {
                    sentence += ' ';
                }
            }
        }


        // - add color variance
        //   > requires span tags
        //   ink on paper, in the film A and J seem to have been smashed on the keyboard
        //   so they have a darker color, like more ink was applied

        // - mixed leading
        //   inline and

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
        },
        randomLetter: function() {
            return typewriter.letters[
                Math.floor(Math.random() * typewriter.letters.length)
            ];
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
