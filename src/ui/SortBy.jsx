import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleChange = (e) => {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  };
  return <Select options={options} type="white" onChange={handleChange} />;
};

export default SortBy;
