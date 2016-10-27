function testGetTemplate() {
    //var returned = getTemplate('1VlZ5lyw9RQd108de6wF9y3UchTH6xVxW7zwqj3_RHOc', 'id.4vf9jamyqcph');
    var returned = getTemplate('1hdq4bhbU9YGlbAoT-R9PEqb3tVERviyCVNQLUKR_9rI');
    Logger.log(JSON.stringify(returned));
}

function testGetDocuments() {
    var returned = getDocuments();
    Logger.log(JSON.stringify(returned));
}

function testGetBookmarks() {
    //var returned = getBookmarks('1VlZ5lyw9RQd108de6wF9y3UchTH6xVxW7zwqj3_RHOc');
    var returned = getBookmarks('1hdq4bhbU9YGlbAoT-R9PEqb3tVERviyCVNQLUKR_9rI');
    Logger.log(JSON.stringify(returned));
}