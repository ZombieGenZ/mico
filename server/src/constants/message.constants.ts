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
  GET_USER_INFOMATION_SUCCESS: 'Lấy thông tin tài khoản thành công',
  GET_USER_INFOMATION_FAILURE: 'Lấy thông tin tài khoản thất bại',
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

export const CATEGORY_MESSAGE = {
  GET_CATEGORY_SUCCESS: 'Lấy thông tin danh mục thành công',
  GET_CATEGORY_FAILURE: 'Lấy thông tin danh mục thất bại',
  CREATE_CATEGORY_SUCCESS: 'Tạo danh mục thành công',
  CREATE_CATEGORY_FAILURE: 'Tạo danh mục thất bại',
  UPDATE_CATEGORY_SUCCESS: 'Cập nhật danh mục thành công',
  UPDATE_CATEGORY_FAILURE: 'Cập nhật danh mục thất bại',
  DELETE_CATEGORY_SUCCESS: 'Xóa danh mục thành công',
  DELETE_CATEGORY_FAILURE: 'Xóa danh mục thất bại',
  NAME_IS_REQUIRED: 'Không được bỏ trống tên danh mục',
  NAME_MUST_BE_A_STRING: 'Tên danh mục phải là một chuỗi ký tự',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Tên danh mục phải có độ dài từ 1 đến 100 ký tự',
  INDEX_IS_REQUIRED: 'Không được bỏ trống độ ưu tiên của danh mục',
  INDEX_MUST_BE_A_NUMBER: 'Độ ưu tiên của danh mục phải là một chuỗi ký tự',
  CATEGORY_ID_IS_REQUIRED: 'Không được bỏ trống ID danh mục',
  CATEGORY_ID_MUST_BE_A_STRING: 'ID Danh mục phải là một chuỗi ký tự',
  CATEGORY_ID_IS_MUST_BE_A_ID: 'ID Danh mục không đúng định dạng',
  CATEGORY_ID_DOES_NOT_EXIST: 'ID Danh mục không tồn tại'
}

export const TOPIC_MESSAGE = {
  GET_TOPIC_SUCCESS: 'Lấy thông tin chủ đề thành công',
  GET_TOPIC_FAILURE: 'Lấy thông tin chủ đề thất bại',
  CREATE_TOPIC_SUCCESS: 'Tạo chủ đề thành công',
  CREATE_TOPIC_FAILURE: 'Tạo chủ đề thất bại',
  UPDATE_TOPIC_SUCCESS: 'Cập nhật chủ đề thành công',
  UPDATE_TOPIC_FAILURE: 'Cập nhật chủ đề thất bại',
  DELETE_TOPIC_SUCCESS: 'Xóa chủ đề thành công',
  DELETE_TOPIC_FAILURE: 'Xóa chủ đề thất bại',
  NAME_IS_REQUIRED: 'Không được bỏ trống tên chủ đề',
  NAME_MUST_BE_A_STRING: 'Tên chủ đề phải là một chuỗi ký tự',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Tên chủ đề phải có độ dài từ 1 đến 100 ký tự',
  INDEX_IS_REQUIRED: 'Không được bỏ trống độ ưu tiên của chủ đề',
  INDEX_MUST_BE_A_NUMBER: 'Độ ưu tiên của chủ đề phải là một chuỗi ký tự',
  TOPIC_ID_IS_REQUIRED: 'Không được bỏ trống ID chủ đề',
  TOPIC_ID_MUST_BE_A_STRING: 'ID chủ đề phải là một chuỗi ký tự',
  TOPIC_ID_IS_MUST_BE_A_ID: 'ID chủ đề không đúng định dạng',
  TOPIC_ID_DOES_NOT_EXIST: 'ID chủ đề không tồn tại'
}

export const BRAND_MESSAGE = {
  GET_BRAND_SUCCESS: 'Lấy thông tin thương hiệu thành công',
  GET_BRAND_FAILURE: 'Lấy thông tin thương hiệu thất bại',
  CREATE_BRAND_SUCCESS: 'Tạo thương hiệu thành công',
  CREATE_BRAND_FAILURE: 'Tạo thương hiệu thất bại',
  UPDATE_BRAND_SUCCESS: 'Cập nhật thương hiệu thành công',
  UPDATE_BRAND_FAILURE: 'Cập nhật thương hiệu thất bại',
  DELETE_BRAND_SUCCESS: 'Xóa thương hiệu thành công',
  DELETE_BRAND_FAILURE: 'Xóa thương hiệu thất bại',
  NAME_IS_REQUIRED: 'Không được bỏ trống tên thương hiệu',
  NAME_MUST_BE_A_STRING: 'Tên thương hiệu phải là một chuỗi ký tự',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Tên thương hiệu phải có độ dài từ 1 đến 100 ký tự',
  INDEX_IS_REQUIRED: 'Không được bỏ trống độ ưu tiên của thương hiệu',
  INDEX_MUST_BE_A_NUMBER: 'Độ ưu tiên của thương hiệu phải là một chuỗi ký tự',
  BRAND_ID_IS_REQUIRED: 'Không được bỏ trống ID thương hiệu',
  BRAND_ID_MUST_BE_A_STRING: 'ID thương hiệu phải là một chuỗi ký tự',
  BRAND_ID_IS_MUST_BE_A_ID: 'ID thương hiệu không đúng định dạng',
  BRAND_ID_DOES_NOT_EXIST: 'ID thương hiệu không tồn tại'
}
