import React, { ReactElement, useState, HTMLProps } from "react";
import cx from "classnames";
import { useCombobox } from "downshift";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/router";
import { useSearch } from "hooks/useSearch";

function linkToPackage(name: string) {
  return `/package/${name}`;
}

export const SearchBox = (
  inputProps: HTMLProps<HTMLInputElement>
): ReactElement => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const items = useSearch(debouncedSearch || "");
  const router = useRouter();
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    id: "package-search",
    onInputValueChange({ inputValue }) {
      setSearch(inputValue || "");
    },
    items,
    itemToString(item) {
      return item ? item.name : "";
    },
    onSelectedItemChange({ inputValue }) {
      if (!inputValue) {
        return;
      }
      router.push(linkToPackage(inputValue));
    },
  });

  return (
    <div className="relative inline">
      <input
        {...inputProps}
        {...getInputProps()}
        onSubmit={(value) => alert(value)}
        className="rounded-md px-2 py-1 text-2xl"
      />
      <ul
        className="absolute left-0 top-8 max-h-80 max-w-xs overflow-y-auto bg-white shadow-md"
        {...getMenuProps()}
      >
        {isOpen
          ? items.map((item, index) => (
              <li
                className={cx(
                  highlightedIndex === index && "bg-blue-300",
                  "flex flex-col py-2 px-3 shadow-sm"
                )}
                key={`${item.id}`}
                {...getItemProps({ item, index })}
              >
                <span className="w-full truncate text-left text-sm text-gray-700">
                  {item.name}
                </span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
