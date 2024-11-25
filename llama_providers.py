import getpass
import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import openai
from pprint import pprint

#just for this time :)

AI_ML_API_KEY = "0ba344281da64fa78b9430978d25e0a6"
AI_ML_BASE_URL = "https://api.aimlapi.com/v1"


SAMBANOVA_API_KEY = "8b178290-66b0-4a9e-808b-17f3538bff88"
SAMBANOVA_BASE_URL = "https://api.sambanova.ai/v1"



#ai/ml api
aiml_llm = ChatOpenAI(api_key=AI_ML_API_KEY, base_url=AI_ML_BASE_URL, model="meta-llama/Llama-3.2-3B-Instruct-Turbo")
    
#sambanova api
sambanova_llm = ChatOpenAI(api_key=SAMBANOVA_API_KEY, base_url=SAMBANOVA_BASE_URL, model="Meta-Llama-3.1-70B-Instruct", )



