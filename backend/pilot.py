from llama_providers import sambanova_llm as llm
from langchain_core.messages import SystemMessage, AIMessage, HumanMessage
from system_prompts import SQL_PREFIX
from db_interface import db
from pprint import pprint
from langchain_community.agent_toolkits import create_sql_agent
from langchain import hub
from tools import db_toolkit, SendMailTool


class Pilot:
    def __init__(self, human_input:str):
        self.llm = llm
        self.system_message = SystemMessage(content=SQL_PREFIX)
        self.db_toolkit = db_toolkit
        self.extra_tools = [SendMailTool()]
        self.human_input = {"input": f"{human_input}"}
        self.pilot_response = ""

    def re_act(self):
        agent_executor = create_sql_agent(llm=self.llm, toolkit=self.db_toolkit, extra_tools=self.extra_tools, agent_executor_kwargs={"handle_parsing_errors":True})
        # pilot_kwargs = {
        #     "input": self.human_input,
        #     "chat_history": [
        #         HumanMessage(content=self.human_input),
        #         AIMessage(content=self.pilot_response)
        #         ]
        # }

        self.pilot_response = agent_executor.invoke(input=self.human_input)["output"]
        # self.pilot_response = agent_executor.invoke(pilot_kwargs)["output"]
        return
    
    
    def switch_pilot_response_lang(self, lang:str):
        lang_prompt_input = f"Translate the next response to {lang}: {self.pilot_response}"
        self.pilot_response = self.llm.invoke(input=lang_prompt_input).content
        return


    def get_pilot_response(self):
        return self.pilot_response
    
    def execute(self):
        self.re_act()
        self.switch_pilot_response_lang(lang = "spanish")
        pilot_response = self.get_pilot_response()

        return pilot_response



