chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({url: '/html/upload.html'});
});