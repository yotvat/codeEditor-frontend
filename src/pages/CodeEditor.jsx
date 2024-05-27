import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { blockService } from "../services/block.service"
import { Editor } from "@monaco-editor/react"

export function CodeEditor() {
    const editorRef = useRef()
    const [block, setBlock] = useState(null)
    const [value, setValue] = useState('')
    const [isMentor, setIsMentor] = useState(true)

    const { blockId } = useParams()

    useEffect(() => {
        if (blockId) loadBlock(blockId)
    }, [])

    async function loadBlock(blockId) {
        try {
            const blockFromParams = await blockService.getById(blockId)
            setBlock(blockFromParams)
        } catch (err) {
            console.log(err);
        }

    }

    function onMount(editor) {
        editorRef.current = editor
        editor.focus()
    }

    async function handleChange(value) {
        // if (!isMentor) {
        // console.log(value);
        setValue(value)
        const blockToSave = { ...block, code: value }
        try {
            const savedBlock = await blockService.save(blockToSave)
            setBlock(savedBlock)
        } catch (err) {
            console.log(err);
        }
        // }
    }

    if (!block) return <h2>loading...</h2>
    return (
        <div className="code-editor">
            <Editor
                height="70vh"
                width="60%"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={`
                 ${block.code}`}
                value={value}
                onMount={onMount}
                onChange={handleChange} />
        </div>
    )
}