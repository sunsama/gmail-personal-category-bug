
const googleApis = require('googleapis').google;
const _ = require('lodash');
require('dotenv').config();

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_ACCESS_TOKEN, GMAIL_REFRESH_TOKEN } = process.env;

const OAuth2 = googleApis.auth.OAuth2;

const runQuery = async params => {
    const oauth2Client = new OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, '');
    oauth2Client.credentials = {
        access_token: GMAIL_ACCESS_TOKEN,
        refresh_token: GMAIL_REFRESH_TOKEN,
    };

    const auth = await googleApis.gmail({ version: 'v1', auth: oauth2Client });

    const results = await auth.users.threads.list(params);

    return results;
};

it('search and label queries should return the same results', async () => {
    const searchResults = await runQuery({
        userId: 'me',
        q: 'category:personal',
    });
    const labelResults = await runQuery({
        userId: 'me',
        labelIds: ['CATEGORY_PERSONAL'],
    });

    const searchThreads = searchResults.data.threads;
    const labelThreads = labelResults.data.threads;

    expect(_.sortBy(labelThreads, 'id')).toEqual(_.sortBy(searchThreads, 'id'));
});
