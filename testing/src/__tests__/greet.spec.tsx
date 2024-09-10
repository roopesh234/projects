import { render, screen } from "@testing-library/react"
import { Greet } from "./greet"

describe ('Greet', () => { //only, skip

    it('Greet render correctly', () => { //fit - force, xit - tempaoryly exclude
        render(<Greet/>)
        const textElement = screen.getByText(/Hello/i)
        expect(textElement).toBeInTheDocument()
    })

    describe.skip('nested', () => {

        it('Greet render with name', () => {
            render(<Greet name = 'ya'/>)
            const textElement = screen.getByText(/Hello ya/i)
            expect(textElement).toBeInTheDocument()
        })
    })

})