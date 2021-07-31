import json
import boto3

def lambda_handler(event, context):

    s3_sns=boto3.client('sns')
    
    data=json.loads(event['Records'][0]['body'])
    print(data)
    data=str(data)
    
    response = s3_sns.publish(
    TopicArn='arn:aws:sns:us-east-1:796748160114:HfxFlower',
    
    Message=data,
    Subject='string',
    MessageStructure='string',
    
    MessageAttributes={
        'string': {
            'DataType': 'string',
            'StringValue': 'string',
            'BinaryValue': 'bytes'
        }
    }

)