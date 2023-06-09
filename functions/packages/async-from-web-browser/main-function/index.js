const waitMs = async (ms) => new Promise(accept => setTimeout(accept, ms));

// This represents a function that runs longer than 30 seconds (and would
// therefore cause a synchronous invocation to time out and become asynchronous
// after 30 seconds).
async function main() {
    console.log('Beginning wait for 31 seconds.');
    await waitMs(31000);
    console.log('Waited 31 seconds.');
    return {
        foo: 'bar',
    };
}
