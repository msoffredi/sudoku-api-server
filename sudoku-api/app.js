const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB();

const localResponse = {
    Items: [
        {
            puzzle: {
                S: '[[null,7,null,null,null,8,null,null,2],[null,3,5,7,1,null,9,4,8],[8,1,2,3,null,null,null,7,null],[null,5,6,null,null,null,8,null,1],[3,9,null,null,8,null,null,null,7],[null,null,null,1,null,null,null,null,4],[null,null,null,null,8,5,null,null,null],[null,5,null,null,6,3,1,7,4],[7,null,null,null,null,null,5,3,null]]',
            },
            solution: {
                S: '[[9,7,4,5,6,8,3,1,2],[6,3,5,7,1,2,9,4,8],[8,1,2,3,4,9,6,7,5],[4,5,6,2,9,7,8,3,1],[3,9,1,4,8,6,5,2,7],[2,8,7,1,5,3,9,6,4],[1,4,3,7,8,5,6,2,9],[8,5,9,2,6,3,1,7,4],[7,2,6,4,9,1,5,3,8]]',
            },
            id: { S: '2187' },
        },
        {
            puzzle: {
                S: '[[4,null,null,7,null,null,3,null,null],[null,null,1,4,5,null,8,7,null],[null,null,null,3,null,8,null,4,2],[9,4,2,1,null,null,6,7,null],[null,6,null,null,null,5,null,3,null],[7,3,5,null,2,4,null,9,null],[null,9,7,null,1,null,null,3,4],[null,null,null,9,8,null,null,null,7],[null,null,null,null,null,null,5,null,9]]',
            },
            solution: {
                S: '[[4,6,8,7,2,1,3,5,9],[3,2,1,4,5,9,8,7,6],[9,5,7,3,6,8,1,4,2],[9,4,2,1,8,3,6,7,5],[1,6,8,7,9,5,2,3,4],[7,3,5,6,2,4,8,9,1],[8,9,7,5,1,6,2,3,4],[5,4,3,9,8,2,6,1,7],[2,1,6,4,7,3,5,8,9]]',
            },
            id: { S: '6470' },
        },
        {
            puzzle: {
                S: '[[null,1,null,2,null,null,8,4,5],[2,9,null,1,8,null,7,6,3],[null,null,5,6,7,4,null,null,2],[null,null,null,null,null,null,null,null,2],[null,null,8,5,4,2,3,null,6],[null,6,3,null,1,8,null,4,9],[3,6,null,null,2,9,4,5,8],[null,null,null,null,null,null,6,3,7],[null,5,7,null,8,6,null,null,null]]',
            },
            solution: {
                S: '[[6,1,7,2,9,3,8,4,5],[2,9,4,1,8,5,7,6,3],[8,3,5,6,7,4,1,9,2],[5,7,4,9,3,6,1,8,2],[9,1,8,5,4,2,3,7,6],[2,6,3,7,1,8,5,4,9],[3,6,1,7,2,9,4,5,8],[8,2,9,4,5,1,6,3,7],[4,5,7,3,8,6,9,2,1]]',
            },
            id: { S: '4610' },
        },
        {
            puzzle: {
                S: '[[null,6,null,null,null,null,null,null,7],[5,7,2,null,8,null,1,null,6],[null,8,null,null,null,7,null,null,9],[null,1,null,null,null,null,null,null,2],[null,9,7,2,null,null,null,6,1],[2,null,8,9,null,null,null,null,4],[7,null,8,6,null,3,2,5,null],[null,null,null,null,null,null,7,null,null],[null,3,5,8,null,2,null,9,null]]',
            },
            solution: {
                S: '[[4,6,9,1,2,5,3,8,7],[5,7,2,9,8,3,1,4,6],[3,8,1,6,4,7,5,2,9],[5,1,4,8,7,6,9,3,2],[3,9,7,2,5,4,8,6,1],[2,6,8,9,1,3,7,5,4],[7,4,8,6,9,3,2,5,1],[6,2,9,4,1,5,7,3,8],[1,3,5,8,7,2,4,9,6]]',
            },
            id: { S: '2166' },
        },
        {
            puzzle: {
                S: '[[4,9,null,5,6,null,null,8,null],[3,null,1,null,7,null,null,null,null],[7,8,6,null,null,9,4,null,3],[null,5,1,null,4,6,8,null,9],[null,4,2,null,null,null,6,null,null],[6,null,null,9,null,5,null,null,null],[6,7,null,3,null,null,null,null,null],[null,2,null,null,9,4,1,null,6],[null,9,1,5,null,null,null,null,4]]',
            },
            solution: {
                S: '[[4,9,2,5,6,3,1,8,7],[3,5,1,4,7,8,2,6,9],[7,8,6,1,2,9,4,5,3],[7,5,1,2,4,6,8,3,9],[9,4,2,8,3,7,6,1,5],[6,3,8,9,1,5,2,4,7],[6,7,4,3,1,8,9,2,5],[5,2,3,7,9,4,1,8,6],[8,9,1,5,6,2,3,7,4]]',
            },
            id: { S: '1925' },
        },
    ],
};

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
    let response;

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
                    if (process.env.AWS_LAMBDA_INITIALIZATION_TYPE) {
                        const start =
                            event.queryStringParameters.start ??
                            event.pathParameters.start ??
                            '1';

                        response = await ddb
                            .scan({
                                TableName,
                                ExclusiveStartKey: {
                                    id: { S: start.toString() },
                                },
                                Limit: DefaultPageSize,
                            })
                            .promise();
                    } else {
                        response = localResponse;
                    }

                    body = response.Items.map((item) => {
                        return {
                            puzzle: item.puzzle.S,
                            solution: item.solution.S,
                            id: item.id.S,
                        };
                    });
                    break;

                case '/puzzles':
                case '/v0/info':
                    if (process.env.AWS_LAMBDA_INITIALIZATION_TYPE) {
                        response = await ddb
                            .describeTable({ TableName })
                            .promise();
                    } else {
                        // Only on local environments, to avoid hitting DynamoDB
                        response = { Table: { ItemCount: 12345 } };
                    }

                    body = {
                        ItemCount: response.Table.ItemCount,
                        DefaultPageSize,
                        Pages: Math.ceil(
                            response.Table.ItemCount / DefaultPageSize,
                        ),
                    };
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
