"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchParamsWrapper({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <InnerSearchParams>{children}</InnerSearchParams>
    </Suspense>
  );
}

function InnerSearchParams({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}
