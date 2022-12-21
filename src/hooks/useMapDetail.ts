
import worldTranslation from "@/pages/cdn/site/statistics/performance/config/worldTranslation"
import chinaTranslation from "@/pages/cdn/site/statistics/performance/config/chinaTranslation"
import operateLogTranslation from "@/pages/cdn/site/statistics/performance/json/operationLog"

import { useCallback } from "react";

export enum TMap {
    MAP_DETAIL_WORLD = "MAP_DETAIL_WORLD",
    MAP_DETAIL_CHINA = "MAP_DETAIL_CHINA",
    OPERATE_LOG = "OPERATE_LOG"
}

const useMapLang = () => {

    const getPkg = useCallback((types: TMap) => {
        if (types === TMap.MAP_DETAIL_WORLD) return worldTranslation;
        if (types === TMap.MAP_DETAIL_CHINA) return chinaTranslation;
        if (types === TMap.OPERATE_LOG) return operateLogTranslation;
    }, [])

    const getLocaleLang = useCallback((types: TMap) => {
        let currentlang: string = "zh_CN";
        const langInfo = localStorage.getItem("CDN_V3_CACHE_READ_ONLY_KEY")
        try {
            if (langInfo) {
                let parsedLangInfo = JSON.parse(langInfo)
                // 
                currentlang = parsedLangInfo.cache.CDN_LAN_TYPE_READ_ONLY || "zh_CN";
            }
        } catch {
            currentlang = "zh_CN"
        }
        const _pkg = getPkg(types);
        return _pkg[currentlang];
    }, [getPkg])

    // 地图语言切换的数据
    const fmtMapLang = useCallback((data: any, mapDTravesel: TMap) => {
        // 需要的地图类型 - 全球 ｜ 中国
        const traveselPKG: { [key: string]: number | string } | undefined = getLocaleLang(mapDTravesel)
        if (!!!traveselPKG) {
            return [];
        }
        const kv: any[] = []
        Object.values(data).forEach((t: any) => {
            return Object.entries(traveselPKG).find((a) => {
                // console.log(a[0])
                if (a[0] === Object.entries(t)[0][0]) {
                    return kv.push([a[1], Object.entries(t)[0][1]])
                }
                return false
            })
        })
        return kv
    }, [getLocaleLang])

    const getMapPkg = useCallback((mapTypes: TMap) => {
        let pkg: TMap | undefined = Object.values(TMap).find((t) => t === mapTypes)
        if (pkg) {
            switch (mapTypes) {
                case TMap.MAP_DETAIL_CHINA:
                    return getLocaleLang(TMap.MAP_DETAIL_CHINA)
                case TMap.MAP_DETAIL_WORLD:
                    return getLocaleLang(TMap.MAP_DETAIL_WORLD)
                case TMap.OPERATE_LOG:
                    return getLocaleLang(TMap.OPERATE_LOG)
            }
        }
    }, [getLocaleLang])
    return [fmtMapLang, getMapPkg] as [(data: TMapData[], mapDTravesel: TMap) => TMapData[], (mapTypes: TMap) => any,]
}
export default useMapLang

export type TMapData = {
    [key: string]: string | number
}
