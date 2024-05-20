import re
import os

class ResponseParser:
    def __init__(self, response_file_name = 'sample_response.txt', summary_available=False):
        self.file_name = response_file_name
        self.summary_available = summary_available
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

    def parse_folder_name(self, contents):
        folder_name_pattern = r'### Step(.*)component file\n```javascript\n//\s(.*?)\.js(.*?)```'
        folder_name_matches = re.findall(folder_name_pattern, contents, re.DOTALL)
        folder_name = 'Test'
        if folder_name_matches is not None and len(folder_name_matches) > 0:
            folder_name = folder_name_matches[0][1] if folder_name_matches[0] is not None else 'Test'
        return folder_name

    def parse_file_name(self, match):
        file_name = None
        file_name_pattern = r'\n//\s(.*?)\n(.*)'
        file_name_matches = re.findall(file_name_pattern, match, re.DOTALL)
        if file_name_matches is not None and len(file_name_matches) > 0 and file_name_matches[0][0] is not None:
            file_name = file_name_matches[0][0]
        return file_name

    def parse_summary(self, contents):
        if self.summary_available:
            summary = None
            summary_pattern = r'(.*)\n### Summarization\n(.*)'
            summary_matches = re.findall(summary_pattern, contents, re.DOTALL)
            if summary_matches is not None and len(summary_matches) > 0:
                summary = summary_matches[0][1] if summary_matches[0] is not None else ''
            return f"Please make these changes on the current code: \n{summary}"
        else:
            return None

    def parse(self, folder_name=None):
        print(f"Folder name override: {folder_name}")
        response = {
            'folder_name': '',
            'files': []
        }
        summary = None
        try:
            with open(self.file_name, 'rt', encoding='utf-8') as response_file:
                contents = response_file.read()
                pattern = r'```javascript(.*?)```'
                matches = re.findall(pattern, contents, re.DOTALL)
                if matches is None or len(matches) == 0:
                    print('No JS files found in response')
                    return False
                else:
                    summary = self.parse_summary(contents)
                    if folder_name is None:
                        folder_name = self.parse_folder_name(contents)
                    self.create_component_folder(folder_name)
                    response['folder_name'] = folder_name
                    for match in matches:
                        file_name = self.parse_file_name(match)
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
        return response, summary

if __name__ == "__main__":
    parser = ResponseParser('vulcan-copilot/tmp/model_response.txt', True)
    response, summary = parser.parse('Test')
    print(response)
    print()
    print(summary)
