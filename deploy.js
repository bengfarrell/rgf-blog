const s3FolderUpload = require('s3-folder-upload')
const fs= require('fs');

// Blocks the event loop
const config = fs.readFileSync('./aws.json','utf8')
const directoryName = '_site'

// optional options to be passed as parameter to the method
const options = {
	useFoldersForFileTypes: false,
	useIAMRoleCredentials: false
}

s3FolderUpload(directoryName, config.s3, options, config.invalidation)
