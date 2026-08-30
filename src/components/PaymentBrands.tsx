import Image from "next/image";

/*
 * 決済ブランドの受付表示。Square請求書から各カードでお支払いいただく。
 * 元画像の白背景は落としてあるので、紙地でもインク地でもそのまま置ける
 * (ただしSquareのワードマークが黒なので、暗い面には置かないこと)。
 */
export default function PaymentBrands({
  className = "",
  label = "ご利用いただけるお支払い方法",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={className}>
      <p className="font-en text-[0.7rem] tracking-[0.24em] text-ink-soft">PAYMENT</p>
      <Image
        src="/images/payment-brands.png"
        alt="Square / Visa / Mastercard / American Express / UnionPay"
        width={1400}
        height={137}
        sizes="(min-width: 768px) 420px, 80vw"
        className="mt-4 h-auto w-full max-w-[420px]"
      />
      <p className="mt-4 font-body text-xs leading-7 text-ink-soft">{label}</p>
    </div>
  );
}
