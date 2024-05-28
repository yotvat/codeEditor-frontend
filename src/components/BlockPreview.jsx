export function BlockPreview({ block }) {

    return (
        <section className="block-preview flex align-center justify-center">
            <h2>{`<${block.title}/>`}</h2>
            {/* <h3>{block._id}</h3> */}
        </section>
    )
}