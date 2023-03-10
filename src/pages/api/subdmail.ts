//project_directory/emailBuilder.js

var SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.API_SEND_BLUE;

export default async function handler(req, res) {
  if (req?.body?.name && req?.body?.email && req?.body?.phone) {
    await fetch(
      "https://cmvqmaptqbechzebmqsn.supabase.co/rest/v1/formRequests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.API_SUPA_KEY,
        },
        // body: '{ "some_column": "someValue", "other_column": "otherValue" }',
        body: JSON.stringify({
          "name": req.body.name,
          "email": req.body.email,
          "phone": req.body.phone,
          "suggestion": req.body.suggestion ? req.body.suggestion : "N/A",
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          //console.log(response.body);
          res.status(404).json("Error Happend");
          return;
        }
        //console.log("Supa is fine");

        new SibApiV3Sdk.TransactionalEmailsApi()
          .sendTransacEmail({
            subject: "Thanks for Showing the Intrest in Our Services.",
            sender: { email: "arun@iamkrarun.com", name: "Tutor Arun" },
            replyTo: { email: "no-reply@iamkrarun.com", name: "Boss" },
            to: [{ name: req.body.name, email: req.body.email }],
            htmlContent: `<html>
  <head>
    <meta charset="utf-8">
    <title>Thank you for choosing us</title>
  </head>
  <body style="margin: 0; padding: 0;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 40px 0 30px 0;">
          <h1 style="color: #153643; font-size: 28px;">Thank you for choosing us!</h1>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
          <p style="color: #153643; font-size: 16px;">We appreciate your trust in us. We will contact you shortly to provide you with more information and to answer any questions you may have.</p>
          <p style="color: #153643; font-size: 16px;">Thank you again for choosing Maths Tutor. We look forward to working with you!</p>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;">
          <p style="color: #ffffff; font-size: 14px; text-align: center;">Best regards,<br>Kr Arun<br>Maths Tutor</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
            params: { bodyMessage: "Made just for you!" },
          })
          .then(
            function (data) {
              //console.log(data);
              
              res.writeHead(200,'Email Send to User');
              res.end("Thank you for your request. We have received it and will be in touch shortly.",);
            },
            function (error) {
            
              res.writeHead(410,'Error While Sending Email');
              res.end("Please Verify Your Email"+error.message,);
            
            }
          );
      })
      .catch((err) => {
        //console.log(err);
        res.writeHead(420,'Error while processing');
        res.end("There might be sone error Try again later"+err.message,);
      }
      )
  } else {
    
    res.writeHead(430,'Invalid Request');
    res.end("Invalid Request cannot Respond",);
  }
}
