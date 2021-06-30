import pymysql
import json
import boto3

#configure values
endpoint = 'ass3.cjw8moe24ubd.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'dhruv25071999'
database_name = 'ass3'

#connection
conn = pymysql.Connect(endpoint, user=username, passwd=password, db=database_name)

#aws connection
awsS3 = boto3.client('s3')

def accessDB_handler(event, context):
    sourcebuc = event['Records'][0]['s3']['bucket']['name']
    inputfile = event['Records'][0]['s3']['object']['key']
    s3answer = awsS3.get_object(Bucket=sourcebuc, Key=inputfile)
    dataread = s3answer['Body'].read().decode('utf-8')
    jsonloader = json.loads(dataread)
    cursor = conn.cursor()
    for info in jsonloader:
        codeadd = jsonloader[info]
        cursor.execute("SELECT * from information where string =%s", info)
        if cursor.fetchone():
            curfetch = cursor.fetchone()
            codeval = curfetch[1] + codeadd
            cursor.execute("UPDATE information SET code=%s where string=%s", (codeval, info))
        else:
            cursor.execute("INSERT INTO information values (%s,%s) ", (info, codeadd))
        conn.commit()
        

        
