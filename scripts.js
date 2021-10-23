'use strict';

console.log('heeeeerree\'s Homie!');


// scroll tracking variables
var ticking = false,
    lastScrollPosition = 0,
    // innerHeight = 0;  // add this to the scrollPosition value
    innerHeight = window.innerHeight;

// typewriter object to add content to the page
var typewriter = {
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    punctuation: ['.', ',', '!', '?', '...', ''],
    words: ['No', 'TV', 'and', 'no', 'beer', 'make', 'Homer', 'go', 'crazy', '.'],
    completeSentence: 'No TV and no beer make Homer go crazy.\u00A0\u00A0',

    writeNewWord: function(startingWord) {
        var newWord = startingWord,
            // grab a random character in the string
            targetCharacter = newWord.charAt(Math.floor(Math.random() * newWord.length));

        if (Math.random() < 0.8) {
            // multiple letters:    mmakes, pllay, plaay, Alll
            if (Math.random() < 0.2) {
                newWord = newWord.replace(targetCharacter, targetCharacter+targetCharacter);
            }
            // mixed type case:     PLay, and NO play, JACa
            if (Math.random() < 0.2) {
                newWord = newWord.replace(targetCharacter, targetCharacter.toUpperCase());
            }
            // missing letters:     ma es
            if (Math.random() < 0.2) {
                newWord = newWord.replace(targetCharacter, ' ');
            }
            // replace letters:     dyll, bog, bot
            if (Math.random() < 0.2) {
                newWord = newWord.replace(targetCharacter, typewriter.util.randomLetter());
            }
            // remove letter:       ply
            if (Math.random() < 0.2) {
                newWord = newWord.replace(targetCharacter, '');
            }
        }

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

            // if we're not at the end of the sentence, at the period
            if (i !== typewriter.words.length - 1) {
                // add typo 40% of the time
                if (roll < 0.4) {
                    sentence += typewriter.writeNewWord(currentWord);
                } else {
                    sentence += currentWord;
                }

                // add a space after each word 95% of the time
                // unless the current word is 'boy'
                // --
                // dullboy, noplay
                if (i < typewriter.words.length - 2) {
                    if (roll < 0.95) {
                        sentence += ' ';
                    }
                }
            } else {
                // add a double space at the end of the sentence
                sentence += currentWord + '\u00A0\u00A0';
            }
        }

        // - add color variance
        //   > requires span tags
        //   ink on paper, in the film A and J seem to have been smashed on the keyboard
        //   so they have a darker color, like more ink was applied

        // - mixed leading
        //   inline

        return sentence
    },
    // a paragraph is the string * [1-8]
    writeParagraph: function(numberOfSentences) {
        var paragraphElement    = document.createElement('p'),
            paragraphText       = '',
            textNode;

        // generate the paragraph content
        for (var i = 0; i < numberOfSentences; i++) {
            paragraphText += typewriter.writeSentence();
        }
        // for single columns we don't add periods
        if (numberOfSentences === 1) {
            paragraphText = paragraphText.replace('.', '');
        }

        // create a textNode with the string
        textNode = document.createTextNode(paragraphText);

        // append text node
        paragraphElement.appendChild(textNode);

        // mess with the style
        // ----------------------------------------
        if (Math.random() < 0.3) {
            // line-height:
            paragraphElement.style.lineHeight = Math.random() + 0.5;
        }

        return paragraphElement;
    },
    // write a page (multiple paragraphs)
    write: function() {
        var sectionElement      = document.createElement('section'),
            fragment            = document.createDocumentFragment(),
            numberOfParagraphs  = typewriter.util.randomNumber(10),
            numberOfSentences   = 1,
            singleColumnMode    = false;

        // output 1 of 2 layouts
        // 1 - single column
        //      requires the paragraphs to be just 1 sentence
        //      increase number of possible sentences to 20
        // 2 - page layout
        //  A   regular, flush left
        //  B   with indetned paragrapphs
        // ----------------------------------------
        // 1 - single column, 50% of the time
        if (Math.random() < 0.5) {
            singleColumnMode = true;

            sectionElement.className = 'single-column';

            numberOfParagraphs = typewriter.util.randomNumber(17) + 3;
            if (Math.random() < 0.1) {
                numberOfParagraphs = 1;
            }

            // align-content right 20% of the time
            if (Math.random() < 0.2) {
                sectionElement.style.textAlign = 'right';
            }
        }

        // write some paragraphs
        for (var i = 0; i < numberOfParagraphs; i++) {
            if (singleColumnMode) {
                numberOfSentences = 1;
            } else {
                numberOfSentences = typewriter.util.randomNumber(15) + 1;
            }

            fragment.appendChild(typewriter.writeParagraph(numberOfSentences));
        }

        // style the entire section element
        // ----------------------------------------
        // add to section element, which adds margin-bottom
        sectionElement.appendChild(fragment);
        if (Math.random() < 0.2) {
            // line-height:
            sectionElement.style.lineHeight = Math.random() + 0.8;
        }

        if (!singleColumnMode) {
            if (Math.random() < 0.3) {
                sectionElement.className = 'indented-paragraphs';
            } else {
                if (Math.random() < 0.5) {
                    sectionElement.className = 'layout-' + typewriter.util.randomNumber(3);
                }
            }
        }

        // add them to the page
        typewriter.target.appendChild(sectionElement);
    },
    util: {
        randomNumber: function(max) {
            return Math.ceil(Math.random() * (max - 1)) + 1;
        },
        randomLetter: function() {
            return typewriter.letters[
                Math.floor(Math.random() * typewriter.letters.length)
            ];
        }
    }
};

function scrollEventHandler(scrollPosition) {
    var position = Math.floor(scrollPosition + innerHeight);

    if (position >= document.body.scrollHeight * 0.9) {
        typewriter.write();
    }
}


window.addEventListener('load', function() {

    // set some variables now that the page is ready
    typewriter.target   = document.querySelector('#main-content');

    typewriter.write();
    // typewriter.write();
    // typewriter.write();
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
