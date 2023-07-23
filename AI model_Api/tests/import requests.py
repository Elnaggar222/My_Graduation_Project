import requests

url = "http://localhost:5000/api/predict"
response = requests.get(url)

print(response.text)