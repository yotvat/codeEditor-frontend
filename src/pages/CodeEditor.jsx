import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { blockService } from "../services/block.service"
import { Editor } from "@monaco-editor/react"
import { SOCKET_EMIT_LEAVE_BLOCK, SOCKET_EMIT_SET_BLOCK, SOCKET_EMIT_UPDATE_BLOCK, SOCKET_EVENT_BLOCK_UPDATED, SOCKET_EVENT_IS_MENTOR, socketService } from "../services/socket.service"
import { Output } from "../components/Output"
import { apiService } from "../services/res-api.service"

export function CodeEditor() {
    const editorRef = useRef()
    const [block, setBlock] = useState(null)
    const [value, setValue] = useState('')
    const [output, setOutput] = useState(null)
    const [isMentor, setIsMentor] = useState(false)
    const { blockId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (blockId) loadBlock(blockId)

        socketService.on(SOCKET_EVENT_IS_MENTOR, ({ isMentor }) => {
            console.log(isMentor)
            setIsMentor(isMentor)
        })

        //Listen to update event and update the block
        socketService.on(SOCKET_EVENT_BLOCK_UPDATED, (updatedBlock) => {
            if (updatedBlock._id === blockId) {
                setBlock(updatedBlock)
                setValue(updatedBlock.code)
            }
        });

        return () => {

            socketService.emit(SOCKET_EMIT_LEAVE_BLOCK, blockId)
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

    async function runCode() {
        const editorCode = editorRef.current.getValue()
        if (!editorCode) return

        try {
            const { run: result } = await apiService.executeCode(editorCode)
            setOutput(result.output)
        } catch (err) {
            console.log(err)
        }
    }

    console.log('isMENTORRR:', isMentor);
    if (!block) return <div className="loader"></div>
    return (
        <div className="code-editor flex column">
            <div className="editor-header flex align-center justify-around">
                {isMentor ? <span>Hello Tom! , Have a look at Josh's code</span> : <span>Hello Josh! try to solve "{block.title}" Code block!</span>}
                <div className="actions">
                    <button onClick={() => navigate('/')}>Back</button>
                    <button onClick={runCode}>Run code</button>
                </div>
            </div>
            <div className="editor-output flex">
                <div className="editor">
                    <Editor
                        // height="70vh"
                        // width="60%"
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
                <Output solution={block.solution} output={output} editorRef={editorRef} />
            </div>
        </div>
    )
}