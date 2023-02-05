// Script to create XCode icons in all needed dimensions, and generate XCode jSON file to replace in project directly
//
// Based on https://github.com/csgt/PhotoshopXcodeIcons
//
// Update for All Sizes and All Platforms by Zzyb Design
//
// Compatible for iOS 14 and Adobe Photoshop 2023
//

//$.level = 1;
try {
    // Prompt user to select iTunesArtwork file. Clicking "Cancel" returns null.
    var iTunesArtwork = File.openDialog("Select a square PNG file that is at least 1024x1024.", "*.png", false);

    if (iTunesArtwork !== null) {
        var doc = open(iTunesArtwork, OpenDocumentType.PNG);
        if (doc == null) {
            throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
        }

        var startState = doc.activeHistoryState;       // save for undo
        var initialPrefs = app.preferences.rulerUnits; // will restore at end
        app.preferences.rulerUnits = Units.PIXELS;     // use pixels

        if (doc.width != doc.height) {
            throw "Image is not square";
        }
        else if ((doc.width < 1024) && (doc.height < 1024)) {
            throw "Image is too small!  Image must be at least 1024x1024 pixels.";
        }
        else if (doc.width < 1024) {
            throw "Image width is too small!  Image width must be at least 1024 pixels.";
        }
        else if (doc.height < 1024) {
            throw "Image height is too small!  Image height must be at least 1024 pixels.";
        }

        // Folder selection dialog
        var destFolder = Folder.selectDialog("Choose an output folder");

        if (destFolder == null) {
            // User canceled, just exit
            throw "";
        }

        // Save icons in PNG using Save for Web.
        var sfw = new ExportOptionsSaveForWeb();
        sfw.format = SaveDocumentType.PNG;
        sfw.PNG8 = false; // use PNG-24
        sfw.transparency = false;
        doc.info = null;  // delete metadata

        var icons = [
            { "name": "16", "size": 16 },
            { "name": "20", "size": 20 },
            { "name": "29", "size": 29 },
            { "name": "32", "size": 32 },
            { "name": "40", "size": 40 },
            { "name": "44", "size": 44 },
            { "name": "48", "size": 48 },
            { "name": "55", "size": 55 },
            { "name": "58", "size": 58 },
            { "name": "60", "size": 60 },
            { "name": "64", "size": 64 },
            { "name": "66", "size": 66 },
            { "name": "76", "size": 76 },
            { "name": "80", "size": 80 },
            { "name": "87", "size": 87 },
            { "name": "88", "size": 88 },
            { "name": "92", "size": 92 },
            { "name": "100", "size": 100 },
            { "name": "102", "size": 102 },
            { "name": "108", "size": 108 },
            { "name": "114", "size": 114 },
            { "name": "120", "size": 120 },
            { "name": "128", "size": 128 },
            { "name": "136", "size": 136 },
            { "name": "152", "size": 152 },
            { "name": "167", "size": 167 },
            { "name": "172", "size": 172 },
            { "name": "180", "size": 180 },
            { "name": "192", "size": 192 },
            { "name": "196", "size": 196 }, 
            { "name": "216", "size": 216 },
            { "name": "234", "size": 234 },
            { "name": "256", "size": 256 },
            {"name": "258", "size": 258 },
            { "name": "512", "size": 512 },
            { "name": "1024", "size": 1024 },
        ];

        var icon;
        var destFolder = destFolder + "/AppIcon.appiconset/";
        var folder = Folder(destFolder);

        if (!folder.exists) folder.create();

        for (i = 0; i < icons.length; i++) {
            icon = icons[i];
            doc.resizeImage(icon.size, icon.size, // width, height
                null, ResampleMethod.BICUBICSHARPER);

            var destFileName = icon.name + ".png";
            doc.exportDocument(new File(destFolder + destFileName), ExportType.SAVEFORWEB, sfw);
            doc.activeHistoryState = startState; // undo resize
        }

        //Create the Contents.json file needed by XCode
        var file = new File(destFolder + "Contents.json");
        file.open("e", "TEXT", "????");
        file.seek(0, 2);
        $.os.search(/windows/i) != -1 ? file.lineFeed = 'windows' : file.lineFeed = 'macintosh';
        file.write("{\
  \"images\" : [\
    {\
        \"filename\" : \"40.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"20x20\"\
      },\
    {\
      \"filename\" : \"60.png\",\
      \"idiom\" : \"universal\",\
      \"platform\" : \"ios\",\
      \"scale\" : \"3x\",\
      \"size\" : \"20x20\"\
    },\
    {\
        \"filename\" : \"58.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"29x29\"\
    },\
    {\
        \"filename\" : \"87.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"3x\",\
        \"size\" : \"29x29\"\
    },\
    {\
        \"filename\" : \"76.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"38x38\"\
    },\
    {\
        \"filename\" : \"114.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"3x\",\
        \"size\" : \"38x38\"\
    },\
    {\
        \"filename\" : \"80.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"40x40\"\
    },\
    {\
        \"filename\" : \"120.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"3x\",\
        \"size\" : \"40x40\"\
    },\
    {\
        \"filename\" : \"120.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"60x60\"\
    },\
    {\
        \"filename\" : \"180.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"3x\",\
        \"size\" : \"60x60\"\
    },\
    {\
        \"filename\" : \"128.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"64x64\"\
    },\
    {\
        \"filename\" : \"192.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"3x\",\
        \"size\" : \"64x64\"\
    },\
    {\
        \"filename\" : \"136.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"68x68\"\
    },\
    {\
        \"filename\" : \"152.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"76x76\"\
    },\
    {\
        \"filename\" : \"167.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"scale\" : \"2x\",\
        \"size\" : \"83.5x83.5\"\
    },\
    {\
        \"filename\" : \"1024.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"ios\",\
        \"size\" : \"1024x1024\"\
    },\
    {\
        \"filename\" : \"16.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"1x\",\
        \"size\" : \"16x16\"\
    },\
    {\
        \"filename\" : \"32.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"2x\",\
        \"size\" : \"16x16\"\
    },\
    {\
        \"filename\" : \"32.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"1x\",\
        \"size\" : \"32x32\"\
    },\
    {\
        \"filename\" : \"64.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"2x\",\
        \"size\" : \"32x32\"\
    },\
    {\
        \"filename\" : \"128.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"1x\",\
        \"size\" : \"128x128\"\
    },\
    {\
        \"filename\" : \"256.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"2x\",\
        \"size\" : \"128x128\"\
    },\
    {\
        \"filename\" : \"256.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"1x\",\
        \"size\" : \"256x256\"\
    },\
    {\
        \"filename\" : \"512.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"2x\",\
        \"size\" : \"256x256\"\
    },\
    {\
        \"filename\" : \"512.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"1x\",\
        \"size\" : \"512x512\"\
    },\
    {\
        \"filename\" : \"1024.png\",\
        \"idiom\" : \"mac\",\
        \"scale\" : \"2x\",\
        \"size\" : \"512x512\"\
    },\
    {\
        \"filename\" : \"44.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"22x22\"\
    },\
    {\
        \"filename\" : \"48.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"24x24\"\
    },\
    {\
        \"filename\" : \"55.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"27.5x27.5\"\
    },\
    {\
        \"filename\" : \"58.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"29x29\"\
    },\
    {\
        \"filename\" : \"60.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"30x30\"\
    },\
    {\
        \"filename\" : \"64.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"32x32\"\
    },\
    {\
        \"filename\" : \"66.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"33x33\"\
    },\
    {\
        \"filename\" : \"80.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"40x40\"\
    },\
    {\
        \"filename\" : \"87.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"43.5x43.5\"\
    },\
    {\
        \"filename\" : \"88.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"44x44\"\
    },\
    {\
        \"filename\" : \"92.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"46x46\"\
    },\
    {\
        \"filename\" : \"100.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"50x50\"\
    },\
    {\
        \"filename\" : \"102.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"51x51\"\
    },\
    {\
        \"filename\" : \"108.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"54x54\"\
    },\
    {\
        \"filename\" : \"172.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"86x86\"\
    },\
    {\
        \"filename\" : \"196.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"98x98\"\
    },\
    {\
        \"filename\" : \"216.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"108x108\"\
    },\
    {\
        \"filename\" : \"234.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"117x117\"\
    },\
    {\
        \"filename\" : \"258.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"scale\" : \"2x\",\
        \"size\" : \"129x129\"\
    },\
    {\
        \"filename\" : \"1024.png\",\
        \"idiom\" : \"universal\",\
        \"platform\" : \"watchos\",\
        \"size\" : \"1024x1024\"\
    },\
  ],\
  \"info\" : {\
    \"author\" : \"xcode\",\
    \"version\" : 1\
  }\
}");
        file.close();

        alert("All XCode Icons created!");
    }
}
catch (exception) {
    // Show degbug message and then quit
    if ((exception != null) && (exception != ""))
        alert(exception);
}
finally {
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);
    app.preferences.rulerUnits = initialPrefs; // restore prefs
}
