export function BlockPreview({ block }) {

    return (
        <section className="block-preview">
            <h2>{block.title}</h2>
            <h3>{block._id}</h3>
        </section>
    )
}