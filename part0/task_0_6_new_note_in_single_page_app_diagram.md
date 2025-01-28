[![Diagram](https://mermaid.ink/img/pako:eNp1Uk1P5DAM_StWTqwE09099sAFrixIAxdUCXkSt81Om2QTZwAh_vs6kw4fYughdRy_55cXvyjtDalWJfqXyWm6tDhEnDsH8gWMbLUN6Bg20T8mil8PJLk75Ou6lJ6dny9RC3eyAj8HSoDgPBNYBzyWX8gMvaXJfAZ_QYdIKQm-oDq1xh11CjaZ2bvjzauwFm6u17cwMofUNk3ibCyllU6rkaZk3dauetvQE85hIgyhcfT4UBQ-pICVEjXbHYrmj1et8SeZv3_-gotIUmngRKgmq5Gtd83f5N2PCjN0lO1744IRDjeIbcV08P3egPJqEiDDiAn0iG4oTUV7dReNIbO0_FMS0Q7jHv3GfCs0ywboiXTmxVyN07RBvYU-O13010aRnKFYSw591KmaKc5ojYzQS2nXKTmf5WlaCQ3Gbac69yp1mNmvn51WLcdMpyr6PIyq7XFKssvlmofhe8vKfN17_74nY9nHqzqx-8F9_Q9u4vSP?type=png)](https://mermaid.live/edit#pako:eNp1Uk1P5DAM_StWTqwE09099sAFrixIAxdUCXkSt81Om2QTZwAh_vs6kw4fYughdRy_55cXvyjtDalWJfqXyWm6tDhEnDsH8gWMbLUN6Bg20T8mil8PJLk75Ou6lJ6dny9RC3eyAj8HSoDgPBNYBzyWX8gMvaXJfAZ_QYdIKQm-oDq1xh11CjaZ2bvjzauwFm6u17cwMofUNk3ibCyllU6rkaZk3dauetvQE85hIgyhcfT4UBQ-pICVEjXbHYrmj1et8SeZv3_-gotIUmngRKgmq5Gtd83f5N2PCjN0lO1744IRDjeIbcV08P3egPJqEiDDiAn0iG4oTUV7dReNIbO0_FMS0Q7jHv3GfCs0ywboiXTmxVyN07RBvYU-O13010aRnKFYSw591KmaKc5ojYzQS2nXKTmf5WlaCQ3Gbac69yp1mNmvn51WLcdMpyr6PIyq7XFKssvlmofhe8vKfN17_74nY9nHqzqx-8F9_Q9u4vSP)

```
sequenceDiagram
    participant browser
    participant server
    
    browser->>browser: User types a note in the input field
    browser-->>browser: User presses the "Save" button
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created (application/json)
    deactivate server
    
    browser->>browser: Updating a part of the code that has changed (new note added)
    Note right of browser: The browser executes the callback function that renders the new note

```
