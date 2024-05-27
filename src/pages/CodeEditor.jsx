import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { blockService } from "../services/block.service"
import { Editor } from "@monaco-editor/react"
import { SOCKET_EMIT_SET_BLOCK, SOCKET_EMIT_UPDATE_BLOCK, SOCKET_EVENT_BLOCK_UPDATED, socketService } from "../services/socket.service"

export function CodeEditor() {
    const editorRef = useRef()
    const [block, setBlock] = useState(null)
    const [value, setValue] = useState('')
    // const [isMentor, setIsMentor] = useState(true)
    const { blockId } = useParams()

    useEffect(() => {
        if (blockId) loadBlock(blockId)
        socketService.emit(SOCKET_EMIT_SET_BLOCK, block)
        socketService.on(SOCKET_EVENT_BLOCK_UPDATED, () => {loadBlock(blockId)})

        return () => socketService.off(SOCKET_EVENT_BLOCK_UPDATED)
    }, [blockId])

    async function loadBlock(blockId) {
        try {
            const blockFromParams = await blockService.getById(blockId)
            setBlock(blockFromParams)
            setValue(blockFromParams.code)
            socketService.emit(SOCKET_EMIT_SET_BLOCK, blockFromParams)
        } catch (err) {
            console.log(err);
        }
    }

    function onMount(editor) {
        //check first entrance
        // if (!isMentor) {
        editorRef.current = editor
        editor.focus()
        // } else return 

    }

    async function handleChange(currValue) {
        //check first entrance
        // if (!isMentor) {
        setValue(currValue)
        const blockToSave = { ...block, code: currValue }
        try {
            const savedBlock = await blockService.save(blockToSave)
            socketService.emit(SOCKET_EMIT_UPDATE_BLOCK, savedBlock)
            setBlock(savedBlock)
        } catch (err) {
            console.log(err);
        }
        // } else return 
    }

    // console.log(block);
    if (!block) return <h2>loading...</h2>
    return (
        <div className="code-editor">
            <Editor
                height="70vh"
                width="60%"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={block.code}
                value={value}
                onMount={onMount}
                onChange={handleChange} />
        </div>
    )
}