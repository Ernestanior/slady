import React, {FC, useState} from "react";
import {Button} from "antd";

import BotSale from "@/pages/rank/bot";
import TopSale from "@/pages/rank/top";
import {useTranslation} from "react-i18next";
const Rank: FC = () => {
    const [t]=useTranslation()
    const [type,setType]=useState<'top'|'bot'>('top')
    return (
        <section>
            <div style={{marginBottom:30}}>
                <Button type={type==="top"?'primary':'default'} onClick={()=>setType('top')}>{t('TOP_SALE')}</Button>
                <Button type={type==="bot"?'primary':'default'} onClick={()=>setType('bot')} style={{marginLeft:10}}>{t('BOT_SALE')}</Button>
            </div>
            {type==='top'?<TopSale/>:<BotSale/>}
        </section>
    );
};

export default Rank;

