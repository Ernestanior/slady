import {FC} from "react";
import {IObserverForm} from "@/hoc/createObserverForm";
import useAccountInfo from "@/store/account";
import useSaleInfo from "@/store/account/useSaleInfo";

const UserFormPart:FC<IObserverForm> = ({data$, form, children}) => {
    const info = useAccountInfo();
    const saleInfo = useSaleInfo();

    return <section>
        <div style={{ margin: "15px 0 15px 0" }}>新增</div>

        {children}
    </section>
}

