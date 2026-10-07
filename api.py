from fastapi import FastAPI, UploadFile, File, HTTPException
from analyzer import analyze_letter
from file_reader import extract_pdf_text, extract_image_text
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Letter(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "Danish Letter Helper is running"}


@app.post("/analyze")
def analyze(letter: Letter):
    return analyze_letter(letter.text)
@app.post("/analyze-file")
def analyze_file(file: UploadFile = File(...)):
    if file.content_type == "application/pdf":
        text = extract_pdf_text(file.file)
    elif file.content_type in ("image/png", "image/jpeg"):
        text = extract_image_text(file.file)
    else:
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF, PNG or JPG file.",
        )

    if text.strip() == "":
        raise HTTPException(status_code=422, detail="No text found in this file.")

    return analyze_letter(text)