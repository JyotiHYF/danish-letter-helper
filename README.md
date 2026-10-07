# Danish Letter Helper

A small web app that helps you understand Danish letters. Paste the text of a letter, or upload a PDF or a photo, and it tells you:

- the type of letter (payment, rent or other)
- how urgent it is
- the deadline
- what you need to do

## Built with

- Python and FastAPI (backend)
- pypdf and Tesseract OCR (reading PDFs and photos)
- React and TypeScript (frontend)

## How to run it

You need Python 3, Node.js and Tesseract with the Danish language.

On a Mac, install Tesseract with:

    brew install tesseract tesseract-lang

Backend:

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn api:app --reload

Frontend (in a second terminal):

    cd frontend
    npm install
    npm run dev

Then open http://localhost:5173
