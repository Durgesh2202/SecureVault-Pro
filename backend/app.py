from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import hashlib
import itertools
import string
import base64

app = Flask(__name__)
CORS(app)

def score_password(password):
    score = 0
    length = len(password)
    if length >= 12:
        score += 2
    elif length >= 8:
        score += 1
    if re.search(r"[A-Z]", password):
        score += 1
    if re.search(r"[a-z]", password):
        score += 1
    if re.search(r"\d", password):
        score += 1
    if re.search(r"\W", password):
        score += 1
    return min(score, 6)

@app.route('/api/strength', methods=['POST'])
def strength():
    data = request.get_json()
    password = data.get('password', '')
    score = score_password(password)
    strength_labels = [
        'Very Weak',
        'Weak', 
        'Fair',
        'Good',
        'Strong',
        'Excellent'
    ]
    return jsonify({
        'score': score,
        'strength': strength_labels[score] if score < len(strength_labels) else strength_labels[-1]
    })

@app.route('/api/crack', methods=['POST'])
def crack():
    data = request.get_json()
    hash_value = data.get('hash', '')
    hash_type = data.get('type', 'md5')
    max_length = int(data.get('maxLength', 4))
    chars = string.ascii_lowercase + string.digits
    found = None

    def check_hash(candidate):
        candidate_bytes = candidate.encode()
        if hash_type == 'md5':
            return hashlib.md5(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha1':
            return hashlib.sha1(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha224':
            return hashlib.sha224(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha256':
            return hashlib.sha256(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha384':
            return hashlib.sha384(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha512':
            return hashlib.sha512(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha3_224':
            return hashlib.sha3_224(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha3_256':
            return hashlib.sha3_256(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha3_384':
            return hashlib.sha3_384(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'sha3_512':
            return hashlib.sha3_512(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'blake2b':
            return hashlib.blake2b(candidate_bytes).hexdigest() == hash_value
        elif hash_type == 'blake2s':
            return hashlib.blake2s(candidate_bytes).hexdigest() == hash_value
        return False

    for length in range(1, max_length+1):
        for attempt in itertools.product(chars, repeat=length):
            attempt_str = ''.join(attempt)
            if check_hash(attempt_str):
                found = attempt_str
                break
        if found:
            break
    return jsonify({'result': found or 'Not found! Try higher max length or check your hash.'})

def vigenere_cipher(text, key, encrypt=True):
    """Vigenère cipher implementation"""
    result = ""
    key = key.upper()
    key_index = 0
    
    for char in text:
        if char.isalpha():
            is_upper = char.isupper()
            char = char.upper()
            
            key_char = key[key_index % len(key)]
            shift = ord(key_char) - ord('A')
            
            if not encrypt:
                shift = -shift
            
            shifted = chr((ord(char) - ord('A') + shift) % 26 + ord('A'))
            result += shifted if is_upper else shifted.lower()
            key_index += 1
        else:
            result += char
    
    return result

def rot13_cipher(text):
    """ROT13 cipher implementation"""
    result = ""
    for char in text:
        if char.isalpha():
            is_upper = char.isupper()
            char = char.upper()
            shifted = chr((ord(char) - ord('A') + 13) % 26 + ord('A'))
            result += shifted if is_upper else shifted.lower()
        else:
            result += char
    return result

@app.route('/api/crypto', methods=['POST'])
def crypto():
    try:
        data = request.get_json()
        text = data.get('text', '')
        key = data.get('key', '')
        algorithm = data.get('algorithm', 'vigenere')
        operation = data.get('operation', 'encrypt')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        result = ""
        
        if algorithm == 'vigenere':
            if not key:
                return jsonify({'error': 'Key is required for Vigenère cipher'}), 400
            result = vigenere_cipher(text, key, operation == 'encrypt')
        
        elif algorithm == 'base64':
            if operation == 'encrypt':
                result = base64.b64encode(text.encode()).decode()
            else:
                try:
                    result = base64.b64decode(text).decode()
                except:
                    return jsonify({'error': 'Invalid Base64 input'}), 400
        
        elif algorithm == 'rot13':
            result = rot13_cipher(text)
        
        else:
            return jsonify({'error': 'Unsupported algorithm'}), 400
        
        return jsonify({'result': result})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)