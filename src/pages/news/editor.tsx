import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, {useState, useEffect, useMemo, useRef} from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import useUpdateRef from "@/hoc/useUpdateRef";
import {uploadImageFile} from "@/pages/news/uploadImage";
import {message} from "antd";

interface IProps{
    value?: string;
    onChange?: (value: string) => void
}

type InsertFnType = (url: string) => void

function MyEditor(props: IProps) {
    const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
    // 编辑器内容
    const html = useUpdateRef(props.value);
    const setHtmlRef = useUpdateRef(props.onChange)

    const toolbarConfig: Partial<IToolbarConfig> = useMemo(() => {
        return {
            excludeKeys: ["group-video"]
        }
    }, [])

    const editorConfig = useRef<Partial<IEditorConfig>>({
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                server: '/api/upload',
                fieldName: "image",
                async customUpload(file: File, insertFn: InsertFnType) {
                    // file 即选中的文件
                    // 自己实现上传，并得到图片 url alt href
                    const res = await uploadImageFile(file)
                    if(res.isSuccess && res.result && !res.result.errno){
                        message.success("upload image successful !")
                        insertFn(res.result.data.url)
                    }else{
                        message.error("upload image fail !")
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

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig.current}
                    value={html.current}
                    onCreated={setEditor}
                    onChange={editor => {
                        if(editor.getHtml() !== props.value){
                            setHtmlRef.current && setHtmlRef.current(editor.getHtml())
                        }
                    }}
                    mode="default"
                    style={{ height: '500px', 'overflowY': 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor