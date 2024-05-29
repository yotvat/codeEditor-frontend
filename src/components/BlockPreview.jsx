export function BlockPreview({ block }) {

    return (
        <section className="block-preview flex align-center justify-center">
            <h2>{`<${block.title}/>`}</h2>
        </section>
    )
}