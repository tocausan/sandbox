"use strict";

var dropzone,
    validMimeTypes,
    maxFileSize,
    inputTrigger,
    input;

var addToLibrary = function(userFile){
    let library = document.getElementsByClassName("library")[0],
        newItem = document.createElement("div"),
        type = userFile.base64.split("/")[0].split(":")[1],
        content;
    if(type === "image") {
        content = document.createElement("img");
        content.setAttribute("src", userFile.base64);
    }

    newItem.setAttribute("class", "item");
    newItem.append(content);
    library.append(newItem);

}




var setUploadInput = function() {
    let uploadInput = document.createElement("input");
    uploadInput.setAttribute("class", "upload-input");
    uploadInput.setAttribute("type", "file");
    return uploadInput;
}

var setUploadInputTrigger = function() {
    let uploadInputTrigger = document.createElement("div");
    uploadInputTrigger.setAttribute("class", "upload-input-trigger");
    uploadInputTrigger.innerHTML = "Drop/Click here";
    dropzone.append(uploadInputTrigger);
    return uploadInputTrigger;
}

var checkSize = function(size, maxFileSize) {
    var _ref;
    if (((_ref = maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < maxFileSize) {
        return true;
    } else {
        console.log("File must be smaller than " + maxFileSize + " MB");
        return false;
    }
}

var isTypeValid = function(type) {
    var mimeTypes = validMimeTypes.replace(/[\[\]]/g, "").split(","),
        readableMimeTypes = mimeTypes.map((m) => {
            return m
                .toUpperCase()
                .replace(/(.*)\//i, "")
        }).join(" or ");

    if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
        return true;
    } else {
        console.log("Invalid file type.  File must be one of following types " + readableMimeTypes);
        return false;
    }
}

var onDragOver = function(event) {
    if (event != null) { event.preventDefault(); }
    // issue 'event.dataTransfer.effectAllowed' -> 'event.originalEvent.dataTransfer.effectAllowed'
    event.dataTransfer.effectAllowed = 'copy';
    return false;
}

var onDrop = function(event) {
    if (event != null) { event.preventDefault(); }
    let file = event.dataTransfer.files[0];
    // if dataTransfer empty try originalEvent.dataTransfer
    //let file = event.originalEvent.dataTransfer.files[0];
    fileReader(file);
}

var onClick = function(event) {
    input.click();
}

var onUpload = (elem) => {
    var file = elem.target.files[0];
    fileReader(file);
}

var fileReader = function(file) {
    var reader;

    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
        let random = Math.floor(Math.random() * 100 * new Date().getDay()),
            pathArray = file.name.split("."),
            extension = pathArray.pop(),
            filename = pathArray.join("_") + "_" + random,
            path = filename + "." + extension,
            base64 = evt.target.result;

        if (checkSize(file.size) && isTypeValid(file.type)) {
            let userFile = {
                filename: filename,
                base64: base64,
                path: path
            }

            console.log(userFile);

            addToLibrary(userFile);
        }
    };
    return false;
};

function fileUpload(){
    dropzone = document.getElementsByClassName("dropzone")[0];
    if (dropzone) {
        validMimeTypes = dropzone.getAttribute("valid-mime-types");
        maxFileSize = dropzone.getAttribute("max-file-size");

        input = setUploadInput();
        inputTrigger = setUploadInputTrigger();

        // event listeners
        dropzone.addEventListener('dragover', onDragOver, false );
        dropzone.addEventListener('drop', onDrop, false );
        inputTrigger.addEventListener('click', onClick, false );
        input.addEventListener('change', onUpload, false );
    }
}

window.addEventListener('load', fileUpload, false );

