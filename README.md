This PR highlights a bug in the Gmail API. The search and labelIds queries should return the same results but the results differ.

## Getting Started
1. Create a `.env` file and add the required environment variables. (See gmail.test.js for details on what environment variables are needed)
2. Run `npm test`

### Expected
The results should be the same

### Actual
The results differ
