/** 表格省略号 */
import EllipsisTooltip from "@/common/ellipsisTooltip";

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