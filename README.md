# Danish Letter Helper

A small web app that helps you understand Danish letters. You paste in a letter, and it tells you:

- the type of letter (payment, rent or other)
- how urgent it is
- the deadline
- what you need to do

## Built with

- Python and FastAPI (backend)
- React and TypeScript (frontend)

## How to run it

Backend:

    python3 -m venv .venv
    source .venv/bin/activate
    pip install fastapi uvicorn
    uvicorn api:app --reload

Frontend (in a second terminal):

    cd frontend
    npm install
    npm run dev

Then open http://localhost:5173
