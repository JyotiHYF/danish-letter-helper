payment_words = ["betale", "betaling", "faktura"]
rent_words = ["husleje", "leje", "lejer"]
urgent_words = ["senest", "frist", "rykker", "inkasso"]
months = ["januar", "februar", "marts", "april", "maj", "juni",
          "juli", "august", "september", "oktober", "november", "december"]
tax_words = ["skat", "skattestyrelsen", "årsopgørelse", "restskat"]
health_words = ["læge", "sygehus", "hospital", "sundhedskort", "henvisning"]
def find_letter_type(text):
    text = text.lower()
    for word in rent_words:
        if word in text:
            return "rent"
    for word in tax_words:
        if word in text:
            return "tax"
    for word in payment_words:
        if word in text:
            return "payment"
    for word in health_words:
        if word in text:
            return "health"    
    return "other"

def find_urgency(text):
    text = text.lower()
    for word in urgent_words:
        if word in text:
            return "urgent"
    return "normal"


def find_deadline(text):
    words = text.split()
    for i, word in enumerate(words):
        clean_word = word.strip(".,").lower()
        if clean_word in months:
            day = words[i - 1].strip(".,")
            return f"{day} {clean_word}"
    return "not found"


def find_action(letter_type):
    if letter_type == "payment":
        return "Pay the amount on time."
    elif letter_type == "rent":
        return "Check your rent and keep this letter."
    elif letter_type == "tax":
        return "Check your tax statement on skat.dk and pay or claim any amount."
    elif letter_type == "health":
        return "Check the date and time of your appointment and bring your health card."
    else:
        return "Read the letter and check if you need to reply."


def analyze_letter(text):
    letter_type = find_letter_type(text)
    return {
        "type": letter_type,
        "urgency": find_urgency(text),
        "deadline": find_deadline(text),
        "action": find_action(letter_type),
    }