import { render, screen } from "@testing-library/react"
import { Greet } from "../components/greet/greet"

describe ('Greet', () => { //only, skip

    test('Greet render correctly', () => {
        render(<Greet/>)
        const textElement = screen.getByText(/Hello/i)
        expect(textElement).toBeInTheDocument()
    })

    describe.skip('nested', () => {

        test('Greet render with name', () => {
            render(<Greet name = 'ya'/>)
            const textElement = screen.getByText(/Hello ya/i)
            expect(textElement).toBeInTheDocument()
        })
    })

})