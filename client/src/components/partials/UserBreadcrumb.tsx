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

const SETTINGS = {
  titleLen: 15,
};

export default function UserBreadcrumb() {
  const currentPath = usePathname();

  const { titleLen } = SETTINGS;

  const paths = currentPath.split("/").slice(1);
  // slice(2) to remove domain/id
  const breadcrumbPaths = currentPath.split("/").slice(2);
  const links: { title: string; url: string }[] = useMemo(
    () =>
      breadcrumbPaths.map((path, index) => ({
        title: path.length > titleLen ? path.slice(0, titleLen) + "..." : path,
        url: "/" + paths.slice(0, index + 1).join("/"),
      })),
    [paths],
  );

  console.log(links);

  return (
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
  );
}
