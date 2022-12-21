import React, { FC, useEffect, useState, useCallback } from "react";
import { Select } from "antd";
import { IFormComponent } from "@/common/interface";

// 下拉搜索
const width100 = { width: "100%" };
const FormSelectSearch: FC<IProps & IFormComponent> = ({ data, onChange }) => {
  const [dropdown, setDropdown] = useState<any[]>([]);
  useEffect(() => {
    if (Array.isArray(data)) setDropdown(data);
  }, [data]);

  const handleSearch = useCallback(
    (value) => {
      const ids = value.map((t: string) => parseInt(t.split("?")[1]));
      onChange && onChange(ids);
    },
    [onChange]
  );

  return (
    <Select
      style={width100}
      mode="multiple"
      tokenSeparators={[","]}
      onChange={(e) => handleSearch(e)}
    >
      {Array.isArray(dropdown) &&
        dropdown.map((item: any) => (
          <Select.Option key={item.id} value={`${item.name}?${item.id}`}>
            {item.name}
          </Select.Option>
        ))}
    </Select>
  );
};
export default FormSelectSearch;

interface IProps {
  data: any[];
}
