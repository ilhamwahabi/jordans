import { useState } from "react";
import { createContainer } from "unstated-next";

export const defaultFilter = {
  description: "",
  location: "",
  full_time: false,
};

function useFilter() {
  let [filter, setFilter] = useState(defaultFilter);

  const updateFilter = (key: string, value: string | boolean) => {
    setFilter({ ...filter, [key]: value });
  };

  return { filter, updateFilter };
}

export const Filter = createContainer(useFilter);
