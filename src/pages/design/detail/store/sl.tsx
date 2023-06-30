import React, {FC} from "react";
import {Divider} from "antd";


const Sl: FC = () => {

    return (
        <section style={{padding:20}}>
            <h3>库存</h3>
            <div>
                {Object.keys(sData).map((item,index)=><>
                        <section key={index} style={{display:"flex",marginBottom:20}}>
                            <div style={{flex:1}}>{item}</div>
                            <div style={{flex:6,display:"flex",justifyContent:"flex-start"}}>
                                {sData[item].map((i:any,index:number)=>
                                    <div key={index} style={{flex:"30%"}}>
                                        <div style={{marginBottom:10}}>{i.size}</div>
                                        <div>{i.number}</div>
                                    </div>)}
                            </div>

                        </section>
                        <Divider/>
                    </>

                    )}
            </div>

        </section>
    );
};

export default Sl;

const staticData=[
    {color:"棕色",size:"M",number:157},
    {color:"棕色",size:"L",number:261},
    {color:"棕色",size:"XL",number:67},
    {color:"白色",size:"S",number:9},
    {color:"白色",size:"M",number:121},
    {color:"白色",size:"L",number:83},
    {color:"粉色",size:"M",number:67},
]
const sData:any= {
    '棕色':[{size:"M",number:157},{size:"L",number:261},{size:"XL",number:9}],
    '白色':[{size:"S",number:66},{size:"M",number:421},{size:"L",number:19}],
    '粉色':[{size:"M",number:86}],
}



