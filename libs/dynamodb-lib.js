import AWS from "aws-sdk";

export function call(action, params) {
 // AWS.config.update({ region: "eu-west-3" });
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
