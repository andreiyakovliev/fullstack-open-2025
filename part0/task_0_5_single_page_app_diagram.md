[![Diagram](https://mermaid.ink/img/pako:eNq9UslOwzAQ_ZWRTyCV9p5DTyBOLFLLBUWqpvaksZrYxh53UcW_MyGhULW9koMz65tnvzko7Q2pQiX6yOQ03VtcRWxLB_IFjGy1DegYltFvE8XzhAQ3P_H-HErvptPBKuBNTuB9oAQIzjOBdcB19wuZobLUmNPms-4QKSXp77pKNcMNlQqWmdm7y8N7YgW8vszmUDOHVEwmibOxlMY6jWtqknVrO67shHbYhoYwhImj7aJjuEgBe0jUbDconP9etbdPaKastXCEGx1Jys1tX2noIsA1uo8P_8O2e8dvJaRTBGjoKts-8dzVRruqGXwFR5i5wAwO0I505kEjjU2zRL2GKjtB9J3eyBDJGYrpOD6pkWoptmiNrOGhm1UqSbYibyGmwbguVek-pQ4z-9neaVVwzDRS0edVrYoKmyReDkZYDwt8jMqOvnv_65Ox7ONTv_Xfy__5Be35Dio?type=png)](https://mermaid.live/edit#pako:eNq9UslOwzAQ_ZWRTyCV9p5DTyBOLFLLBUWqpvaksZrYxh53UcW_MyGhULW9koMz65tnvzko7Q2pQiX6yOQ03VtcRWxLB_IFjGy1DegYltFvE8XzhAQ3P_H-HErvptPBKuBNTuB9oAQIzjOBdcB19wuZobLUmNPms-4QKSXp77pKNcMNlQqWmdm7y8N7YgW8vszmUDOHVEwmibOxlMY6jWtqknVrO67shHbYhoYwhImj7aJjuEgBe0jUbDconP9etbdPaKastXCEGx1Jys1tX2noIsA1uo8P_8O2e8dvJaRTBGjoKts-8dzVRruqGXwFR5i5wAwO0I505kEjjU2zRL2GKjtB9J3eyBDJGYrpOD6pkWoptmiNrOGhm1UqSbYibyGmwbguVek-pQ4z-9neaVVwzDRS0edVrYoKmyReDkZYDwt8jMqOvnv_65Ox7ONTv_Xfy__5Be35Dio)

```
sequenceDiagram
    participant browser
    participant server
    
    browser->>browser: User types a note in the input field
    browser-->>browser: User presses the "Save" button
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: success (created)
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: the note spa file
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
