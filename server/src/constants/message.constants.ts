export const SYSTEM_MESSAGE = {
  VALIDATION_ERROR: 'Lỗi dữ liệu đầu vào'
} as const

export const AUTHENTICATE_MESSAGE = {
  ACCESS_TOKEN_IS_REQUIRED: 'Không được bỏ trống Access token',
  ACCESS_TOKEN_MUST_BE_A_STRING: 'Access token phải là một chuỗi ký tự',
  ACCESS_TOKEN_INVALID: 'Access token không hợp lệ',
  USER_DOES_NOT_EXIST: 'Người dùng không tồn tại',
  REFRESH_TOKEN_IS_REQUIRED: 'Không được bỏ trống Refresh token',
  REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh token phải là một chuỗi ký tự',
  REFRESH_TOKEN_INVALID: 'Refresh token không hợp lệ',
  AUTHENTICATION_FAILED: 'Yêu cầu xác thực trước khi thực hiện hành động này',
  YOU_DONT_HAVE_PERMISSION_TO_DO_THIS: 'Bạn không có quyền làm điều này',
  TOKEN_PAIR_MISMATCH: 'Mã xác thực không hợp lệ'
} as const

export const USER_MESSAGE = {
  REGISTER_SUCCESS: 'Đăng ký tài khoản thành công',
  REGISTER_FAILURE: 'Đăng ký tài khoản thất bại',
  LOGIN_SUCCESS: 'Đăng nhập tài khoản thành công',
  LOGIN_FAILURE: 'Đăng nhập tài khoản thất bại',
  LOGOUT_SUCCESS: 'Đăng xuất tài khoản thành công',
  LOGOUT_FAILURE: 'Đăng xuất tài khoản thất bại',
  VERIFY_TOKEN_SUCCESS: 'Xác minh mã xác minh thành công',
  VERIFY_TOKEN_FAILURE: 'Xác minh mã xác minh thất bại',
  TOKEN_IS_REQUIRED: 'Không được bỏ trống mã xác thực',
  TOKEN_MUST_BE_A_STRING: 'Mã xác thực phải là chuỗi ký tự',
  TOKEN_LENGTH_MUST_BE_FROM_1_TO_50: 'Mã xác thực phải có độ dài từ 1 đến 1000 ký tự',
  INVALID_TOKEN: 'Mã xác thực không hợp lệ',
  NAME_IS_REQUIRED: 'Không được bỏ trống tên người dùng',
  NAME_MUST_BE_A_STRING: 'Tên người dùng phải là chuỗi ký tự',
  NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Tên người dùng phải có độ dài từ 1 đến 50 ký tự',
  EMAIL_IS_REQUIRED: 'Không được bỏ trống địa chỉ email',
  EMAIL_MUST_BE_A_STRING: 'Địa chỉ email phải là một chuỗi ký tự',
  EMAIL_LENGTH_MUST_BE_FROM_5_TO_100: 'Địa chỉ email phải có độ dài từ 5 đến 100 ký tự',
  EMAIL_IS_NOT_VALID: 'Địa chỉ email không đúng định dạng',
  EMAIL_ALREADY_EXISTS: 'Địa chỉ email đã được sử dụng',
  PASSWORD_IS_REQUIRED: 'Không được bỏ trống mật khẩu',
  PASSWORD_MUST_BE_A_STRING: 'Mật khẩu phải là một chuỗi ký tự',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100: 'Mật khẩu phải có độ dài từ 8 đến 100 ký tự',
  PASSWORD_MUST_BE_STRONG: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Không được bỏ trống xác nhận mật khẩu',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Xác nhận mật khẩu phải là một chuỗi ký tự',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100: 'Xác nhận mật khẩu phải có độ dài từ 8 đến 100 ký tự',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Xác nhận mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
  CONFIRM_PASSWORD_DOES_NOT_MATCH_PASSWORD: 'Xác nhận mật khẩu phải khớp với mật khẩu',
  INCORRECT_EMAIL_OR_PASSWORD: 'Địa chỉ email hoặc mật khẩu không chính xác'
}
