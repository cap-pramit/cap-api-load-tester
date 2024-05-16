## BEGIN ELEMENT DEFINITIONS and UTILS ##

class Row:
    def __init__(self, style, columns):
        self.style = style # style for the row
        self.columns = columns # list of columns in the row

class Column:
    def __init__(self, span, style, content):
        self.span = span # 1-24 base on num_of_columns_in_row, value = Math.floor(24 / num_of_columns_in_row)
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

def initializeState(field = '', schema = {}):
    # initializes the state for the component
    pass

def setDataToState(field, value):
    # sets data to the state
    pass

def renderRow(row: Row) -> str:
    # takes a list of columns and other params and creates a row layout
    pass

def renderColumn(column: Column) -> str:
    # takes content and other params and creates a column object to be put inside row
    pass

def renderTextBox(config: TextBox) -> str:
    # takes params and style to render an input / text box component for the form, adds the onChange event handler to handle form input change
    pass

def renderRadioButtons(config: RadioButtonGroup) -> str:
    # takes params and style to render a radio button group component for the form, adds the onChange event handler to handle form input change
    pass

def renderDropdown(config: Dropdown) -> str:
    # takes params and style to render a dropdown or select component for the form, adds the onChange event handler to handle form input change
    pass

def renderDate(config: Date) -> str:
    # takes params and style to render a date component for the form, adds the onChange event handler to handle form input change
    pass

## END ELEMENT DEFINITIONS and UTILS ##