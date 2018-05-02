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

function getCaretPosition(editableDiv) {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount) {
            const range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode === editableDiv) {
                return range.endOffset;
            }
        }
    }

    return 0
}

function getRange() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount) {
        return selection.getRangeAt(0);
    }
    return null
}

export {
    insertLinkAtRange,
    getRange
}