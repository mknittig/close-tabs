$(function(){

    test("extracts basic urls", function() {
        equalsTopLevelUrl("google.com", "http://www.google.com/");
    });
    
    test("extracts urls with path", function() {
        equalsTopLevelUrl("google.com", "http://www.google.com/with/some/path");
    });
    
    test("extracts urls with subdomain", function() {
        equalsTopLevelUrl("mail.google.com", "http://www.mail.google.com/");
    });

    // test helpers
    
    function equalsTopLevelUrl(expected, actual) {
        equals(expected, extractTopLevelUrl(actual));
    }

});
