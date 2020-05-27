Creator.originalRemainCheckboxState = Creator.remainCheckboxState
Creator.remainCheckboxState = function (container) {
    if (Creator.getObjectRecord()) {
        window.location.reload();
    }
    else {
        Creator.originalRemainCheckboxState(container);
    }
}