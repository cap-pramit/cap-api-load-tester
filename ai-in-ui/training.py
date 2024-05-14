import json

from context.ui_context import training_data, base_instructions, element_samples, component_constructs

fine_tuning_file_name = 'fine_tuning.jsonl'

def create_fine_tuning_file():
    try:
        system_context = ''
        initial_context = base_instructions + element_samples + component_constructs
        for part in initial_context:
            if part['role'] == 'system':
                system_context = \
                    f"{system_context}\n" \
                    f"{part['content']}"
        with open(fine_tuning_file_name, 'w', encoding='utf-8') as file:
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
        print(f"File {fine_tuning_file_name} created successfully!")
    except Exception as e:
        print(f"Error during creating fine tuning file: {str(e)}")

if __name__ == "__main__":
    create_fine_tuning_file()