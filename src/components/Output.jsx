export function Output({ output, solution }) {

    const winner = solution.trim() === output?.trim()
    return (
        <section className="output-section">
            <div className="output-editor">
                <span>
                    {
                        output ? output : "Click run to see result"
                    }
                    {winner && < pre >
                        THAT'S CORRECT!!!!! 🤩 🤩
                    </pre>}
                    {!winner && output && <pre> TRY AGAIN... 😰 😰</pre>}
                </span>
            </div>
        </section >
    )
}