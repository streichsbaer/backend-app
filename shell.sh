#!/usr/bin/python3
# shellcheck shell=sh
import logging
import json
import multiprocessing
import sys
import time
import threading
import requests
from netmiko import ConnectHandler, NetMikoTimeoutException, NetMikoAuthenticationException
import os
from pathlib import Path
import xlrd
import re
from typing import Any, Union

# create logging
logging.basicConfig(format="%(asctime)s: [%(levelname)s] [%(funcName)s] [%(lineno)d] %(message)s",
                    handlers=[logging.FileHandler("./oob_atp.log"), logging.StreamHandler()],
                    level=logging.INFO)


input_file = "/root/hosts.ini"
json_file = open("{}".format(input_file))
payload = json.load(json_file)
logging.info("Payload recieved - %s", payload)
json_file.close()

LAB_ARTIFACTORY_URL = 'URL'
PROD_ARTIFACTORY_URL = 'URL'

LAB_ARTIF_CRED = ("dummy_user", "dummy_pswd")
PROD_ARTIF_CRED = ("dummy_user", "dummy_pswd")
# Get the ENV values for call back URL and credentials

LAB_AUTH_HEADER = 'Basic Dummy_Token'
PROD_AUTH_HEADER = 'Basic Dummy_Token'
CONTENT_TYPE_HEADER = 'application/json'
LAB_API_KEY = 'Dummy_API_Key'
PROD_API_KEY = 'Dummy_API_Key'
HTTP_POST_TIMEOUT = 5  # 5 Secs
NUM_AUTH_RETRY = 2

LAB_ISE_AUTHORIZATION = 'Dummy_Key'
LAB_ISE_API_KEY = 'Dummy_API_Key'

PROD_ISE_AUTHORIZATION = 'Dummy_Key'
PROD_ISE_API_KEY = 'Dummy_API_Key'

LAB_LOCAL_DEVICE_AUTHORIZATION = 'Dummy_Key'
LAB_LOCAL_DEVICE_API_KEY = 'Dummy_API_Key'

PROD_LOCAL_DEVICE_AUTHORIZATION = 'Dummy_Key'
PROD_LOCAL_DEVICE_API_KEY = 'Dummy_API_Key'

USER_NAME = 'Dummy_User'
PSWD = 'Dummy_passwd'

GENERIC_API_USER_NAME = 'Dummy_User'
GENERIC_API_PSWD = 'Dummy_passwd'
LOCAL_OOB_USER_NAME = 'Dummy_User'
LOCAL_TOR_USER_NAME = 'Dummy_User'

REQUEST_TIMEOUT = 60  # Request Time out in secs
HTTP_400_BAD_REQUEST = 400
HTTP_200_OK = 200

class TimeoutException(Exception):
    def __init__(self):
        self.res = {
            'status': 'Failure',
            'remark': 'Timeout when connect to the device.'
        }


class AuthenticationException(Exception):
    def __init__(self):
        self.res = {
            'status': 'Failure',
            'remark': 'Authentication failed when connect to the device.'
        }
