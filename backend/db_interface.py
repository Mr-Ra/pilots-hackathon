from langchain_community.utilities import SQLDatabase

db = SQLDatabase.from_uri("sqlite:///supply_chain.db")

#test
# print(db.dialect)
# print(db.get_usable_table_names())
# db.run("SELECT * FROM Artist LIMIT 10;")