import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchResponseSchema } from "@/app/utils/discogs.schemas";

export default function SearchResult({ search }: { search: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const params = new URLSearchParams({ search: "the strokes" });
      const result = await fetch("/api/search?" + params).then((res) =>
        res.json()
      );
      const parsedResult = SearchResponseSchema.parse(result);
      return parsedResult;
    },
  });

  console.log("data: ", data);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error</h3>;
  }

  return (
    <div>
      <h1>{data.results[0].year}</h1>
    </div>
  );
}