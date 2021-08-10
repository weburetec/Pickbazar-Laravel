import { BannerType } from "@settings/site-pages.settings";
import { ArrowNext, ArrowPrev } from "@components/icons";
import { useUI } from "@contexts/ui.context";
import { Waypoint } from "react-waypoint";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import cn from "classnames";
import { useTranslation } from "next-i18next";

type BannerProps = {
  banner: BannerType;
  className?: string;
};

SwiperCore.use([Navigation]);

const BannerShort: React.FC<BannerProps> = ({ banner, className }) => {
  const { t } = useTranslation("common");
  const { stickMobileFilter, unstickMobileFilter } = useUI();
  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      stickMobileFilter();
    }
  };
  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden -z-1">
        <div className="relative">
          <Swiper
            id="banner"
            loop={true}
            resizeObserver={true}
            slidesPerView={1}
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
          >
            {banner?.gallery?.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  className="w-full h-auto"
                  src={item.image ?? "/banner/grocery.png"}
                  alt={item.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="prev cursor-pointer absolute top-2/4 start-4 md:start-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
            role="button"
          >
            <span className="sr-only">{t("text-previous")}</span>
            <ArrowPrev width={18} height={18} />
          </div>
          <div
            className="next cursor-pointer absolute top-2/4 end-4 md:end-5 z-10 -mt-4 md:-mt-5 w-8 h-8 rounded-full bg-light shadow-200 border border-border-200 border-opacity-70 flex items-center justify-center text-heading transition-all duration-200"
            role="button"
          >
            <span className="sr-only">{t("text-next")}</span>
            <ArrowNext width={18} height={18} />
          </div>
        </div>
      </div>

      <Waypoint
        onLeave={stickMobileFilter}
        onEnter={unstickMobileFilter}
        onPositionChange={onWaypointPositionChange}
        topOffset={66}
      />
    </div>
  );
};

export default BannerShort;
