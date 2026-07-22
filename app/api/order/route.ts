import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { message: "Thiếu RESEND_API_KEY trong .env.local" },
        { status: 500 }
      );
    }

    if (!process.env.ORDER_RECEIVER) {
      return NextResponse.json(
        { message: "Thiếu ORDER_RECEIVER trong .env.local" },
        { status: 500 }
      );
    }

    const { name, phone, note, items } = await req.json();

    if (!name || !phone || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Thiếu dữ liệu." },
        { status: 400 }
      );
    }

    const productRows = items
      .map(
        (item: OrderItem, index: number) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;text-align:center;">
              ${index + 1}
            </td>

            <td style="padding:8px;border:1px solid #ddd;">
              ${item.name}
            </td>

            <td style="padding:8px;border:1px solid #ddd;text-align:center;">
              ${item.quantity}
            </td>
          </tr>
        `
      )
      .join("");

    const { error } = await resend.emails.send({
      from: "3D LAB <no-reply@3dlab.com.vn>",

      to: process.env.ORDER_RECEIVER,

      subject: "📩 Đơn yêu cầu báo giá mới",

      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#333">

          <h2 style="margin-bottom:20px;">
            📩 Đơn yêu cầu báo giá mới
          </h2>

          <p>
            <strong>Họ tên:</strong>
            ${name}
          </p>

          <p>
            <strong>Số điện thoại:</strong>
            ${phone}
          </p>

          <hr style="margin:20px 0">

          <h3>Danh sách sản phẩm</h3>

          <table
            style="
              width:100%;
              border-collapse:collapse;
              margin-top:10px;
            "
          >
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px;border:1px solid #ddd;">
                  STT
                </th>

                <th style="padding:8px;border:1px solid #ddd;">
                  Sản phẩm
                </th>

                <th style="padding:8px;border:1px solid #ddd;">
                  SL
                </th>
              </tr>
            </thead>

            <tbody>
              ${productRows}
            </tbody>
          </table>

          <hr style="margin:20px 0">

          <p>
            <strong>Ghi chú:</strong>
          </p>

          <p>
            ${note?.trim() || "Không có"}
          </p>

          <hr style="margin:20px 0">

          <p>
            <strong>Thời gian:</strong>
            ${new Date().toLocaleString("vi-VN")}
          </p>

        </div>
      `,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Lỗi máy chủ.",
      },
      {
        status: 500,
      }
    );
  }
}