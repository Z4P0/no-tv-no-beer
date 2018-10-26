console.log('heres johnny');

var typewriter = {};

typewriter.target = document.querySelector('#main-content');
typewriter.string = 'All work and no play makes Johnny a dull boy. ';

typewriter.util = {
    randomNumber: function(max) {
        return Math.floor(Math.random() * (max - 1)) + 1;
    }
}


// a paragraph is the string * [1-8]
typewriter.writeParagraph = function() {
    var repeat = typewriter.util.randomNumber(8);
    var paragraphElement = document.createElement('p');
    var paragraphText = '';
    for (var i = 0; i < repeat; i++) {
        paragraphText += typewriter.string;
    }
    var textContent = document.createTextNode(paragraphText);
    return paragraphElement.appendChild(textContent);
}

typewriter.write = function() {
    var fragment = document.createDocumentFragment();
    var numberOfParagraphs = typewriter.util.randomNumber(8);
    for (var i = 0; i < numberOfParagraphs; i++) {
        fragment.appendChild(typewriter.writeParagraph());
    }
    typewriter.target.appendChild(fragment);
}

window.addEventListener('load', function() {
    console.log('test');
    // typewriter.target.appendChild(typewriter.writeParagraph());
    typewriter.write();
    typewriter.write();
    typewriter.write();
});
