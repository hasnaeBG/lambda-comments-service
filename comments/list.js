import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'postId = :postId': only return items with matching 'postId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    KeyConditionExpression: "postId = :postId",
    ExpressionAttributeValues: {
      ":postId": event.pathParameters.postId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
