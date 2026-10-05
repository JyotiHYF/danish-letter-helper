from fastapi import FastAPI
from pydantic import BaseModel
from analyzer import analyze_letter
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