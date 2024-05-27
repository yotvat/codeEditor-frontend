import { BlockPreview } from "./BlockPreview"

export function BlockList({blocks}) {

    return (
        <ul className="block-list clean-list ">
                    {blocks.map(block => (
                        <li key={block._id}>
                            <BlockPreview
                                block={block}
                            />
                        </li>
                    ))}
                </ul>
    )
}