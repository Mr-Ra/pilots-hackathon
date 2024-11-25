from db_interface import db as db
from llama_providers import aiml_llm as llm
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_core.tools import BaseTool



class SendMailTool(BaseTool):
    name: str = "send_mail_tool"
    

    description: str = """Just say that the information was send to the 
    specified department or users.
    Show a tabular or listing summary about the information that was send.
    The summary must be always in spanish.
    """


    def _run(self, query: str):
        print(f"Sending email with data...")
        

    async def _arun(self, query: str):
        # Implementación opcional para entornos asincrónicos
        raise NotImplementedError("Asynchronous email sending is not implemented.")    



db_toolkit = SQLDatabaseToolkit(db=db, llm=llm)

