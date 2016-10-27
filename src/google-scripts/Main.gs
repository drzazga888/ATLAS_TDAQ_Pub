function getDocuments() {
    var files = DriveApp.getFilesByType('application/vnd.google-apps.document');
    var built = [];
    while (files.hasNext()) {
        var file = files.next();
        built.push({
            id: file.getId(),
            name: file.getName()
        });
    }
    return built;
}

function getBookmarks(doc_id) {
    var doc = DocumentApp.openById(doc_id);
    var bms = doc.getBookmarks();
    bms = getSortedBookmarks(bms);
    var built = [];
    for (var i = 0; i < bms.length; ++i) {
        built.push({
            id: bms[i].getId(),
            name: bms[i].getPosition().getElement().getText()
        });
    }
    return built;
}

function getTemplate(doc_id, bookmark_id) {
    var doc = DocumentApp.openById(doc_id);
    var bms = doc.getBookmarks();
    if (!bookmark_id && bms.length === 0) {
        return doc.getBody().getText();
    } else if (bookmark_id && bms.length > 0) {
        bms = getSortedBookmarks(bms);
        var bm = doc.getBookmark(bookmark_id);
        var i = getBookmarkPosition(bm, bms);
        return cleanText(getSelectedText(buildRange(doc, bms, i)));
    }
    return null;
}