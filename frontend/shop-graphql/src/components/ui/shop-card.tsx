import Image from "next/image";
import { MapPin } from "@components/icons/map-pin";
import { useTranslation } from "next-i18next";
import { formatAddress } from "@utils/format-address";
import { ROUTES } from "@utils/routes";
import Link from "./link";
import isEmpty from "lodash/isEmpty";

type ShopCardProps = {
  shop: any;
};

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const { t } = useTranslation();

  const isNew = false;

  return (
    <Link href={`${ROUTES.SHOPS}/${shop.slug}`}>
      <div className="flex items-center p-5 border border-gray-200 rounded cursor-pointer relative">
        {isNew && (
          <span className="text-xs text-light px-2 py-1 rounded bg-blue-500 absolute top-2 end-2">
            {t("common:text-new")}
          </span>
        )}
        <div className="w-16 h-16 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
          <Image
            alt={t("common:text-logo")}
            src={shop?.logo?.thumbnail ?? "/product-placeholder.svg"}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col ms-4">
          <span className="text-lg font-semibold text-heading mb-2">
            {shop?.name}
          </span>
          <span className="text-xs text-body flex">
            <MapPin className="w-3.5 h-3.5 me-1 text-muted flex-shrink-0" />
            {!isEmpty(formatAddress(shop?.address))
              ? formatAddress(shop?.address)
              : t("common:text-no-address")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
