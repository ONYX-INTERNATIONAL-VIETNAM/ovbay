// lib/validators/auth.ts
import { z } from "zod";

/* -------------------- LOGIN -------------------- */
export const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ / Invalid email" }),
  password: z.string().min(8, { message: "Tối thiểu 8 ký tự" }),
  remember: z.boolean().optional(),
});
export type LoginInput = z.infer<typeof loginSchema>;

/* -------------------- REGISTER -------------------- */
/**
 * Tương thích Zod cũ:
 * - Không truyền params cho z.enum
 * - acceptTos dùng boolean().refine thay vì literal(true, {...})
 * - Business fields luôn là string với default(""), validate bằng superRefine khi mode = "business"
 */
const PASSWORD_COMPLEXITY: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const CONTACT_EMAIL = z.string().email();

export const registerSchema = z
  .object({
    mode: z.enum(["personal", "business"]),

    firstName: z.string().min(1, { message: "Tên (First name) bắt buộc" }),
    lastName: z.string().min(1, { message: "Họ (Last name) bắt buộc" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(8, { message: "Mật khẩu tối thiểu 8 ký tự" })
      .regex(PASSWORD_COMPLEXITY, {
        message: "Cần có chữ hoa, chữ thường và số",
      }),

    acceptTos: z
      .boolean()
      .refine((v) => v === true, { message: "Bạn cần đồng ý điều khoản" }),

    // ---- Business fields (luôn là string) ----
    businessName: z.string().default(""),
    businessPhone: z.string().default(""),
    businessCountry: z.string().default(""),
    businessCity: z.string().default(""),
    businessState: z.string().default(""),
    businessZip: z.string().default(""),
    businessAddress: z.string().default(""),
    contactFirstName: z.string().default(""),
    contactLastName: z.string().default(""),
    contactEmail: z.string().default(""),
    contactPhone: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.mode !== "business") return;

    // Danh sách key bắt buộc ở chế độ business (typed, không any)
    const requiredBusinessKeys = [
      "businessName",
      "businessPhone",
      "businessCountry",
      "businessCity",
      "businessAddress",
      "contactFirstName",
      "contactLastName",
      "contactEmail",
      "contactPhone",
    ] as const;

    type RequiredBusinessKey = (typeof requiredBusinessKeys)[number];

    // Kiểm tra rỗng/space-only cho từng field
    for (const key of requiredBusinessKeys) {
      const val = data[key]; // val: string
      if (!val.trim()) {
        const messages: Record<RequiredBusinessKey, string> = {
          businessName: "Tên DN bắt buộc",
          businessPhone: "SĐT DN bắt buộc",
          businessCountry: "Quốc gia bắt buộc",
          businessCity: "Tỉnh/Thành bắt buộc",
          businessAddress: "Địa chỉ DN bắt buộc",
          contactFirstName: "Tên liên hệ bắt buộc",
          contactLastName: "Họ liên hệ bắt buộc",
          contactEmail: "Email liên hệ bắt buộc",
          contactPhone: "SĐT liên hệ bắt buộc",
        };
        ctx.addIssue({
          code: "custom",
          message: messages[key],
          path: [key], // path: (string | number)[]
        });
      }
    }

    // Email liên hệ hợp lệ
    if (data.contactEmail && !CONTACT_EMAIL.safeParse(data.contactEmail).success) {
      ctx.addIssue({
        code: "custom",
        message: "Email liên hệ không hợp lệ",
        path: ["contactEmail"],
      });
    }
  });

// Input type (đầu vào form)
export type RegisterInput = z.input<typeof registerSchema>;

// Bạn cũng có thể xuất thêm type đã parse nếu cần:
export type RegisterParsed = z.infer<typeof registerSchema>;
