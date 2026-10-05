from analyzer import analyze_letter

filename = input("Which letter file? ")

try:
    with open(filename, encoding="utf-8") as file:
        letter = file.read()
except FileNotFoundError:
    print("I could not find that file. Check the name, for example: letter1.txt")
    exit()

result = analyze_letter(letter)

print(f"Type: {result['type']}")
print(f"Urgency: {result['urgency']}")
print(f"Deadline: {result['deadline']}")
print(f"Action: {result['action']}")