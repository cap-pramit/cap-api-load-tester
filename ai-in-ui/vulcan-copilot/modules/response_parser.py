import re
import os

class ResponseParser:
    def __init__(self, response_file_name = 'sample_response.txt'):
        self.file_name = response_file_name
        self.folder_path = self.create_tmp_folder()

    def write_file(self, file_name, content):
        try:
            file_path = os.path.join(self.folder_path, file_name)
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            return file_path
        except Exception as e:
            print(f"Error writing content to file: {str(e)}")
            return False

    def create_tmp_folder(self):
        current_directory = os.getcwd()
        folder_path = os.path.join(current_directory, "vulcan-copilot/tmp")
        os.makedirs(folder_path, exist_ok=True)
        return folder_path

    def create_component_folder(self, folder_name):
        # Create the full path of the folder
        self.folder_path = os.path.join(self.create_tmp_folder(), folder_name)
        # Check if the folder already exists
        if not os.path.exists(self.folder_path):
            # Create the folder if it doesn't exist
            os.makedirs(self.folder_path)
            print(f"Folder created: {folder_name}")
        else:
            print(f"Folder '{folder_name}' already exists. Skipping creation.")

    def parse(self, folder_name=None):
        print(f"Folder name override: {folder_name}")
        response = {
            'folder_name': '',
            'files': []
        }
        try:
            with open(self.file_name, 'rt', encoding='utf-8') as response_file:
                contents = response_file.read()
                pattern = r'```javascript(.*?)```'
                matches = re.findall(pattern, contents, re.DOTALL)
                if matches is None or len(matches) == 0:
                    print('No JS files found in response')
                    return False
                else:
                    if folder_name is None:
                        folder_name_pattern = r'### Step(.*)component file\n```javascript\n//\s(.*?)\.js(.*?)```'
                        folder_name_matches = re.findall(folder_name_pattern, contents, re.DOTALL)
                        folder_name = 'Test'
                        if folder_name_matches is not None and len(folder_name_matches) > 0:
                            folder_name = folder_name_matches[0][1] if folder_name_matches[0] is not None else 'Test'
                    self.create_component_folder(folder_name)
                    response['folder_name'] = folder_name
                    for match in matches:
                        file_name_pattern = r'\n//\s(.*?)\n(.*)'
                        file_name_matches = re.findall(file_name_pattern, match, re.DOTALL)
                        if file_name_matches is not None and len(file_name_matches) > 0 and file_name_matches[0][0] is not None:
                            file_name = file_name_matches[0][0]
                            file_path = self.write_file(file_name, match)
                            print(f"File created/edited: {file_name}")
                            response['files'].append({
                                'name': file_name,
                                'path': file_path,
                                'content': match,
                            })
            print('Model response parsing complete!')
        except Exception as e:
            print(f"Error while parsing response: {str(e)}")
            raise e
        return response

if __name__ == "__main__":
    parser = ResponseParser('model_response.txt')
    parsed_data = parser.parse()
    print(parsed_data)
