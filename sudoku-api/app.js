const localData = require('./localData');
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB();

// We use capitalized name here to easy include in objects
const TableName = 'sudoku-puzzles';
const DefaultPageSize = 100;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
    let body;
    let statusCode = 200;

    const unsopported = `Unsupported route: "${event.resource}" on ${event.httpMethod} method.`;

    const headers = {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
    };

    try {
        if (event.httpMethod === 'GET') {
            switch (event.resource) {
                case '/puzzles/{start}':
                case '/v0/puzzles':
                    body = await getPuzzles(event);
                    break;

                case '/puzzles':
                case '/v0/info':
                    body = await getInfo();
                    break;

                default:
                    throw new Error(unsopported);
            }
        } else {
            throw new Error(unsopported);
        }
    } catch (err) {
        console.log(err);
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

const getPuzzles = async (event) => {
    let response;

    if (process.env.AWS_LAMBDA_INITIALIZATION_TYPE) {
        // If a list of puzzle IDs was provided, we add a filter to the scan
        if (event.queryStringParameters && event.queryStringParameters.ids) {
            const ids = event.queryStringParameters.ids.split(',');
            const Keys = [];

            ids.forEach((id) => {
                Keys.push({ id: { S: id } });
            });

            const params = {
                RequestItems: {
                    [TableName]: {
                        Keys,
                    },
                },
            };
            response = await ddb.batchGetItem(params).promise();
            response = { Items: response.Responses['sudoku-puzzles'] };
        } else {
            const params = {
                TableName,
                Limit: DefaultPageSize,
            };

            if (
                event.queryStringParameters &&
                event.queryStringParameters.start
            ) {
                params.ExclusiveStartKey = {
                    id: { S: event.queryStringParameters.start.toString() },
                };
            }

            response = await ddb.scan(params).promise();
        }
    } else {
        response = localData.puzzlesResponse;
    }

    return response.Items.map((item) => {
        return {
            puzzle: item.puzzle.S,
            solution: item.solution.S,
            id: item.id.S,
        };
    });
};

const getInfo = async () => {
    let response;

    if (process.env.AWS_LAMBDA_INITIALIZATION_TYPE) {
        response = await ddb.describeTable({ TableName }).promise();
    } else {
        // Only on local environments, to avoid hitting DynamoDB
        response = localData.infoResponse;
    }

    return {
        ItemCount: response.Table.ItemCount,
        DefaultPageSize,
        Pages: Math.ceil(response.Table.ItemCount / DefaultPageSize),
    };
};
