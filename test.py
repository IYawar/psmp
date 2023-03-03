import json
import os


if __name__ == '__main__':
    parent = './patterns'

    with open('patterns.json', 'w', encoding='utf-8') as patterns_file:
        patterns = dict()
        for folder in os.listdir(parent):
            patterns[f'{folder}'] = dict()
            for image in os.listdir(os.path.join(parent, folder)):
                patterns[f'{folder}'][f'{image.split(".")[0]}'] = f'{parent}/{folder}/{image}'
                
        json.dump(patterns, patterns_file, ensure_ascii=False, indent=4)