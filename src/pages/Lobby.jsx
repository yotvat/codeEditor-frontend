import { useEffect, useState } from "react";
import { BlockList } from "../components/BlockList";
import { blockService } from "../services/block.service";

export function Lobby() {
    const [blocks, setBlocks] = useState([])


    useEffect(() => {
        if (!blocks || !blocks.length) loadBlocks()
    }, [])

    async function loadBlocks() {
        try {
            let codeblocks = await blockService.query()
            setBlocks(codeblocks)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (!blocks || !blocks.length) return <div className="loader"></div>
    return (
        <section className="block-index main-layout">
            <div className="list-title">
                <h1>Choose code block</h1>
            </div>
            <BlockList
            blocks={blocks}
             />
        </section>
    )
}