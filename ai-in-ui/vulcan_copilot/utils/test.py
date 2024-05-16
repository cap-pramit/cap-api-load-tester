class Row:
    def __init__(self, style, columns):
        self.style = style # style for the row
        self.columns = columns # list of columns in the row

class Column:
    def __init__(self, span, style, content):
        self.span = span # 1-24 base on num_of_columns_in_row, value = take floor integer value of (24 / num_of_columns_in_row)
        self.style = style # style for the column
        self.content = content  # content / children components of the column

class TextBox:
    def __init__(self, field, label, value, style):
        self.field = field # field name from schema for this component
        self.label = label # label of the component
        self.value = value # state variable value
        self.style = style # style of the component
    def onChange(self, event):
        # set state variable with event.target.value
        pass

class Radio:
    def __init__(self, label, value):
        self.label = label  # label of the radio button
        self.value = value  # value of the radio button

class RadioButtonGroup:
    def __init__(self, field, label, value, style, buttons):
        self.field = field # field name from schema for this component
        self.label = label # label of the component
        self.value = value # state variable value
        self.style = style # style of the component
        self.buttons = buttons # list of Radio class objects
    def onChange(self, event):
        # set state variable with event.target.value
        pass

class DropdownOption:
    def __init__(self, label, value):
        self.label = label # label of the option
        self.value = value # value of the option

class Dropdown:
    def __init__(self, field, label, value, style, options):
        self.field = field # field name from schema for this component
        self.label = label # label of the component
        self.value = value # state variable value
        self.style = style # style of the component
        self.options = options # list of DropdownOption for the dropdown
    def onChange(self, value):
        # set state variable with value param
        pass

class Date:
    def __init__(self, field, label, value, style):
        self.field = field  # field name from schema for this component
        self.label = label  # label of the component
        self.value = value  # state variable value
        self.style = style  # style of the component
    def onChange(self, value):
        # set state variable with value param
        pass

def initializeState(field, schema):
    return """
        const [customerInfo, setCustomerInfo] = useState({
            title: 'mr',
            firstName: '',
            middleName: '',
            lastName: '',
            dob: moment(),
            gender: 'male',
            mobile: '',
            houseFlatNo: '',
            street: '',
            landmark: '',
            city: '',
            district: '',
            country: 'india',
            pincode: '',
            passportNo: '',
            occupation: 'artist',
            parentFFN: '',
            nationality: 'indian',
            passportIssualCountry: '',
            passportExpiry: moment()
        });
    """

def setDataToState(field, value):
    pass

def renderRow(row: Row):
    return f"<CapRow style={row.style}>{''.join([renderColumn(col) for col in row.columns])}</CapRow>"

def renderColumn(column: Column):
    return f"<CapColumn style={column.style} span=\"{column.span}\">{column.content}</CapColumn>"

def renderTextBox(textBox: TextBox):
    return f"<input type=\"text\" value={textBox.field} onChange=(event) => setDataToState(\"{textBox.field}\", event.target.value)></input>"

def renderRadioButtons(radioGrp: RadioButtonGroup):
    return f"<input type=\"text\" value={radioGrp.field} onChange=(event) => setDataToState(\"{radioGrp.field}\", event.target.value)></input>"

def renderDropdown(dropdown: Dropdown):
    return f"<input type=\"text\" value={dropdown.field} onChange=(value) => setDataToState(\"{dropdown.field}\", value)></input>"

def renderDate(date: Date):
    return f"<input type=\"text\" value={date.field} onChange=(value) => setDataToState(\"{date.field}\", value)></input>"


# Define the function to create the customer form UI
def createCustomerForm(schema):
    # Initialize state
    # initializeState()

    # Create an empty list to hold the form components
    form_components = []

    # Create variables to keep track of columns
    current_columns = []

    # Iterate over the schema keys and generate corresponding form components
    for field, field_info in schema.items():
        # Determine the UI type based on the field info
        ui_type = field_info.get('uiType', 'textbox')

        # Create label and input components based on UI type
        if ui_type == 'dropdown':
            dropdown_options = []
            for value in field_info['possibleValues']:
                dropdown_options.append(DropdownOption(label=value, value=value))
            dropdown = Dropdown(field=field, label=field, value=field_info['defaultValue'], style={},
                                options=dropdown_options)
            current_columns.append(Column(span=12, style={}, content=renderDropdown(dropdown)))
        elif ui_type == 'radio':
            radio_buttons = RadioButtonGroup(field=field, label=field, value=field_info['defaultValue'],
                                             style={}, buttons=[])
            for value in field_info['possibleValues']:
                radio_buttons.buttons.append(Radio(label=value, value=value))
            current_columns.append(Column(span=12, style={}, content=renderRadioButtons(radio_buttons)))
        else:
            textbox = TextBox(field=field, label=field, value=field_info['defaultValue'], style={})
            current_columns.append(Column(span=12, style={}, content=renderTextBox(textbox)))

        # If current column count reaches 2, add them to a row
        if len(current_columns) == 2:
            form_components.append(Row(style={}, columns=current_columns))
            current_columns = []

    # If there are any remaining columns, add them to a row
    if current_columns:
        form_components.append(Row(style={}, columns=current_columns))

    # Return the form components
    return form_components


# Define the Customer data specifications
customer_schema = {
  "title": {
    "type": "enum",
    "defaultValue": "mr",
    "uiType": "dropdown",
    "possibleValues": [
      "mr",
      "mrs",
      "ms",
      "others"
    ]
  },
  "firstName": {
    "type": "string",
    "defaultValue": ""
  },
  "middleName": {
    "type": "string",
    "defaultValue": ""
  },
  "lastName": {
    "type": "string",
    "defaultValue": ""
  },
  "dob": {
    "type": "date",
    "defaultValue": "current_date"
  },
  "gender": {
    "type": "enum",
    "defaultValue": "male",
    "uiType": "radio",
    "possibleValues": [
      "male",
      "female",
      "others"
    ]
  },
  "mobile": {
    "type": "string",
    "defaultValue": ""
  },
  "houseFlatNo": {
    "type": "string",
    "defaultValue": ""
  },
  "street": {
    "type": "string",
    "defaultValue": ""
  },
  "landmark": {
    "type": "string",
    "defaultValue": ""
  },
  "city": {
    "type": "string",
    "defaultValue": ""
  },
  "district": {
    "type": "string",
    "defaultValue": ""
  },
  "country": {
    "type": "enum",
    "defaultValue": "india",
    "uiType": "dropdown",
    "possibleValues": [
      "india",
      "usa",
      "uk"
    ]
  },
  "pincode": {
    "type": "string",
    "defaultValue": ""
  },
  "passportNo": {
    "type": "string",
    "defaultValue": ""
  },
  "occupation": {
    "type": "enum",
    "defaultValue": "service",
    "uiType": "dropdown",
    "possibleValues": [
      "service",
      "business",
      "artist",
      "others"
    ]
  },
  "parentFFN": {
    "type": "string",
    "defaultValue": ""
  },
  "nationality": {
    "type": "string",
    "defaultValue": "indian"
  },
  "passportIssualCountry": {
    "type": "enum",
    "defaultValue": "india",
    "uiType": "dropdown",
    "possibleValues": [
      "india",
      "usa",
      "uk"
    ]
  },
  "passportExpiry": {
    "type": "date",
    "defaultValue": "current_date"
  }
}

# Generate the customer form UI components
customer_form_components = createCustomerForm(customer_schema)

# Render the form components
for component in customer_form_components:
    print(renderRow(component))
