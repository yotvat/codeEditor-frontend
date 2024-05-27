import { Link } from "react-router-dom"
import { BlockPreview } from "./BlockPreview"

export function BlockList({ blocks }) {

    return (
        <ul className="block-list clean-list flex wrap ">
            {blocks.map(block => (
                <li key={block._id}>
                    <Link to={`/editor/${block._id}`}>
                        <BlockPreview block={block} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}