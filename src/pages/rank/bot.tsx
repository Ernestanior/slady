import React, {FC} from "react";
import item1 from '../../assets/1.jpg'
import item2 from '../../assets/2.jpg'
import item4 from '../../assets/4.jpg'
import item5 from '../../assets/5.jpg'
import item6 from '../../assets/6.jpg'
import {RightOutlined} from "@ant-design/icons";
const BotSale: FC = () => {



    return (
        <section>
            <div>
                {staticData.content.map((item)=><div style={{backgroundColor:"#fff",display:"flex",marginRight:20,marginBottom:20,borderRadius:10,boxShadow:"0 0 15px 0 #ddd"}}>
                        <img alt="" style={{height:"100%"}} src={item.pic}/>
                        <div style={{width:"100%",display:"flex",padding:15,justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                                <h3>{item.designId}</h3>
                                <div style={{marginBottom:5}}>销量：{item.sum}</div>
                                价格：<span style={{color:"#fa9829"}}>${item.price}</span>

                            </div>
                            <a href="#" style={{display:"flex",alignItems:"center",color:"#b67c39",fontSize:15,fontWeight:600}}>详情<RightOutlined /></a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BotSale;

const staticData = {
    number:0,
    numberOfElements:10,
    size:10,
    totalElements:16,
    totalPages:2,
    content:[
        {designId:"618-212", pic:item1, sum:2, price:199.01},
        {designId:"618-212", pic:item2, sum:4, price:199.01},
        {designId:"618-212", pic:item5, sum:7, price:199.01},
        {designId:"618-212", pic:item4, sum:13, price:199.01},
        {designId:"618-212", pic:item5, sum:15, price:199.01},
        {designId:"618-212", pic:item6, sum:15, price:199.01},
        {designId:"618-212", pic:item1, sum:18, price:199.01},
        {designId:"618-212", pic:item2, sum:19, price:199.01},
        {designId:"618-212", pic:item4, sum:19, price:199.01},

    ]
}
