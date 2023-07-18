from urllib.parse import parse_qs
from urllib.parse import parse_qsl

q = parse_qsl(get_user_input())
q1 = parse_qs(get_user_input())