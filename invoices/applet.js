/* Invoices
************************************************************************************

IFTTT Applet:     https://
Google Sheet:     https://docs.google.com/spreadsheets/d/1Ecy8lHJ9bwACrKUttY9gGInnlCARQCVxZ-_khgJn2yE/edit#gid=0
Discord Channel:  https://discordapp.com/channels/441447726446542871/476095000917049344
Version:          1.0.0
Description:      This applet controls 2 other IFTTT applets.
                  - Invoices/Paid
                  - Invoices/Overdue

*************************************************************************************/


// Every item of Trigger Data is String and read-only, no exceptions.
// Instead of writing `Twitter.newTweetByYou` or etc. every time you can shorten
// it too `Trigger` because applet can has only one trigger at the moment.
var Dept = GoogleSheets.newRowInSpreadsheet.ColumnA;
var ReceivedAt = GoogleSheets.newRowInSpreadsheet.ColumnB;
var FromAddress = GoogleSheets.newRowInSpreadsheet.ColumnC;
var FromName = GoogleSheets.newRowInSpreadsheet.ColumnD;
var Subject = GoogleSheets.newRowInSpreadsheet.ColumnE;
var BodyPlain = GoogleSheets.newRowInSpreadsheet.ColumnF;

// If you don't want to convert hex color code to integer you can use one of
// built-in JS functions or just assign it as hex number
var Color = parseInt('1da1f2', 16);
var Color2 = 0x1da1f2;

var blue = 45311;
var yellow = 16776960;
var green = 65411;
var red = 16056407;
var gray = 9479342;

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
      "name": FromName,
      "icon_url": "https://coinbotvps.com/wp-content/themes/coinbotvps/images/logo/icon-square.png"
    },
      "fields": [
        {
          "name": "Email",
          "value": FromAddress
        },
        {
          "name": "Department",
          "value": Dept,
          "inline": true
        },
        {
          "name": "Received at ",
          "value": ReceivedAt,
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
MakerWebhooks.makeWebRequest.setUrl("https://discordapp.com/api/webhooks/476505350787563521/mGS11_gz95I1V-BMPV009AHu6Y39knukRXwQWe_CKrUulEHNlgTZlCVD8L5Xp2PVHLpc");
MakerWebhooks.makeWebRequest.setMethod("POST")
MakerWebhooks.makeWebRequest.setContentType("application/json")
MakerWebhooks.makeWebRequest.setBody(JSON.stringify(json));

// Explanation:
// JSON.stringify() - converts JS object to JSON [String]
// MakerWebhooks.makeWebRequest.setBody() - replaces default body with the custom one

// Done!