from pypdf import PdfReader
from PIL import Image
import pytesseract


def extract_pdf_text(source):
    reader = PdfReader(source)
    all_text = ""
    for page in reader.pages:
        all_text += page.extract_text() + "\n"
    return all_text


def extract_image_text(source):
    image = Image.open(source)
    return pytesseract.image_to_string(image, lang="dan")