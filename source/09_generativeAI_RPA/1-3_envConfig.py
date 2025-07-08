import os
from dotenv import load_dotenv
from decouple import config
# 방법1
load_dotenv(".env")
client_id = os.getenv("CLIENT_ID")
print('방법1 :', client_id)
# 방법2
client_id = config('CLIENT_ID')
print('방법2 :', client_id)