export const MAIL = {
  Security(date: string, location: string, ip: string, browser: string, os: string) {
    return {
      title: `Cảnh báo bảo mật`,
      html: `
        <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fffbeb; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
                    <div style="background-color: #ffffff; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 30px; height: 30px; background-color: #f59e0b; border-radius: 50%; position: relative;">
                            <div style="position: absolute; top: 8px; left: 8px; width: 14px; height: 14px; background-color: #ffffff; border-radius: 50%;"></div>
                        </div>
                    </div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Cảnh Báo Bảo Mật</h1>
                    <p style="color: #fffbeb; margin: 10px 0 0; font-size: 16px;">Phát hiện lượt đăng nhập mới</p>
                </div>

                <div style="padding: 40px 30px;">
                    <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                        <h2 style="color: #d97706; margin: 0 0 10px; font-size: 18px;">Xin chào!</h2>
                        <p style="color: #92400e; margin: 0; font-size: 14px;">Chúng tôi phát hiện có lượt đăng nhập mới vào tài khoản của bạn. Vui lòng kiểm tra thông tin chi tiết bên dưới.</p>
                    </div>

                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                        <h3 style="color: #374151; margin: 0 0 20px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Thông Tin Chi Tiết</h3>
                        
                        <div style="display: flex; margin-bottom: 15px;">
                            <div style="min-width: 120px; color: #6b7280; font-weight: bold; font-size: 14px;">Thời gian:</div>
                            <div style="color: #374151; font-size: 14px;">${date}</div>
                        </div>
                        
                        <div style="display: flex; margin-bottom: 15px;">
                            <div style="min-width: 120px; color: #6b7280; font-weight: bold; font-size: 14px;">Địa chỉ IP:</div>
                            <div style="color: #374151; font-size: 14px;">${ip}</div>
                        </div>
                        
                        <div style="display: flex; margin-bottom: 15px;">
                            <div style="min-width: 120px; color: #6b7280; font-weight: bold; font-size: 14px;">Vị trí:</div>
                            <div style="color: #374151; font-size: 14px;">${location}</div>
                        </div>
                        
                        <div style="display: flex; margin-bottom: 15px;">
                            <div style="min-width: 120px; color: #6b7280; font-weight: bold; font-size: 14px;">Thiết bị:</div>
                            <div style="color: #374151; font-size: 14px;">${os} - ${browser}</div>
                        </div>
                    </div>

                    <div style="background-color: #fef3c7; border: 1px solid #facc15; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <div style="display: flex; align-items: flex-start;">
                            <div style="background-color: #eab308; width: 20px; height: 20px; border-radius: 50%; margin-right: 12px; margin-top: 2px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                <div style="color: #ffffff; font-size: 14px; font-weight: bold;">!</div>
                            </div>
                            <div>
                                <h4 style="color: #92400e; margin: 0 0 8px; font-size: 14px; font-weight: bold;">Bạn có phải là người thực hiện đăng nhập này?</h4>
                                <p style="color: #92400e; margin: 0; font-size: 13px;">Nếu đây là bạn, bạn có thể bỏ qua email này. Nếu không phải, hãy thay đổi mật khẩu ngay lập tức và liên hệ với chúng tôi.</p>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${process.env.CLIENT_URL}" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3); transition: all 0.3s ease;">Kiểm Tra Tài Khoản</a>
                    </div>
                </div>

                <div style="background-color: #f3f4f6; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; margin: 0 0 10px; font-size: 12px;">Email này được gửi tự động từ hệ thống bảo mật của chúng tôi.</p>
                    <p style="color: #9ca3af; margin: 0; font-size: 11px;">© ${new Date().getFullYear()} ${process.env.TRADEMARK_NAME}. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </div>
      `
    }
  }
}
