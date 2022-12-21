import React, { FC } from "react";
import IDrawer from "./IDrawer";
import {Popup} from "antd-mobile";
import isMobile from "@/app/isMobile";

interface Iprops {
    visibles: boolean;
    onClose: () => void;
}
export const HitRateChartTips: FC<Iprops> = ({ visibles, onClose }) => {
    if (isMobile){
        return <Popup
            className='popup-x'
            visible={visibles}
            onClose={onClose}
            onMaskClick={onClose}
            bodyStyle={{ width: '90vw',padding:30 }}
            position={"left"}>
            <section className="header">
                <h2>提示</h2>
            </section>
            缓存命中率：请求缓存是命中缓存的请求数，除以总的请求数。这里的总请求数包括正常访问的请求。终端用户访问加速节点时，如果该节点有缓存住了要被访问的数据时就叫做命中，如果没有的话需要回原服务器取，就是没有命中。取数据的过程与用户访问是同步进行的，所以即使是重新取的新数据，用户也不会感觉到有延时。 命中率=命中数/（命中数+没有命中数），缓存命中率是判断加速效果好坏的重要因素之一。
        </Popup>
    }

    return (
        <section>
            <IDrawer
                data="缓存命中率：请求缓存是命中缓存的请求数，除以总的请求数。这里的总请求数包括正常访问的请求。终端用户访问加速节点时，如果该节点有缓存住了要被访问的数据时就叫做命中，如果没有的话需要回原服务器取，就是没有命中。取数据的过程与用户访问是同步进行的，所以即使是重新取的新数据，用户也不会感觉到有延时。 命中率=命中数/（命中数+没有命中数），缓存命中率是判断加速效果好坏的重要因素之一。"
                visible={visibles}
                onClose={onClose}
            />
        </section>
    );
};
export const CacheChartTips: FC<Iprops> = ({ visibles, onClose }) => {
    if (isMobile){
        return <Popup
            className='popup-x'
            visible={visibles}
            onClose={onClose}
            onMaskClick={onClose}
            bodyStyle={{ width: '90vw',padding:30 }}
            position={"left"}>
            <section className="header">
                <h2>提示</h2>
            </section>
            数据缓存率：数据缓存率是指流经CDN的流量中通过节点直接返回的数据总量除以所有流经流量。
        </Popup>
    }

    return (
        <section>
            <IDrawer
                data={"数据缓存率：数据缓存率是指流经CDN的流量中通过节点直接返回的数据总量除以所有流经流量。"}
                visible={visibles}
                onClose={onClose}
            />
        </section>
    );
};




export const LimitBlockLoGTips: FC<Iprops>  =  ({ visibles, onClose }) => {
    return (
        <section>
            <IDrawer
            title="LIMIT_BLOCK_LOG_LIST"
                data={
                <div>
                    <p>提示：</p>
                    <p>根据限速规则的设置，系统将对访客IP自动执行限速冻结操作，并记录在限速拦截日志中，用户可以对限速规则的执行历史进行查看。单连接限制用于控制访问速率，不会根据访问特征进行拦截，当访问速率降低时将自动放行访问请求，对此，系统并不会将此操作记录在限速拦截日志中。</p>
                </div>}
                visible={visibles}
                onClose={onClose}
            />
        </section>
    );
  };