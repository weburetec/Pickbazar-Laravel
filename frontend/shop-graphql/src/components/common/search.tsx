import SearchBox from "@components/ui/search-box";
import { useSearch } from "@contexts/search.context";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
interface Props {
  label: string;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ label, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { searchTerm, updateSearchTerm } = useSearch();
  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;
    const { pathname, query } = router;
    const { type, ...rest } = query;
    router.push(
      {
        pathname,
        query: { ...rest, text: searchTerm },
      },
      {
        pathname: type ? `/${type}` : pathname,
        query: { ...rest, text: searchTerm },
      },
      {
        scroll: false,
      }
    );
  };

  function clearSearch() {
    updateSearchTerm("");
    const { pathname, query } = router;
    const { type, text, ...rest } = query;
    if (text) {
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        {
          pathname: type ? `/${type}` : pathname,
          query: { ...rest },
        },
        {
          scroll: false,
        }
      );
    }
  }

  return (
    <SearchBox
      label={label}
      onSubmit={onSearch}
      onClearSearch={clearSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={t("common:text-search-placeholder")}
      {...props}
    />
  );
};

export default Search;
