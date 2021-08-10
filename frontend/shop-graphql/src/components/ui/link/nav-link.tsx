import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type NavLinkProps = {
  children: React.ReactNode;
  activeClassName: string;
  href: string;
};

const NavLink = ({
  children,
  activeClassName,
  href,
  ...props
}: NavLinkProps) => {
  const { pathname } = useRouter();
  const child: any = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    pathname === href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default NavLink;
