// Defining a function to close the window that is called from android back and back btn in action bar
function closeWindow() {
	$.win.close();
}

// Adding a back button to android's action bar
if(OS_ANDROID) {
	$.win.addEventListener('open', function() {
		$.win.activity.actionBar.onHomeIconItemSelected = closeWindow;
		$.win.activity.actionBar.displayHomeAsUp = true;
	});
}