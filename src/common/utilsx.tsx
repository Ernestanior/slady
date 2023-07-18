/** 表格省略号 */
import EllipsisTooltip from "@/common/ellipsisTooltip";
import moment from "moment";

export const ellopsisOnCell: any = () => {
    return {
        style: {
            whiteSpace: "nowrap",
            maxWidth: 120,
        },
    };
};

export const ellopsisRender = (text: React.ReactNode) => {
    return <EllipsisTooltip title={text}>{text}</EllipsisTooltip>;
};

export const ellopsisTableConfig = {
    onCell: ellopsisOnCell,
    render: ellopsisRender,
};

/**
 *
 * @param time 传入的日期或时间
 * @param format 预期的转换格式,默认修改为YYYY/MM/DD格式
 */
export const dateFomatter = (time: any, format?: string) => {
    if (!time) {
        return "-";
    }
    try {
        const time_m = moment(time);
        if (time_m.isValid()) {
            if (format) {
                return time_m.format(format);
            } else {
                return time_m.format("YYYY-MM-DD");
            }
        } else {
            console.log("时间格式有误！");
        }
    } catch (error) {
        // console.error(error);
        return `${time}`;
    }
};
export const handleDatetime = (dateObj: any[]) => {
    if (!Array.isArray(dateObj) || !dateObj) {
        return ["", ""];
    }
    return Object.values(dateObj).map((t) => dateFomatter(t));
};
