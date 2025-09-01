"use server";
import { google } from "googleapis";
import keys from "@/spreedsheet-keys.json";

const spreadsheetId = "1f1Qg6pT9PkjHD7Ilo0C5rojPehx_c3uRH3H_WHKwdDE";

async function initializeSheet() {
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
        // return result
        //     .status(500)
        //     .json({ message: "Error getting spreadsheet data", success: false });
    }
}

export async function getSheetData(book_sheet: string, range: string) : Promise<string[]> {
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
        // console.log(sheetdata.data.values?.length);
        // return { sheetdata: sheetdata.data.values };
    } catch {
        return ["None"];
    }
}
