import {FC, useCallback, useMemo} from "react";
import Template from "@/common/template";
import NewsFilter from "@/pages/news/filter";
import {INormalEvent} from "@/common/interface";
import historyService from "@/store/history";

const NewsList:FC = () => {
    const buttons: INormalEvent[] = useMemo(()=> {
        return [{
            text: '新增',
            primary: true,
            event(){
                historyService.push("/news/create")
            }
        }]
    }, [])

    const queryDataFunction = useCallback(async () => {

        return null;
    }, [])

    return <section>
        <Template
            filter={<NewsFilter />}
            event={buttons}
            columns={[]}
            queryDataFunction={queryDataFunction}
            rowKey="id"
        />
    </section>
}

export default NewsList;