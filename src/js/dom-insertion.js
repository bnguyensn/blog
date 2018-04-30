'use strict';

/**
 * Insert a node at the current selection
 * @param range {Range} - The Range where the node should be inserted into
 * @param node {Node} - The node to be inserted
 * */
function insertNodeAtRange(range, node) {
    // Insert node
    range.deleteContents();
    range.insertNode(node);

    // Move caret outside of node
    range.setStartAfter(node);
    range.setEndAfter(node);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function insertLinkAtRange(range, textToDisplay, link) {
    if (range && textToDisplay && link) {
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', link);
        linkElement.appendChild(document.createTextNode(textToDisplay));
        insertNodeAtRange(range, linkElement);
    }
}

export {
    insertLinkAtRange
}