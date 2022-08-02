import {BehaviorSubject} from "rxjs";
import {ReactNode} from "react";

export interface IInfo {
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

    public createEvent = (value:ModalInfo) => {
        this.info$.next({
            value
        });
    };
}

const msgModal = new Message();

export default msgModal;