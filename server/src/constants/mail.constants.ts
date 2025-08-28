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
  },
  ChangePassword(date: string, location: string, ip: string, browser: string, os: string) {
    return {
      title: `Cảnh báo bảo mật quan trọng`,
      html: `
        <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fffbeb; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
                    <div style="background-color: #ffffff; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <div style="width: 30px; height: 30px; background-color: #dc2626; border-radius: 50%; position: relative;">
                            <div style="position: absolute; top: 10px; left: 13px; width: 4px; height: 10px; background-color: #ffffff; border-radius: 2px;"></div>
                        </div>
                    </div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Cảnh Báo Bảo Mật</h1>
                    <p style="color: #fecaca; margin: 10px 0 0; font-size: 16px;">Mật khẩu đã được thay đổi</p>
                </div>

                <div style="padding: 40px 30px;">
                    <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                        <h2 style="color: #b91c1c; margin: 0 0 10px; font-size: 18px;">Xin chào!</h2>
                        <p style="color: #991b1b; margin: 0; font-size: 14px;">Chúng tôi xác nhận rằng mật khẩu tài khoản của bạn đã được thay đổi thành công. Vui lòng kiểm tra thông tin chi tiết bên dưới.</p>
                    </div>

                    <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                        <h3 style="color: #374151; margin: 0 0 20px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Thông Tin Thay Đổi</h3>
                        
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

                    <div style="background-color: #fef2f2; border: 1px solid #f87171; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <div style="display: flex; align-items: flex-start;">
                            <div style="background-color: #dc2626; width: 20px; height: 20px; border-radius: 50%; margin-right: 12px; margin-top: 2px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                <div style="color: #ffffff; font-size: 14px; font-weight: bold;">!</div>
                            </div>
                            <div>
                                <h4 style="color: #991b1b; margin: 0 0 8px; font-size: 14px; font-weight: bold;">Bạn có thực hiện thay đổi này?</h4>
                                <p style="color: #991b1b; margin: 0; font-size: 13px;">Nếu đây là bạn, bạn có thể bỏ qua email này. Nếu không phải, tài khoản của bạn có thể đã bị xâm phạm. Hãy liên hệ với chúng tôi ngay lập tức.</p>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${process.env.CLIENT_URL}" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3); transition: all 0.3s ease;">Kiểm Tra Tài Khoản</a>
                    </div>

                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <h4 style="color: #374151; margin: 0 0 15px; font-size: 14px; font-weight: bold;">Lời khuyên bảo mật:</h4>
                        <ul style="color: #6b7280; margin: 0; padding-left: 20px; font-size: 13px;">
                            <li style="margin-bottom: 8px;">Sử dụng mật khẩu mạnh và duy nhất cho mỗi tài khoản</li>
                            <li style="margin-bottom: 8px;">Kích hoạt xác thực hai yếu tố (2FA) nếu có thể</li>
                            <li style="margin-bottom: 0;">Không chia sẻ thông tin đăng nhập với bất kỳ ai</li>
                        </ul>
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
  },
  Enable2FA(date: string, location: string, ip: string, browser: string, os: string) {
    return {
      title: `Cảnh báo bảo mật quan trọng`,
      html: `
      <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0fdf4; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px; text-align: center;">
                  <div style="background-color: #ffffff; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 30px; height: 30px; background-color: #16a34a; border-radius: 50%; position: relative;">
                          <div style="position: absolute; top: 8px; left: 10px; width: 10px; height: 6px; border: 2px solid #ffffff; border-top: none; border-right: none; transform: rotate(-45deg);"></div>
                      </div>
                  </div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Bảo Mật Nâng Cao</h1>
                  <p style="color: #bbf7d0; margin: 10px 0 0; font-size: 16px;">2FA đã được kích hoạt</p>
              </div>

              <div style="padding: 40px 30px;">
                  <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                      <h2 style="color: #15803d; margin: 0 0 10px; font-size: 18px;">Xin chào!</h2>
                      <p style="color: #166534; margin: 0; font-size: 14px;">Chúc mừng! Xác thực hai yếu tố (2FA) đã được kích hoạt thành công cho tài khoản của bạn. Tài khoản của bạn hiện đã an toàn hơn.</p>
                  </div>

                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                      <h3 style="color: #374151; margin: 0 0 20px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Thông Tin Kích Hoạt</h3>
                      
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

                  <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                      <div style="display: flex; align-items: flex-start;">
                          <div style="background-color: #16a34a; width: 20px; height: 20px; border-radius: 50%; margin-right: 12px; margin-top: 2px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                              <div style="color: #ffffff; font-size: 10px; font-weight: bold;">✓</div>
                          </div>
                          <div>
                              <h4 style="color: #166534; margin: 0 0 8px; font-size: 14px; font-weight: bold;">Tài khoản được bảo vệ tốt hơn</h4>
                              <p style="color: #166534; margin: 0; font-size: 13px;">Với 2FA đã được bật, tài khoản của bạn sẽ yêu cầu mã xác thực bổ sung khi đăng nhập từ thiết bị mới.</p>
                          </div>
                      </div>
                  </div>

                  <div style="text-align: center; margin-bottom: 30px;">
                      <a href="${process.env.CLIENT_URL}" style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(22, 163, 74, 0.3); transition: all 0.3s ease;">Quản Lý Bảo Mật</a>
                  </div>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                      <h4 style="color: #374151; margin: 0 0 15px; font-size: 14px; font-weight: bold;">Lưu ý quan trọng:</h4>
                      <ul style="color: #6b7280; margin: 0; padding-left: 20px; font-size: 13px;">
                          <li style="margin-bottom: 8px;">Đảm bảo thiết bị xác thực luôn có sẵn</li>
                          <li style="margin-bottom: 0;">Không chia sẻ mã 2FA với bất kỳ ai</li>
                      </ul>
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
  },
  Disable2FA(date: string, location: string, ip: string, browser: string, os: string) {
    return {
      title: `Cảnh báo bảo mật quan trọng`,
      html: `
      <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fffbeb; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
                  <div style="background-color: #ffffff; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 30px; height: 30px; background-color: #dc2626; border-radius: 50%; position: relative;">
                          <div style="position: absolute; top: 10px; left: 13px; width: 4px; height: 10px; background-color: #ffffff; border-radius: 2px;"></div>
                          <div style="position: absolute; top: 19px; left: 13px; width: 4px; height: 4px; background-color: #ffffff; border-radius: 50%;"></div>
                      </div>
                  </div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Cảnh Báo Bảo Mật</h1>
                  <p style="color: #fecaca; margin: 10px 0 0; font-size: 16px;">2FA đã được tắt</p>
              </div>

              <div style="padding: 40px 30px;">
                  <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                      <h2 style="color: #b91c1c; margin: 0 0 10px; font-size: 18px;">Xin chào!</h2>
                      <p style="color: #991b1b; margin: 0; font-size: 14px;">Xác thực hai yếu tố (2FA) đã được tắt cho tài khoản của bạn. Tài khoản của bạn hiện ít an toàn hơn trước.</p>
                  </div>

                  <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                      <h3 style="color: #374151; margin: 0 0 20px; font-size: 16px; font-weight: bold; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Thông Tin Thay Đổi</h3>
                      
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

                  <div style="background-color: #fef2f2; border: 1px solid #f87171; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                      <div style="display: flex; align-items: flex-start;">
                          <div style="background-color: #dc2626; width: 20px; height: 20px; border-radius: 50%; margin-right: 12px; margin-top: 2px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                              <div style="color: #ffffff; font-size: 14px; font-weight: bold;">!</div>
                          </div>
                          <div>
                              <h4 style="color: #991b1b; margin: 0 0 8px; font-size: 14px; font-weight: bold;">Bạn có thực hiện thay đổi này?</h4>
                              <p style="color: #991b1b; margin: 0; font-size: 13px;">Nếu đây là bạn, chúng tôi khuyên bạn nên bật lại 2FA để bảo vệ tài khoản. Nếu không phải, tài khoản có thể đã bị xâm phạm.</p>
                          </div>
                      </div>
                  </div>

                  <div style="text-align: center; margin-bottom: 30px;">
                      <a href="${process.env.CLIENT_URL}" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3); transition: all 0.3s ease;">Kích Hoạt Lại 2FA</a>
                  </div>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                      <h4 style="color: #374151; margin: 0 0 15px; font-size: 14px; font-weight: bold;">Tại sao nên sử dụng 2FA:</h4>
                      <ul style="color: #6b7280; margin: 0; padding-left: 20px; font-size: 13px;">
                          <li style="margin-bottom: 8px;">Bảo vệ tài khoản ngay cả khi mật khẩu bị lộ</li>
                          <li style="margin-bottom: 8px;">Ngăn chặn truy cập trái phép hiệu quả</li>
                          <li style="margin-bottom: 0;">Tăng cường bảo mật tổng thể tài khoản</li>
                      </ul>
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
