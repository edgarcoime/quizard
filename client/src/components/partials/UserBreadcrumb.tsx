"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useScreenType } from "../hooks/useScreenType";

interface BreadcrumbLink {
  title: string;
  url: string;
}

const SETTINGS = {
  mobileMaxWidth: 45,
  desktopMaxWidth: 200,
};

export default function UserBreadcrumb() {
  const currentPath = usePathname();
  const { isSuperSmall } = useScreenType();

  const { mobileMaxWidth, desktopMaxWidth } = SETTINGS;

  console.log("isSuperSmall", isSuperSmall);

  function createBreadcrumbLinks(
    titleLinks: string[],
    links: string[],
  ): BreadcrumbLink[] {
    // calculate approx combined element length
    const combinedLength = titleLinks.reduce(
      (acc, curr) => acc + curr.length,
      0,
    );

    const maxWidth = isSuperSmall ? mobileMaxWidth : desktopMaxWidth;

    const titleLen = Math.floor(maxWidth / titleLinks.length);
    console.log("titleLen", titleLen);
    console.log("combinedLength", combinedLength);

    return combinedLength > maxWidth
      ? titleLinks.map((path, index) => ({
          title:
            path.length > titleLen ? path.slice(0, titleLen) + "..." : path,
          url: "/" + links.slice(0, index + 2).join("/"),
        }))
      : titleLinks.map((path, index) => ({
          title: path,
          url: "/" + links.slice(0, index + 2).join("/"),
        }));
  }

  const paths = currentPath.split("/").slice(1);
  // slice(2) to remove domain/id
  const breadcrumbPaths = currentPath.split("/").slice(2);
  const links: BreadcrumbLink[] = useMemo(
    () => createBreadcrumbLinks(breadcrumbPaths, paths),
    [paths, isSuperSmall],
  );

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {links.map(({ title, url }, index) => {
            const targetLength = links.length - 1;
            const lastItem = index >= targetLength;

            return lastItem ? (
              <>
                <BreadcrumbItem key={url}>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem key={url}>
                  <BreadcrumbLink href={url}>{title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
