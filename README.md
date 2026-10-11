# Website Bé Học Vui — miễn phí, giỏ hàng và đặt qua Zalo

Bộ mã nguồn website tĩnh dành cho học liệu trẻ em, giao diện pastel, hiển thị tốt trên điện thoại và máy tính. Có danh mục sản phẩm, chọn bản in/PDF, giỏ hàng, tăng giảm số lượng, tổng tiền và tạo nội dung đặt hàng gửi qua Zalo.

## 1. Những gì hoạt động trong bản miễn phí

- Trang chủ, giới thiệu, danh mục và thẻ sản phẩm.
- Mỗi sản phẩm có lựa chọn **bản in** hoặc **file PDF** với giá riêng.
- Lọc theo nhóm: tập đếm, tô màu, tập viết, tư duy.
- Giỏ hàng: thêm sản phẩm, đổi số lượng, xóa sản phẩm, tính tổng tiền sản phẩm.
- Form đặt hàng: họ tên, điện thoại, địa chỉ nhận bản in, ghi chú.
- Khi gửi đơn, website tạo sẵn nội dung đơn, thử sao chép vào clipboard và mở Zalo để khách dán tin nhắn gửi cho shop.
- Thiết kế responsive cho điện thoại.

## 2. Giới hạn cần biết

1. **Zalo không nhận đơn tự động từ website.** Khách vẫn cần gửi tin nhắn trong Zalo; shop phải đọc và xác nhận đơn.
2. Website tĩnh không có máy chủ, cơ sở dữ liệu hoặc trang quản trị. Đơn không tự lưu lại nếu khách đóng trang trước khi gửi Zalo.
3. Không có thanh toán trực tuyến, tự động kiểm tra chuyển khoản, quản lý tồn kho, mã giảm giá, tài khoản khách hàng hoặc thống kê doanh thu.
4. Đường dẫn Zalo phải được thay bằng link tài khoản shop của bạn. Việc mở link Zalo và khả năng tự sao chép có thể khác nhau giữa thiết bị/trình duyệt; website luôn hiển thị ô nội dung để khách tự sao chép.
5. Sản phẩm, giá và biểu tượng đang là dữ liệu minh họa. Không có ảnh sản phẩm thật kèm theo; bạn có thể thêm ảnh vào thư mục `images` và chỉnh `script.js`/`style.css`.
6. GitHub Pages miễn phí cho website tĩnh công khai. Địa chỉ mặc định dạng `https://TEN-TK.github.io/`; tên miền riêng thường mất phí. Không đưa thông tin nhạy cảm vào mã nguồn công khai.
7. Nếu bán file PDF, website hiện chỉ ghi nhận khách chọn PDF; shop phải gửi file thủ công qua Zalo sau khi xác nhận thanh toán. Không đặt file PDF trả phí trong thư mục công khai nếu bạn không muốn ai cũng có thể tải trực tiếp.

## 3. Cài đặt và đưa website lên GitHub Pages

### Bước 1 — Chuẩn bị tài khoản
1. Tạo/đăng nhập tài khoản tại https://github.com/
2. Chọn **New repository**.
3. Đặt tên repository chính xác theo mẫu `TEN-TK.github.io`, thay `TEN-TK` bằng tên tài khoản GitHub của bạn.
4. Chọn **Public**, sau đó tạo repository.

### Bước 2 — Tải mã nguồn lên
1. Giải nén file ZIP này trên máy tính.
2. Trong repository, chọn **Add file → Upload files**.
3. Tải lên `index.html`, `style.css`, `script.js`, `README.md` và thư mục `images` (nếu có).
4. Chọn **Commit changes**. Lưu ý `index.html` phải nằm ngay thư mục gốc của repository, không nằm trong một thư mục con.

### Bước 3 — Bật GitHub Pages
1. Vào **Settings → Pages** trong repository.
2. Tại phần **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn branch `main`, folder `/(root)`, rồi bấm **Save**.
4. Đợi vài phút, sau đó mở `https://TEN-TK.github.io/`. Nếu chưa thấy trang, tải lại sau ít phút và kiểm tra tên repository/branch/folder.

### Bước 4 — Cài link Zalo của shop (bắt buộc)
1. Mở `script.js` bằng Notepad hoặc trình soạn thảo mã.
2. Tìm dòng:
   `const ZALO_URL = "https://zalo.me/";`
3. Thay bằng link Zalo shop của bạn, ví dụ dạng `https://zalo.me/09xxxxxxxx` (dùng đúng link do Zalo cung cấp cho tài khoản của bạn).
4. Lưu file, tải lại `script.js` lên GitHub và chọn **Commit changes**.
5. Mở website, bấm **Mở Zalo** để thử link. Nếu link không đúng, sửa lại trước khi chia sẻ website.

### Bước 5 — Thay sản phẩm và giá
Mở `script.js`, tìm `const PRODUCTS = [...]`. Mỗi sản phẩm có:
- `id`: mã duy nhất, viết liền không dấu, không trùng.
- `name`: tên sản phẩm.
- `description`: mô tả ngắn.
- `category`: `dem`, `to-mau`, `tap-viet`, hoặc `tu-duy`.
- `icon` và `color`: hình biểu tượng và màu nền mẫu.
- `pages`, `age`: số trang và độ tuổi.
- `prices.print`: giá bản in (đồng).
- `prices.pdf`: giá file PDF (đồng).

Ví dụ: `prices:{print:25000,pdf:15000}` nghĩa là bản in 25.000₫ và PDF 15.000₫. Sửa giá trước khi công khai. Sau khi sửa, tải lại `script.js` lên GitHub và commit.

### Bước 6 — Kiểm thử trước khi quảng bá
- Thử trên điện thoại và máy tính.
- Thêm 2 sản phẩm vào giỏ, tăng/giảm số lượng, xóa sản phẩm và kiểm tra tổng tiền.
- Thử đặt bản in (phải nhập địa chỉ) và PDF (không cần địa chỉ).
- Kiểm tra nội dung đơn được tạo đúng, link Zalo đúng và thao tác sao chép/dán hoạt động.
- Dùng giá thử hoặc ghi rõ giá mẫu cho tới khi bạn thay dữ liệu thật.

## 4. Nếu muốn có ảnh bìa/sản phẩm riêng

Đưa ảnh tối ưu dung lượng vào `images/`. Bản mẫu hiện dùng biểu tượng và minh họa CSS nên không bắt buộc có ảnh. Nếu muốn dùng ảnh thật cho từng sản phẩm, có thể nâng cấp `script.js` để mỗi sản phẩm có trường `image` và hiển thị ảnh tương ứng.

## 5. Cách vận hành đơn hàng thủ công

1. Khách chọn sản phẩm và định dạng, sau đó gửi tin nhắn đã soạn sẵn qua Zalo.
2. Shop xác nhận số lượng, phí giao bản in (nếu có), cách thanh toán và thời gian giao file/bản giấy.
3. Shop tự ghi đơn vào sổ hoặc bảng tính, rồi đánh dấu trạng thái đã thanh toán/đã giao.
4. Với PDF, chỉ gửi file sau khi xác nhận thanh toán; không lưu file trả phí trong thư mục website công khai.

## 6. Nâng cấp sau này (không bắt buộc)

- Dùng Google Forms/Sheets để lưu đơn tự động (cần cấu hình biểu mẫu và quy trình phù hợp).
- Tích hợp cổng thanh toán/đơn hàng qua nền tảng thương mại điện tử (có thể phát sinh phí).
- Dùng tên miền riêng.
- Thêm ảnh sản phẩm, đánh giá khách hàng, chính sách đổi trả, giao hàng và bảo mật thông tin.

**Lưu ý:** Đây là mã nguồn mẫu để bạn tự triển khai. Hãy kiểm tra giá, thông tin liên hệ, chính sách bán hàng và quy định áp dụng trước khi nhận đơn thật.
