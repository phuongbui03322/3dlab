import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export async function POST(req: Request) {
  try {
    // Kiểm tra API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          message:
            "Thiếu RESEND_API_KEY trong .env.local",
        },
        { status: 500 }
      );
    }

    // Kiểm tra email nhận đơn
    if (!process.env.ORDER_RECEIVER) {
      return NextResponse.json(
        {
          message:
            "Thiếu ORDER_RECEIVER trong .env.local",
        },
        { status: 500 }
      );
    }

    const {
      name,
      phone,
      address,
      note,
      items,
    } = await req.json();

    // Kiểm tra dữ liệu
    if (
      !name ||
      !phone ||
      !address ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "Vui lòng nhập đầy đủ họ tên, số điện thoại, địa chỉ và sản phẩm.",
        },
        { status: 400 }
      );
    }

    // Chuẩn hóa sản phẩm
    const orderItems: OrderItem[] = items.map(
      (item: OrderItem) => ({
        name: item.name,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      })
    );

    // Tính tổng tiền
    const totalPrice = orderItems.reduce(
      (total, item) => {
        if (item.price > 0) {
          return (
            total +
            item.price * item.quantity
          );
        }

        return total;
      },
      0
    );

    // Có sản phẩm cần báo giá hay không
    const hasContactPrice = orderItems.some(
      (item) => item.price <= 0
    );

    // =========================
    // Danh sách sản phẩm
    // =========================
    const productRows = orderItems
      .map(
        (item, index) => {
          const lineTotal =
            item.price * item.quantity;

          const priceText =
            item.price > 0
              ? `${item.price.toLocaleString(
                  "vi-VN"
                )}đ`
              : "Liên hệ báo giá";

          const totalText =
            item.price > 0
              ? `${lineTotal.toLocaleString(
                  "vi-VN"
                )}đ`
              : "—";

          return `
            <tr>
              <td style="
                padding:10px;
                border:1px solid #ddd;
                text-align:center;
              ">
                ${index + 1}
              </td>

              <td style="
                padding:10px;
                border:1px solid #ddd;
              ">
                ${item.name}
              </td>

              <td style="
                padding:10px;
                border:1px solid #ddd;
                text-align:center;
              ">
                ${item.quantity}
              </td>

              <td style="
                padding:10px;
                border:1px solid #ddd;
                text-align:right;
              ">
                ${priceText}
              </td>

              <td style="
                padding:10px;
                border:1px solid #ddd;
                text-align:right;
                font-weight:bold;
              ">
                ${totalText}
              </td>
            </tr>
          `;
        }
      )
      .join("");

    // =========================
    // Tổng tiền
    // =========================
    const totalPriceText = hasContactPrice
      ? "Liên hệ báo giá"
      : `${totalPrice.toLocaleString(
          "vi-VN"
        )}đ`;

    // =========================
    // Gửi email
    // =========================
    const { error } =
      await resend.emails.send({
        from: "3D LAB <no-reply@3dlab.com.vn>",
        to: process.env.ORDER_RECEIVER,
        subject:
          "📩 Đơn yêu cầu báo giá mới",

        html: `
          <div style="
            font-family:Arial,Helvetica,sans-serif;
            max-width:800px;
            margin:0 auto;
            color:#222;
          ">

            <h2 style="
              color:#2563eb;
              margin-bottom:20px;
            ">
              📩 Có yêu cầu báo giá mới
            </h2>

            <!-- Thông tin khách hàng -->
            <div style="
              background:#f8fafc;
              padding:16px;
              border-radius:10px;
              margin-bottom:20px;
            ">

              <p style="margin:8px 0;">
                <strong>👤 Họ tên:</strong>
                ${name}
              </p>

              <p style="margin:8px 0;">
                <strong>📱 Số điện thoại:</strong>
                ${phone}
              </p>

              <p style="margin:8px 0;">
                <strong>📍 Địa chỉ nhận hàng:</strong>
                ${address}
              </p>

              ${
                note
                  ? `
                    <p style="margin:8px 0;">
                      <strong>📝 Ghi chú:</strong>
                      ${note}
                    </p>
                  `
                  : ""
              }

            </div>

            <!-- Sản phẩm -->
            <h3 style="
              margin-bottom:10px;
            ">
              🛒 Sản phẩm đã chọn
            </h3>

            <table style="
              width:100%;
              border-collapse:collapse;
              margin-bottom:20px;
            ">

              <thead>
                <tr style="
                  background:#f1f5f9;
                ">
                  <th style="
                    padding:10px;
                    border:1px solid #ddd;
                  ">
                    #
                  </th>

                  <th style="
                    padding:10px;
                    border:1px solid #ddd;
                    text-align:left;
                  ">
                    Sản phẩm
                  </th>

                  <th style="
                    padding:10px;
                    border:1px solid #ddd;
                  ">
                    SL
                  </th>

                  <th style="
                    padding:10px;
                    border:1px solid #ddd;
                    text-align:right;
                  ">
                    Đơn giá
                  </th>

                  <th style="
                    padding:10px;
                    border:1px solid #ddd;
                    text-align:right;
                  ">
                    Thành tiền
                  </th>
                </tr>
              </thead>

              <tbody>
                ${productRows}
              </tbody>

            </table>

            <!-- Tổng tiền -->
            <div style="
              background:#fff7ed;
              border:1px solid #fed7aa;
              border-radius:10px;
              padding:16px;
              text-align:right;
            ">

              <span style="
                font-size:16px;
                font-weight:bold;
              ">
                Tổng tiền:
              </span>

              <span style="
                font-size:22px;
                font-weight:bold;
                color:#ea580c;
                margin-left:10px;
              ">
                ${totalPriceText}
              </span>

            </div>

            <!-- Thời gian -->
            <p style="
              margin-top:20px;
              color:#64748b;
              font-size:13px;
            ">
              Thời gian:
              ${new Date().toLocaleString(
                "vi-VN"
              )}
            </p>

          </div>
        `,
      });

    // Kiểm tra lỗi Resend
    if (error) {
      console.error(
        "Resend error:",
        error
      );

      return NextResponse.json(
        {
          message:
            "Không thể gửi email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Gửi yêu cầu thành công.",
    });

  } catch (error) {
    console.error(
      "Order API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Có lỗi xảy ra khi gửi yêu cầu.",
      },
      { status: 500 }
    );
  }
}