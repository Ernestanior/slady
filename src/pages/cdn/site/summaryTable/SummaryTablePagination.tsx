import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import "./summaryTable.less";
import { Divider, Space, Tooltip } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import useJoiner from "@/hooks/useJoiner";
import {transformBindWidth} from "@/common/utils";

const direction = "left";
/**
 * 基于SummaryTable，增加了分页功能
 * @param param0
 * @returns
 */
const SummaryTablePagination: FC<IProps> = ({
  columns,
  data,
  count = 10,
  align = "center",
  isCountry = false,
  needOpt = "normal",
}) => {
  const joiner = useJoiner();
  const [newColumns, setNewColumns] = useState<string[]>([]);
  const [countPage, setCountPage] = useState<number>(1); //第几页
  const [startNum, setStartNum] = useState<number>(1); //开始
  const [endNum, setEndNum] = useState<number>(count); //结束
  //当前的页码数
  const PageNum = useMemo(() => {
    if (!data || !data.length) {
      return 0;
    }
    if (data.length <= count) {
      return 1;
    }
    const _page = data.length / count;
    const maxPage = Math.ceil(_page);
    if (countPage > maxPage) {
      return maxPage;
    }
    if (countPage <= 1) {
      return 1;
    }
    return countPage;
  }, [countPage, count, data]);
  // 裁剪后的数据，依据裁剪做分页
  const _data = useMemo(() => {
    if (!data || !data.length) {
      return [];
    }
    if (data.length <= count || data.length < count) {
      return data;
    }
    if (data.length > count) {
      const _start = PageNum === 1 ? 0 : (PageNum - 1) * count;
      const _end = PageNum === 1 ? count : PageNum * count;
      setStartNum(_start);
      setEndNum(_end);
      return data.slice(_start, _end);
    }
  }, [data, count, PageNum]);

  const alterCOL = useCallback(
    (columns: string[] | undefined) => {
      if (!Array.isArray(columns)) {
        return;
      }
      // 确保有数据
      if (_data && _data[0] && _data[0].length >= 1) {
        const newCOL: string[] = [...columns];
        if (_data[0].length > columns.length) {
          // 计算需要增加的col
          const colsToAdd: number = _data[0].length - columns.length;
          for (let i = 0; i < colsToAdd; i++) {
            // 在columns[0] 开示添加
            // console.log(newCOL);
            newCOL.splice(0, 0, "");
          }
          setNewColumns(newCOL);
        } else {
          setNewColumns(columns);
        }
      } else {
        setNewColumns(columns);
      }
    },
    [_data]
  );

  const operationFmt = useCallback(
    (text: number | string) => {
      if (typeof text !== "number") {
        return text;
      }
      if (needOpt === "normal") {
        return text;
      }
      if (needOpt === "fixed2") {
        return text.toFixed(2);
      }
      if (needOpt === "flow") {
        return shiftChange(text);
      }
      if (needOpt === "bandwidth") {
        return transformBindWidth(text);
      }
    },
    [needOpt]
  );

  const charIntl = useCallback(
    (t) => {
      try {
        return t;
      } catch {
        return t;
      }
    },
    []
  );

  useEffect(() => {
    alterCOL(columns);
  }, [alterCOL, columns]);
  return (
    <section
      className="summary_table" /*style={{ width: widthAuto ? '100%' : 271 }}*/
    >
      <table>
        <thead>
          {newColumns && (
            <tr>
              {newColumns.length >= 1 &&
                newColumns.map((t: string, idx: number) => {
                  return (
                    <th style={fi} key={idx}>
                      <Tooltip title={charIntl(t)} placement={direction}>
                        <p style={de}>{t}</p>
                      </Tooltip>
                    </th>
                  );
                })}
            </tr>
          )}
        </thead>
        <tbody>
          {_data &&
            _data.length >= 1 &&
            _data.map((t, idx: number) => {
              return (
                <tr key={idx}>
                  {t.map((t: string, idx: number) => {
                    return (
                      <td key={idx}>
                        {typeof t === "string" ? (
                          isCountry ? (
                            t
                          ) : (
                            <Tooltip
                              placement={direction}
                              title={t}
                            >
                              <div style={{ textAlign: align, ...de }}>
                                {t !== "NaN" && t}
                              </div>
                            </Tooltip>
                          )
                        ) : (
                          <Tooltip placement={direction} title={t}>
                            <div style={{ textAlign: align, ...de }}>
                              {operationFmt(t)}
                            </div>
                          </Tooltip>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {data && data.length > count && (
        <>
          <Divider />
          <Space align="start">
            <span style={{ fontSize: 12, color: "#999" }}>
              {joiner([
                { intl: true, id: "OF_TEXT" },
                { intl: false, id: `${startNum + 1}` },
                { intl: true, id: "TILL_NO" },
                {
                  intl: false,
                  id: `${endNum < data.length ? endNum : data.length}`,
                },
                { intl: true, id: "OF_RECORD" },
                { intl: true, id: "OF_TOTAL" },
                { intl: false, id: `${data.length}` },
                { intl: true, id: "OF_ROW" },
              ])}
            </span>
            <Space>
              <span
                onClick={() => setCountPage(countPage - 1)}
                style={{ cursor: "pointer" }}
              >
                <Tooltip
                  placement={"top"}
                  title={"上一页"}
                >
                  <CaretUpOutlined style={{ fontSize: 20 }} />
                </Tooltip>
              </span>
              <span
                onClick={() => setCountPage(countPage + 1)}
                style={{ cursor: "pointer" }}
              >
                <Tooltip placement={"top"} title={"下一页"}>
                  <CaretDownOutlined style={{ fontSize: 20 }} />
                </Tooltip>
              </span>
            </Space>
          </Space>
        </>
      )}

      {_data && _data.length <= 0 && Array.isArray(_data) && (
        <div style={fe}>
          暂无数据
        </div>
      )}
    </section>
  );
};
export default SummaryTablePagination;

interface IProps {
  columns?: string[];
  data: any[][];
  /**每页展示多少个数据，默认10个，超过10个出现分页 */
  count?: number;
  align?: "left" | "right" | "center";
  // 访问来源 翻译是另外的 //或者 true = 不走翻译
  isCountry?: boolean;
  needOpt?: "bandwidth" | "flow" | "normal" | "fixed2";
}

const fe = { height: 34, lineHeight: "34px", backgroundColor: "#f1f1f1" };
const fi = { whiteSpace: "nowrap" as any, maxWidth: "40px" };
export const de = { textOverflow: "ellipsis", overflow: "hidden" };
/**
   *
   *   <SummaryTablePagination
          columns={["EDGE_NODE", "BACK_TO_SOURCE"]}
          count={100}
          data={[
          ["a1", 1, 1],
          ["a2", 1, 1],
          ["a3", 1, 1],
          ["a4", 1, 1],
          ["a5", 1, 1],
          ["a6", 1, 1],
          ["a7", 1, 1],
          ["a8", 1, 1],
          ["a9", 1, 1],
          ["a10", 1, 1],
          ["a11", 1, 1],
          ["a12", 1, 1],
          ["a13", 1, 1],
          ["a14", 1, 1],
          ["a15", 1, 1],
          ["a16", 1, 1],
          ["a17", 1, 1],
          ["a18", 1, 1],
          ["a19", 1, 1],
          ["a20", 1, 1],
          ["a21", 1, 1],
          ["a22", 1, 1],
          ["a23", 1, 1],
          ["a24", 1, 1],
        ]}
          isCountry={true}
        />
   */
/**格式化流量统计数据FC */
export function shiftChange(_data: number) {
    if (!_data) {
        return `-`
    }
    const sign = _data > 0 ? "" : "-";
    const data = Math.abs(_data);
    let size = "";
    if (data < 1000) {
        size = data.toFixed(2) + "B"
    } else if (data < 1000 * 1000) {
        size = (data / 1000).toFixed(2) + "KB"
    } else if (data < 1000 * 1000 * 1000) {
        size = (data / (1000 * 1000)).toFixed(2) + "MB"
    } else if (data < 1000 * 1000 * 1000 * 1000) {
        size = (data / (1000 * 1000 * 1000)).toFixed(2) + "GB"
    } else {
        size = (data / (1000 * 1000 * 1000 * 1000)).toFixed(2) + "TB"
    }
    let sizeStr = size + "";
    let index = sizeStr.indexOf(".");
    let dou = sizeStr.substr(index + 1, 2)
    if (dou === "00") {
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }

    return `${sign}${size}`;
}