import hashlib,os

def hash_password(password):
    salt=os.urandom(16).hex()
    hashed=hashlib.sha256((salt+password).encode()).hexdigest()
    return f"{salt}${hashed}"

def verify_password(password,stored_hashed):
    salt,hashed = stored_hashed.split('$')
    return hashlib.sha256((salt+password).encode()).hexdigest()==hashed
    