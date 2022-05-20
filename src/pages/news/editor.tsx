import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import useUpdateRef from "@/hoc/useUpdateRef";

interface IProps{
    value?: string;
    onChange?: (value: string) => void
}

function MyEditor(props: IProps) {
    const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
    // 编辑器内容
    const html = props.value;
    const setHtmlRef = useUpdateRef(props.onChange)

    const toolbarConfig = { }
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    }

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
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => {
                        setHtmlRef.current && setHtmlRef.current(editor.getHtml())
                    }}
                    mode="default"
                    style={{ height: '500px', 'overflowY': 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor