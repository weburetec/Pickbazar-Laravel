import { useState } from "react";
import { useLayer } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "@components/common/avatar";
import Link from "next/link";
import { siteSettings } from "@settings/site.settings";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useMeQuery } from "@data/user/use-me.query";

export default function AuthorizedMenu() {
  const [isOpen, setOpen] = useState(false);
  const { data } = useMeQuery();
  const router = useRouter();
  const { t } = useTranslation("common");

  // helper function to close the menu
  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    // auto: true, // automatically find the best placement
    placement:
      router.locale === "ar" || router.locale === "he"
        ? "bottom-start"
        : "bottom-end", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 16, // let the arrow have some room to breath also
  });

  // Again, we're using framer-motion for the transition effect
  return (
    <>
      <button
        type="button"
        className="flex items-center focus:outline-none"
        aria-label="toggle profile dropdown"
        onClick={() => setOpen(!isOpen)}
        {...triggerProps}
      >
        <Avatar
          src={
            data?.profile?.avatar?.thumbnail ??
            siteSettings?.avatar?.placeholder
          }
          alt="avatar"
        />
      </button>
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              {...layerProps}
              initial={{ opacity: 0, scale: 0.85 }} // animate from
              animate={{ opacity: 1, scale: 1 }} // animate to
              exit={{ opacity: 0, scale: 0.85 }} // animate exit
              transition={{
                type: "spring",
                stiffness: 800,
                damping: 35,
              }}
              className="py-2 w-48 bg-white rounded shadow-base z-50"
            >
              {siteSettings.authorizedLinks.map(({ href, labelTransKey }) => (
                <li
                  key={`${href}${labelTransKey}`}
                  className="border-b border-gray-100 cursor-pointer last:border-0"
                >
                  <Link href={href}>
                    <a className="block px-4 py-3 text-sm capitalize text-heading font-semibold transition duration-200 hover:text-primary  ">
                      {t(labelTransKey)}
                    </a>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
