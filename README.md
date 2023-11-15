# nordnotes
Straightforward website for me to record all the books I've read, when I read them, and what I thought of them. Uses a public API to pull book covers.
I suppose you''re free to use it too. However, it might not be that easy to accomplish. 

## Setting up
Please note, you need to set up a PostGreSQL server to utilize this website yourself. 
* Create a file called exactly "db_config.json" at the root of the project directory, and add all the database-details in there
  
  ![image](https://github.com/Nordtwig/nordnotes/assets/41136053/0aae1255-76c7-445a-b065-5cc830be1cba)

* Run "npm install" to set up all the node modules
* Run "node index.js" and head on over to http://localhost:3000/

