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

interface BreadcrumbLink {
  title: string;
  url: string;
}

const SETTINGS = {
  maxWidthChar: 45,
};

export default function UserBreadcrumb() {
  const currentPath = usePathname();

  const { maxWidthChar } = SETTINGS;

  function createBreadcrumbLinks(
    titleLinks: string[],
    links: string[],
  ): BreadcrumbLink[] {
    // calculate approx combined element length
    const combinedLength = titleLinks.reduce(
      (acc, curr) => acc + curr.length,
      0,
    );

    const titleLen = Math.floor(maxWidthChar / titleLinks.length);
    console.log("titleLen", titleLen);
    console.log("combinedLength", combinedLength);

    return combinedLength > maxWidthChar
      ? titleLinks.map((path, index) => ({
          title:
            path.length > titleLen ? path.slice(0, titleLen) + "..." : path,
          url: "/" + paths.slice(0, index + 2).join("/"),
        }))
      : titleLinks.map((path, index) => ({
          title: path,
          url: "/" + paths.slice(0, index + 2).join("/"),
        }));
  }

  const paths = currentPath.split("/").slice(1);
  // slice(2) to remove domain/id
  const breadcrumbPaths = currentPath.split("/").slice(2);
  const links: BreadcrumbLink[] = useMemo(
    () => createBreadcrumbLinks(breadcrumbPaths, paths),
    [paths],
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
