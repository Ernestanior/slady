import {BehaviorSubject} from "rxjs";
import {ReactNode} from "react";

export interface IInfo {
    type:"modal" | "modalF" | "popup";
    value:ModalInfo;
}
export interface ModalInfo{
    title:string;
    content?:ReactNode;
    onOk?:any;
    onCancel?:any;
}

class Message {
    readonly info$ = new BehaviorSubject<IInfo | null>(null);

    public createEvent = (type:"modal" | "popup" | "modalF",value:any) => {
        this.info$.next({
            type,
            value
        });
    };
}

const msgModal = new Message();

export default msgModal;
