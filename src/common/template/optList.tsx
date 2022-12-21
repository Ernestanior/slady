import IconFont from "@/common/icon";
import {Button, Dropdown, Menu, Space, Tooltip} from "antd";
import React, { FC } from "react";
// import { FormattedMessage } from "react-intl";
import { XOR } from "ts-xor";
import { IOperation, IColumnsTypeP, IOperationConfig } from "./interface";
// import {DownOutlined} from "@ant-design/icons";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import isMobile from "@/app/isMobile";
import './index.less'
/**
 * 构建操作列config,
 * @param optList 选项
 * @param optEl 操作栏标题
 * @param renderFn
 */
export const createOptList = (
  optList?: IOperationConfig,
  optEl?: React.ReactNode,
  renderFn?: (record: any) => boolean
) => {
  if (optList && optList.length > 0) {
    // 少于两个选项，直接显示，超过2个直接下拉
    const type =
      optList.length < 1 && !optList.some(Array.isArray)
        ? "horizontal"
        : "dropDown";
    const config: IColumnsTypeP = {
      key: "tb_action",
      width: isMobile?100:120,
      fixed: "right",
      onCell() {
        return {
          style: {
            paddingTop: 10,
            paddingBottom: 10,
          },
        };
      },
      title: (optEl || "操作") as any,
      render: (_, record) => {
        if (renderFn) {
          return renderFn(record) ? (
            ""
          ) : (
            <OptListComp
              key="tb_action_op"
              type={type}
              optList={optList as any}
              value={record}
            />
          );
        }
        return (
          <OptListComp
            key="tb_action_op"
            type={type}
            optList={optList as any}
            value={record}
          />
        );
      },
    };
    return config;
  }
  return null;
};

interface IOptPropsType1 {
  type: "horizontal";
  optList: IOperation<any>[];
  value: any;
}

interface IOptPropsType2 {
  type: "dropDown";
  optList: IOperationConfig;
  value: any;
}

type IOptProps = XOR<IOptPropsType1, IOptPropsType2>;

export const OptListComp: FC<IOptProps> = (props) => {
  if (props.type === "horizontal") {
    return (
      <Space key="tb_opt">
        {props.optList.map((opt) => {
          const title = opt.text
          // 符合隐藏条件
          if (opt.hide && opt.hide(props.value)) {
            return null;
          }
          return (<Tooltip key={opt.text} title={title}>
              <IconFont
                type={opt.icon || "iconshezhi1"}
                onClick={() => {
                  opt.event(props.value);
                }}
              />
            </Tooltip>)
        })}
      </Space>
    );
  }

  const handleClick = (event: any) => {
    const idx: number[] = (event.key && event.key.split("-")) || [];
    if (idx[1] !== undefined) {
      if (props.optList[idx[0]]) {
        const optZ = props.optList[idx[0]] as IOperation<any>[];
        const opt = optZ[idx[1]];
        opt && opt.event(props.value);
      }
      return;
    }
    const opt = props.optList[idx[0]] as IOperation<any>;
    opt && opt.event(props.value);
    return;
  };

  const menuList: ItemType[] = [];
  props.optList.map((optZ, idx1) => {
    if (Array.isArray(optZ)) {
      let deviderAdded = false;
      optZ.map((opt, idx2) => {
        // 符合隐藏条件
        if (opt.hide && opt.hide(props.value)) {
          return false;
        }
        const eloText = opt.text;
        const elo: ItemType= {
          key: `${idx1}-${idx2}`,
          label: eloText,
          disabled:opt.disabled && opt.disabled(props.value)
        }
        if (!deviderAdded) {
          deviderAdded = true;
          // menuList.push({key: `divider-${idx1}`, type: "divider", style: { margin: 0 }});
          // <Menu.Divider style={{ margin: 0 }} key={} />
        }
        menuList.push(elo);
        return true;
      });
    } else {
      // 符合隐藏条件
      if (optZ.hide && optZ.hide(props.value)) {
        return false;
      }
      const eloText = optZ.text;
      const elo: ItemType = {
        key: idx1,
        label: optZ.label || eloText,
        disabled:optZ.disabled && optZ.disabled(props.value)
      }
        // menuList.push({key: `divider-${idx1}`, type: "divider", style: { margin: 0 }});
        menuList.push(elo);
    }
    return true;
  });

  if(menuList.length < 1){
    return null
  }

  const menus = <Menu className="temp_opt_menu" onClick={handleClick} items={menuList} />

  return (
        <Dropdown key="tb_opt" overlay={menus} trigger={['click','hover']}>
          <Button className="cdn-opt-btn">
            更多
          </Button>
        </Dropdown>
  );
};
