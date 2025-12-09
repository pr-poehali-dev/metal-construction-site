import json
import os
import boto3
import base64
import uuid
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Загружает файлы в S3 и возвращает публичные ссылки для скачивания
    Args: event - запрос с base64-encoded файлом в body
          context - контекст выполнения функции
    Returns: HTTP ответ с URL для скачивания файла
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        
        body_data = json.loads(event.get('body', '{}'))
        file_content_base64 = body_data.get('fileContent', '')
        file_name = body_data.get('fileName', 'file')
        content_type = body_data.get('contentType', 'application/octet-stream')
        
        if not file_content_base64:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No file content provided'}),
                'isBase64Encoded': False
            }
        
        file_data = base64.b64decode(file_content_base64)
        
        unique_id = str(uuid.uuid4())
        file_extension = file_name.split('.')[-1] if '.' in file_name else ''
        s3_key = f'uploads/{unique_id}.{file_extension}' if file_extension else f'uploads/{unique_id}'
        
        s3.put_object(
            Bucket='files',
            Key=s3_key,
            Body=file_data,
            ContentType=content_type
        )
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{s3_key}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'url': cdn_url,
                'fileName': file_name
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
