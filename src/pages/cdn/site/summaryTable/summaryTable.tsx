import React, {FC, useCallback, useEffect, useState} from "react";
import "./summaryTable.less";
import TableTooltip from "./tooltip";
import isMobile from "@/app/isMobile";
import {transformBindWidth} from "@/common/utils";

const SummaryTable: FC<IProps> = ({
                                      columns,
                                      data,
                                      align = "center",
                                      isCountry = false,
                                      needOpt = "normal",
                                      width
                                  }) => {
    const [newColumns, setNewColumns] = useState<string[]>([]);

    const alterCOL = useCallback(
        (columns: string[] | undefined) => {
            if (!Array.isArray(columns)) {
                return;
            }
            // 确保有数据
            if (data && data[0] && data[0].length >= 1) {
                const newCOL: string[] = [...columns];
                if (data[0].length > columns.length) {
                    // 计算需要增加的col
                    const colsToAdd: number = data[0].length - columns.length;
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
        [data]
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
            let _text = null;
            try {
                _text = t;
                return _text;
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
            style={{
                width: isMobile?'95%':width
            }}
        >
            <table>
                <thead>
                {newColumns && (
                    <tr>
                        {newColumns.length >= 1 &&
                        newColumns.map((t: string, idx: number) => {
                            return (
                                <th style={fi} key={idx}>
                                    <TableTooltip tooltipTitle={charIntl(t)}>
                                        <p style={de}>{t}</p>
                                    </TableTooltip>
                                </th>
                            );
                        })}
                    </tr>
                )}
                </thead>
                <tbody>
                {data &&
                data.length >= 1 &&
                data.map((t, idx: number) => {
                    return (
                        <tr key={idx}>
                            {t.map((t: string, idx: number) => {
                                return (
                                    <td key={idx}>
                                        {typeof t === "string" ? (
                                            isCountry ? (
                                                t
                                            ) : (
                                                <TableTooltip tooltipTitle={t}>
                                                    <div style={{textAlign: align, ...de}}>
                                                        {t !== "NaN" && t}
                                                    </div>
                                                </TableTooltip>
                                            )
                                        ) : (
                                            <TableTooltip tooltipTitle={t}>
                                                <div style={{textAlign: align, ...de}}>
                                                    {operationFmt(t)}
                                                </div>
                                            </TableTooltip>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {data && data.length <= 0 && Array.isArray(data) && (
                <div style={fe}>
                    暂无数据
                </div>
            )}
        </section>
    );
};
export default SummaryTable;

interface IProps {
    columns?: string[];
    data: any[][];
    align?: "left" | "right" | "center";
    // 访问来源 翻译是另外的 //或者 true = 不走翻译
    isCountry?: boolean;
    needOpt?: "bandwidth" | "flow" | "normal" | "fixed2";
    width?: number
}

const fe = {height: 34, lineHeight: "34px", backgroundColor: "#f1f1f1"};
const fi = {whiteSpace: "nowrap" as any, maxWidth: "40px"};
export const de = {textOverflow: "ellipsis", overflow: "hidden"};

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