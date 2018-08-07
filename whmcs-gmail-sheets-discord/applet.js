/* WHMCS to Gmail to Google Sheets to Discord
************************************************************************************

IFTTT Applet:     https://platform.ifttt.com/p/coinbotvps/applets/nsqUGXwi
Google Sheet:     https://drive.google.com/drive/u/1/folders/1CHzKF34mbZsNLc4QQBmyYk8WEXn30zC1
Discord Channel:  https://discordapp.com/channels/441447726446542871/476130020113514508
Version:          1.0.0

*************************************************************************************/


// Every item of Trigger Data is String and read-only, no exceptions.
// Instead of writing `Twitter.newTweetByYou` or etc. every time you can shorten
// it too `Trigger` because applet can has only one trigger at the moment.
var Dept = GoogleSheets.newRowInSpreadsheet.ColumnA;
var RecvTime = GoogleSheets.newRowInSpreadsheet.ColumnB;
var FrmAdr = GoogleSheets.newRowInSpreadsheet.ColumnC;
var FrmName = GoogleSheets.newRowInSpreadsheet.ColumnD;
var Subject = GoogleSheets.newRowInSpreadsheet.ColumnE;
var BodyPlain = GoogleSheets.newRowInSpreadsheet.ColumnF;

// If you don't want to convert hex color code to integer you can use one of
// built-in JS functions or just assign it as hex number
var Color = parseInt('1da1f2', 16);
var Color2 = 0x1da1f2;

// Meta.currentUserTime
// Meta.triggerTime
// They both return Moment.js object. Check https://momentjs.com/ for more info ;)


/* Building JSON body
*************************/
var json = {
  "content": "New  Ticket reply Received",
  "embeds": [
    {
    "title": "Fresh from the Inbox of.. ",
    "description": Dept,
    "author": {
      "name": FrmName,
      "icon_url": "https://i.imgur.com/4XsVd2Y.jpg"
    },
      "fields": [
        {
          "name": "Email",
          "value": FrmAdr
        },
        {
          "name": "Department",
          "value": Dept,
          "inline": true
        },
        {
          "name": "Received at ",
          "value": RecvTime,
          "inline": true
        },
        {
          "name": "Message",
          "value": BodyPlain
        }
    ]
   }
  ]
};


// pretty neat, huh?

// .set[field] methods allows you to replace action data
MakerWebhooks.makeWebRequest.setUrl("https://discordapp.com/api/webhooks/476142922929274880/zot639fSIJuHXx9shgRG86lkXzBC6xR__owqOji8L6BvPZPLQEMar3uyuMOatMs1obEg");
MakerWebhooks.makeWebRequest.setMethod("POST")
MakerWebhooks.makeWebRequest.setContentType("application/json")
MakerWebhooks.makeWebRequest.setBody(JSON.stringify(json));

// Explanation:
// JSON.stringify() - converts JS object to JSON [String]
// MakerWebhooks.makeWebRequest.setBody() - replaces default body with the custom one

// Done!