import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@utils/use-click-outside";
import { zoomInOut } from "@utils/motion/zoom-in-out";
import { useTranslation } from "next-i18next";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const CartVoucher = () => {
  const { t } = useTranslation("common");
  const voucherRef = useRef() as DivElementRef;
  const [toggleVoucher, setToggleVoucher] = useState<boolean>(false);
  useOnClickOutside(voucherRef, () => setToggleVoucher(false));
  function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }
  return (
    <div ref={voucherRef} className="text-center mt-2 mb-5">
      <AnimatePresence initial={false}>
        {toggleVoucher ? (
          <motion.form
            initial="from"
            animate="to"
            exit="from"
            variants={zoomInOut()}
            onSubmit={(e) => handleOnSubmit(e)}
            className="flex justify-between w-full h-13 p-1 rounded text-sm border border-solid border-border-200 border-opacity-75 shadow-sm transition-colors duration-200 hover:border-accent"
          >
            <input
              type="text"
              placeholder={t("text-enter-coupon")}
              className="focus:outline-none px-4 flex-1"
            />
            <button
              type="submit"
              className="py-2 px-5 font-semibold flex-shrink-0 text-light bg-accent rounded shadow-400 transition-colors focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
            >
              {t("text-apply")}
            </button>
          </motion.form>
        ) : (
          <motion.button
            initial="from"
            animate="to"
            exit="from"
            variants={zoomInOut()}
            onClick={() => setToggleVoucher(!toggleVoucher)}
            className="text-sm font-semibold text-accent transition-colors focus:outline-none hover:text-accent-hover focus:text-accent-hover"
          >
            {t("text-have-coupon")}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartVoucher;
