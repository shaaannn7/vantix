import os
import re

dirs_to_walk = ["vantix-frontend", "vantix-backend"]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        new_content = content
        new_content = re.sub(r'vantix', 'ventix', new_content)
        new_content = re.sub(r'Vantix', 'Ventix', new_content)
        new_content = re.sub(r'VANTIX', 'VENTIX', new_content)
        
        if content != new_content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Skipping {filepath}: {e}")

for d in dirs_to_walk:
    for root, dirs, files in os.walk(d):
        if '.git' in root or 'node_modules' in root or '.venv' in root or '__pycache__' in root or 'dist' in root:
            continue
        for file in files:
            replace_in_file(os.path.join(root, file))

