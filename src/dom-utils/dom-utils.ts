function tabKeydownListener(e: KeyboardEvent) {
  if (e.keyCode === 9) { // tab was pressed
    // get caret position/selection
    const start = (<HTMLTextAreaElement>e.currentTarget).selectionStart;
    const end = (<HTMLTextAreaElement>e.currentTarget).selectionEnd;

    const target = <any> e.target;
    const value = target.value;

    // set textarea value to: text before caret + tab + text after caret
    target.value = value.substring(0, start)
      + "\t"
      + value.substring(end);

    // put caret at right position again (add one for the tab)
    (<HTMLTextAreaElement>e.currentTarget).selectionStart = (<HTMLTextAreaElement>e.currentTarget).selectionEnd = start + 1;

    // prevent the focus lose
    e.preventDefault();
  }
}

export function enableSmartTab(inputElement: HTMLTextAreaElement) {

  if (!inputElement) {
    console.error("DomUtils.enableSmartTab: inputElement undefined !");
    return;
  }

  inputElement.addEventListener('keydown', tabKeydownListener, false);
}

export function disabledSmartTab(inputElement: HTMLTextAreaElement) {
  inputElement.removeEventListener('keydown', tabKeydownListener);
};
