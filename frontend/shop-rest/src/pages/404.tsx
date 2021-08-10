import Image from "next/image";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen grid place-items-center p-4 sm:p-8">
      <div className="text-center">
        <p className=" text-body-dark text-sm 2xl: uppercase tracking-widest mb-4 sm:mb-5">
          {t("404-heading")}
        </p>
        <h1 className="font-bold text-2xl leading-normal sm:text-3xl text-bolder mb-5">
          {t("404-sub-heading")}
        </h1>
        <div className="mb-11">
          <Image
            src="/no-result.svg"
            alt={t("404-heading")}
            width={600}
            height={453}
          />
        </div>
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center  sm:text-base text-bolder underline focus:outline-none hover:no-underline hover:text-body-dark"
        >
          {t("404-back-home")}
        </Link>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
