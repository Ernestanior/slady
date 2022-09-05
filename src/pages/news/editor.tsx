import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import useUpdateRef from "@/hoc/useUpdateRef";
import {uploadImageFile} from "@/pages/news/uploadImage";
import {message} from "antd";
import {BehaviorSubject, debounceTime} from "rxjs";

interface IProps{
    value?: string;
    onChange?: (value: string) => void;
    imgUrlCallback?:(img:string)=>void;
}

type InsertFnType = (url: string) => void

function MyEditor(props: IProps) {
    const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
    const onChangeRef = useUpdateRef(props.onChange)
    const imgUrlCallbackRef = useUpdateRef(props.imgUrlCallback)
    const value$ = useRef(new BehaviorSubject<string | undefined>(""))
    const [html, setHtml] = useState("")
    useEffect(() => {
        value$.current.next(props.value);
    }, [value$, props.value])

    useEffect(() => {
        const sub = value$.current.pipe(debounceTime(500)).subscribe(value => {
            console.log(value)
            if(!!value){
                const valueHtml = value.indexOf("<p>") !== 0
                    ? value.split(/\n/).map(line => `<p>${line}</p>`).join('\n') : value
                setHtml(valueHtml)
            }
        })
        return () => sub.unsubscribe()
    }, [value$])

    const toolbarConfig: Partial<IToolbarConfig> = useMemo(() => {
        return {
            excludeKeys: ["group-video"]
        }
    }, [])

    const editorConfig = useRef<Partial<IEditorConfig>>({
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                fieldName: "image",
                async customUpload(file: File, insertFn: InsertFnType) {
                    // file 即选中的文件
                    // 自己实现上传，并得到图片 url alt href
                    const res = await uploadImageFile(file)
                    if(res.isSuccess && res.result){
                        message.success("upload image successful !")
                        insertFn(res.result.href)
                        imgUrlCallbackRef.current && imgUrlCallbackRef.current(res.result.href)
                    }else{
                        message.error(res.message)
                    }
                }
            },
        }
    })

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const changeHandler = useCallback((editor: IDomEditor) => {
        // 未开启初始化完成标签，禁止onChange事件
        if(editor.isEmpty()){
            return
        }
        // if(!editor.getText()){
        //     return
        // }
        onChangeRef.current && onChangeRef.current(editor.getHtml())
    }, [onChangeRef])

    return (
        <div style={{ border: '1px solid #ccc', zIndex: 100}}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                key="editor"
                value={html}
                defaultConfig={editorConfig.current}
                onCreated={setEditor}
                onChange={changeHandler}
                mode="default"
                style={{ height: '500px', 'overflowY': 'hidden' }}
            />
        </div>
    )
}

export default MyEditor