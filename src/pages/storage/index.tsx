import React, {FC, useState} from "react";
import {Button} from "antd";

import Import from "@/pages/storage/import";
import Export from "@/pages/storage/export";
const StorageRecord: FC = () => {
    const [type,setType]=useState<'import'|'export'>('import')
    return (
        <section>
            <div style={{marginBottom:10}}>
                <Button type={type==="import"?'primary':'default'} onClick={()=>setType('import')}>入库</Button>
                <Button type={type==="export"?'primary':'default'} onClick={()=>setType('export')} style={{marginLeft:10}}>出库</Button>
            </div>
            {type==='import'?<Import/>:<Export/>}
        </section>
    );
};

export default StorageRecord;

