"use server";
import { google } from "googleapis";
import keys from "@/spreedsheet-keys.json";

const sheetID = "1f1Qg6pT9PkjHD7Ilo0C5rojPehx_c3uRH3H_WHKwdDE";

async function initializeSheet(request, result) {
  try {
    const auth = await google.auth.getClient({
      projectId: keys.project_id,
      credentials: {
        type: "service_account",
        private_key: keys.private_key,
        client_email: keys.client_email,
        client_id: keys.client_id,
        token_url: keys.token_uri,
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // here we'll work with the data
    return { sheet: sheets };
    // return request.status(200);
  } catch (e) {
    console.log(e);
    return result
      .status(500)
      .json({ message: "Error getting spreadsheet data", success: false });
  }
}

export async function getSheetData(sheet, range) {}

export async function testFunction() {
  console.log("Testing this function on google sheet!");
}

// export default async function handler(request, result) {
//   try {
//     const auth = await google.auth.getClient({
//       projectId: keys.project_id,
//       credentials: {
//         type: "service_account",
//         private_key: keys.private_key,
//         client_email: keys.client_email,
//         client_id: keys.client_id,
//         token_url: keys.token_uri,
//         universe_domain: "googleapis.com",
//       },
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const sheets = google.sheets({ version: "v4", auth });

//     // copy your spreadshset id here
//     // and update the range based on the sheet name and colums used
//     const data = await sheets.spreadsheets.values.get({
//       spreadsheetId: "1f1Qg6pT9PkjHD7Ilo0C5rojPehx_c3uRH3H_WHKwdDE",
//       range: "Sheet1!A:C",
//     });

//     // here we'll work with the data
//     return { data: data.data.values };
//     // return request.status(200);
//   } catch (e) {
//     console.log(e);
//     return result
//       .status(500)
//       .json({ message: "Error getting spreadsheet data", success: false });
//   }
// }
