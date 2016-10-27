function getBookmarkPosition(bm, bms) {
    for (var i = 0; i < bms.length; ++i) {
        if (bms[i].getId() === bm.getId()) {
            return i;
        }
    }
    return null;
}

function cleanText(text) {
    return text.join("\n").replace(/\r/g, "\n");
}

function getSortedBookmarks (bms) {

    return bms.map( function (b) {
        return { path : pathInDocument(b.getPosition().getElement()), bookMark:b } ;
    })
        .sort ( function (a,b) {
            return ( a.path>b.path ? 1 : (a.path < b.path ? -1 : 0));
        })
        .map ( function (b) {
            return b.bookMark;
        });

    function pathInDocument(element,path) {
        path = path || "" ;
        var parent = element.getParent();
        if (parent) {
            path = pathInDocument( parent , Utilities.formatString ( '%04d.%s', parent.getChildIndex(element),path  ));
        }
        return path;
    }

}

function buildRange(doc, bms, i) {
    var rangeBuilder = doc.newRange();
    if (i < bms.length - 1) {
        rangeBuilder.addElementsBetween(
            bms[i].getPosition().getElement(),
            bms[i + 1].getPosition().getElement().getPreviousSibling()
        );
    } else {
        var body = doc.getBody();
        rangeBuilder.addElementsBetween(
            bms[i].getPosition().getElement(),
            body.getChild(body.getNumChildren() - 1)
        );
    }
    return rangeBuilder.build();
}

/**
 * Gets the text the user has selected. If there is no selection,
 * this function displays an error message.
 *
 * @return {Array.<string>} The selected text.
 */
function getSelectedText(selection) {
    if (selection) {
        var text = [];
        var element;
        var elements = selection.getRangeElements();
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].isPartial()) {
                element = elements[i].getElement().asText();
                var startIndex = elements[i].getStartOffset();
                var endIndex = elements[i].getEndOffsetInclusive();

                text.push(element.getText().substring(startIndex, endIndex + 1));
            } else {
                element = elements[i].getElement();
                // Only translate elements that can be edited as text; skip images and
                // other non-text elements.
                if (element.editAsText) {
                    var elementText = element.asText().getText();
                    // This check is necessary to exclude images, which return a blank
                    // text element.
                    if (elementText != '') {
                        text.push(elementText);
                    }
                }
            }
        }
        return text;
    } else {
        return null;
    }
}
