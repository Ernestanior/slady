import React, { FC } from "react";
import "./index.less";
import IconFont from "@/common/icon";

interface IProps {
    type: 'warning' | 'success' | 'error'
    title: string;
    style?: React.CSSProperties;
    className?: string;
}

const TipBox: FC<IProps> = ({type,title,style,className,children}) => {
  return (
    <div className={className || undefined}>
      <div className="comp-tip" style={{ marginBottom: 15, ...style }}>
        <p className="title">
          {type==='warning' &&
              <div>
                <IconFont type={'iconic_info_24px'} style={{width:10,marginRight:10}} />
                <span className='warning'>{title}</span>
              </div>
          }
          {type==='success' &&
              <div style={{color:"#68e047"}}>
                <IconFont type={'iconchenggong'} style={{width:10,marginRight:10}} />
                <span className='success'>{title}</span>
              </div>
          }
          {type==='error' &&
              <div style={{color:"red"}}>
                <IconFont type={'iconmd-close-circle'} style={{width:10,marginRight:10}} />
                <span className='error'>{title}</span>
              </div>
          }
        </p>
        <div className="text">{children}</div>
      </div>
    </div>
  );
};

export default TipBox;
