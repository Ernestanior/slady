import React, {FC, useState} from "react";
import {Button} from "antd";

import BotSale from "@/pages/rank/bot";
import TopSale from "@/pages/rank/top";
const Rank: FC = () => {
    const [type,setType]=useState<'top'|'bot'>('top')
    console.log(type)
    return (
        <section>
            <div style={{marginBottom:10}}>
                <Button type={type==="top"?'primary':'default'} onClick={()=>setType('top')}>爆款</Button>
                <Button type={type==="bot"?'primary':'default'} onClick={()=>setType('bot')} style={{marginLeft:10}}>冷款</Button>
            </div>
            {type==='top'?<TopSale/>:<BotSale/>}
        </section>
    );
};

export default Rank;

