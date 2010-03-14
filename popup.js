function extractTopLevelUrl(url) {
    var urlRegexp = /.*:\/\/(www\.)?([^\/]*)\.([^\/]*)\//;
    var result = urlRegexp.exec(url);
    if (result == null) {
        return null;
    } else {
        return result[2] + '.' + result[3];
    }
}

function closeTabs(tabs) {
    $.each(tabs, function(index, value) {
        chrome.tabs.remove(value.id, null);
    });
}

function init() {
    var tabHash = new Array();

    function addTab(tab) {
        var url = extractTopLevelUrl(tab.url);
        if (url != null) {
	        if (tabHash[url] == null) {
	            tabHash[url] = new Array();
	            $('#windows').append('<li><img href="'+tab.favIconUrl+'" /><a href="#" class="urls">'+url+'</a></li>');
			    
	            $('.urls').live('click', function() {
		            closeTabs(tabHash[$(this).html()]);
		            $(this).parent().remove();
	            });
	        }
	        tabHash[url].push(tab);
        }
    }

    chrome.windows.getAll(null, function (windows) {
        $.each(windows, function(winIndex, winValue) {
	        chrome.tabs.getAllInWindow(winValue.id, function(tabs) {
	            $.each(tabs, function(index, value) {
		            addTab(value);
	            });
	        });
        });
    });

    chrome.tabs.onCreated.addListener(function(tab) {
        addTab(tab);
    });
}
