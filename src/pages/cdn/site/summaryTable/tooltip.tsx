import { Tooltip } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'
import React from 'react'
import { FC } from 'react'

interface IProps {
    direction?: TooltipPlacement;
    tooltipTitle: string;
}

const TableTooltip: FC<IProps> = ({ direction = "left", tooltipTitle, children }) => {
    return (
        <Tooltip placement={direction} title={tooltipTitle}>
            {children}
        </Tooltip>
    )
}
export default TableTooltip;