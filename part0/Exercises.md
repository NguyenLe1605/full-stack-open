## Exercise 0.4:
```mermaid
sequenceDiagram

	participant user
	participant browser
	participant server
	
	user ->> browser: Submit new note
	activate browser
	
	browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	server -->> browser: 302 Found
	deactivate server 
	
	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	activate server
	server -->> browser: HTML document
	deactivate server

	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: main.css
    deactivate server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server -->> browser: main.js
    deactivate server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: data.json
    deactivate server

	browser --> user: Render new note
	deactivate browser
```

## Exercise 0.5:
```mermaid
sequenceDiagram
	participant browser
	participant server
	
	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa
	activate server
	server -->> browser: HTML document
	deactivate server

	browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: main.css
    deactivate server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->> browser: spa.js
    deactivate server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: data.json
    deactivate server 
```

## Exercise 0.6:
```mermaid
sequenceDiagram

	participant user
	participant browser
	participant server
	
	user ->> browser: Submit new note
	activate browser
	
	browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
	activate server
	server -->> browser: 201 Created
	deactivate server 

	browser -->> user: Render new note
	deactivate browser
```