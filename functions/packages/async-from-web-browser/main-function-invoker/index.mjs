import axios from 'axios';

// Helper function to determine the URL of the main function that this function
// invokes based on context data.
function mainFunctionUrl(context) {
    const apiHost = context.apiHost;
    const namespace = context.namespace;
    const packageName = context.functionName.split('/')[2];
    const mainFunctionName = process.env.MAIN_FUNCTION_NAME;

    const generatedUrl = `${apiHost}/api/v1/namespaces/${namespace}/actions/${packageName}/${mainFunctionName}?blocking=false`;

    return generatedUrl;
}

export async function main(_, context) {
    console.log(context)
    // Use the invocation's context to get the API key for the function's
    // namespace. This is present in the context because the project.yml file
    // includes the provide-api-key annotation.
    try {
        const response = await axios({
            method: 'post',
            url: mainFunctionUrl(context),
            headers: {
                // Stops Axios from sending its default value for this header
                // for POST requests - "x-www-form-urlencoded".
                'Content-Type': '',
                'Authorization': `Basic ${new Buffer(context.apiKey).toString('base64')}`,
            },
        });
        return {
            // Optional. The web browser making the request to this function
            // might not need to know the activationId of the invocation that
            // was just started.
            body: {
                activationId: response.data.activationId,
            },
        };
    } catch (e) {
        console.log(`Error:`, e);
        return {
            statusCode: 500,
            body: `Internal Server Error`,
        };
    }
}
