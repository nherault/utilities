function tabKeydownListener(e) {
    if (e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = e.currentTarget.selectionStart;
        var end = e.currentTarget.selectionEnd;
        var target = e.target;
        var value = target.value;
        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
            + "\t"
            + value.substring(end);
        // put caret at right position again (add one for the tab)
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1;
        // prevent the focus lose
        e.preventDefault();
    }
}
export function enableSmartTab(inputElement) {
    if (!inputElement) {
        console.error("DomUtils.enableSmartTab: inputElement undefined !");
        return;
    }
    inputElement.addEventListener('keydown', tabKeydownListener, false);
}
export function disabledSmartTab(inputElement) {
    inputElement.removeEventListener('keydown', tabKeydownListener);
}
;
//# sourceMappingURL=../../src/src/dom-utils/dom-utils.js.map