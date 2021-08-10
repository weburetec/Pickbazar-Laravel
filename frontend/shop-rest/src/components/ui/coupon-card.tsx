import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import cn from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "next-i18next";

type CouponCardProps = {
  coupon?: any;
  className?: string;
};
type InputElementRef = React.MutableRefObject<HTMLInputElement>;

const CouponCard: React.FC<CouponCardProps> = ({ coupon, className }) => {
  const { t } = useTranslation("common");
  const { code, image, is_valid } = coupon;
  const [copyText, setCopyText] = useState({
    value: code,
    copied: false,
  });
  const codeRef = useRef() as InputElementRef;

  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 3500);
    }
  }, [copyText.copied]);

  return (
    <div className={cn("coupon-card", className)}>
      <div className="flex rounded overflow-hidden bg-gray-200">
        <Image
          src={image?.thumbnail ?? "/coupon-placeholder.svg"}
          alt={code}
          width={572}
          height={429}
        />
      </div>
      <div className="w-11/12 grid grid-flow-col auto-cols-fr items-center py-4 px-5 mx-auto rounded-bl rounded-be shadow-sm bg-light">
        {is_valid ? (
          <>
            <input
              readOnly
              ref={codeRef}
              value={copyText.value}
              className="text-heading font-semibold uppercase focus:outline-none"
            />

            {!copyText.copied ? (
              <CopyToClipboard
                text={copyText.value}
                onCopy={() =>
                  setCopyText({
                    ...copyText,
                    copied: true,
                  })
                }
              >
                <button className="text-end text-accent text-sm font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover">
                  <span>{t("text-copy")}</span>
                </button>
              </CopyToClipboard>
            ) : (
              <div className="text-end text-accent text-sm font-semibold">
                {t("text-copied")}
              </div>
            )}
          </>
        ) : (
          <span className="text-sm text-center block text-red-500">
            {t("text-expired")}
          </span>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
