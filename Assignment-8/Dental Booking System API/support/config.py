# URLs
BASE_URL = "http://localhost:3000"
API_DELETE = "/user"
API_ADD = "/signup"
API_LOGIN = "/login"
API_CANCEL = "/cancel"
API_BOOK = "/book"

# Credentials
VALID_PASSWORD = "123"
VALID_PHONE = "059999999"
INVALID_PASSWORD = "3456"

#Filename
FILENAME = "data.txt"

# Messages - Books
BOOK_OVERLAPPING = "Appointment slot already booked or overlaps with another appointment"
BOOK_PAST = "Cannot book an appointment in the past"

# Messages - login
LOGIN_FAIL = "Invalid username or password" 

# Messages - Signup
SIGNUP_FAIL = "Username or phone number already exists"

# Classes 
CLASS_SUCCESS = "success"
CLASS_ERROR = "error"
MESSAGE = "message"

# Times
VALID_START = "10:00"
VALID_END = "10:40"
INVALID_END = "10:29AM"

# Dates
INVALID_DATE = "01-01-1990"

# HTTP
HTTP_OK = 200
HTTP_CREATED = 201
HTTP_CONFLICT = 409
HTTP_UNATHORIZED = 401
HTTP_BAD = 400
HTTP_NOTFOUND = 404