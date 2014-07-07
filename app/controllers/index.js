// All the job here is redirecting, run FTR if it's first time, else, run the app
var appOrFTRWin;
var prefixWin = OS_IOS ? "" : "/";

if(firstTime) appOrFTRWin = Alloy.createController(prefixWin + "FTR/index").getView();
else appOrFTRWin = Alloy.createController(prefixWin + "appTabGroup").getView();
