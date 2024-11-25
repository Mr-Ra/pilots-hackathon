from llama_stack_client import LlamaStackClient
from llama_stack_client.types import UserMessage

client = LlamaStackClient(
    base_url="https://api.sambanova.ai/v1",
)

response = client.inference.chat_completion(
    messages=[
        {"role": "system", "content": "Answer the question in a couple sentences."},
        {"role": "user", "content": "Share a happy story with me"}
    ],
    model="meta-llama/Llama-3.2-3B-Instruct-Turbo",
    stream=False,
)
print(response)