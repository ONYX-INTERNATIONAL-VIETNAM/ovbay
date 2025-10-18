"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { openChat } from "@/lib/chatBus";

type ButtonProps = React.ComponentProps<typeof Button>;

export default function ChatButton({
  to,
  prefill,
  children = "Nhắn tin",
  onClick,
  ...btnProps
}: {
  /** id/slug của seller cần mở */
  to: string;
  /** text gợi ý điền sẵn (tuỳ chọn) */
  prefill?: string;
  children?: React.ReactNode;
  /** bạn vẫn có thể truyền onClick riêng nếu cần */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<ButtonProps, "onClick">) {
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);                 // giữ hook người dùng nếu có
      if (e.defaultPrevented) return;
      openChat({ to, prefill });    // mở widget chat
    },
    [onClick, to, prefill],
  );

  return (
    <Button onClick={handleClick} {...btnProps}>
      {children}
    </Button>
  );
}
