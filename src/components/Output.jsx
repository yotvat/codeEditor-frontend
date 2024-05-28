export function Output({ output }) {



    return (
        <section className="output-section">
            <div className="output-editor">
                <span>
                    {
                        output ? output : "Click run to see result"
                    }
                </span>
            </div>
        </section>
    )
}