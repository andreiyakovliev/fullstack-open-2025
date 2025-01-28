[![Diagram](https://mermaid.ink/img/pako:eNq9VE1PHDEM_StWTlSC3fscuLQIiQNUGrhUI1XexLOTbiZJE2cBIf47no-FUtgKEOocZmI7tp_f2L5TOhhSlcr0u5DX9M3iOmHfeJAnYmKrbUTPsErhOlN6aRDldqef3vPVo-Pj-VTBlbyBbyNlQPCBCawH7oZPLAytJWeeO7_wjolyFv_Bq1E1bqlRsCrMwb-efAJWwfeL-hI65pir5TJzMZbyQudFRy5bv7GL1i7pBvvoCGNcerr-OSCcwqFmu0XB-2eZ0_kZxFy0FnxwMBaXBZ35Ml029GqMfWhPT94FVrLl9yEd-BvdhHVHezF-Dr4erRfzByB-rev_BvDXB_Cd4RZrnWzkf8N8-tfnQ2cku-4YQguPwS4l2CxAZhmsDHRDurD1678zDcMqOpScxLqbp-GsvjiHNoV-lD6_yQwyCke7OXsrS1dRHMnMzeZsZjiwXjtJN1cmozZa903KVMKb2Ztom0nR6NwK9Qba4iVq8BNvibyhlJ-moPHqUPWUpBGM7MG7IVujxNzLfqnkaDBtGtX4e7mHhUN967WqOBU6VCmUdaeqFl0WqYwFzxv0UStL8kcIO_n-Ac4X5ts?type=png)](https://mermaid.live/edit#pako:eNq9VE1PHDEM_StWTlSC3fscuLQIiQNUGrhUI1XexLOTbiZJE2cBIf47no-FUtgKEOocZmI7tp_f2L5TOhhSlcr0u5DX9M3iOmHfeJAnYmKrbUTPsErhOlN6aRDldqef3vPVo-Pj-VTBlbyBbyNlQPCBCawH7oZPLAytJWeeO7_wjolyFv_Bq1E1bqlRsCrMwb-efAJWwfeL-hI65pir5TJzMZbyQudFRy5bv7GL1i7pBvvoCGNcerr-OSCcwqFmu0XB-2eZ0_kZxFy0FnxwMBaXBZ35Ml029GqMfWhPT94FVrLl9yEd-BvdhHVHezF-Dr4erRfzByB-rev_BvDXB_Cd4RZrnWzkf8N8-tfnQ2cku-4YQguPwS4l2CxAZhmsDHRDurD1678zDcMqOpScxLqbp-GsvjiHNoV-lD6_yQwyCke7OXsrS1dRHMnMzeZsZjiwXjtJN1cmozZa903KVMKb2Ztom0nR6NwK9Qba4iVq8BNvibyhlJ-moPHqUPWUpBGM7MG7IVujxNzLfqnkaDBtGtX4e7mHhUN967WqOBU6VCmUdaeqFl0WqYwFzxv0UStL8kcIO_n-Ac4X5ts)



```
sequenceDiagram
    participant browser
    participant server
    
    browser->>browser: User types a note in the input field
    browser-->>browser: User presses the "Save" button
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: success (note saved)
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: the notes file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated notes list (including the new note)
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes
```
