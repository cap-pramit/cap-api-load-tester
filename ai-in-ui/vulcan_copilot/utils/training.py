import json
import os

from ..context.ui_context import training_data, base_instructions, element_samples, component_constructs

def create_folder():
    # Get the current working directory
    current_directory = os.getcwd()
    # Define the path of the folder in the parent directory where you want to create the file
    folder_path = os.path.join(current_directory, "vulcan_copilot/tmp")
    # Create the folder if it doesn't exist
    os.makedirs(folder_path, exist_ok=True)
    return folder_path

def create_fine_tuning_file():
    try:
        folder_path = create_folder()
        file_path = os.path.join(folder_path, 'fine_tuning.jsonl')
        system_context = ''
        initial_context = base_instructions + element_samples + component_constructs
        for part in initial_context:
            if part['role'] == 'system':
                system_context = \
                    f"{system_context}\n" \
                    f"{part['content']}"
        with open(file_path, 'w', encoding='utf-8') as file:
            i = 0
            while i < len(training_data):
                msg = {
                    "messages": [
                        {"role": "system", "content": system_context},
                        training_data[i],
                        training_data[i + 1],
                    ]
                }
                file.write(json.dumps(msg) + "\n")
                i = i + 2
        print(f"File {file_path} created successfully!")
    except Exception as e:
        print(f"Error during creating fine tuning file: {str(e)}")

if __name__ == "__main__":
    create_fine_tuning_file()