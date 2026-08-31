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
      <p className="eyebrow eyebrow-faint">Payment</p>
      <Image
        src="/images/payment-brands.png"
        alt="Square / Visa / Mastercard / American Express / UnionPay"
        width={1400}
        height={137}
        sizes="(min-width: 768px) 380px, 80vw"
        className="mt-5 h-auto w-full max-w-[380px]"
      />
      <p className="caption mt-4">{label}</p>
    </div>
  );
}
