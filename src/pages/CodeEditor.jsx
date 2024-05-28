import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { blockService } from "../services/block.service"
import { Editor } from "@monaco-editor/react"
import { SOCKET_EMIT_SET_BLOCK, SOCKET_EMIT_UPDATE_BLOCK, SOCKET_EVENT_BLOCK_UPDATED, SOCKET_EVENT_IS_MENTOR, socketService } from "../services/socket.service"

export function CodeEditor({isMentor}) {
    const editorRef = useRef()
    const [block, setBlock] = useState(null)
    const [value, setValue] = useState('')
    // const [isMentor, setIsMentor] = useState(false)
    const { blockId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (blockId) loadBlock(blockId)
        // socketService.on(SOCKET_EVENT_IS_MENTOR, ({ isMentor }) => {
        //     setIsMentor(isMentor)

        // })

        //Listen to update event and update the block
        socketService.on(SOCKET_EVENT_BLOCK_UPDATED, (updatedBlock) => {
            if (updatedBlock._id === blockId) {
                setBlock(updatedBlock)
                setValue(updatedBlock.code)
            }
        });

        return () => {
            socketService.off(SOCKET_EVENT_IS_MENTOR)
            socketService.off(SOCKET_EVENT_BLOCK_UPDATED)
        }
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
        editorRef.current = editor
        editor.focus()
    }

    async function handleChange(currValue) {
        //check first entrance
        if (isMentor) return
        setValue(currValue)
        const blockToSave = { ...block, code: currValue }
        try {
            const savedBlock = await blockService.save(blockToSave)
            socketService.emit(SOCKET_EMIT_UPDATE_BLOCK, savedBlock)
            setBlock(savedBlock)
        } catch (err) {
            console.log(err);
        }

    }

    console.log('isMENTORRR:', isMentor);
    if (!block) return <h2>loading...</h2>
    return (
        <div className="code-editor">
            <div className="editor-header flex align-center">
                {isMentor ? <span>Hello Tom!</span> : <span>Hello Josh!</span>}
                <button onClick={() => navigate('/')}>Back</button>
            </div>
            <Editor
                height="70vh"
                width="60%"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={block.code}
                value={value}
                onMount={onMount}
                onChange={handleChange}
                options={{
                    readOnly: isMentor
                }}
            />
        </div>
    )
}