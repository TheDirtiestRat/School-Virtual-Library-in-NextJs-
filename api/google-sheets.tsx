"use server";
import { google } from "googleapis";
import keys from "@/spreedsheet-keys.json";

const spreadsheetId = "1f1Qg6pT9PkjHD7Ilo0C5rojPehx_c3uRH3H_WHKwdDE";

// getting the data in the google sheet API and turning it into a string
export async function getSheetData(book_sheet: string, range: string): Promise<string[]> {
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

        const sheetdata = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${book_sheet}!${range}`,
        });

        let data: string[] = [];

        sheetdata.data.values?.map((element, index) => {
            let unknownValue: unknown = element;
            let value = (unknownValue as string);
            data.push(
                value,
            )
        })

        return data;
    } catch {
        return ["None"];
    }
}

export async function searchSheetData(book_sheet: string, range: string, search_key: string = "", column: number): Promise<string[]> {
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

        const sheetdata = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${book_sheet}!${range}`,
        });

        // search the item
        // const src = search_key.replace(/\?/g, '.').replace(/\*/g, '.+');
        // const regexp = new RegExp('^' + src + '$');
        // const unprocessedData = sheetdata.data.values?.filter((row: string[]) => regexp.test(row[column]));
        const unprocessedData = sheetdata.data.values?.filter((row: string[]) => row[column].toLowerCase().includes(search_key.toLowerCase()));

        let data: string[] = [];
        unprocessedData?.map((element, index) => {
            let unknownValue: unknown = element;
            let value = (unknownValue as string);
            data.push(
                value,
            )
        })

        // console.log("Search Data Found!!");
        // console.log(sheetdata.data);
        // console.log(sheetdata.data.values?.filter((row: string[]) => row[column].toLowerCase().includes(search_key.toLowerCase())));
        // console.log("searck key: " + search_key);
        // console.log(unprocessedData);
        // console.log(data);
        return data;
    } catch {
        console.log("Search Data Dosent Exist.");
        return ["None"];
    }
}

export async function searchFirstLetterSheetData(book_sheet: string, range: string, search_key: string = "", column: number): Promise<string[]> {
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

        const sheetdata = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${book_sheet}!${range}`,
        });

        // search the item
        const unprocessedData = sheetdata.data.values?.filter((row: string[]) => row[column].startsWith(search_key));

        let data: string[] = [];
        unprocessedData?.map((element, index) => {
            let unknownValue: unknown = element;
            let value = (unknownValue as string);
            data.push(
                value,
            )
        })

        return data;
    } catch {
        console.log("Search Data Dosent Exist.");
        return ["None"];
    }
}




// async function initializeSheet() {
//     try {
//         const auth = await google.auth.getClient({
//             projectId: keys.project_id,
//             credentials: {
//                 type: "service_account",
//                 private_key: keys.private_key,
//                 client_email: keys.client_email,
//                 client_id: keys.client_id,
//                 token_url: keys.token_uri,
//                 universe_domain: "googleapis.com",
//             },
//             scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//         });

//         const sheets = google.sheets({ version: "v4", auth });

//         // here we'll work with the data
//         return { sheet: sheets };
//         // return request.status(200);
//     } catch (e) {
//         console.log(e);
//         // return result
//         //     .status(500)
//         //     .json({ message: "Error getting spreadsheet data", success: false });
//     }
// }