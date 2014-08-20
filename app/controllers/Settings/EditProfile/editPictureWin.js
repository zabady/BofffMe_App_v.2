
// Event listener for the option dialog to open the camera or choose a photo from library 
function optionDialogClicked(e)
{
	// index "0" equals camera selection as a source
	if (e.index == 0) 
	{
		Ti.Media.showCamera({
			success : function(event) {
				resizeAndSaveProfilePictures(event.media);
			},
			cancel : function() {
				alert("You have cancelled !");
			},
			error : function(error) {
				alert('Unexpected error: ' + error.code);
			},
			saveToPhotoGallery : false, // TODO: Change it in real app
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
	
	// Index "1" equals gallery images as a source
	else if (e.index == 1)
	{
		Ti.Media.openPhotoGallery({
			success : function(event) {
				resizeAndSaveProfilePictures(event.media);
			},
			cancel : function() {
				alert("You've Cancelled !");
			},
			error : function(error) {
				alert('Unexpected error: ' + error.code);
			},
			allowEditing : true,
			mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
		});
	}
}

// Defining a function that resizes the captured image and write it into 'img_profile_pic_large.jpg' file
function resizeAndSaveProfilePictures(image)
{
	// Resizing the image to width 500 and auto height
	var resizedImage = image.imageAsResized(500, image.height * 500 / image.width);
	var imageFile = 
		Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'img_profile_pic_large.jpg');
	imageFile.write(resizedImage);
	
	// Read and load the largeImage to the imageView
	$.profile_picture.image = imageFile.read();
	
	// Set profile picture to the captured image and create a flag to be used by the server to update the profile picture
	userDataInArrays.profile_picture = imageFile.read();
	userDataInArrays.new_profile_picture = true;
}

// Event listener for button click that displays capture-picture options dialog
function displayDialog() {
	$.optionDialog.show();
}